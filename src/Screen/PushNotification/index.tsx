import React, { Component, useState, useEffect, useRef } from "react";
import { Platform, AppState, View, Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { showMessage } from "react-native-flash-message";
import {
  PERMISSIONS_RESULTS,
  checkPushNotificationPermissionAndroid,
  checkPushNotificationPermissionIos,
  requestPushNotificationPermissionAndroid,
  requestPushNotificationPermissionIos,
  permissionDeniedBlockedAlert,
  consoleLog,
} from "src/utils/Permissions";
import useAppStore from "src/store/appStore";
import { shallow } from "zustand/shallow";
import { useFcmToken, useProfile } from "src/service/user/user";
import { storage, storageKeys } from "src/storage/storage";
import { navigate, navigationRef } from "src/navigation/navigation";
import { API } from "src/Privet";

export let pushNotificationRef: any;

/**
 * Push Notification Component
 */
const PushNotification = () => {
  pushNotificationRef = useRef();

  var remoteInitialNotification: any;
  var unsubscribeonMessage: any = null;
  var alertPresent = false;
  // let [appState, setAppState] = useState(AppState.currentState);
  const appState = useRef(AppState.currentState);
  const [accessToken, userId] = useAppStore(
    (s) => [s.accessToken, s.user.id],
    shallow
  );
  const { mutate: muteFcmToken } = useFcmToken();
  // const [alertPresent, setAlertPresent] = useState(false);

  /**handle app state change  */
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      // console.log("AppState", appState.current);
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  /**componet life cycle method */
  useEffect(() => {
    manageRequirePermissions();
  }, [userId]);

  /**componet life cycle method */
  useEffect(() => {
    if (unsubscribeonMessage) {
      consoleLog("Unmounting cleanup", unsubscribeonMessage);
      return unsubscribeonMessage();
    }
  }, []);

  /** Funcation for manage permissions using in this screen */
  const manageRequirePermissions = async () => {
    if (Platform.OS == "android") {
      const checkPermissionStatus =
        await checkPushNotificationPermissionAndroid();
      consoleLog("checkPermissionStatus Android", checkPermissionStatus);
      if (checkPermissionStatus == PERMISSIONS_RESULTS.DENIED) {
        await requestPushNotificationPermissionAndroid();
      } else if (checkPermissionStatus == PERMISSIONS_RESULTS.BLOCKED) {
        await requestPushNotificationPermissionAndroid();
      } else {
        initPushNotification();
      }
    } else {
      const checkPermissionStatus = await checkPushNotificationPermissionIos();
      consoleLog("checkPermissionStatus Ios", checkPermissionStatus);
      if (checkPermissionStatus == PERMISSIONS_RESULTS.DENIED) {
        await requestPushNotificationPermissionIos();
      } else if (checkPermissionStatus == PERMISSIONS_RESULTS.BLOCKED) {
        await await requestPushNotificationPermissionIos();
      } else {
        initPushNotification();
      }
    }
  };

  const initPushNotification = async () => {
    await checkForIOS();

    // forground ( when app open ) in firebase notification
    unsubscribeonMessage = messaging().onMessage(async (remoteMessage: any) => {
      consoleLog("onMessage remoteMessage==>", remoteMessage);
      if (appState?.current == "active") {
        showNotification(remoteMessage);
      }
    });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp((remoteMessage) => {
      consoleLog("onNotificationOpenedApp remoteMessage==>", remoteMessage);
      handleNotificationRedirection(remoteMessage?.data);
    });

    // executes when application is in background state.
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      consoleLog("setBackgroundMessageHandler remoteMessage==>", remoteMessage);
      // checkForPlanExpireNotification(remoteMessage?.data);
    });

    // If your app is closed
    remoteInitialNotification = messaging()
      .getInitialNotification()
      .then((notificationOpen) => {
        consoleLog(
          "getInitialNotification notificationOpen==>",
          notificationOpen
        );

        if (notificationOpen) {
          handleNotificationRedirection(notificationOpen?.data, true);
        }
        // checkForPlanExpireNotification(notificationOpen?.data);
      });
  };

  const initToken = async () => {
    // const apnsToken = await messaging().getAPNSToken();
    // consoleLog("initToken apnsToken==>", apnsToken);

    getSetFCMToken();
    messaging().onTokenRefresh(async (firebase_token) => {
      consoleLog("initToken onTokenRefresh firebase_token==>", firebase_token);
      const __firebase_token = storage.getString(storageKeys.fcmToken);
      // const __firebase_token = await getItem("@FIREBASE_TOKEN");
      if (__firebase_token !== firebase_token) {
        getSetFCMToken(__firebase_token);
      }
    });
  };

  const showNotification = (remoteMessage: any) => {
    let { title, body } = remoteMessage?.notification;
    let { MODULE_NAME, TYPE, PARAMS } = remoteMessage?.data;

    var __PARAMS = {};
    if (typeof PARAMS === "string") {
      __PARAMS = JSON.parse(PARAMS);
    } else {
      __PARAMS = PARAMS;
    }

    consoleLog("showNotification Payload==>", {
      MODULE_NAME,
      __PARAMS,
      TYPE,
    });

    if (MODULE_NAME == "Ticket" && __PARAMS?.id && !alertPresent) {
      alertPresent = true;
      Alert.alert(title, body, [
        {
          text: "Close",
          onPress: () => {
            console.log("Close pressed");
            alertPresent = false;
          },
        },
        {
          text: "Open",
          onPress: () => {
            console.log("Open pressed");
            alertPresent = false;
            getTicketsDetails(__PARAMS?.id);
          },
        },
      ]);
    }
  };

  /**check config for iOS platform */
  const checkForIOS = async () => {
    if (Platform.OS == "ios") {
      // consoleLog(
      //   "messaging().isDeviceRegisteredForRemoteMessages",
      //   messaging().isDeviceRegisteredForRemoteMessages
      // );
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
      if (!messaging().setAutoInitEnabled) {
        await messaging().setAutoInitEnabled(true);
      }
      initToken();
    } else {
      initToken();
    }
  };

  /**gets the fcm token */
  const getSetFCMToken = async (firebase_token: string | null = "") => {
    try {
      if (!firebase_token) {
        firebase_token = await messaging().getToken();
      }
      consoleLog("getSetFCMToken firebase_token==>", firebase_token);

      if (firebase_token && accessToken && userId) {
        muteFcmToken(firebase_token);
        consoleLog("muteFcmToken firebase_token called");

        // Token save in local from muteFcmToken fun
        // setItem("@FIREBASE_TOKEN", firebase_token);
        // storage.set(storageKeys.fcmToken, firebase_token);
      }
    } catch (error) {
      consoleLog("getSetFCMToken Error==>", error);
    }
  };

  /**
   *
   * @param {*} notification
   * @param {*} isFromKilledApp
   * Handling notification tap and redireaction
   */
  const handleNotificationRedirection = (
    notification: any,
    isFromKilledApp: boolean = false
  ) => {
    if (notification) {
      let { MODULE_NAME, TYPE, PARAMS } = notification;

      var __PARAMS = {};
      if (typeof PARAMS === "string") {
        __PARAMS = JSON.parse(PARAMS);
      } else {
        __PARAMS = PARAMS;
      }

      consoleLog("handleNotificationRedirection Payload==>", {
        MODULE_NAME,
        TYPE,
        __PARAMS,
      });

      if (MODULE_NAME == "Ticket" && __PARAMS?.id) {
        if (isFromKilledApp) {
          setTimeout(() => {
            // navigate("SupportTicketDetail", { data: { id: __PARAMS?.id } });
            getTicketsDetails(__PARAMS?.id);
          }, 4000);
        } else {
          // navigate("SupportTicketDetail", { data: { id: __PARAMS?.id } });
          getTicketsDetails(__PARAMS?.id);
        }
      }
    }
  };

  /**
   *
   * @param {*} id
   * Get ticket detail and then redirect to ticket detail
   * page because that page usages some data from navigation params
   */
  const getTicketsDetails = (id: any) => {
    fetch(`${API.supportingTicket}?limit=100&status=active&id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        access_token: accessToken,
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        console.log("getTicketsDetails response==>", response);

        if (response?.data?.[0]) {
          navigate("SupportTicketDetail", {
            data: response?.data?.[0],
          });
        }
      })
      .catch((e) => {
        console.log("getTicketsDetails error==>", e);
      });
  };

  /**componet render method */
  return <View />;
};

export default PushNotification;

import React, { Component } from "react";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { color, font } from "../../Component/Styles";

type Props = {
  details: any;
  callback(): void;
  emailCallback(): void;
};

export default class DetailsCompany extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { details } = this.props;
    const { address = {} } = details;

    return (
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 30,
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
      >
        <TouchableOpacity
          disabled={!details.phone}
          onPress={() => (details.phone != null ? this.props.callback() : null)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/call.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              Phone
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.secondColor }}>
              {details?.phone || "-"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!details.email}
          onPress={() =>
            details.email != null ? this.props.emailCallback() : null
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/Emailprimeold.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              Email
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.secondColor }}>
              {details?.email || "-"}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/valuedollar.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              Value
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.fontcolor }}>
              ${details?.value + "" || "-"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/AccountBoxuser.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              Employee Size
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.fontcolor }}>
              {details?.employee_size || "-"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/arrowuser.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              Address
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.fontcolor }}>
              {address?.street_address || "-"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/arrowuser.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              City
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.fontcolor }}>
              {address?.city || "-"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/arrowuser.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              State
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.fontcolor }}>
              {address?.state || "-"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/arrowuser.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              ZIP
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.fontcolor }}>
              {address?.zip || "-"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/arrowuser.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              Country
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.fontcolor }}>
              {address?.country || "-"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          disabled={!details.website}
          onPress={() =>
            details.website ? Linking.openURL(details?.website) : null
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/workuser.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              Work Website
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.secondColor }}>
              {details?.website || "-"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!details.facebook_url}
          onPress={() =>
            details.facebook_url ? Linking.openURL(details?.facebook_url) : null
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/sharecompany.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              Facebook
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.secondColor }}>
              {details?.facebook_url || "-"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!details.twitter_url}
          onPress={() =>
            details.twitter_url ? Linking.openURL(details?.twitter_url) : null
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/sharecompany.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              Twitter
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.secondColor }}>
              {details?.twitter_url || "-"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!details.linkedin_url}
          onPress={() =>
            details.linkedin_url ? Linking.openURL(details?.linkedin_url) : null
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/sharecompany.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              LinkedIn
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.secondColor }}>
              {details?.linkedin_url || "-"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!details.instagram_url}
          onPress={() =>
            details.instagram_url
              ? Linking.openURL(details?.instagram_url)
              : null
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/sharecompany.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              Instagram
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.secondColor }}>
              {details?.instagram_url || "-"}
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/arrowuser.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />

          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              License Tota
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.fontcolor }}>
              {details?.orglicensetotal || "-"}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/arrowuser.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />

          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              SDR Owner
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.fontcolor }}>
              {details?.sdrowner?.name || "-"}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/arrowuser.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />

          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              Term
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.fontcolor }}>
              {details?.orgterm || "-"}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/arrowuser.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />

          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              Plan
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.fontcolor }}>
              {details?.orgplan || "-"}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/arrowuser.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />

          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              Discount
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.fontcolor }}>
              {details?.orgdiscount || "-"}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/arrowuser.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              Next Steps
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.fontcolor }}>
              {details?.nextsteps || "-"}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("assets/img/arrowuser.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: color.secondColor,
            }}
          />

          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontblack,
                marginBottom: 5,
              }}
            >
              Last Activity
            </Text>
            <Text style={{ fontFamily: font.semi, color: color.fontcolor }}>
              {details?.last_activity || "-"}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

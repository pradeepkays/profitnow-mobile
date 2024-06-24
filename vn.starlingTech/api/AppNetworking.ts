import {showAlertMessage} from '@starlingtech/util';
import axios, {AxiosRequestHeaders} from 'axios';
import {showMessage} from 'react-native-flash-message';

// import { sentryAddBreadcrumb } from '@vn.starlingTech/config/SentryConfig'
import {showSignOutMessage} from '@vn.starlingTech/helpers/messageHelper';

// import { getString } from '@vn.starlingTech/lang/language'
import {ENDPOINT_URI} from 'src/service/endpoint';

export type ErrorMessageType = 'flash' | 'alert' | 'manual';

let isShowingMessage = false;

interface ApiHeader extends AxiosRequestHeaders {
  'Content-Type': string;
  // 'Application-Authorization': string;/
  Accept: string;
}

interface ApiParams {
  url: string;
  params?: unknown;
  header?: ApiHeader;
  errorMessageType?: ErrorMessageType;
}

const defaultHeader: ApiHeader = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const initHeader = (token?: string) => {
  if (token) {
    axios.defaults.headers.common = {access_token: token};
  } else {
    axios.defaults.headers.common = {};
  }
};

const initApiParams = (props: ApiParams) => {
  const {
    url,
    params,
    header = defaultHeader,
    errorMessageType = 'manual',
  } = props;
  return {
    url: url.includes('http') ? url : getApiUrl(url),
    params,
    header,
    errorMessageType,
  };
};

export async function getFromServer(props: ApiParams) {
  const {
    url,
    params: getParams,
    header = defaultHeader,
    errorMessageType,
  } = initApiParams(props);
  let params = getParams;
  if (header['Content-Type'] === 'application/x-www-form-urlencoded') {
    params = JSON.stringify(params);
  }

  console.log('getFromServer params==>', {url, params});
  
  axios.defaults.headers.get = header;

  // sentryAddBreadcrumb({
  //   category: 'getFromServer',
  //   level: 'info',
  //   message: url,
  //   data: params ?? {},
  // })

  return await axios
    .get(url, {params})
    .then(({data}) => {
      return data;
    })
    .catch(error => {
      const _error = errorHandler(error, errorMessageType);
      throw new Error(JSON.stringify(_error));
    });
}

export async function postToServer(props: ApiParams) {
  const {
    url,
    params: postParams,
    header = defaultHeader,
    errorMessageType,
  } = initApiParams(props);
  let params = postParams;
  if (header['Content-Type'] === 'application/x-www-form-urlencoded') {
    params = JSON.stringify(params);
  }

  axios.defaults.headers.post = header;

  // sentryAddBreadcrumb({
  //   category: 'postToServer',
  //   level: 'info',
  //   message: url,
  //   data: params ?? {},
  // })

  return await axios
    .post(url, params)
    .then(({data}) => {
      return data;
    })
    .catch(error => {
      const _error = errorHandler(error, errorMessageType);
      throw new Error(JSON.stringify(_error));
    });
}

export async function patchToServer(props: ApiParams) {
  const {
    url,
    params: postParams,
    header = defaultHeader,
    errorMessageType,
  } = initApiParams(props);
  let params = postParams;
  if (header['Content-Type'] === 'application/x-www-form-urlencoded') {
    params = JSON.stringify(params);
  }

  axios.defaults.headers.post = header;

  // sentryAddBreadcrumb({
  //   category: 'postToServer',
  //   level: 'info',
  //   message: url,
  //   data: params ?? {},
  // })

  return await axios
    .patch(url, params)
    .then(({data}) => {
      return data;
    })
    .catch(error => {
      const _error = errorHandler(error, errorMessageType);
      throw new Error(JSON.stringify(_error));
    });
}

export const putToServer = async (props: ApiParams) => {
  const {
    url,
    params: putParams,
    header = defaultHeader,
    errorMessageType,
  } = initApiParams(props);

  let params = putParams;
  if (header) {
    axios.defaults.headers.put = header;
    if (header['Content-Type'] === 'application/x-www-form-urlencoded') {
      params = JSON.stringify(params);
    }
  }

  // sentryAddBreadcrumb({
  //   category: 'putToServer',
  //   level: 'info',
  //   message: url,
  //   data: params ?? {},
  // })

  return axios
    .put(url, params)
    .then(({data}) => {
      return data;
    })
    .catch(error => {
      const _error = errorHandler(error, errorMessageType);
      throw new Error(JSON.stringify(_error));
    });
};

function handleErrorMessage(
  errorMessageType: ErrorMessageType,
  message: string,
  status?: string,
) {
  const title = status ? 'Error: ' + status : 'something went wrong';
  if (errorMessageType === 'alert') {
    if (!isShowingMessage) {
      isShowingMessage = true;
      showAlertMessage({
        title,
        message,
        onPress: () => {
          setTimeout(() => {
            isShowingMessage = false;
          }, 3000);
        },
        cancelable: false,
      });
    }
  }
  if (errorMessageType === 'flash') {
    if (!isShowingMessage) {
      isShowingMessage = true;
      showMessage({
        message: title,
        description: message,
        type: 'danger',
        duration: 3000,
      });
      setTimeout(() => {
        isShowingMessage = false;
      }, 3500);
    }
  }
}

export const errorHandler = (
  error: any,
  errorMessageType: ErrorMessageType = 'manual',
) => {
  let _message = 'something went wrong';
  if (error?.status === 401 || error?.response?.status === 401) {
    const {message = _message} = error;
    showSignOutMessage();
    return {message};
  }
  if (error.response) {
    const status = error.response?.status;
    const {message = _message} = error.response?.data
      ? error.response.data
      : error;
    handleErrorMessage(errorMessageType, message, status);
    return {message, status};
  }
  handleErrorMessage(errorMessageType, _message);
  return {message: _message};
};

export const getApiUrl = (apiStr: string) => `${ENDPOINT_URI}${apiStr}`;

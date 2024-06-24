import Reactotron from 'reactotron-react-native'

function logThis(...str: any) {
  if (__DEV__) {
    Reactotron?.log?.(str)
  } else {
    console.log(' --------- --------------- -------------- ----------')
    console.log(...str)
    console.log(' --------- --------------- -------------- ----------')
  }
}

/**
 * custom console log
 * chi show log khi trang thai la DEBUG (=true)
 *
 * @memberof AppComponent
 */
export const consoleLog = (...str1: any) => {
  if (__DEV__) {
    logThis(...str1)
  }
}

import Reactotron, { asyncStorage } from 'reactotron-react-native'

Reactotron.configure({
  name: 'ProfitNow',
  // createSocket: (path) => new ReactotronFlipper(path),
}).useReactNative() // add all built-in react native plugins

Reactotron.use(asyncStorage({}))

if (__DEV__) {
  Reactotron.connect()
}

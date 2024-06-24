import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const screenWidth = width < height ? width : height
const screenHeight = width < height ? height : width
const windowScreenWidth = 375
const windowScreenHeight = 812

export const widthSize = (value: number) => {
  const re = (screenWidth * value) / windowScreenWidth
  return Math.round(re)
}

export const heightSize = (value: number) => {
  const re = (screenHeight * value) / windowScreenHeight
  return Math.round(re)
}

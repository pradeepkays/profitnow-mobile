import * as React from 'react'

import { Path, SvgProps } from 'react-native-svg'

import { CustomSvg } from '@vn.starlingTech/elements/CustomSvg'

function IconTodo(props: SvgProps) {
  return (
    <CustomSvg
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#2c3e50"
      fill="none"
      {...props}
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Path d="M7 12l5 5L22 7M2 12l5 5m5-5l5-5" />
    </CustomSvg>
  )
}

export default IconTodo

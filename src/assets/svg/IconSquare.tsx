import * as React from 'react'

import { Path } from 'react-native-svg'

import { CustomSvg } from '@vn.starlingTech/elements/CustomSvg'

function IconSquare(props: any) {
  return (
    <CustomSvg
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#2c3e50"
      fill="none"
      {...props}
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    </CustomSvg>
  )
}

export default IconSquare

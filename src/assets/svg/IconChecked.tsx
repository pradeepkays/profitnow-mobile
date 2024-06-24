import * as React from 'react'

import { Path, SvgProps } from 'react-native-svg'

import { CustomSvg } from '@vn.starlingTech/elements/CustomSvg'

function IconChecked(props: SvgProps) {
  return (
    <CustomSvg
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#2c3e50"
      fill="none"
      {...props}
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Path d="M9 11l3 3 8-8" />
      <Path d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h9" />
    </CustomSvg>
  )
}

export default IconChecked

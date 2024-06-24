import * as React from 'react'

import { Path, SvgProps } from 'react-native-svg'

import { CustomSvg } from '@vn.starlingTech/elements/CustomSvg'

function IconChevronRight(props: SvgProps) {
  return (
    <CustomSvg viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M8.297 16.59l4.58-4.59-4.58-4.59L9.707 6l6 6-6 6-1.41-1.41z"
        fill="#5A6480"
      />
    </CustomSvg>
  )
}

export default IconChevronRight

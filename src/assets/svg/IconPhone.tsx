import * as React from 'react'

import { Path, SvgProps } from 'react-native-svg'

import { CustomSvg } from '@vn.starlingTech/elements/CustomSvg'

const IconPhone = (props: SvgProps) => (
  <CustomSvg viewBox="0 0 25 25" fill="none" {...props}>
    <Path
      fill={props.color ?? '#5E8DF7'}
      d="M11.577 13.064c4.2 4.2 5.15-.66 7.82 2s4.06 3.09.8 6.36c-.41.33-3 4.28-12.15-4.85-9.15-9.13-5.18-11.72-4.85-12.13 3.27-3.28 3.78-1.79 6.36.79 2.58 2.58-2.18 3.63 2.02 7.83Z"
    />
  </CustomSvg>
)
export default IconPhone

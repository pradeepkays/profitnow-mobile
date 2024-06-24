import * as React from 'react'

import { Path, SvgProps } from 'react-native-svg'

import { CustomSvg } from '@vn.starlingTech/elements/CustomSvg'

const IconEmail = (props: SvgProps) => (
  <CustomSvg viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M13.3334 2.66699H2.66671C1.93337 2.66699 1.34004 3.26699 1.34004 4.00033L1.33337 12.0003C1.33337 12.7337 1.93337 13.3337 2.66671 13.3337H13.3334C14.0667 13.3337 14.6667 12.7337 14.6667 12.0003V4.00033C14.6667 3.26699 14.0667 2.66699 13.3334 2.66699ZM13.3334 5.33366L8.00004 8.66699L2.66671 5.33366V4.00033L8.00004 7.33366L13.3334 4.00033V5.33366Z"
      fill={props.color ?? '#5E8DF7'}
    />
  </CustomSvg>
)
export default IconEmail

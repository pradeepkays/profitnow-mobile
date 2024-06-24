import * as React from 'react'

import { Path, SvgProps } from 'react-native-svg'

import { CustomSvg } from '@vn.starlingTech/elements/CustomSvg'

const IconNote = (props: SvgProps) => (
  <CustomSvg viewBox="0 0 16 17" fill="none" {...props}>
    <Path
      d="M10.1238 3.34082H11.4266C12.1866 3.34082 12.8 3.95417 12.8 4.71417V13.2808C12.8 14.0408 12.1866 14.6542 11.4266 14.6542H4.57328C3.81328 14.6542 3.19995 14.0408 3.19995 13.2808V4.71417C3.19995 3.95417 3.81328 3.34082 4.57328 3.34082H5.94662"
      stroke={props.color ?? '#5E8DF7'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.37344 4.36761H6.63344C6.25344 4.36761 5.94678 4.06094 5.94678 3.68094V2.99428C5.94678 2.61428 6.25344 2.30762 6.63344 2.30762H9.37344C9.75344 2.30762 10.0601 2.61428 10.0601 2.99428V3.68094C10.0534 4.06094 9.74678 4.36761 9.37344 4.36761Z"
      stroke={props.color ?? '#5E8DF7'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.26001 6.42676H5.94668H5.26001Z"
      fill={props.color ?? '#5E8DF7'}
    />
    <Path
      d="M5.26001 6.42676H5.94668"
      stroke={props.color ?? '#5E8DF7'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.26001 9.16699H10.74"
      stroke={props.color ?? '#5E8DF7'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.26001 11.9072H10.74"
      stroke={props.color ?? '#5E8DF7'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </CustomSvg>
)
export default IconNote

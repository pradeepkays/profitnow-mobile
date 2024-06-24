import * as React from 'react'

import { Path, SvgProps } from 'react-native-svg'

import { CustomSvg } from '@vn.starlingTech/elements/CustomSvg'

const IconTask = (props: SvgProps) => (
  <CustomSvg viewBox="0 0 16 17" fill="none" {...props}>
    <Path
      d="M11.4266 14.9464H4.57328C3.81328 14.9464 3.19995 14.3331 3.19995 13.5731V3.97978C3.19995 3.21978 3.81328 2.60645 4.57328 2.60645H11.4266C12.1866 2.60645 12.8 3.21978 12.8 3.97978V13.5731C12.7933 14.3331 12.18 14.9464 11.4266 14.9464Z"
      stroke={props.color ?? '#5E8DF7'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.26001 5.38672H5.94668"
      stroke={props.color ?? '#5E8DF7'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M8 5.38672H10.74H8Z" fill={props.color ?? '#5E8DF7'} />
    <Path
      d="M8 5.38672H10.74"
      stroke={props.color ?? '#5E8DF7'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.26001 8.81348H5.94668"
      stroke={props.color ?? '#5E8DF7'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 8.81348H10.74"
      stroke={props.color ?? '#5E8DF7'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.26001 12.2402H5.94668"
      stroke={props.color ?? '#5E8DF7'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 12.2402H10.74"
      stroke={props.color ?? '#5E8DF7'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </CustomSvg>
)
export default IconTask

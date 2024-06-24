import * as React from 'react'

import Svg, { Path, SvgProps } from 'react-native-svg'

import { CustomSvg } from '@vn.starlingTech/elements/CustomSvg'

const IconCompany = (props: SvgProps) => (
  <CustomSvg viewBox="0 0 25 25" fill="none" {...props}>
    <Path
      d="M9.25791 11.09C10.9258 11.09 12.2779 9.73795 12.2779 8.07005C12.2779 6.40215 10.9258 5.05005 9.25791 5.05005C7.59001 5.05005 6.23792 6.40215 6.23792 8.07005C6.23792 9.73795 7.59001 11.09 9.25791 11.09Z"
      stroke={props.color ?? 'black'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.16791 19.45V17.73C3.16791 15.73 4.78791 14.11 6.78791 14.11H12.2079C14.2079 14.11 15.8279 15.73 15.8279 17.73V19.45"
      stroke={props.color ?? 'black'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.7979 11.95C18.035 11.95 19.0379 10.9471 19.0379 9.70997C19.0379 8.47285 18.035 7.46997 16.7979 7.46997C15.5608 7.46997 14.5579 8.47285 14.5579 9.70997C14.5579 10.9471 15.5608 11.95 16.7979 11.95Z"
      stroke={props.color ?? 'black'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.4379 14.1899H18.9779C20.4579 14.1899 21.6579 15.3899 21.6579 16.8699V18.1499"
      stroke={props.color ?? 'black'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </CustomSvg>
)
export default IconCompany

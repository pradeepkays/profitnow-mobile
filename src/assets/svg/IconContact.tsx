import * as React from 'react'

import { Path, SvgProps } from 'react-native-svg'

import { CustomSvg } from '@vn.starlingTech/elements/CustomSvg'

const IconContact = (props: SvgProps) => (
  <CustomSvg viewBox="0 0 25 25" fill="none" {...props}>
    <Path
      d="M12.1779 11.51C13.7961 11.51 15.1079 10.1982 15.1079 8.58002C15.1079 6.96183 13.7961 5.65002 12.1779 5.65002C10.5597 5.65002 9.24789 6.96183 9.24789 8.58002C9.24789 10.1982 10.5597 11.51 12.1779 11.51Z"
      stroke={props.color ?? 'black'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.2579 19.6501V17.9801C6.2579 16.0301 7.8379 14.4601 9.7779 14.4601H15.0479C16.9979 14.4601 18.5679 16.0401 18.5679 17.9801V19.6501"
      stroke={props.color ?? 'black'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </CustomSvg>
)
export default IconContact

import * as React from 'react'

import { Circle, Rect, SvgProps } from 'react-native-svg'

import { CustomSvg } from '@vn.starlingTech/elements/CustomSvg'
import { colorDefault } from '@vn.starlingTech/theme/theming'

interface Props extends SvgProps {
  active: boolean
}

const IconSwitch = (props: Props) => (
  <CustomSvg viewBox="0 0 34 18" fill="none" {...props}>
    <Rect
      width={34}
      height={18}
      rx={9}
      fill={props.active ? colorDefault.success : colorDefault.danger}
    />
    <Circle cx={props.active ? 25 : 9} cy={9} r={7} fill="white" />
  </CustomSvg>
)
export default IconSwitch

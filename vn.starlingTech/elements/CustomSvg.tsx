import React from 'react'

import { getDimension } from '@starlingtech/element'
import { Svg, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {
  children: React.ReactNode
}
export function CustomSvg(props: Props) {
  const viewBox = props?.viewBox!.split(' ')

  const pWidth = viewBox[2]
  const pHeight = viewBox[3]

  return (
    <Svg
      {...props}
      {...getDimension(Number(pWidth), Number(pHeight), props.width)}
    >
      {props.children}
    </Svg>
  )
}

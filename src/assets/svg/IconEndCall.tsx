import * as React from 'react'

import {
  Circle,
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  SvgProps,
} from 'react-native-svg'

import { CustomSvg } from '@vn.starlingTech/elements/CustomSvg'
const IconEndCall = (props: SvgProps) => (
  <CustomSvg viewBox="0 0 56 57" fill="none" {...props}>
    <Circle cx={28} cy={28.8745} r={28} fill="#E04347" />
    <G clipPath="url(#clip0_2336_5752)">
      <Path
        d="M18.6716 32.8578C19.6685 31.8256 20.8007 30.989 22.0024 30.3492C22.3868 30.1527 22.6273 29.7525 22.6196 29.3071L22.2387 26.3929C25.6652 25.112 29.9528 24.9546 33.5545 26.1459L33.3673 29.1277C33.3834 29.5812 33.6459 29.9644 34.0288 30.1558C35.2602 30.7448 36.4129 31.5498 37.4451 32.5466C37.8983 32.9843 38.6406 32.9713 39.0783 32.5181L41.8824 29.6144C42.32 29.1612 42.6454 28.4212 42.016 27.8134C34.2195 20.2845 21.476 20.5151 13.9552 28.3032C13.3798 28.899 13.6816 29.6446 14.1431 30.0903L17.0385 32.8863C17.4917 33.324 18.234 33.311 18.6716 32.8578Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2336_5752">
        <Rect
          width={28}
          height={28}
          fill="white"
          transform="translate(47.7958 28.5293) rotate(134)"
        />
      </ClipPath>
    </Defs>
  </CustomSvg>
)
export default IconEndCall

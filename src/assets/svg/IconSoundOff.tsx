import * as React from 'react'

import { Path, SvgProps } from 'react-native-svg'

import { CustomSvg } from '@vn.starlingTech/elements/CustomSvg'

function IconSoundOff(props: SvgProps) {
  return (
    <CustomSvg viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M21.012 22.087l-3.3-3.3c-.466.334-.97.621-1.512.863a9.13 9.13 0 01-1.688.563v-1.55a14.58 14.58 0 001.113-.388c.358-.142.696-.33 1.012-.563l-4.125-4.15v5.926l-5-5h-4v-6h3.9l-5.5-5.5 1.076-1.076 19.1 19.076-1.076 1.1zm-.9-5.8l-1.074-1.074c.333-.567.579-1.167.737-1.8a8.012 8.012 0 00.238-1.95c0-1.717-.5-3.255-1.5-4.613-1-1.358-2.334-2.22-4-2.588v-1.55c2.066.467 3.75 1.513 5.05 3.138 1.3 1.625 1.95 3.496 1.95 5.613 0 .85-.117 1.683-.35 2.5a8.83 8.83 0 01-1.05 2.325zm-3.35-3.35l-2.25-2.25v-3.25a4.151 4.151 0 011.838 1.65c.442.734.662 1.534.662 2.4a4.33 4.33 0 01-.25 1.45zm-4.25-4.25l-2.6-2.6 2.6-2.6v5.2zm-1.5 7.15v-3.75l-2.1-2.1h-3.9v3h3.15l2.85 2.85z"
        fill={props.color ?? '#2B447C'}
      />
    </CustomSvg>
  )
}

export default IconSoundOff

import React, { RefObject, useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'

import { AppBlock, appSize, AppText, AppTextInput } from '@starlingtech/element'
import FlashMessage from 'react-native-flash-message'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { colorDefault } from '@vn.starlingTech/theme/theming'

import { parseResponseError } from 'src/helper/responseHelper'
import { useNoteAdding } from 'src/service/contact/note'

type Props = {
  visible: boolean
  contactId: number
  refMessage: RefObject<FlashMessage>
}

export function CallingNote({ visible, contactId, refMessage }: Props) {
  const animValue = useSharedValue(0)

  const [content, setContent] = useState('')

  const { mutate: saveNote, isLoading } = useNoteAdding()

  const onSave = () => {
    if (contactId) {
      saveNote(
        { id: contactId, text: content },
        {
          onSuccess: () => {
            refMessage.current?.showMessage({
              message: 'Save note successfully',
              type: 'success',
            })
            setContent('')
          },
          onError: (error: any) => {
            const { message } = parseResponseError(error)
            refMessage.current?.showMessage({
              message: message || 'Something went wrong',
              type: 'danger',
            })
          },
        },
      )
    }
  }

  useEffect(() => {
    animValue.value = withTiming(visible ? 1 : 0, { duration: 300 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  const animStyle = useAnimatedStyle(() => {
    return {
      marginVertical: interpolate(animValue.value, [0, 1], [0, 26]),
      height: interpolate(animValue.value, [0, 1], [0, 200]),
      opacity: interpolate(animValue.value, [0, 0.75, 1], [0, 0, 1]),
    }
  })

  return (
    <>
      <Animated.View style={[styles.container, animStyle]}>
        <AppBlock width={250} height={120}>
          <AppTextInput
            value={content}
            onChangeText={setContent}
            inputTextStyle={styles.input}
            multiline
          />
        </AppBlock>
        <TouchableOpacity
          disabled={!content}
          style={styles.save}
          onPress={onSave}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <AppText
              color={isLoading || !content ? 'icon' : 'primary'}
              size={14}
              textAlign="center"
            >
              Save Note
            </AppText>
          )}
        </TouchableOpacity>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  input: {
    borderColor: colorDefault.border,
    fontSize: appSize(12),
    minHeight: appSize(100),
    paddingTop: appSize(9),
  },
  save: {
    alignSelf: 'flex-end',
  },
})

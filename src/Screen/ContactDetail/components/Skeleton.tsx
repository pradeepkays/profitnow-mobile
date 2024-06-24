import React from 'react'
import { Dimensions, View } from 'react-native'

import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const { width } = Dimensions.get('window')

export function ContactDetailSkeleton() {
  return (
    <SkeletonPlaceholder>
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ height: 65, width: 65, borderRadius: 65 }} />
          <View
            style={{
              paddingLeft: 18,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                height: 20,
                width: width / 1.5,
                borderRadius: 2.5,
              }}
            />
            <View
              style={{
                height: 20,
                width: width / 1.5,
                borderRadius: 2.5,
                marginTop: 5,
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 8,
              marginLeft: 0,
            }}
          />
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 8,
              marginLeft: 25,
            }}
          />
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 8,
              marginLeft: 25,
            }}
          />
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 8,
              marginLeft: 25,
            }}
          />
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 8,
              marginLeft: 25,
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View
            style={{
              height: 45,
              width: width / 2.5,
              borderRadius: 8,
              marginLeft: 0,
            }}
          />
          <View
            style={{
              height: 45,
              width: width / 2.5,
              borderRadius: 8,
              marginLeft: 25,
            }}
          />
        </View>
        <View style={{ height: 80, borderRadius: 2.5, marginTop: 15 }} />
        <View style={{ height: 160, borderRadius: 2.5, marginTop: 15 }} />
        <View style={{ height: 160, borderRadius: 2.5, marginTop: 15 }} />
      </View>
    </SkeletonPlaceholder>
  )
}

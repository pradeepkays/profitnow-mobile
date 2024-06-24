import React from 'react'
import { Dimensions, View } from 'react-native'

import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const { width } = Dimensions.get('window')

export function ActivitySkeleton() {
  return (
    <SkeletonPlaceholder>
      <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
        <View style={{ height: 50, width: 50, borderRadius: 50 }} />
        <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
          <View
            style={{
              height: 20,
              width: width / 2,
              marginTop: 3,
              borderRadius: 2.5,
            }}
          />
          <View
            style={{
              height: 20,
              width: width / 2.5,
              marginTop: 2,
              borderRadius: 2.5,
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
        <View style={{ height: 50, width: 50, borderRadius: 50 }} />
        <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
          <View
            style={{
              height: 20,
              width: width / 2,
              marginTop: 3,
              borderRadius: 2.5,
            }}
          />
          <View
            style={{
              height: 20,
              width: width / 2.5,
              marginTop: 2,
              borderRadius: 2.5,
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
        <View style={{ height: 50, width: 50, borderRadius: 50 }} />
        <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
          <View
            style={{
              height: 20,
              width: width / 2,
              marginTop: 3,
              borderRadius: 2.5,
            }}
          />
          <View
            style={{
              height: 20,
              width: width / 2.5,
              marginTop: 2,
              borderRadius: 2.5,
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
        <View style={{ height: 50, width: 50, borderRadius: 50 }} />
        <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
          <View
            style={{
              height: 20,
              width: width / 2,
              marginTop: 3,
              borderRadius: 2.5,
            }}
          />
          <View
            style={{
              height: 20,
              width: width / 2.5,
              marginTop: 2,
              borderRadius: 2.5,
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
        <View style={{ height: 50, width: 50, borderRadius: 50 }} />
        <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
          <View
            style={{
              height: 20,
              width: width / 2,
              marginTop: 3,
              borderRadius: 2.5,
            }}
          />
          <View
            style={{
              height: 20,
              width: width / 2.5,
              marginTop: 2,
              borderRadius: 2.5,
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
        <View style={{ height: 50, width: 50, borderRadius: 50 }} />
        <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
          <View
            style={{
              height: 20,
              width: width / 2,
              marginTop: 3,
              borderRadius: 2.5,
            }}
          />
          <View
            style={{
              height: 20,
              width: width / 2.5,
              marginTop: 2,
              borderRadius: 2.5,
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
        <View style={{ height: 50, width: 50, borderRadius: 50 }} />
        <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
          <View
            style={{
              height: 20,
              width: width / 2,
              marginTop: 3,
              borderRadius: 2.5,
            }}
          />
          <View
            style={{
              height: 20,
              width: width / 2.5,
              marginTop: 2,
              borderRadius: 2.5,
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
        <View style={{ height: 50, width: 50, borderRadius: 50 }} />
        <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
          <View
            style={{
              height: 20,
              width: width / 2,
              marginTop: 3,
              borderRadius: 2.5,
            }}
          />
          <View
            style={{
              height: 20,
              width: width / 2.5,
              marginTop: 2,
              borderRadius: 2.5,
            }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  )
}

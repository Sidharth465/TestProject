import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LogoHeader from '@/src/library/components/Header'

const Cart = () => {
  return (
    <SafeAreaView>
      <LogoHeader title='Shopping' />
    </SafeAreaView>
  )
}

export default Cart
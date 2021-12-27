import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NOTFOUND} from '../../../../assets';
import {Image, SafeAreaView} from 'react-native';
import {View, StyleSheet, Text} from 'react-native';
export const Notfound = (props: any) => {
  return (
    <SafeAreaView style={{flexDirection: 'column'}}>
      <View
        style={{
          height: hp(36),
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Image source={NOTFOUND} style={{width: wp(20), height: wp(20)}} />
        </View>
        <View>
          <Text
            style={{
              color: '#cccccc',
              fontSize: 30,
              textAlign: 'center',
              fontWeight: '700',
            }}>
            Nhập số chứng từ hoặc quét QR | Barcode
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

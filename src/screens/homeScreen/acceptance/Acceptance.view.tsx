import { BackgroundDetailScreen } from '../../../components/backgroundScreen/backgroundDetailScreen/BackgroundDetailScreen.view';
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
//import CodePush from 'react-native-code-push';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { mainColors, Fonts } from '../../../constants';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AcceptanceReceived from './AcceptanceReceived.view'
import AcceptanceReceivedNotStockOut from './AcceptanceReceivedNotStockOut'
import AcceptanceSaleInvoiceOtherReceive from './AcceptanceSaleInvoiceOtherReceive'
const Tab = createMaterialTopTabNavigator();
const Acceptance = (props: any) => {
  const transportion = (name) => {
    props.navigation.navigate(name);
  }
  return (
    <BackgroundDetailScreen title="2. Đã nhận" navigation={props.navigation}>
      <View style={styles.container}>
        {/* Tabview */}
        <Tab.Navigator
          screenOptions={{

            tabBarLabelStyle: { fontSize: wp(3.5), fontWeight: 'bold' },
            tabBarActiveTintColor: 'red',
            tabBarPressColor: mainColors.greenscolor,
            tabBarInactiveTintColor: 'black',
            tabBarStyle: { backgroundColor: 'white', borderColor: 'white', borderWidth: 2 },
            swipeEnabled:false
          }}
        >
          <Tab.Screen 
        
          name="Đã Xuất Hàng" component={AcceptanceReceived} />
          <Tab.Screen
        
        name="Nhận phiếu người khác" component={AcceptanceSaleInvoiceOtherReceive} />
          <Tab.Screen
        
          name="Chưa Xuất Hàng" component={AcceptanceReceivedNotStockOut} />
        </Tab.Navigator>
      </View>
    </BackgroundDetailScreen>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp(8),
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 8,
  },
  tabview: {
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
});
export default Acceptance;

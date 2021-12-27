import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, FlatList } from 'react-native';
import Ripple from 'react-native-material-ripple';
//import CodePush from 'react-native-code-push';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import WaitingPrinted from './WaitingPrinted.view';
import WaitingUnprinted from './WaitingUnprinted.view';

import { BackgroundDetailScreen } from '../../../components/backgroundScreen/backgroundDetailScreen/BackgroundDetailScreen.view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TextInput, Button, Card, Searchbar, IconButton } from 'react-native-paper';
import { BarCode, Box, Search, LOGOUTICON, Receiver } from '../../../assets/index';
import { Fonts, mainColors } from '../../../constants/index';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import { ItemsCustom } from '../../../components/items/ItemCustom';
import { IconCustom } from '../../../components/iconsCustom/IconCustom';
import { ModalBottomCustom } from '../../../components/modal/ModalBottomCustom';

const Tab = createMaterialTopTabNavigator();
const Waiting = (props: any) => {
  return (
    <BackgroundDetailScreen title="1. Chờ nhận" navigation={props.navigation}>
      <View style={styles.container}>
        {/* Tabview */}
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: wp(3.5), fontWeight: 'bold' },
            tabBarActiveTintColor: 'red',
            tabBarPressColor: mainColors.greenscolor,
            tabBarInactiveTintColor: 'black',
            tabBarStyle: { backgroundColor: 'white' },
            swipeEnabled:false
          }}
        >
          <Tab.Screen name="Đã IN" component={WaitingPrinted} />
          <Tab.Screen name="Chưa In" component={WaitingUnprinted} />
        </Tab.Navigator>
      </View>
    </BackgroundDetailScreen>
  );
};
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
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  headertabview: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    height: hp(10),
    backgroundColor: mainColors.greenscolor,
    justifyContent: 'space-between',
  },
  headertabview_iconsearch: {
    paddingLeft: 5,
    paddingRight: 5,
    height: hp(8),
    width: wp(35),
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default Waiting;

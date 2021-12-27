import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image,StyleSheet } from 'react-native';
import Map from '../screens/map/Map.view';
import Setting from '../screens/setting/Setting.view';
import HomeStack from '../screens/homeScreen/HomeStack';
import SettingStack from '../screens/setting/SettingStack';
import { bankcards, SETTINGICON, MAPICON, delivery } from '../assets';
import MapStack from '../screens/map/MapStack';
import CreditorStack from '../screens/creditor/creditorScreen/CreditorStack';

//for tabbar

const Tab = createBottomTabNavigator();

export const BottomTab = (props: any)=> {
  // const myIcon = ;

  return (
    <Tab.Navigator
    initialRouteName='Giao hàng'
    screenOptions={{headerShown: false}}
    >
      <Tab.Screen
        name='Bản đồ'
        component={MapStack}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={MAPICON}
              style={[styles.tabbarIcon, {tintColor: color}]}
            />
          ),
        }}
      />

      <Tab.Screen
        name={'Giao hàng'}
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={delivery}
              style={[styles.tabbarIcon, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Thu nợ'}
        component={CreditorStack}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={bankcards}
              style={[styles.tabbarIcon, {tintColor: color}]}
            />
          ),
        }}
      />

      <Tab.Screen
        name={'Cài đặt'}
        component={SettingStack}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={SETTINGICON}
              style={[styles.tabbarIcon, {tintColor: color}]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tabbarIcon: {
    width: 26,
    height: 26,
  },
});
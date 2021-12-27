import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from '../camera/CameraScreen.view';
import CameraScreenDetail from '../camera/CameraScreenToDetail.view';
import SearchProduct from '../homeScreen/waiting/DialogSearchProduct';
import Setting from './Setting.view';
import TermOfUse from './TermsOfUse';

const HomeSN = createStackNavigator();

const HomeStack = (props: any) => {
  return (
    <HomeSN.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <HomeSN.Group>
        <HomeSN.Screen name="Home" component={Setting} />
      </HomeSN.Group>
      <HomeSN.Group>
        <HomeSN.Screen name="TermOfUse" component={TermOfUse} />
      </HomeSN.Group>
    </HomeSN.Navigator>

  );
};

export default HomeStack;

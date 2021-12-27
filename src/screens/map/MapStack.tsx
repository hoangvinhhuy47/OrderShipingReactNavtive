import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from '../camera/CameraScreen.view';
import CameraScreenDetail from '../camera/CameraScreenToDetail.view';
import SearchProduct from '../homeScreen/waiting/DialogSearchProduct';
import DetailEnvoice from '../homeScreen/detailEnvoice/DetailEnvoice';
import Map from './Map.view';

const HomeSN = createStackNavigator();

const MapStack = (props: any) => {
    return (
        <HomeSN.Navigator
            initialRouteName="Map"
            screenOptions={{ headerShown: false }}>
            <HomeSN.Group>
                <HomeSN.Screen name="Map" component={Map} />
            </HomeSN.Group>
            <HomeSN.Group>
                <HomeSN.Screen name="DetailEnvoice" component={DetailEnvoice} />
            </HomeSN.Group>
        </HomeSN.Navigator>

    );
};

export default MapStack;

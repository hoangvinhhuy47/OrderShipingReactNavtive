import { BackgroundBigScreen } from '../../../src/components/backgroundScreen/backgroundBigScreen/BackgroundBigScreen.view';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  ToastAndroid,
  Modal,
  Picker,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import React, { useState, useEffect } from 'react';
import { BarCode, Box, Search, LOGOUTICON, Receiver, Cancel } from '../../assets/index';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextInput } from 'react-native-paper';
import { Fonts, mainColors } from '../../constants';
import GoogleMapReact from 'google-map-react';
// import MapView, { PROVIDER_GOOGLE, Marker, Overlay, Polyline, Polygon } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import { Linking, Alert, Platform } from 'react-native';
import { DialogViewMap } from '../../components/modal/DialogViewMap';
import MapViewDirections from 'react-native-maps-directions';
import { getDataMap } from './GetDataMap';
import lodash from 'lodash';
// import MapGL from '@goongmaps/goong-map-react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
// MapboxGL.setAccessToken(
//   'pk.eyJ1IjoibGlua2NvZGUiLCJhIjoiY2t2ODNlZW9wOXB4NTJwbWEzc3Y3dTJhaCJ9.dJJK58pm4gV_BvVq5zNOsg'
// );
const GOONG_MAPTILES_KEY = 'TvjmdQUVouXa44g2U7m5K7951ORmpgI2B8Dx2Y3e';
const Map = (props: any) => {
  const [LocationX, setLocationX] = useState(0);
  const [LocationY, setLocationY] = useState(0);
  const [LocationZ, setLocationZ] = useState(0);
  const [LocationV, setLocationV] = useState(0);
  const [VisbleDialog1, setVisbleDialog1] = useState(false);
  const toggleModalVisibility1 = () => setVisbleDialog1(false);
  const [Height, setHeight] = useState(hp(18));
  const origin = { latitude: 10.784153, longitude: 106.681515 };
  const destination = { latitude: 10.811521, longitude: 106.6301899 };
  const { data, onPressGet } = getDataMap(props);
  const [Index, setIndex] = useState(0);
  // const options = { closeBoxURL: '', enableEventPropagation: true };
  // useEffect(() => {
  //   // GetLocation.getCurrentPosition({
  //   //   enableHighAccuracy: true,
  //   //   timeout: 1000,
  //   // })
  //   //   .then((location) => {
  //   //     setLocationX(location.latitude);
  //   //     setLocationY(location.longitude);

  //   //   })
  //   //   .catch((error) => {
  //   //     const { code, message } = error;
  //   //     setLocationX(10.8115462);
  //   //     setLocationY(106.6302079);
  //   //   });

  //   // props.navigation.addListener('focus', () => {
  //   //   getData()

  //   // });
  //   return () => { };
  // }, []);
  // const [viewport, setViewport] = useState({
  //   width: 400,
  //   height: 400,
  //   latitude: 37.7577,
  //   longitude: -122.4376,
  //   zoom: 8
  // });
  const getData = async () => {
    await onPressGet();
  };
  const sendToDetail = () => {
    props.navigation.push('DetailEnvoice', {
      IDOrder: lodash.isEmpty(data) ? '' : data[Index].SaleInvoiceID,
      TypeAPI: '5'
    });
    setVisbleDialog1(false)
  }


  const viewDataBottom = () => {

    return (
      <View
        style={{
          backgroundColor: 'white',
          height: Height,
          width: '100%',
          position: 'absolute',
          borderColor: 'black',
          bottom: 0,
          borderWidth: 1,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Height == hp(18) ? setHeight(hp(50)) : setHeight(hp(18));
          }}
          style={{
            height: hp(2.2),
            width: wp(20),
            backgroundColor: mainColors.blackColor,
            borderBottomEndRadius: 35,
            borderBottomStartRadius: 35,
          }}
        ></TouchableOpacity>
        <View
          style={{
            height: hp(5),
            width: '100%',
            alignItems: 'center',
            borderBottomWidth: 2,
            borderBottomColor: mainColors.greenscolor,
          }}
        >
          <Text
            style={{
              fontSize: hp(2.5),
              fontFamily: Fonts.Roboto_Stab_Bold,
              color: mainColors.greenscolor,
            }}
          >
            Danh Sách Đơn Hàng
          </Text>
        </View>
        <View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ height: hp(8), width: '100%' }}
                onPress={() => {

                  setIndex(index)
                  setVisbleDialog1(true)

                }}  >
                <View
                  style={[{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: hp(3.5),
                    paddingRight: hp(10.5),
                  }, , index % 2 != 0 ? { backgroundColor: '#ddd' } : { backgroundColor: '#fff' }]}
                >
                  <Text
                    style={{
                      fontSize: hp(2),
                      fontFamily: Fonts.Roboto_Slab_Regular,
                      textDecorationLine: 'underline',
                    }}
                  >
                    {index + 1 + '.' + ' ' + item.Code}
                  </Text>
                  <Text
                    style={{
                      fontSize: hp(2),
                      fontFamily: Fonts.Roboto_Slab_Regular,
                      fontStyle: 'italic',
                    }}
                  >
                    KH: {item.CustomerName}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          >

          </FlatList>
        </View>
      </View>
    );
  };

  return (
    <View>
      {lodash.isEmpty(data) ? <View>
       
        <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: 10.784153,
              longitude: 106.681515,
              latitudeDelta: 0.09,
              longitudeDelta: 0.035,

            }}
            rotateEnabled={true}
            showsPointsOfInterest={true}
            loadingEnabled={true}
            showsUserLocation={true}
            provider={Platform.select({
              android: (PROVIDER_GOOGLE)
            })}
          // customMapStyle={mapStyle}
          >
            {/* 
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={'AIzaSyA_Xi9DVRafgQgt30v19rrmB49EUmadC1U'}
              strokeWidth={2}
              strokeColor={mainColors.blackColor}
            /> */}
          </MapView>
      </View> :
        <View>
          {/* <View style={{ flex: 1, height: "100%", width: "100%" }}>
            <MapGL
              {...viewport}
              width="100%"
              height="100%"
              mapStyle="https://tiles.goong.io/assets/goong_map_dark.json"
              onViewportChange={setViewport}
              goongApiAccessToken={GOONG_MAPTILES_KEY}
            />
          </View> */}

          <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: 10.784153,
              longitude: 106.681515,
              latitudeDelta: 0.09,
              longitudeDelta: 0.035,

            }}
            rotateEnabled={true}
            showsPointsOfInterest={true}
            loadingEnabled={true}
            showsUserLocation={true}
            provider={Platform.select({
              android: (PROVIDER_GOOGLE)
            })}
          // customMapStyle={mapStyle}
          >
            {/* 
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={'AIzaSyA_Xi9DVRafgQgt30v19rrmB49EUmadC1U'}
              strokeWidth={2}
              strokeColor={mainColors.blackColor}
            /> */}


            {data.map((item, index) => {
              return (
                <Marker
                  //  pinColor={item.status == false ? mainColors.greenscolor : mainColors.warningColor}
                  // style={{ backgroundColor: 'white' }}
                  draggable
                  coordinate={item.Latitue || item.Longitue != null ? {
                    latitude: item.Latitue,
                    longitude: item.Longitue,
                  } : { latitude: 37.8025259, longitude: -122.4324 }}
                  onDragEnd={
                    (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                  }
                  onPress={() => {
                    setIndex(index)
                    setVisbleDialog1(true)
                  }}
                  title={item.CustomerName}
                  description={item.SaleInvoiceID}
                />
              );
            })}
          </MapView>
          <Modal
            animationType='slide'
            transparent
            visible={VisbleDialog1}
            presentationStyle='formSheet'
            style={{ justifyContent: 'flex-end', margin: 0 }}
            onDismiss={toggleModalVisibility1}
          >
            <DialogViewMap
              onPressDetail={sendToDetail}
              props1={props}
              CustomerAdress={lodash.isEmpty(data) ? '' : data[Index].ShipAddress}
              CustomerName={lodash.isEmpty(data) ? '' : data[Index].CustomerName}
              CustomerNote={lodash.isEmpty(data) ? '' : data[Index].Notes}
              CustomerNumber={lodash.isEmpty(data) ? '' : data[Index].CustomerPhone}
              SaleInVoceID={lodash.isEmpty(data) ? '' : data[Index].SaleInvoiceID}
              onPressClose={() => setVisbleDialog1(false)}
            ></DialogViewMap>
          </Modal>
          {viewDataBottom()}
        </View>
      }
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapStyle: {
    backgroundColor: 'white',
    //  position: 'relative',
    // flex: 1,
    height: hp(100),
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default Map;

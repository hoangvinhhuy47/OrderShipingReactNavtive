import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  BackHandler,
  Alert,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { mainColors, Fonts } from '../../../constants';
import { BackgroundBigScreen } from '../../../components/backgroundScreen/backgroundBigScreen/BackgroundBigScreen.view';
import Ripple from 'react-native-material-ripple';
import { actionMain } from '../../../utils/mainActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  RECIEVEDICON,
  WAITINGINVOICEICONLIST,
  COMPLETEDTASK,
  FILE,
  exchanged,
} from '../../../assets';
const Creditor = (props: any) => {
  const transportion = (name) => {
    props.navigation.navigate(name);
  };
  return (
    <BackgroundBigScreen>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 5,
          paddingTop:hp(3)
        }}
      >
        <ScrollView>
          <View style={styles.groupButton}>
            <TouchableOpacity style={styles.buttonitem} onPress={() => transportion('WaitingCreditor')}>
              <View style={styles.VImageButton}>
                <View
                  style={[
                    styles.ImageViewButton,
                    Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                  ]}
                >
                  <Image style={styles.ImageButton} source={WAITINGINVOICEICONLIST} />
                </View>
              </View>
              <View style={styles.VtitleButton}>
                <Text style={styles.titleButton}>1. Chờ nhận</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonitem} onPress={() => transportion('HandleCreditor')}>
              <View style={styles.VImageButton}>
                <View
                  style={[
                    styles.ImageViewButton,
                    Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                  ]}
                >
                  <Image style={styles.ImageButton} source={exchanged} />
                </View>
              </View>
              <View style={styles.VtitleButton}>
                <Text style={styles.titleButton}>2. Xử lý</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.groupButton}>
            <TouchableOpacity style={styles.buttonitem} onPress={() => transportion('SubmissionCreditor')}>
              <View style={styles.VImageButton}>
                <View
                  style={[
                    styles.ImageViewButton,
                    Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                  ]}
                >
                  <Image style={styles.ImageButton} source={FILE} />
                </View>
              </View>
              <View style={styles.VtitleButton}>
                <Text style={styles.titleButton}>3. Nộp phiếu</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonitem} onPress={() => transportion('FinishCreditor')}>
              <View style={styles.VImageButton}>
                <View
                  style={[
                    styles.ImageViewButton,
                    Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                  ]}
                >
                  <Image style={styles.ImageButton} source={COMPLETEDTASK} />
                </View>
              </View>
              <View style={styles.VtitleButton}>
                <Text style={styles.titleButton}>4. Hoàn tất</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundBigScreen>
  );
};
const styles = StyleSheet.create({
  groupButton: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: hp(20),
  },
  buttonitem: {
    paddingTop: 5,
    height: '100%',
    width: wp(45),
    flexDirection: 'column',
  },
  VImageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  ImageViewButton: {
    paddingLeft: 3.5,
    width: 75,
    height: 75,
    backgroundColor: mainColors.buttoncolor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  shadowAndroid: {
    elevation: 5,
  },
  shadowIos: {
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.21,
    shadowRadius: 4,
  },
  ImageButton: {
    width: 45,
    height: 45,
  },
  VtitleButton: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleButton: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: wp(4.4),
    fontWeight: '600',
    color: mainColors.titleColor,
    fontFamily: Fonts.Roboto_Slab_Regular,
  },
});

export default Creditor;

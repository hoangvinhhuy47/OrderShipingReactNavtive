
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image ,Platform} from 'react-native';
//import CodePush from 'react-native-code-push';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SkypeIndicator } from 'react-native-indicators';
import { LOGO, SOFTWAREVIETLOGO } from '../assets';
import { mainColors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { BackgroundBig } from '../components/backgroundScreen/BackgroundBig';
import CodePush from 'react-native-code-push';
import { useDispatch, useSelector } from 'react-redux';
import { checkSecondLoginServices } from '../services/login';
import { actionMain } from '../utils/mainActions';
import lodash from 'lodash';

export const SplashScreen = (props: any) => {
  const [label, setLabel] = useState('');
  const [syncMessage, setSyncMessage] = useState('');
  const [codePushSuccess, setCodePushSuccess] = useState(false);
  const { isFinger, isCodePush, splashLoad, profileInfo, GuidID } = useSelector((state: any) => ({
    isCodePush: state.config.isCodePush,
    splashLoad: state.system.splashLoad,
    profileInfo: state.auth.profileInfo,
    GuidID: state.config.GuidID,
    isFinger: state.auth.isFinger,
  }));

  const dispatch = useDispatch();

  const loadingApp = () => {
    setCodePushSuccess(true);
  };
  const codePushStatusDidChange = (syncStatus: any) => {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        setSyncMessage('check update');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setSyncMessage('downloading package');
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        setSyncMessage('awaiting user action');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setSyncMessage('installing update');
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        setSyncMessage('update cancelled by user');
        loadingApp();
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        setSyncMessage('update installed and will be applied on restart');
        // a = setTimeout(() => {
        CodePush.restartApp();
        // }, 300);
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        setSyncMessage('an unknown error occurred');
        loadingApp();
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
      default:
        setSyncMessage('ɚ 0.9');
        loadingApp();
        break;
    }
  };
  useEffect(() => {
    if (isCodePush) {
      if(Platform.OS = 'ios'){
        CodePush.sync(
          {
            //deploymentKey:"t3PcS-tXBe8hBYdGn07t78fYT_LgPagHmA0-0"//android staging
            deploymentKey: 'gYCBc2XWNXgG4Gy8mvACQRrCn2luwhNhYe_gc', //ios STAGING
          },
          codePushStatusDidChange,
          null
        );
      }else if(Platform.OS = 'android'){
        CodePush.sync(
          {
            deploymentKey:"t3PcS-tXBe8hBYdGn07t78fYT_LgPagHmA0-0"//android staging
            // deploymentKey: 'gYCBc2XWNXgG4Gy8mvACQRrCn2luwhNhYe_gc', //ios STAGING
          },
          codePushStatusDidChange,
          null
        );
      }
    } else {
      dispatch({ type: 'SET_SPLASHLOAD', payload: false });
    }
  }, []);
  useEffect(() => {
    console.log({ codePushSuccess });
    if (codePushSuccess) {
      dispatch({ type: 'SET_SPLASHLOAD', payload: false });
    }
  }, [codePushSuccess]);

  useEffect(() => {
    if (!splashLoad) {
      const checkSecondLogin = async (profileInfo) => {
        console.log({profileInfo, GuidID, splashLoad, isCodePush})
        if (!lodash.isEmpty(profileInfo) && GuidID) {
          const result: any = await checkSecondLoginServices(
            profileInfo.UserName,
            profileInfo.PasswordEncode
          );
          if (result != null) {
            let data = result.data;
            if (data) {
              if (data.StatusID == 1) {
                if (isFinger == 4 || isFinger == 2) {
                  dispatch({ type: 'SIGN_OUT' });
                }
                else{
                  dispatch({ type: 'SIGN_IN_SECOND'});
                }
              } else {
                actionMain.showModalWarm({
                  status: true,
                  title: 'Đăng Nhập',
                  content: 'Phiên đăng nhập hết hạn',
                });
                dispatch({ type: 'SIGN_OUT' });
              }
              dispatch({ type: 'SET_SPLASH_LOAD_SECOND_LOGIN' });
            }
          } else {
            actionMain.showModalWarm({
              status: true,
              title: 'Lỗi',
              content: 'Vui Lòng Kiểm Tra Kết Nối Mạng',
            });
          }
          // }
        } else {
          dispatch({ type: 'SET_SPLASH_LOAD_SECOND_LOGIN' });
          return false;
        }
      };
      checkSecondLogin(profileInfo);
    }
  }, [splashLoad]);
  return (
    <BackgroundBig>
      <View style={styles.container}>
        <Image source={LOGO} resizeMode={'contain'} style={styles.logoMain} />
        <Image source={SOFTWAREVIETLOGO}></Image>
        <Text style={styles.nameApp}>ORDER SHIPPING</Text>
        <View style={{ height: hp('5'), paddingTop: hp('10') }}>
          <SkypeIndicator color={mainColors.buttonHandling} size={wp('10')} />
        </View>
      </View>
      <Text style={{ position: 'absolute', bottom: 2, right: 2 }}>{syncMessage}</Text>
    </BackgroundBig>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  logoMain: {
    width: wp('70'),
    height: wp('70'),
  },
  logoSoftwareviet: {
    width: wp('20'),
    height: wp('20'),
  },
  indicator: {
    height: wp('10'),
    backgroundColor: 'pink',
  },
  nameApp: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.titleColor,
    fontSize: wp('10'),
  },
  syncMess: {
    bottom: 5,
    right: 5,
    position: 'absolute',
    color: mainColors.blackColor,
    fontFamily: Fonts.Roboto_Slab_Regular,
  },
});
export default SplashScreen;

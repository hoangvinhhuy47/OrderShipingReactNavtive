import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Platform,
  Modal,
  BackHandler,
  Share,

} from 'react-native';
import { BackgroundBigScreen } from '../../components/backgroundScreen/backgroundBigScreen/BackgroundBigScreen.view';
import CodePush from 'react-native-code-push';
import Ripple from 'react-native-material-ripple';
import {
  LOGOUTICON,
  CAIDAT,
  ICONRIGHT,
  ICONFINGERPRINT,
  RULES,
  ICONSHARE,
} from '../../assets/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Switch } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import TouchID from 'react-native-touch-id';
import { mainColors } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { DialogErrorOkAndClose } from '../../components/modal/DialogErrorOkAndClose';
const Setting = (props: any) => {
  const [version, setVersion] = useState('Đang tải . . .');
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const dispatch = useDispatch();
  const [CheckDevice, SetCheckDevice] = useState(1);
  const [VisbleDialogError, setVisbleDialogError] = useState(false);
  const { isFinger, isCodePush } = useSelector((state: any) => ({
    isFinger: state.auth.isFinger,
    isCodePush: state.config.isCodePush,
  }));
  const onToggleSwitch = () => {
    if (CheckDevice == 2) {
      if (isSwitchOn == false) {
        setIsSwitchOn(true);
        dispatch({ type: 'SET_FINGER', payload: 3 });
        Toast.show({
          type: 'success',
          text1: 'Bật Tính Năng Quét Vân Tay',
        });
      } else {
        setIsSwitchOn(false);
        dispatch({ type: 'SET_FINGER', payload: 0 });
        Toast.show({
          type: 'error',
          text1: 'Tắt Tính Năng Quét Vân Tay',
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Điện Thoại Không Hỗ Trợ Vân Tay 👋',
      });
    }
  };
  useEffect(() => {
    CodePush.getUpdateMetadata().then((metadata) => {
      setVersion(metadata.appVersion + '.' + metadata.label.substring(1));
    });

  });
  const TermsOfUse_click = () => {
    props.navigation.navigate('TermOfUse')
  };
  const changeConfiguration = () => {
    setVisbleDialogError(true);
  };
 
  const optionalConfigObject = {
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
  };
  TouchID.isSupported(optionalConfigObject)
    .then((biometryType) => {
      // Success code IOS
      if (biometryType === 'FaceID') {
        // Toast.show({
        //   type: 'success',
        //   text1: 'Điện Thoại Hỗ Trợ FaceID 🙂',
        let a = 2;
        SetCheckDevice(a);

        // });
      } else if (biometryType === 'TouchID') {
        // Toast.show({
        //   type: 'success',
        //   text1: 'Điện Thoại Hỗ Trợ Vân Tay 👋',
        let a = 2;
        SetCheckDevice(a);
        // });
      } else if (biometryType === true) {
        // Toast.show({
        //   type: 'success',
        //   text1: 'Điện Thoại Hỗ Trợ Vân Tay 👋',
        let a = 2;
        SetCheckDevice(a);
        // });
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Điện Thoại Không Hỗ Trợ Vân Tay 👋',
        let a = 1;
        SetCheckDevice(a);
        // });
      }
    })
    .catch((error) => {
      // Toast.show({
      //   type: 'error',
      //   text1: 'Điện Thoại Không Hỗ Trợ Vân Tay 👋',
      let a = 1;
      SetCheckDevice(a);
      // });
    });

  useEffect(() => {
    if (isFinger != 3) {
      setIsSwitchOn(false);
    } else {
      setIsSwitchOn(true);
    }
    return () => {};
  }, []);
  const OkDialogError = () => {
    try {
      if(isFinger == 3){
        dispatch({ type: 'SET_FINGER', payload: 4 });
        setVisbleDialogError(false);
        dispatch({ type: 'CLEAR_CONFIG' });
        dispatch({ type: 'DELETE_USER' });
        dispatch({ type: 'SIGN_OUT' });
      }else{
        dispatch({ type: 'SET_FINGER', payload: 2 });
        setVisbleDialogError(false);
        dispatch({ type: 'CLEAR_CONFIG' });
        dispatch({ type: 'DELETE_USER' });
        dispatch({ type: 'SIGN_OUT' });
      }
    
    } catch (E) {
      BackHandler.exitApp();
    }
  };
  const closeDialogError = () => {
    setVisbleDialogError(false);
  };
  //share app
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: Platform.OS ==='ios'? 'url IOS' :
          'https://play.google.com/store/apps/details?id=com.ordershipping',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <BackgroundBigScreen>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}
      >
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={{ flex: 5, paddingTop: 10 }}>
              <Text style={{ fontSize: 19 }}>Tiện ích</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              >
                <Ripple
                  onPress={onShare}
                  style={[
                    styles.backgroudButton,
                    Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                  ]}
                >
                  <Image style={styles.ImageBT} source={ICONSHARE} />
                  <Text style={styles.textButton}>Share App</Text>
                  <Image style={styles.ImageBT2} source={ICONRIGHT} />
                </Ripple>
                <View
                  // onPress={CheckTouchID}
                  style={[
                    styles.backgroudButton,
                    Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                  ]}
                >
                  <Image style={styles.ImageBT} source={ICONFINGERPRINT} />
                  <Text style={styles.textButton}>Thiết lập vân tay</Text>
                  <View>
                    <Switch color={mainColors.greenscolor} value={isSwitchOn} onValueChange={onToggleSwitch} />
                  </View>
                  {/* <Image style={styles.ImageBT2} source={ICONRIGHT} /> */}
                </View>
                <Ripple
                  onPress={TermsOfUse_click}
                  style={[
                    styles.backgroudButton,
                    Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                  ]}
                >
                  <Image style={styles.ImageBT} source={RULES} />
                  <Text style={styles.textButton}>Điều khoản sử dụng</Text>
                  <Image style={styles.ImageBT2} source={ICONRIGHT} />
                </Ripple>
              </View>
            </View>
            <View style={{ flex: 6 }}>
              <Text style={{ fontSize: 19 }}>Cài đặt</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              >
                <TouchableOpacity
                  onPress={changeConfiguration}
                  style={[
                    styles.backgroudButton,
                    Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                  ]}
                >
                  <Image style={styles.ImageBT} source={CAIDAT} />
                  <Text style={styles.textButton}>Thay đổi cấu hình</Text>
                  <Image style={styles.ImageBT2} source={ICONRIGHT} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
        onLongPress={() => {
          if (isCodePush)
            Toast.show({ 
              type: 'success',
              text1: 'Bật chế độ phát hành (Turn off CodePush)',
            });
          else
          Toast.show({
            type: 'success',
            text1: 'Bật chế độ kiểm thử (Turn on CodePush)',
          });
          dispatch({ type: 'SET_CODEPUSH', payload: !isCodePush });
        }}
        delayLongPress={1500}
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            paddingBottom: 5,
          }}
        >
          <Text style={styles.txtversion}>Version: </Text>
          <Text style={styles.txtversion}>1.2.6</Text>
          <Toast position={'bottom'} visibilityTime={5} ref={(ref)  => Toast.setRef(ref)} />

        </TouchableOpacity>
        <Modal
          animationType='slide'
          transparent
          visible={VisbleDialogError}
          presentationStyle='formSheet'
          style={{ justifyContent: 'flex-end', margin: 0 }}
        >
          <DialogErrorOkAndClose
            onPressOK={() => {
              OkDialogError();
            }}
            onPressClose={() => closeDialogError()}
            title='Thông báo'
            content='Dữ liệu của bạn sẽ bị xóa! Bạn muốn tiếp tục?'
            colorHeader='#ff5757'
          ></DialogErrorOkAndClose>
        </Modal>
      </SafeAreaView>
    </BackgroundBigScreen>
  );
};
const styles = StyleSheet.create({
  txtversion: {
    color: 'gray',
    fontSize: 13,
    fontStyle: 'italic',
  },
  backgroudButton: {
    marginBottom: 10,
    height: 50,
    width: '95%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 4,
    paddingHorizontal: 25,
    marginVertical: 10,
  },
  shadowAndroid: {
    elevation: 5,
  },
  shadowIos: {
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.21,
    shadowRadius: 4,
  },
  ImageBT: {
    height: 30,
    width: 30,
  },
  ImageBT3: {
    height: 45,
    width: 35,
  },
  ImageBT2: {
    height: 20,
    width: 20,
  },
  textButton: {
    color: '#000',
    fontSize: 17,
  },
});
export default Setting;

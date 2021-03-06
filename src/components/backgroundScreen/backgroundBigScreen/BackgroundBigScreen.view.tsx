import React from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  ViewStyle,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import {BackgroundBig} from '../BackgroundBig';
import { useSelector, useDispatch } from 'react-redux'
import Ripple from 'react-native-material-ripple';
import {LOGOUTICON ,AVATAR} from '../../../assets';
import styles from './BackgroundBigScreen.style';
import { ModalBottomCustom } from '../../modal/ModalBottomCustom';
import { actionMain } from '../../../utils/mainActions';
interface BackgroundBigScreen {
  containerStyle?: ViewStyle;
  children?: any;
  navigation?: any;
}
export const BackgroundBigScreen = (props: BackgroundBigScreen) => {
  const {children, containerStyle, navigation} = props;
  const dispatch = useDispatch();
  const { isFinger, isCodePush } = useSelector((state: any) => ({
    isFinger: state.auth.isFinger,
    isCodePush: state.config.isCodePush,
  }));
  const goBack = () => {
    if(isFinger == 3){
      dispatch({ type: 'SET_FINGER', payload: 4 });
      dispatch({type: 'SIGN_OUT'});
    }else{
      dispatch({ type: 'SET_FINGER', payload: 2 });
      dispatch({type: 'SIGN_OUT'});
    }
  };
  const {profileInfo} = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,

  }));
  return (
    <BackgroundBig>
      <View style={styles.header}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
        <Image source={AVATAR} style={styles.iconAvatar} />
        <Text style={styles.menuText}>{profileInfo?.FullName??'Chưa đăng nhập'}</Text>
        </View>
        <TouchableOpacity style={styles.iconExit} onPress={goBack}>
          <Image source={LOGOUTICON} style={styles.iconExit} />
        </TouchableOpacity>
      </View>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
          {children}
      </SafeAreaView>
      <View></View>
    </BackgroundBig>
  );
};

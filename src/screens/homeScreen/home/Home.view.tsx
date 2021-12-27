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
} from 'react-native';
import { ButtonCustom } from '../../../components';
import { BackgroundBigScreen } from '../../../components/backgroundScreen/backgroundBigScreen/BackgroundBigScreen.view';
import styles from './Home.style';
import Ripple from 'react-native-material-ripple';
import { actionMain } from '../../../utils/mainActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  RECIEVEDICON,
  WAITINGINVOICEICONLIST,
  DELIVERYMAN,
  COMPLETEDTASK,
  FILE,
} from '../../../assets';
import { platform } from 'os';

const Home = (props: any) => {
  const transportion = (name) => {
    props.navigation.navigate(name);
  };
  const { isFinger, isCodePush } = useSelector((state: any) => ({
    isFinger: state.auth.isFinger,
    isCodePush: state.config.isCodePush,
  }));
  const dispatch = useDispatch();
  const [exitApp, setExitApp] = useState(false);
  const backAction = () => {
    Alert.alert(
      'Thoát ứng dụng',
      'Bạn muốn thoát khỏi ứng dụng?',
      [
        {
          text: 'Hủy',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      }
    );
    return true;
  };
  const checkDevice =  async () => {
    if (isFinger == 4) {
      dispatch({ type: 'SET_FINGER', payload: 3 });
    }
    if (isFinger == 2) {
      dispatch({ type: 'SET_FINGER', payload: 0 });
    }

    const ID = await props.route.params.IDOrder;

    // if(ID!=null){
    //   props.navigation.push('DetailEnvoice', {
    //     IDOrder: ID,
    //     TypeAPI: '5'
    //   });
    // }
   
  }
  useEffect(() => {
    checkDevice();
  }, []);
  return (
    <BackgroundBigScreen navigation={props.navigation}>
      <ScrollView>
        <View style={styles.groupButton}>
          <TouchableOpacity style={styles.buttonitem} onPress={() => transportion('Waiting')}>
            <View style={styles.VImageButton}>
              <View style={[
                styles.ImageViewButton,
                Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
              ]}>
                <Image style={styles.ImageButton} source={WAITINGINVOICEICONLIST} />
              </View>
            </View>
            <View style={styles.VtitleButton}>
              <Text style={styles.titleButton}>1. Chờ nhận</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonitem} onPress={() => transportion('Acceptance')}>
            <View style={styles.VImageButton}>
              <View
                style={[
                  styles.ImageViewButton,
                  Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                ]}
              >
                <Image style={styles.ImageButton} source={RECIEVEDICON} />
              </View>
            </View>
            <View style={styles.VtitleButton}>
              <Text style={styles.titleButton}>2. Đã nhận</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.groupButton}>
          <TouchableOpacity style={styles.buttonitem} onPress={() => transportion('Transportion')}>
            <View style={styles.VImageButton}>
              <View style={[
                styles.ImageViewButton,
                Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
              ]}>
                <Image style={styles.ImageButton} source={DELIVERYMAN} />
              </View>
            </View>
            <View style={styles.VtitleButton}>
              <Text style={styles.titleButton}>3. Vận chuyển</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonitem} onPress={() => transportion('Submission')}>
            <View style={styles.VImageButton}>
              <View style={[
                styles.ImageViewButton,
                Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
              ]}>
                <Image style={styles.ImageButton} source={FILE} />
              </View>
            </View>
            <View style={styles.VtitleButton}>
              <Text style={styles.titleButton}>4. Nộp phiếu</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.groupButton}>
          <TouchableOpacity style={styles.buttonitem} onPress={() => transportion('Finish')}>
            <View style={styles.VImageButton}>
              <View style={[
                styles.ImageViewButton,
                Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
              ]}>
                <Image style={styles.ImageButton} source={COMPLETEDTASK} />
              </View>
            </View>
            <View style={styles.VtitleButton}>
              <Text style={styles.titleButton}>5. Hoàn tất</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BackgroundBigScreen>
  );
};

export default Home;

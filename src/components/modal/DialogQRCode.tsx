import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  KeyboardAvoidingView,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';
import Ripple from 'react-native-material-ripple';

import RNQRGenerator from 'rn-qr-generator';
import Toast from 'react-native-toast-message';
import { actionMain } from '../../utils';

interface DialogQRCode {

    onPressClose: any;
    IDCode?: any

}

export const DialogQRCode = (props: DialogQRCode) => {
    const {onPressClose, IDCode} = props;

    const [imageUri, setImageUri] = useState(null);

    const create = () => {
        actionMain.loading(true, '')
        RNQRGenerator.generate({
            value: IDCode,
            height: hp(30),
            width: hp(30),
            base64: true,
            backgroundColor: 'white',
            color: 'black',
            correctionLevel: 'M',

        })
            .then((response) => {
           
                setImageUri({ uri: response.uri });
                actionMain.loading(false, '')
            })
            .catch((err) => {
                actionMain.loading(false, '')
                Toast.show({
                    type: 'error',
                    text1: 'Đơn Hàng Không Có Mã QRCode',
                })
            }

            );
    };
    useEffect(() => {
        create()
        return () => { };
    }, []);
    return (
        <KeyboardAvoidingView
            behavior='padding'
            enabled
            style={{
                height: hp(100),
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Ripple style={styles.containerBig} onPressIn={() => onPressClose()}>
                <View style={styles.containerBig}>
                    <View style={styles.container}>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: hp(8),
                                backgroundColor: mainColors.greenscolor,
                                width: '100%',
                                borderRadius: 5,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: wp(5),
                                    fontWeight: 'bold',
                                    margin: 10,
                                    textAlign: 'center',
                                    color: '#fff',
                                }}
                            >
                                QRCode Đơn Hàng Của Bạn
                            </Text>
                        </View>
                        <View style={styles.view_qrcode}>
                            <Image style={styles.image} source={imageUri} />
                        </View>
                    </View>
                </View>
            </Ripple>
            <Toast style={{ paddingBottom: hp(5) }} position={'bottom'} visibilityTime={5} ref={(ref) => Toast.setRef(ref)} />
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    containerBig: {
        alignItems: 'stretch',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
        height: hp(63),
        borderRadius: 5,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
    },
    view_qrcode: {
        height: hp(50),
        backgroundColor: 'white',
        width: wp(100),
        alignItems: 'center',
        justifyContent: 'center'

    },
    image: {
        backgroundColor: '#F3F3F3',
        height: hp(50),
        width: wp(100),
        borderWidth: StyleSheet.hairlineWidth,
        marginBottom: 16,
    },

});

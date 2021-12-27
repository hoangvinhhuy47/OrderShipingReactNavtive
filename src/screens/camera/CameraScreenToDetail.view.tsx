import { platform } from 'os';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  PermissionsAndroid,
  Text,
  Platform,
  Alert,
  ToastAndroid,
  Modal,
} from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit';
import Ripple from 'react-native-material-ripple';
import Sound from 'react-native-sound';
import { getSaleInvoiceBycode } from '../../screens/homeScreen/detailEnvoice/GetSaleInvoiceByCode';
import { getSaleInvoiceByCodeCreditor } from '../../screens/creditor/detailEnvoice/GetSaleInvoiceByCodeCreditor';
import { getSaleInvoiceNotPrintBycode } from '../../screens/homeScreen/detailEnvoice/GetSaleInvoiceNotPrintByCode';
import { DialogError } from '../../components/modal/DialogError';
import lodash from 'lodash';


const CameraScreenToDetailCustom = (props: any) => {
  let valueQR = '';
  const [qrvalue, setQrvalue] = useState('');
  const [onpenScanner, setonpenScanner] = useState<boolean>(false);
  const { type } = props.route.params;
  const [State, setState] = useState(1);

  const [VisbleDialogError, setVisbleDialogError] = useState(false);
  const { GetDataCode, dataSaleInvoiceCode, dataSaleInvoiceDetailCode, setdataSaleInvoiceCode } =
    getSaleInvoiceBycode(props);
    const { GetDataCodeCreditor, dataSaleInvoiceCodeCreditor, dataSaleInvoiceDetailCodeCreditor, setdataSaleInvoiceCodeCreditor } =
    getSaleInvoiceByCodeCreditor(props);
  const {
    GetDataCodeNotPrint,
    dataSaleInvoiceDetailNotPrintCode,
    dataSaleInvoiceNotPrintCode,
    setdataSaleInvoiceNotPrintCode,
  } = getSaleInvoiceNotPrintBycode(props);

  useEffect(() => {
    onOpneScanner();
  });



  const onBarcodeScan = async (barCode) => {
    if (State == 1) {
      if (valueQR !== '') {
        return;
      }
      Sound.setCategory('Playback');
      var whoosh = new Sound('bip.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        whoosh.setVolume(1);
        // Play the sound with an onEnd callback
        whoosh.play();
      });
      valueQR = barCode;
      if (type == 1) {
        if (State == 1) {
          let ID = barCode.nativeEvent.codeStringValue;
          setState(2);
          if (ID != '') {
            await GetDataCode(ID);
            if (lodash.isEmpty(dataSaleInvoiceDetailCode)) {
              setVisbleDialogError(true);
            } else {
              props.navigation.push('DetailEnvoice', {
                IDOrder: ID,
                TypeAPI: 'Code',
                data: dataSaleInvoiceCode,
                datadetail: dataSaleInvoiceDetailCode,
              });
            }

          }
        }
      } else if (type == 2) {
        setState(2);
        let ID = barCode.nativeEvent.codeStringValue;
        if (ID != '') {
          await GetDataCodeNotPrint(ID);
          if (lodash.isEmpty(dataSaleInvoiceDetailNotPrintCode)) {
            setVisbleDialogError(true);
          } else {
            props.navigation.push('DetailEnvoice', {
              IDOrder: ID,
              TypeAPI: 'CodeNotPrint',
              data: dataSaleInvoiceNotPrintCode,
              datadetail: dataSaleInvoiceDetailNotPrintCode,
            });
          }
        }
      }else if (type == 3) {
        setState(2);
        let ID = barCode.nativeEvent.codeStringValue;
        if (ID != '') {
          await GetDataCode(ID);
          if (lodash.isEmpty(dataSaleInvoiceDetailCode)) {
            setVisbleDialogError(true);
          } else {
            props.navigation.push('DetailAccptanceOther', {
              Data: dataSaleInvoiceCode,
            });
          }
        }
      }else if (type == 4) {
        setState(2);
        let ID = barCode.nativeEvent.codeStringValue;
        if (ID != '') {
          await GetDataCodeCreditor(ID);
          if (lodash.isEmpty(dataSaleInvoiceDetailCodeCreditor)) {
            setVisbleDialogError(true);
          } else {
            props.navigation.push('DetailEnvoiceCreditor', {
              Data: dataSaleInvoiceCodeCreditor,
            });
          }
        }
      }

      //    onScanSuccess(valueQR)
    }
  };
  const closeDialogError = () => {
    setVisbleDialogError(false);
    setState(1);
    valueQR = '';
  };
  useEffect(() => {
    props.navigation.addListener('focus', async () => {
      try {
        valueQR = '';
        setState(1);
      } catch (E) { }
    });
    return () => { };
  }, []);
  const backButton_clicked = () => {
    props.navigation.goBack();
  };
  const onOpneScanner = () => {
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: 'CameraExample App Camera Permission',
            message: 'CameraExample App needs access to your camera ',
          });
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setQrvalue('');
            setonpenScanner(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err' + err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      setonpenScanner(true);
    }
  };
  return (
    <View style={styles.container}>
      <CameraKitCameraScreen
        showFrame={true}
        scanBarcode={true}
        laserColor={'#5cb85c'}
        frameColor={'white'}
        colorForScannerFrame={'black'}
        onReadCode={onBarcodeScan} //optional
      />
      {Platform.OS === 'ios' ? (
        <View style={[styles.itemNote, { marginTop: 5 }]}>
          <Text style={{ color: '#000', fontSize: 16 }}>Đưa mã vào trung tâm màn hình</Text>
          <Ripple style={styles.ButtonDong1} onPress={backButton_clicked}>
            <Text style={{ color: '#000', fontSize: 16 }}>Đóng</Text>
          </Ripple>
        </View>
      ) : (
        <View style={styles.itemNote}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Đưa mã vào trung tâm màn hình</Text>
          <Ripple style={styles.ButtonDong} onPress={backButton_clicked}>
            <Text style={{ color: '#fff', fontSize: 16 }}>Đóng</Text>
          </Ripple>
        </View>
      )}
      <Modal
        animationType='slide'
        transparent
        visible={VisbleDialogError}
        presentationStyle='formSheet'
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <DialogError
          onPressClose={() => closeDialogError()}
          title='Thông báo'
          content='Phiếu giao hàng không tồn tại!'
          colorHeader='#ff5757'
        ></DialogError>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemNote: {
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonDong: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 3,
    marginTop: 35,
    marginBottom: 10,
  },
  ButtonDong1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 3,
    marginTop: 35,
    marginBottom: 10,
  },
});
export default CameraScreenToDetailCustom;

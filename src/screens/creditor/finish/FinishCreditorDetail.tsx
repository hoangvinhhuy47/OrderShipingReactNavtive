import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BackgroundDetailCellScreen } from '../../../components/backgroundScreen/backgroudDetailCellScreen/BackgroundDetailCellScreen.view';
import getDataByThing from '../../../utils/getDataByThing';
import { Fonts, mainColors } from '../../../constants';
import { GetDataFinishCreditorDetail } from './GetDataFinishCreditorDetail';
import { DeleteSubmitCreditor } from './DeleteSubmitCreditor';
import { ItemFinishDetail } from '../../../components/items/homeScreen/ItemFinishDetail';
import { actionMain } from '../../../utils';
const FinishDetail = (props: any) => {
  const { Data } = props.route.params;
  const { data, onPressSearch, setData } = GetDataFinishCreditorDetail(props);
  const { onPressDeleteSubmit, ErrorDescription } = DeleteSubmitCreditor(props);

  const getDataFinishDetail = async () => {
    await onPressSearch(Data.VoucherSubmitID);
  };
  const DeleteSubmit = async () => {
    if ((await onPressDeleteSubmit(Data.VoucherSubmitID)) == true) {
      props.navigation.navigate('FinishCreditor');
    } else {
      actionMain.loading(false, '');
      actionMain.showModalWarm({
        status: true,
        title: 'Thông báo',
        content: 'Xóa phiếu không thành công!',
      });
    }
  };
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      getDataFinishDetail();
    });
    return () => {};
  }, []);
  const goBack = () => {
    props.navigation.goBack()
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <BackgroundDetailCellScreen goBack = {() => goBack()} title='Chi Tiết Phiếu Hoàn Tất' navigation={props.navigation}>
          <ScrollView>
            <View style={styles.headerContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: wp(3.6),
                    fontFamily: Fonts.Roboto_Stab_Bold,
                  }}
                >
                  {getDataByThing.getDayMonthYearHourStringDetail(Data.CreatedDate)}
                </Text>
                <Text
                  style={{
                    fontSize: wp(3.6),
                    fontFamily: Fonts.Roboto_Stab_Bold,
                  }}
                >
                  {Data.ShipperName}
                </Text>
              </View>
              <View style={styles.viewMuti}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.Text, { marginRight: wp(1.5) }]}>Số phiếu:</Text>
                  <Text style={styles.Text}>{Data.TotalVoucher}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.Text, { marginRight: wp(1.5) }]}>Tổng tiền:</Text>
                  <Text style={styles.Text}>
                    {getDataByThing.getcurrency(Data.TotalPayAmount)} đ
                  </Text>
                </View>
              </View>
              <View style={styles.viewMuti}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.Text, { marginRight: wp(1.5) }]}>Tiền mặt:</Text>
                  <Text style={styles.Text}>
                    {getDataByThing.getcurrency(Data.PayCashAmount)} đ
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.Text, { marginRight: wp(1.5) }]}>Ngân hàng:</Text>
                  <Text style={styles.Text}>
                    {getDataByThing.getcurrency(Data.PayBankAmount)} đ
                  </Text>
                </View>
              </View>
              {Data.Status == 3 ? (
              <View style={{ flexDirection: 'row', marginTop: hp(0.5), width:'100%'}}>
                <Text style={[styles.Text, { color:'#000' }]}>Ghi chú: {Data.ReasonNotes}</Text>
              </View>
              ) : (
                <View />
              )}
              {Data.Notes ? (
                <View style={{ flexDirection: 'row', marginTop: hp(0.5), width:'100%'}}>
                  <Text style={[styles.Text, { color:'#ca0000' }]}>Ghi chú: {Data.Notes}</Text>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View style={styles.bodyContainer}>
              <FlatList
                style={{ backgroundColor: '#fff' }}
                data={data}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({ item, index }) => (
                  <ItemFinishDetail
                    customerCode={item.CustomerCode}
                    customerName={item.CustomerName}
                    depositAmount={getDataByThing.getcurrency(item.DepositAmount)}
                    accountingDate={getDataByThing.getDayMonthYearHourStringDetail(
                      item.AccountingDate
                    )}
                    colorItem={
                      index % 2 == 0 ? { backgroundColor: '#fff' } : { backgroundColor: '#dddddd' }
                    }
                    navigation={props.navigation}
                    codeOrder={index + 1 + '. ' + item.VoucherCode}
                    onPressItem={() => {}}
                  ></ItemFinishDetail>
                )}
              />
            </View>
          </ScrollView>
          <View
            style={[
              styles.bottomContainer,
              Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
            ]}
          >
            <TouchableOpacity
              disabled={Data.Status == 1 ? false : true}
              onPress={() => {
                DeleteSubmit();
              }}
              style={[
                styles.Button,
                Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                Data.Status == 1 ? {} : { opacity: 0.4 },
              ]}
            >
              <Text style={styles.textButton}>Xóa phiếu</Text>
            </TouchableOpacity>
          </View>
        </BackgroundDetailCellScreen>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default FinishDetail;
const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    backgroundColor: '#c7ecee',
    borderColor: mainColors.greenscolor,
    borderBottomWidth: 2,
    marginBottom: hp(0.5),
  },
  viewMuti: {
    marginTop: hp(0.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Text: {
    fontSize: wp(3.6),
    fontFamily: Fonts.Roboto_Slab_Regular,
  },
  bodyContainer: { flex: 1, backgroundColor: '#fff' },
  bottomContainer: {
    width: '98.3%',
    height: hp(7),
    backgroundColor: mainColors.greenscolor,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingEnd: wp(3),
    borderRadius: 5,
    marginHorizontal: wp(1),
  },
  Button: {
    width: wp(25),
    height: hp(5),
    backgroundColor: '#ca0000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontFamily: Fonts.Roboto_Stab_Bold,
    fontSize: wp(3.6),
    color: '#fff',
  },
  shadowAndroid: {
    elevation: 5,
  },
  shadowIos: {
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.21,
    shadowRadius: 4,
  },
});

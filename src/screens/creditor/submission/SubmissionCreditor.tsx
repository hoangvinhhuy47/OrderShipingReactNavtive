import React, { useState, useEffect, forwardRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  Modal,
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { BackgroundDetailCreditorScreen } from '../../../components/backgroundScreen/backgroudDetailCreditorScreen/BackgroundDetailCreditorScreen.view';
import { BarCode, Box, Search, LOGOUTICON, Receiver, FILES } from '../../../assets/index';
import { Fonts, mainColors } from '../../../constants/index';
import { HeaderSearchSubmission } from '../../../components/headerSearch/HeaderSearchSubmission';
import { ItemSubmisstionCreditor } from '../../../components/items/creditorSceen/ItemSubmisstionCreditor';
import { GetDataSubmissionCreditor } from './GetDataSubmissionCreditor';
import { applySaleInvoiceCreditorByID } from './ApplySaleInvoiceCreditorByID';
import lodash from 'lodash';
import Toast from 'react-native-toast-message';
import { VoucherSubmitDetail, SaleInvoiceDetailClient } from '../../../components/object/Order';
import { DialogSubmission } from '../../../components/modal/DialogSubmission';
import getDataByThing from '../../../utils/getDataByThing';

import { actionMain } from '../../../utils';
const SubmissionCreditor = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [Show, setShow] = useState(false);
  const [VisbleDialogSubmiss, setVisbleDialogSubmiss] = useState(false);
  const [chooseData, setchooseData] = useState(Array<VoucherSubmitDetail>());
  const [totalVoucher, setTotalVoucher] = useState(0);
  const [totalVoucherPay, setTotalVoucherPay] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [payCashAmount, setPayCashAmount] = useState(0);
  const [payBankAmount, setPayBankAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [notes, setNotes] = useState('')

  const {
    TotalRow,
    handleLoadMore,
    search,
    data,
    onPressSearch,
    setData,
    setsearchString,
    searchString,
    pageIndex,
    setPageIndex,
  } = GetDataSubmissionCreditor(props);
  const { onPressSubmiss } = applySaleInvoiceCreditorByID(props);
  const ReceiveSaleInvoiceByID = async (ID: string, Index: any) => {
    actionMain.loading(true, '');
    // if (await onPressSubmiss(ID)) {
    //   deleteData(Index);
    // } else {
    //   actionMain.loading(false, '');
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Thao Tác Không Thành Công',
    //   });
    // }
  };
  const onRefresh = () => {
    setShow(true);

    getdata();
  };
  const search123 = (value: any) => {
    if (value == '') {
      setsearchString('');
    } else {
      setsearchString(value);
    }
  };
  const onTextChange = (value: any) => {
    if (value == '') {
      setNotes('');
    } else {
      setNotes(value);
    }
  };
  const getdata = async () => {
    await onPressSearch();
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setchooseData([]);
      setData([]);
      getdata();
      setsearchString('');
    });
    return () => {};
  }, []);

  const onPressItem = (value: any) => {
    for (var i = 0; i < data.length; i++) {
      if (i == value) {
        if (data[i].Status == true) {
          data[i].Status = false;
          setData([...data]);
        } else {
          data[i].Status = true;
          setData([...data]);
        }
      } else {
        data[i].Status = false;
        setData([...data]);
      }
    }
  };
  const onPressChoose = (value: any) => {
    data[value].Checked = !data[value].Checked;
    setData([...data]);
  };
  const getDataSelection = () => {
    let totalVoucher = 0;
    let totalAmount = 0;
    let depositAmount = 0;
    let totalVoucherPay = 0;
    let payCashAmount = 0;
    let payBankAmount = 0;

    for (var i = 0; i < data.length; i++) {
      if (data[i].Checked == true) {
        totalVoucher += 1;
        totalAmount += data[i].TotalAmount;
        if(data[i].DepositAmount > 0)
        {
          totalVoucherPay += 1;
          depositAmount += data[i].DepositAmount;
          if(data[i].PaymentMethodID ==1)
            payCashAmount += data[i].DepositAmount;
          else
            payBankAmount += data[i].DepositAmount;
        }

        const oject = {
          DetailID: '00000000-0000-0000-0000-000000000000',
          VoucherSubmitID: '00000000-0000-0000-0000-000000000000',
          VoucherID: data[i].SaleInvoiceID,
          VoucherCode: data[i].Code,
          VoucherType: 12,
          SortOrder: 1,
        };
        chooseData.push(oject);
      }
    }
    //Set du lieu cho master
    setTotalVoucher(totalVoucher);
    setDepositAmount(depositAmount);
    setTotalAmount(totalAmount);
    setTotalVoucherPay(totalVoucherPay);
    setPayCashAmount(payCashAmount);
    setPayBankAmount(payBankAmount);
    //Set du lieu cho detail
    setchooseData(chooseData);
  };
  const onGetItemToDialog = async () => {
    
    getDataSelection();
    if (!lodash.isEmpty(chooseData)) {
      setVisbleDialogSubmiss(true);
    } else {
      actionMain.showModalWarm({
        status: true,
        title: 'Thông báo',
        content: 'Bạn hãy chọn phiếu cần nộp!',
      });     
    }
  };
  const AcpectSubmission = async () => {
    setchooseData([]);
    let VoucherSubmit = {
      VoucherSubmitID: '00000000-0000-0000-0000-000000000000',
      CreateBy: profileInfo.UserID,
      TotalVoucher: totalVoucher,
      TotalAmount: totalAmount,
      TotalVoucherPay: totalVoucherPay,
      TotalPayAmount: depositAmount,
      PayCashAmount: payCashAmount,
      PayBankAmount: payBankAmount,
      Status: 1,
      Notes: notes,
    };

    if (await onPressSubmiss(VoucherSubmit, chooseData)) {
      ToastAndroid.show('thành công', ToastAndroid.SHORT);
      setVisbleDialogSubmiss(false);
      let newdata = data.filter((x) => x.Checked == true);
      let newdata2 = data.filter((item) => !newdata.includes(item));
      setData(newdata2);
    }
  };
  const closeDialogSubmission = () => {
    setchooseData([]);
    setVisbleDialogSubmiss(false);
  }
  const viewFlatList = () => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ backgroundColor: '#fff' }}
          data={data}
          refreshing={Show}
          onRefresh={onRefresh}
          keyExtractor={(item, index) => 'key' + index}
          initialNumToRender={20} // how many item to display first
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            handleLoadMore();
          }}
          renderItem={({ item, index }) => viewData(item, index)}
        />
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: '#000',
            width: '100%',
            height: wp(5.5),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
        >
          <Text
            style={{
              fontWeight: '700',
              color: '#5EB45F',
              fontSize: hp(2.2),
              fontStyle: 'italic',
            }}
          >
            {data.length}/{TotalRow}
          </Text>
        </View>
      </View>
    );
  };
  const onPressDetail = data => {
    props.navigation.navigate('DetailEnvoiceCreditor', { Data: data});
  }
  const viewData = (item, index) => {
    const color =
      item.SaleInvoiceStatus == 6
        ? mainColors.blue
        : item.SaleInvoiceStatus == 7
        ? '#32ff7e'
        : 'black';
    return (
      <View>
        <ItemSubmisstionCreditor
          onPressDetail = {() => onPressDetail(item)}
          onPressChoose={() => onPressChoose(index)}
          isChooseSubmiss={item.Checked}
          Status={item.Status}
          colortitle={color}
          navigation={props.navigation}
          addressCustomer={item.ShipAddress}
          codeOrder={index + 1 + '. ' + item.Code}
          dateTime={item.AccountingDate}
          nameCustomer={item.CustomerName}
          onPressItem={() => onPressItem(index)}
          typeItem={false}
          noteOder={item.Notes}
          sourceIcon={Receiver}
          customerCode={item.CustomerCode}
          Option={'1'}
          type={'4'}
          index={index}
          SaleVoiceID={item.SaleInvoiceID}
          PhoneNumBer={item.CustomerPhone}
          onPressApply={ReceiveSaleInvoiceByID}
        ></ItemSubmisstionCreditor>
      </View>
    );
  };

  return (
    <BackgroundDetailCreditorScreen title='3. Nộp phiếu' navigation={props.navigation}>
      <View style={styles.container}>
        <Modal
          animationType='slide'
          transparent
          visible={VisbleDialogSubmiss}
          presentationStyle='formSheet'
          style={{ justifyContent: 'flex-end', margin: 0 }}
        >
          <DialogSubmission
            onTextChange={onTextChange}
            TotalVoucher={totalVoucher}
            TotalVoucherPay={totalVoucherPay}
            TotalPayAmount={getDataByThing.getcurrency(depositAmount)}
            PayCashAmount={getDataByThing.getcurrency(payCashAmount)}
            PayBankAmount={getDataByThing.getcurrency(payBankAmount)}
            onPressAcpect={() => AcpectSubmission()}
            onPressClose={() => {
              closeDialogSubmission()
            }}
          ></DialogSubmission>
        </Modal>
        <HeaderSearchSubmission
          disabaledSp = {data.length <= 0? true:false}
          positionsp = {data.length <= 0 ? {opacity: 0.4} : {}}
          onPressSubmission={() => {
            onGetItemToDialog();
          }}
          onPressSearch={() => {
            search();
          }}
          _onChangeText={search123}
          value={searchString}
        ></HeaderSearchSubmission>

        {lodash.isEmpty(data) ? <View></View> : viewFlatList()}
      </View>
    </BackgroundDetailCreditorScreen>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp(8),
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 8,
  },
  tabview: {
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  headertabview: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    height: hp(10),
    backgroundColor: mainColors.greenscolor,
    justifyContent: 'space-between',
  },
  headertabview_iconsearch: {
    paddingLeft: 5,
    paddingRight: 5,
    height: hp(8),
    width: wp(35),
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default SubmissionCreditor;

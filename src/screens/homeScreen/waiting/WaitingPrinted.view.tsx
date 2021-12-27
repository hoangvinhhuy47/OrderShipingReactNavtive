import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Receiver } from '../../../assets/index';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import { ItemPrintedCustom } from '../../../components/items/homeScreen/ItemPrintedCustom';
import { GetSaleInvoiceNoteReceive } from './GetSaleInvoice';
import lodash from 'lodash';
import { receiveSaleInvoiceByID } from '../../../screens/homeScreen/waiting/ReceiveSaleInvoiceByID';
import { getSaleInvoiceBycode } from '../detailEnvoice/GetSaleInvoiceByCode';
import Toast from 'react-native-toast-message';
import { actionMain } from '../../../utils';

const WaitingPrinted = (props: any) => {
  const {
    TotalRow,
    handleLoadMore,
    search,
    data,
    onPressSearch,
    setData,
    searchString,
    setsearchString,
    pageIndex,
    setPageIndex,
  } = GetSaleInvoiceNoteReceive(props);
  const { onPressAccept } =
    receiveSaleInvoiceByID(props);
  const [VisbleDialogError, setVisbleDialogError] = useState(false);
  const { GetDataCode, dataSaleInvoiceDetailCode } =
    getSaleInvoiceBycode(props);
  const [Show, setShow] = useState(false)


  const ReceiveSaleInvoiceByID = async (ID: string, Index: any) => {
    try {
      actionMain.loading(true, '');
      if (await onPressAccept(ID)) {
        deleteData(Index)
      }
      else {
        actionMain.loading(false, '');
        Toast.show({
          type: 'error',
          text1: 'Thao Tác Không Thành Công',
        });


      }

    } catch (E) { }
  };


  const search123 = (value: any) => {
    setsearchString(value);
  };
  const getdata = async () => {
    await onPressSearch();
    setTimeout(() => {
      setShow(false)
    }, 1000)

  };
  const deleteData = (rowIndex: any) => {
    try {
      if (rowIndex >= 0) {
        data.splice(rowIndex, 1);
        let _data = [...data];
        setData(_data);
        actionMain.loading(false, '');
      }
    } catch (E) { }
  };
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setData([]);
      getdata();
      setsearchString('');
    });
    return () => { };
  }, []);

  const onScanSuccess = async (value: any) => {
    if (value.nativeEvent.codeStringValue != '') {
      await GetDataCode(value.nativeEvent.codeStringValue);
      if (await lodash.isEmpty(dataSaleInvoiceDetailCode)) {
        setVisbleDialogError(true);
      } else {
        props.navigation.push('DetailEnvoice', {
          IDOrder: value.nativeEvent.codeStringValue,
          TypeAPI: 'Code',
        });
      }
    }
  };

  const onPressItem = (value: any) => {
    for (var i = 0; i < data.length; i++) {
      if (i == value) {
        if (data[i].Status == true) {
          data[i].Status = false;
          setData([...data])
        } else {
          data[i].Status = true;
          setData([...data])
        }
      }
      else {
        data[i].Status = false;
        setData([...data])
      }
    }
  }


  const onRefresh = () => {
    setShow(true)
    getdata()
  }
  const viewData = (item, index) => {
    return (
      <View>
        <ItemPrintedCustom
          EmployeeName={item.EmployeeName}
          Status={item.Status}
          styleItem={index % 2 == 0 ? { backgroundColor: 'white' } : { backgroundColor: '#c7ecee' }}
          navigation={props.navigation}
          addressCustomer={item.ShipAddress}
          codeOrder={index + 1 + '. ' + item.Code}
          dateTime={item.DeliveryDate}
          invoiceWeight={item.TotalQuantity.toString()}
          nameCustomer={item.CustomerName}
          onPressItem={() => onPressItem(index)}
          typeItem={false}
          noteOder={item.Notes}
          sourceIcon={Receiver}
          customerCode={item.CustomerCode}
          Option={'1'}
          type={'1'}
          index={index}
          onPressAcept={ReceiveSaleInvoiceByID}
          SaleVoiceID={item.SaleInvoiceID}
          PhoneNumBer={item.CustomerPhone}
        ></ItemPrintedCustom>
      </View>
    )
  }
  return (
    <View style={styles.tabview}>
      <HeaderSearchCustom
        onScanSuccess={onScanSuccess}
        onPressSearch={() => {
          search()
        }}
        _onChangeText={search123}
        value={searchString}
        onPressBarCode={() => {
          props.navigation.navigate('SearchProduct');
        }}
      ></HeaderSearchCustom>
      <View style={{ flex: 1 }}>
        {lodash.isEmpty(data) || data.length == 0 ? (
          <View></View>
        ) : (
          <View style={{ width: '100%', height: '100%' }}>
            <FlatList
              refreshing={Show}
              onRefresh={onRefresh}
              keyExtractor={(item, index) => 'key' + index}
              data={data}
              initialNumToRender={20} // how many item to display first
              onEndReachedThreshold={0.1}
              onEndReached={() => {
                handleLoadMore();
              }}
              renderItem={({ item, index }) => (viewData(item, index))}
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
        )}
      </View>
      <Toast position={'top'} visibilityTime={5} ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};
const styles = StyleSheet.create({
  tabview: {
    flex: 1,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
});

export default WaitingPrinted;

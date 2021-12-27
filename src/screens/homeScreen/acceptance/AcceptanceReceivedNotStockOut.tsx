import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,

  FlatList,

} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Receiver } from '../../../assets/index';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import { ItemsCustom } from '../../../components/items/homeScreen/ItemCustom';
import { getSaleInvoiceReceivedNotStockOut } from './GetSaleInvoiceReceivedNotStockOut';
import lodash from 'lodash';
import { returnSaleInvoiceByID } from './ReturnSaleInvoiceNotStock';
import Toast from 'react-native-toast-message';
import { actionMain } from '../../../utils';

const AcceptanceReceivedNotStockOut = (props: any) => {
  const [Show, setShow] = useState(false)

  const {
    TotalRow,
    handleLoadMore,
    search,
    data,
    setData,
    onPressSearch,
    searchString,
    setsearchString,
    pageIndex,
    setPageIndex,
  } = getSaleInvoiceReceivedNotStockOut(props);
  const { onPressReturn } =
    returnSaleInvoiceByID(props);

  const search123 = (value: any) => {
    if (value == '') {
      setsearchString('');
    } else {
      setsearchString(value);
    }
  };
  const getdata = async () => {
    await onPressSearch();
    setTimeout(() => {
      setShow(false)
    }, 1000)
  };
  useEffect(() => {
    setsearchString('');
    getdata();
    props.navigation.addListener('focus', () => {
      getdata();
      setPageIndex(1);
      setsearchString('');
    });

    return () => { };
  }, []);
  const onPress = async (ID: string, Index: any) => {
    try {
      actionMain.loading(true, '');
      if (ID != '') {
        if (await onPressReturn(ID)) {
          deleteData(Index)
        }
        else {
          actionMain.loading(false, '');
          Toast.show({
            type: 'error',
            text1: 'Thao Tác Không Thành Công',
          });
        }
      }
    } catch (E) {
      Toast.show({
        type: 'error',
        text1: 'Thao Tác Không  Thành Công',
      });
    }
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
  const onScanBarCode = () => {
    props.navigation.navigate('CameraScreenDetail', { type: 1 });
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
  useEffect(() => {

  }, [data])

  const viewData = (item, index) => {
    return (
      <View>
        <ItemsCustom
          styleItem={index % 2 == 0 ? { backgroundColor: 'white' } : { backgroundColor: '#c7ecee' }}
          Status={item.Status}
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
          onPressIcon={() => console.log('ok ne')}
          Option={'7'}
          customerCode={item.CustomerCode}
          index={index}
          type={'7'}
          onPressReturn={onPress}
          SaleVoiceID={item.SaleInvoiceID}
          PhoneNumBer={item.CustomerPhone}
        ></ItemsCustom>
      </View>
    )
  }
  return (
    <View style={styles.tabview}>
      <HeaderSearchCustom
        onScanSuccess={() => {

        }}
        onPressSearch={() => {
          search();
        }}
        onPressBarCode={() => {
          onScanBarCode();
        }}
        _onChangeText={search123}
        value={searchString}
      ></HeaderSearchCustom>
      <View style={{ flex: 1 }}>
        {lodash.isEmpty(data) ? (
          <View></View>
        ) : (
          <View style={{ width: '100%', height: '100%' }}>
            <FlatList
              style={{ backgroundColor: '#fff' }}
              keyExtractor={(item, index) => 'key' + index}
              data={data}
              initialNumToRender={20} // how many item to display first
              onEndReachedThreshold={0.1}
              onEndReached={() => {
                handleLoadMore();
              }}
              refreshing={Show}
              onRefresh={onRefresh}
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
      <Toast
        style={{ backgroundColor: 'white' }}
        position={'top'}
        visibilityTime={5}
        ref={(ref) => Toast.setRef(ref)}
      />
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

export default AcceptanceReceivedNotStockOut;

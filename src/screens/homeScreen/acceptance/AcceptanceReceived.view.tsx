import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ToastAndroid
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BarCode, Box, Receiver } from '../../../assets/index';
import { ItemAccptanceCustom } from '../../../components/items/homeScreen/ItemAccptanceCustom';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import { getSaleInvoiceReceived } from './GetSaleInvoiceReceived';
import lodash from 'lodash';
import { getMerchandiseToDelivery } from '../acceptance/GetMerchandiseToDelivery';
import Toast from 'react-native-toast-message';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { actionMain } from '../../../utils';

const AcceptanceReceived = (props: any) => {
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
  } = getSaleInvoiceReceived(props);
  const [Show, setShow] = useState(false)


  const {

    onPressGetMerchand,

  } = getMerchandiseToDelivery(props);

  const onPressGet = async (ID: string, Index: any) => {
    try {
      actionMain.loading(true, '');
      if (ID != '') {
        if (await onPressGetMerchand(ID)) {

          deleteData(Index);

        }
        else {
          actionMain.loading(false, '');
          Toast.show({
            type: 'error',
            text1: 'Thao Tác Không Thành Công',
          });

        }
      }
    } catch (E) { }
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
  const onRefresh = () => {
    setShow(true)

    getdata()
  }
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setData([]);
      getdata();
      setPageIndex(1);
      setsearchString('');
    });
    return () => { };
  }, []);
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
  useEffect(() => {

  }, [data])
  const viewData = (item, index) => {
    return (
      <View>
        <ItemAccptanceCustom
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
          customerCode={item.CustomerCode}
          index={index}
          Option={'1'}
          type={'3'}
          SaleVoiceID={item.SaleInvoiceID}
          PhoneNumBer={item.CustomerPhone}
          onPressGet={onPressGet}
        ></ItemAccptanceCustom>
      </View>
    )
  }
  return (
    <View style={styles.tabview}>
      <HeaderSearchCustom
        onScanSuccess={() => {}}
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
              refreshing={Show}
              onRefresh={onRefresh}
              data={data}
              initialNumToRender={20} // how many item to display first
              onEndReachedThreshold={0.1}
              onEndReached={() => {
                handleLoadMore();
              }}
              keyExtractor={(item, index) => 'key' + index}
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

export default AcceptanceReceived;

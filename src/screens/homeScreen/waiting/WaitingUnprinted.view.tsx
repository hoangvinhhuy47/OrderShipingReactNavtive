import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Receiver } from '../../../assets/index';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import { ItemsCustom } from '../../../components/items/homeScreen/ItemCustom';
import { GetSaleInvoiceNotPrint } from './GetSaleInvoiceNotPrint';
import lodash from 'lodash';
const WaitingUnprinted = (props: any) => {
  const [Show, setShow] = useState(false)
  const {
    TotalRow,
    handleLoadMore,
    search,
    data,
    onPressSearch,
    searchString,
    setsearchString,
    setData,
    setPageIndex,
  } = GetSaleInvoiceNotPrint(props);

  const getdata = async () => {
    await onPressSearch();
    setTimeout(() => {
      setShow(false)
    }, 1000)
  };
  const search123 = (value: any) => {
    if (value == '') {
      setsearchString('');
    } else {
      setsearchString(value);
    }
  };

  const onScanBarCode = () => {
    props.navigation.navigate('CameraScreenDetail', { type: 2 });
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
        <ItemsCustom
          EmployeeName={item.EmployeeName}
          Status={item.Status}
          styleItem={index % 2 == 0 ? { backgroundColor: 'white' } : { backgroundColor: '#c7ecee' }}
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
          Option={'2'}
          type={'2'}
          navigation={props.navigation}
          SaleVoiceID={item.SaleInvoiceID}
          PhoneNumBer={item.CustomerPhone}
        ></ItemsCustom>
      </View>
    )
  }


  return (
    <View style={styles.tabview}>
      <HeaderSearchCustom
        onScanSuccess={() => { }}
        onPressBarCode={() => {
          onScanBarCode();
        }}
        onPressSearch={() => search()}
        _onChangeText={search123}
        value={searchString}
      ></HeaderSearchCustom>
      <View style={{ flex: 1 }}>
        {lodash.isEmpty(data) == false ? (
          <View style={{ width: '100%', height: '100%' }}>
            <FlatList
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
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  tabview: {
    flex: 1,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
});

export default WaitingUnprinted;

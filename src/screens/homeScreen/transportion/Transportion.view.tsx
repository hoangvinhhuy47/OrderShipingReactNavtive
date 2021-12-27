import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, FlatList, Modal } from 'react-native';
import Ripple from 'react-native-material-ripple';
//import CodePush from 'react-native-code-push';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BackgroundDetailScreen } from '../../../components/backgroundScreen/backgroundDetailScreen/BackgroundDetailScreen.view';
import { Receiver } from '../../../assets/index';
import { mainColors } from '../../../constants/index';
import { getSaleInvoiceShipping } from './Transportion';
import { ItemTransportion } from '../../../components/items/homeScreen/ItemTransportion';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import lodash from 'lodash';


const Transportion = (props: any) => {
  const [Show, setShow] = useState(false)
  const {
    TotalRow,
    handleLoadMore,
    search,
    data,
    onPressSearch,
    setsearchString,
    setData,
    searchString,
  } = getSaleInvoiceShipping(props);

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
          <ItemTransportion
            Status={item.Status}
            styleItem={index%2==0?{ backgroundColor: 'white' }:{ backgroundColor: '#c7ecee' }}
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
            Option={'3'}
            type={'5'}
            customerCode={item.CustomerCode}
            SaleVoiceID={item.SaleInvoiceID}
            PhoneNumBer={item.CustomerPhone}
            index={index.toString()}
            onPressTransposition={{}}
          ></ItemTransportion>
      </View>
    )
  }


  
  return (
    <BackgroundDetailScreen title='3. Vận chuyển' navigation={props.navigation}>
      <View style={styles.container}>
        <HeaderSearchCustom
          onPressBarCode={() => {
            onScanBarCode();
          }}
          onScanSuccess={() => {
            console.log(1);
          }}
          onPressSearch={() => {
            search();
          }}
          _onChangeText={search123}
          value={searchString}
        ></HeaderSearchCustom>
        {lodash.isEmpty(data) ? (
          <View></View>
        ) : (
          <View style={{ flex: 1 }}>
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
    </BackgroundDetailScreen>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#fff',
    flexDirection: 'column',
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
    backgroundColor: 'white',
    width: wp(100),
    height: hp(100),
    flexDirection: 'column',
  },
  headertabview: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    height: hp(10),
    width: wp(100),
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
export default Transportion;

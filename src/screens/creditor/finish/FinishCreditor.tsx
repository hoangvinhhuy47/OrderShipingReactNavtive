import React, { useState, useEffect } from 'react';
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
import Ripple from 'react-native-material-ripple';
//import CodePush from 'react-native-code-push';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BackgroundDetailCreditorScreen } from '../../../components/backgroundScreen/backgroudDetailCreditorScreen/BackgroundDetailCreditorScreen.view';
import { BarCode, Box, Search, LOGOUTICON, Receiver, FILES } from '../../../assets/index';
import { Fonts, mainColors } from '../../../constants/index';
import { HeaderSearchFinish } from '../../../components/headerSearch/HeaderSearchFinish';
import { ItemFinish } from '../../../components/items/homeScreen/ItemFinish';
import lodash from 'lodash';
import getDataByThing from '../../../utils/getDataByThing';
import { getDataFinishCreditor } from './GetDataFinishCreditor';
const Finish = (props: any) => {
  const [Show, setShow] = useState(false);

  const { TotalRow, handleLoadMore, data, onPressSearch, setData, setPageIndex, pageIndex} = getDataFinishCreditor(props);

  const getdata = async () => {
    await onPressSearch();
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setPageIndex(1);
      setData([]);
      getdata();
    });
    return () => {};
  }, []);
  const onPressItem = data => {
    props.navigation.navigate('FinishCreditorDetail', { Data: data });
  };
  const onRefresh = () => {
    setShow(true);
    getdata();
  };
  return (
    <BackgroundDetailCreditorScreen title='4. Hoàn tất' navigation={props.navigation}>
      <View style={styles.container}>
        {lodash.isEmpty(data) ? (
          <View></View>
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              style={{ backgroundColor: '#fff' }}
              data={data}
              keyExtractor={(item, index) => 'key' + index}
              initialNumToRender={15} // how many item to display first
              onEndReachedThreshold={0.1}
              onEndReached={() => {
                handleLoadMore();
              }}
              refreshing={Show}
              onRefresh={onRefresh}
              renderItem={({ item, index }) => (
                <ItemFinish
                  colorText={item.Status == 3 ? { color: '#ca0000' } : { color: '#000' }}
                  shipperName={item.ShipperName}
                  colorItem={
                    index % 2 == 0 ? { backgroundColor: '#c7ecee' } : { backgroundColor: '#fff' }
                  }
                  payBankAmount={getDataByThing.getcurrency(item.PayBankAmount)}
                  payCashAmount={getDataByThing.getcurrency(item.PayCashAmount)}
                  totalPayAmount={getDataByThing.getcurrency(item.TotalPayAmount)}
                  totalVoucher={item.TotalVoucher}
                  navigation={props.navigation}
                  codeOrder={
                    index +
                    1 +
                    '. ' +
                    getDataByThing.getDayMonthYearHourStringDetail(item.CreatedDate)
                  }
                  onPressItem={() => onPressItem(item)}
                ></ItemFinish>
              )}
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
    </BackgroundDetailCreditorScreen>
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
export default Finish;

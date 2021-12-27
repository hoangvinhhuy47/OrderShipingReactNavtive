import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../../constants';
import { TextInputCustom } from '../../userComponents/TextInputCustom';
import { BarCode, Box, Search, LOGOUTICON, ICONRIGHT } from '../../../assets/index';
import { TextInput, Button, Card, Searchbar, IconButton } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

interface ItemsDetailCustom {
  onPressItem?: any;
  nameItem: string;
  quantityItem: string;
  unitItem: string;
  titleItem: string;
  styleItem?: ViewStyle;
  index?: any;
  indexItem: any;
  onPressDialog?: any;
  type?: string;
}

export const ItemsDetailCustom = (props: ItemsDetailCustom) => {
  const { onPressDialog, type, index, onPressItem, nameItem, quantityItem, titleItem, styleItem,unitItem,indexItem } =
    props;
  const onPress = () => {
    if (type == '5') {
      onPressDialog(index);
    } else {
      onPressItem;
    }
  };
  return (
    <TouchableOpacity style={[styles.item, styleItem]} onPressIn={onPress}>
      <Card style={indexItem % 2 == 0 ? {backgroundColor: '#fff'} : {backgroundColor: '#e5e5e5'}}>
        <View style={{ width: '100%', padding: wp(1.2), flexDirection: 'row' }}>
          <View style={{ width: '90%' }}>
            <View style={styles.header}>
              <View style={{ width: '100%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: wp(4) }}>{nameItem}</Text>
              </View>
            </View>
            <View style={styles.header}>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: wp(3.5),color:'#ca0000' }}>SL: </Text>
                  <Text style={{ fontSize: wp(3.5), color:'#ca0000'}}>{quantityItem}</Text>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: wp(3.5) }}>ĐVT: </Text>
                  <Text style={{ fontSize: wp(3.5) }}>{unitItem}</Text>
                </View>
              </View>
              <View />
            </View>
            {titleItem ? (
              <View style={{ width: '100%', marginTop: 5, justifyContent: 'flex-start' }}>
                <Text style={{ fontSize: wp(3.5), fontWeight: '400', fontStyle: 'italic' }}>
                  Ghi chú: {titleItem}
                </Text>
              </View>
            ) : (
              <View style={{ marginTop: 0 }}></View>
            )}
          </View>
          <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
           {type=='5'?<Image
              source={ICONRIGHT}
              style={{
                height: hp(3),
                width: wp(3),
                aspectRatio: 1,
              }}
            ></Image>:<View></View>} 
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  item: {
    marginVertical: hp(0.5),
    marginHorizontal: wp(0.5),
    flexDirection: 'column',
    borderRadius: 0.8,
    justifyContent: 'center',
    borderBottomColor: mainColors.smokecolor,
    borderBottomWidth: 1.2,
    marginLeft: 1,
    backgroundColor: 'white',
    marginRight: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

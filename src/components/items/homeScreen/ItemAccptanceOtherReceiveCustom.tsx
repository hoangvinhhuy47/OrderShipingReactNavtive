import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ViewStyle,
    TextStyle,
    ImageSourcePropType,
    ToastAndroid,
    TouchableOpacityBase,
    TouchableOpacity,

} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../../constants';
import { TextInputCustom } from '../../userComponents/TextInputCustom';
import {
    BarCode,
    Box,
    Search,
    LOGOUTICON,
    Phone,
    Info,
    Check,
    Exchange2,
    

} from '../../../assets/index';
import {
    TextInput,
    Button,
    Card,
    Searchbar,
    IconButton,
} from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { IconDetailCustom } from '../../iconsCustom/IconDetailCustom'
import { receiveSaleInvoiceByID } from '../../../screens/homeScreen/waiting/ReceiveSaleInvoiceByID'
import { GetSaleInvoiceNoteReceive } from '../../../screens/homeScreen/waiting/GetSaleInvoice';
import { Linking, Alert, Platform } from 'react-native';
import getDataByThing from '../../../utils/getDataByThing';
interface ItemAccptanceOtherReceiveCustom {
    customerCode?: string
    navigation?: any;
    onPressItem: any;
    codeOrder: string;
    invoiceWeight: string;
    dateTime: string;
    nameCustomer: string;
    addressCustomer: string;
    noteOder?: String;
    typeItem: boolean;
    sourceIcon?: any;
    styleItem?: ViewStyle;
    SaleVoiceID?: string;
    PhoneNumBer?: string;
    Reload?: any
    onPressApply: any
    index?: any;
    onPressDetail: any
    titleAcpect?: string
    Status?:any
    shipperName: string,

}

export const ItemAccptanceOtherReceiveCustom = (props: ItemAccptanceOtherReceiveCustom) => {
    const [showIcon, setShowIcon] = useState(false)
    const { shipperName, PhoneNumBer,Status, customerCode, titleAcpect, onPressDetail, index, onPressApply, Reload, SaleVoiceID, styleItem, navigation, onPressItem, codeOrder, invoiceWeight, dateTime, nameCustomer, addressCustomer, noteOder, sourceIcon, typeItem } = props
    const CallCustomer = (phone: string) => {
        if (Platform.OS == 'android') {
            Linking.openURL('tel:' + phone + '').then(supported => {
                if (!supported) {
                    Alert.alert('S??? ??i???n tho???i kh??ng ????ng');
                } else {
                    return Linking.openURL(phone);
                }
            })
        }
        else if (Platform.OS == 'ios') {
            Linking.openURL('tel:' + phone);
        }
    }

    return (
        <Card style={[styles.container, styleItem]}>
            <TouchableOpacity
                onPress={() =>{
                    onPressItem(index)
                }
                }>
                <View style={[styles.item, styleItem]}>
                    {/* headder */}
                    <View style={styles.header}>
                        <View style={styles.header1}>
                            <Text
                                style={{
                                    fontSize: wp(3.6),
                                    color: 'black',
                                    fontFamily: Fonts.Roboto_Stab_Bold,
                                    fontWeight: '700',
                                }}>
                                {codeOrder}
                            </Text>
                        </View>
                        <View style={styles.header1_icon}>
                            <Image
                                source={Box}
                                style={{
                                    height: hp(5),
                                    width: wp(5),
                                    aspectRatio: 1,
                                    marginRight: 5,
                                }}></Image>
                            <Text
                                style={{
                                    fontSize: wp(3),
                                    color: 'red',
                                    fontFamily: Fonts.Roboto_Stab_Bold,

                                }}>
                                {invoiceWeight}
                            </Text>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <Text
                                style={{
                                    fontSize: wp(3.6),
                                    color: 'black',
                                    fontFamily: Fonts.Roboto_Stab_Bold,
                                }}>
                                {getDataByThing.getDayMonthYearHourStringDetail(dateTime)}
                            </Text>
                        </View>
                    </View>
                    {/* headder2 */}
                    <View style={styles.header2}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 8, alignItems: 'center' }}>
                            <Text
                                style={{
                                    fontSize: wp(4),
                                    color: 'black',
                                    fontFamily: Fonts.Roboto_Slab_Regular,
                                }}>
                                GH: {shipperName}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.header2}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 8, alignItems: 'center' }}>
                            <Text
                                style={{
                                    fontSize: wp(4),
                                    color: 'black',
                                    fontFamily: Fonts.Roboto_Slab_Light,
                                    fontWeight: '700',
                                }}>
                                {customerCode} - {nameCustomer} 
                            </Text>
                        </View>
                    </View>
                    {
                        addressCustomer?
                    <View style={styles.header2_icon}>
                        <Text
                            style={{
                                width: wp(95),
                                fontSize: wp(3.8),
                                color: mainColors.blackColor,
                                fontFamily: Fonts.Roboto_Slab_Regular,
                                fontStyle: 'italic',
                            }}>
                            {addressCustomer} 
                        </Text>

                    </View>:
                    <View/>
                    }
                    {noteOder ? (
                        <View style={styles.header3}>
                            <Text
                                style={{
                                    fontSize: wp(3.5),
                                    color: '#ca0000',
                                    fontFamily: Fonts.Roboto_Stab_Bold,
                                    marginRight: 5,
                                    fontStyle: 'italic',
                                }}>
                                Ghi ch??:
                            </Text>
                            <Text
                                style={{
                                    fontSize: wp(3.5),
                                    color: '#ca0000',
                                    fontFamily: Fonts.Roboto_Stab_Bold,
                                    fontStyle: 'italic',
                                }}>
                                {noteOder}
                            </Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                </View>
            </TouchableOpacity>

            {Status == true ? <View style={styles.bottom}>
                <IconDetailCustom
                    iconShow={true}
                    onPress={() => { CallCustomer(PhoneNumBer) }}
                    labelStyle={{ color: mainColors.greenscolor, fontSize: wp(4) }}
                    title={'G???i'}
                    sourceICon={Phone}
                    style={styles.ButtonBottom}></IconDetailCustom>

                <IconDetailCustom
                    iconShow={true}
                    onPress={onPressDetail}
                    labelStyle={{ color: mainColors.blue, fontSize: wp(3) }}
                    title={'Chi ti???t'}
                    sourceICon={Info}
                    style={styles.ButtonBottom}></IconDetailCustom>

                 <IconDetailCustom
                    iconShow={true}
                    onPress={onPressApply}
                    labelStyle={{ color: mainColors.greenscolor, fontSize: wp(2.8) }}
                    title={'Nh???n Phi???u'}
                    sourceICon={Check}
                    style={styles.ButtonBottom}></IconDetailCustom>
            </View> :
                <View></View>
            }
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginTop: 2,
 
        borderBottomWidth: 2,
        paddingHorizontal: 2,
    },
    item: {
        marginBottom: 5,
        paddingVertical: 2,
        paddingHorizontal: 3,
        marginTop: 5,
        flexDirection: 'column',
        borderColor: 'black',
        backgroundColor: '#fff',
    },
    header: {
        height: hp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header1: { justifyContent: 'center', maxWidth: wp(58) },
    header1_icon: {
        height: hp(4),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header2: {
        marginBottom: 1,
        justifyContent: 'center',
    },
    header2_icon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header3: {
        width: '84%',
        flexDirection: 'row'
    },
    bottom: {
        marginBottom: 5,
        height: hp(5),
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    ButtonBottom: {
        width: wp(89) / 4, 
        height: hp(5), 
        borderRadius: 5, 
        backgroundColor: '#fff',
        marginLeft:wp(3),
    }
})



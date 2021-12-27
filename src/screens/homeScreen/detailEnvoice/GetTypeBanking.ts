import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { GetAccountBankingType } from '../../../services/homeScreen/Detail/GetAccountBankingType';
import { AccountBankingTypeList } from '../../../components/object/Order';

import { ToastAndroid } from 'react-native';
export const GetTypeBanking = (props: any) => {
    const [DataTypeBanking, setDataTypeBanking] = useState(new Array<AccountBankingTypeList>());
    const dispatch = useDispatch();

    const onPressGetBanking = async () => {
        try {
            let dataBanking = await GetAccountBankingType();
            if (dataBanking != null) {
                let result = dataBanking.data;
                if (result.StatusID == 1) {
                    setDataTypeBanking(result.AccountBankingTypeList)
                }
                else {

                    return null;
                }
            } else {
                actionMain.showModalWarm({
                    status: true,
                    title: 'Lỗi',
                    content: 'Vui Lòng Kiểm Tra Kết Nối Mạng',
                });
            }
        } catch (E) {

        }
    }
    return {
        DataTypeBanking,
        onPressGetBanking
    }
}
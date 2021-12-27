import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { SetLocationUser } from '../../../services/homeScreen/Detail/SetLocationUser'
import { ToastAndroid } from 'react-native';
export const SetLocation = (props: any) => {
    const { profileInfo } = useSelector((state: any) => ({
        profileInfo: state?.auth?.profileInfo,
    }));
    const [userID1, setUserID1] = useState(profileInfo.UserID);
    useEffect(() => {
        setUserID1(profileInfo.UserID);
        return () => {
        }
    })
    const onPressSetLocation = async (AddressID: string, Latitue: string, Longitue: string) => {
        let dataResult = await SetLocationUser(profileInfo.UserID, AddressID, Latitue, Longitue);
        if (dataResult != null) {


            let result = dataResult.data;
            if (await result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Vui Lòng Kiểm Tra Kết Nối Mạng',
            });
        }
    }

    return {
        onPressSetLocation,
    }
}
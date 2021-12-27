import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { DeleteSubmit } from '../../../services/homeScreen/Finish/DeleteSubmit'
import { ToastAndroid } from 'react-native';
export const DeleteSubmita = (props: any) => {
    const { profileInfo } = useSelector((state: any) => ({
        profileInfo: state?.auth?.profileInfo,
    }));
    const [ErrorDescription, setErrorDescription] = useState('');
    const onPressDeleteSubmit = async (VoucherSubmitID: any) => {
        let dataResult = await DeleteSubmit(profileInfo.UserID,VoucherSubmitID);
        if (dataResult != null) {


            let result = dataResult.data;
            setErrorDescription(result.ErrorDescription)
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
        onPressDeleteSubmit,ErrorDescription
    }
}
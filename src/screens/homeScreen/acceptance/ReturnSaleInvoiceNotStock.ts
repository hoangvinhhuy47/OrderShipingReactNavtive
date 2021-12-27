import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { ReturnSaleInvoiceByID } from '../../../services/homeScreen/acceptance/ReturnSaleInvoiceByID'
import { ToastAndroid } from 'react-native';
export const returnSaleInvoiceByID = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID1, setUserID1] = useState(profileInfo.UserID);

  const [SaleInvoiceID2, setSaleInvoiceID2] = useState('');

  useEffect(() => {
    setUserID1(profileInfo.UserID);
    return () => {
    }
  })
  const onPressReturn = async (ID: string) => {
    let dataResult = await ReturnSaleInvoiceByID(profileInfo.UserID, ID);
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
    userID1, setUserID1,
    SaleInvoiceID2, setSaleInvoiceID2,
    onPressReturn

  }
}
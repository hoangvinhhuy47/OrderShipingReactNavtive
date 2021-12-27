import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { DebitSaleInvoiceCreditor } from '../../../services/CreditorScreen/detail/DebitSaleInvoiceCreditor'
import { SaleInvoiceClient, SaleInvoiceDetailClient, PaymentInfo } from '../../../components/object/Order'
import { ToastAndroid } from 'react-native';
export const debitSaleInvoiceCreditor = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID1, setUserID1] = useState(profileInfo.UserID);



  useEffect(() => {
    setUserID1(profileInfo.UserID);
    return () => {
    }
  })
  const onPressHandout = async (ID: string, dataPayment: PaymentInfo) => {
    let dataResult = await DebitSaleInvoiceCreditor(profileInfo.UserID, ID, dataPayment);
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
    onPressHandout,

  }
}
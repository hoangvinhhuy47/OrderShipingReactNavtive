import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { waittingPrinted } from '../../../services/homeScreen/Waitting/waitting';
import { SaleInvoiceClient } from '../../../components/object/Order';
import { ReturnSaleInvoiceCreditor } from '../../../services/CreditorScreen/handleCreditor/ReturnSaleInvoiceCreditor';
import { ToastAndroid } from 'react-native';

export const returnSaleInvoiceCreditor = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [SaleInvoiceID, setSaleInvoiceID] = useState('');


  useEffect(() => {

    return () => { };
  });
  const onPressReturnSaleInvoiceCreditor = async (ID: string) => {
    let dataResult = await ReturnSaleInvoiceCreditor(profileInfo.UserID, ID);
    if (dataResult != null) {
      let result = dataResult.data;
      if (result?.StatusID == 1) {
        return true
      } else {
        return false

      }
    }
    else {
      actionMain.showModalWarm({
        status: true,
        title: 'Lỗi',
        content: 'Vui Lòng Kiểm Tra Kết Nối Mạng',
      });
    }
  };



  return {

    SaleInvoiceID,
    setSaleInvoiceID,
    onPressReturnSaleInvoiceCreditor,
  };
};

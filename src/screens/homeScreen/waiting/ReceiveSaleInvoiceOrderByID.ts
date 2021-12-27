import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { waittingPrinted } from '../../../services/homeScreen/Waitting/waitting';
import { SaleInvoiceClient } from '../../../components/object/Order'
import { ReceiveSaleInvoiceOtherByID } from '../../../services/homeScreen/Waitting/ReceiveSaleInvoiceOtherByID';


export const receiveSaleInvoiceOtherByID = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID, setUserID] = useState(profileInfo.UserID);
  const [SaleInvoiceIDOrder, setSaleInvoiceIDOrder] = useState('');


  useEffect(() => {
    setUserID(profileInfo.UserID);
    return () => {
    }
  })

  const onPressAcceptOrder = async (ID: string) => {
    let dataResult = await ReceiveSaleInvoiceOtherByID(profileInfo.UserID, ID);
    if (dataResult != null) {
      let result = dataResult.data;
      if (result?.StatusID == 1) {
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

    userID, setUserID,
    SaleInvoiceIDOrder, setSaleInvoiceIDOrder,
    onPressAcceptOrder

  }
}
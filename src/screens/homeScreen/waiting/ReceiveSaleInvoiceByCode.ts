import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { waittingPrinted } from '../../../services/homeScreen/Waitting/waitting';
import { SaleInvoiceClient } from '../../../components/object/Order'
import { ReceiveSaleInvoiceByCode } from '../../../services/homeScreen/Waitting/ReceiveSaleInvoceByCode';


export const receiveSaleInvoiceBycode = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID, setUserID] = useState(profileInfo.UserID);



  useEffect(() => {
    setUserID(profileInfo.UserID);
    return () => {
    }
  })
  const onPressCode = async (code: any) => {
    let dataResult = await ReceiveSaleInvoiceByCode(profileInfo.UserID, code);
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
    onPressCode

  }
}
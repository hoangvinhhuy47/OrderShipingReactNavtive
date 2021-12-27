import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { NotHandoutSaleInvoiceByID } from '../../../services/homeScreen/Detail/NotHandoutSaleInvoiceByID'
export const RefuseOrderByID = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID1, setUserID1] = useState(profileInfo.UserID);

  const [SaleInvoiceID3, setSaleInvoiceID3] = useState('');

  const [Reason, setReason] = useState('')
  useEffect(() => {
    setUserID1(profileInfo.UserID);
    return () => {
    }
  })
  const onPressRefuse = async (ID: string) => {
    let dataResult = await NotHandoutSaleInvoiceByID(profileInfo.UserID, ID, Reason);
    if (dataResult != null) {
      let result = dataResult.data;
      if (await result?.StatusID == 1) {
        return true;
      }
      else {
        return false;
      }
    } else {
      actionMain.showModalWarm({
        status: true,
        title: 'Lỗi',
        content: 'Vui Lòng Kiểm Tra Kết Nối Mạng',
      });
    }
  }

  return {
    userID1, setUserID1,
    SaleInvoiceID3, setSaleInvoiceID3,
    onPressRefuse,
    setReason, Reason
  }
}
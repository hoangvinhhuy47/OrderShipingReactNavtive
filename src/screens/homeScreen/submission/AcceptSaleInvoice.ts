import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { waittingPrinted } from '../../../services/homeScreen/Waitting/waitting';
import { SaleInvoiceClient,VoucherSubmit,VoucherSubmitDetail } from '../../../components/object/Order'
import { ApplySaleInvoiceByID } from '../../../services/homeScreen/Submisstion/ApplySaleInvoiceByID';

export const AcceptSaleInvoice = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID, setUserID] = useState(profileInfo.UserID);
  const [SaleInvoiceID4, setSaleInvoiceID4] = useState('');

  useEffect(() => {
    setUserID(profileInfo.UserID);
    return () => {
    }
  })
  const onPressSubmiss = async (VoucherSubmit : VoucherSubmit, VoucherSubmitDetai:Array<VoucherSubmitDetail>) => {
    let dataResult = await ApplySaleInvoiceByID(profileInfo.UserID, VoucherSubmit, VoucherSubmitDetai);
    if (dataResult != null) {
      let result = dataResult.data;
      if (result?.StatusID == 1) {
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
    userID, setUserID,
    SaleInvoiceID4, setSaleInvoiceID4,
    onPressSubmiss,
  }
}
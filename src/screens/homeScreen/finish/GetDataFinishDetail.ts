import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { GetSubmitDetail } from '../../../services/homeScreen/Finish/GetSubmitDetail';
import {VoucherSubmitDetailClient} from '../../../components/object/Order';
import lodash from 'lodash'
import { ToastAndroid } from 'react-native';


export const GetDataFinishDetail = (props: any) => {
  const dispatch = useDispatch();
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID, setUserID] = useState(profileInfo.UserID);

  const [data, setData] = useState(new Array<VoucherSubmitDetailClient>());

  const onPressSearch = async ( VoucherSubmitID: any ) => {
      let dataGetSaleInvoiceNotePrinted = await GetSubmitDetail(profileInfo.UserID, VoucherSubmitID);
      if (dataGetSaleInvoiceNotePrinted != null) {
        let result = dataGetSaleInvoiceNotePrinted.data;
        if (result?.StatusID == 1) {
          const dataa: Array<VoucherSubmitDetailClient> = result.VoucherSubmitDetailList;
            setData([...data, ...dataa])
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
  }
  return {
    userID, setUserID,
    onPressSearch,
    data, setData,
  }

}


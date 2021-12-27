import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { GetSaleInvoiceById } from '../../../services/homeScreen/Detail/GetSaleInvoiceById';
import { SaleInvoiceClient } from '../../../components/object/Order';
import { SaleInvoiceDetailClient } from '../../../components/object/Order';
import { ToastAndroid } from 'react-native';
export const getSaleInvoiceById = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const dispatch = useDispatch();
  const [userID, setUserID] = useState(profileInfo.UserID);
  const [IDOrder, setIDSaleVoice] = useState('');
  const [dataSaleInvoice, setdataSaleInvoice] = useState<SaleInvoiceClient>()
  const [dataSaleInvoiceDetail, setdataSaleInvoiceDetail] = useState(Array<SaleInvoiceDetailClient>());

  const GetDataType1 = async (ID: any) => {

    try {
      let dataGetSaleInvoiceNoteReceive = await GetSaleInvoiceById(profileInfo.UserID, ID);
      if (dataGetSaleInvoiceNoteReceive != null) {
        let result = await dataGetSaleInvoiceNoteReceive.data;

        if (result.StatusID == 1) {
          const data: SaleInvoiceClient = await result.SaleInvoice;

          setdataSaleInvoice(data)

          const datadetail: Array<SaleInvoiceDetailClient> = await result.SaleInvoiceDetailList;

          setdataSaleInvoiceDetail(datadetail)


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
    } catch (E) {

    }
  }
  return {
    userID, setUserID,
    GetDataType1,
    dataSaleInvoice, setdataSaleInvoice,
    setIDSaleVoice,
    IDOrder,
    dataSaleInvoiceDetail,
    setdataSaleInvoiceDetail
  }
}
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { GetSaleInvoiceNoPrintById } from '../../../services/homeScreen/Detail/GetSaleInvoiceNotPrinteById';
import { SaleInvoiceClient } from '../../../components/object/Order';
import { SaleInvoiceDetailClient } from '../../../components/object/Order';
import { ToastAndroid } from 'react-native';
export const getSaleInvoiceNotPrintById = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const dispatch = useDispatch();
  const [userID1, setUserID1] = useState(profileInfo.UserID);
  const [IDOrder1, setIDSaleVoice1] = useState('');
  const [dataSaleInvoice1, setdataSaleInvoice1] = useState<SaleInvoiceClient>()
  const [dataSaleInvoiceDetail1, setdataSaleInvoiceDetail1] = useState(Array<SaleInvoiceDetailClient>());

  const GetDataType2 = async (ID: any) => {
    // ToastAndroid.show(userID, ToastAndroid.CENTER)
    // ToastAndroid.show(IDOrder, ToastAndroid.CENTER)
    try {
      let dataGetSaleInvoiceNoteReceive = await GetSaleInvoiceNoPrintById(profileInfo.UserID, ID);
      if (dataGetSaleInvoiceNoteReceive != null) {
        let result = await dataGetSaleInvoiceNoteReceive.data;

        if (result.StatusID == 1) {
          const data: SaleInvoiceClient = await result.SaleInvoice;

          setdataSaleInvoice1(data)

          const datadetail: Array<SaleInvoiceDetailClient> = await result.SaleInvoiceDetailList;

          setdataSaleInvoiceDetail1(datadetail)

        }
        else {
          ToastAndroid.show(result.ErrorDescription.toString(), ToastAndroid.CENTER)
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
    userID1, setUserID1,
    GetDataType2,
    dataSaleInvoice1, setdataSaleInvoice1,
    setIDSaleVoice1,
    IDOrder1,
    dataSaleInvoiceDetail1
  }
}
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { GetSaleInvoiceCreditorByCode } from '../../../services/CreditorScreen/detail/GetSaleInvoiceByCodeCreditor';
import { SaleInvoiceClient } from '../../../components/object/Order';
import { SaleInvoiceDetailClient } from '../../../components/object/Order';
import { ToastAndroid } from 'react-native';
export const getSaleInvoiceByCodeCreditor = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const dispatch = useDispatch();
  const [dataSaleInvoiceCodeCreditor, setdataSaleInvoiceCodeCreditor] = useState<SaleInvoiceClient>()
  const [dataSaleInvoiceDetailCodeCreditor, setdataSaleInvoiceDetailCodeCreditor] = useState(Array<SaleInvoiceDetailClient>());

  const GetDataCodeCreditor = async (code: any) => {

    try {
      let dataGetSaleInvoiceNoteReceive = await GetSaleInvoiceCreditorByCode(profileInfo.UserID, code);
      if (dataGetSaleInvoiceNoteReceive != null) {
        let result = await dataGetSaleInvoiceNoteReceive.data;

        if (result.StatusID == 1) {
          const data: SaleInvoiceClient = result.SaleInvoice;

          setdataSaleInvoiceCodeCreditor(data)
          const datadetail: Array<SaleInvoiceDetailClient> = result.SaleInvoiceDetailList;
          setdataSaleInvoiceDetailCodeCreditor(datadetail)

        }
        else {
          return null;
        }
      }
      else {
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

    GetDataCodeCreditor,
    dataSaleInvoiceCodeCreditor, setdataSaleInvoiceCodeCreditor,
    dataSaleInvoiceDetailCodeCreditor,
    setdataSaleInvoiceDetailCodeCreditor,


  }
}
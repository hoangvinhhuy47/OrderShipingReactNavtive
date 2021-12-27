import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { GetSaleInvoiceByCode } from '../../../services/homeScreen/Detail/GetSaleInvoiceByCode';
import { SaleInvoiceClient } from '../../../components/object/Order';
import { SaleInvoiceDetailClient } from '../../../components/object/Order';
import { ToastAndroid } from 'react-native';
export const getSaleInvoiceBycode = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const dispatch = useDispatch();
  const [dataSaleInvoiceCode, setdataSaleInvoiceCode] = useState<SaleInvoiceClient>()
  const [dataSaleInvoiceDetailCode, setdataSaleInvoiceDetailCode] = useState(Array<SaleInvoiceDetailClient>());

  const GetDataCode = async (code: any) => {

    try {
      let dataGetSaleInvoiceNoteReceive = await GetSaleInvoiceByCode(profileInfo.UserID, code);
      if (dataGetSaleInvoiceNoteReceive != null) {
        let result = await dataGetSaleInvoiceNoteReceive.data;

        if (result.StatusID == 1) {
          const data: SaleInvoiceClient = result.SaleInvoice;

          setdataSaleInvoiceCode(data)
          const datadetail: Array<SaleInvoiceDetailClient> = result.SaleInvoiceDetailList;
          setdataSaleInvoiceDetailCode(datadetail)

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

    GetDataCode,
    dataSaleInvoiceCode, setdataSaleInvoiceCode,
    dataSaleInvoiceDetailCode,
    setdataSaleInvoiceDetailCode,


  }
}
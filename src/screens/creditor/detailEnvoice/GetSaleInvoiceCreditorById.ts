import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { GetSaleInvoiceCreditorById } from '../../../services/CreditorScreen/detail/GetSaleInvoiceCreditorById';
import { SaleInvoiceClient } from '../../../components/object/Order';
import { SaleInvoiceDetailClient } from '../../../components/object/Order';
import { ToastAndroid } from 'react-native';
export const getSaleInvoiceCreditorById = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const dispatch = useDispatch();
  const [userID, setUserID] = useState(profileInfo.UserID);
  const [IDOrder, setIDSaleVoice] = useState('');
  const [dataSaleInvoice, setdataSaleInvoice] = useState<SaleInvoiceClient>()
  const [dataGetSaleInvoiceCreditorById, setdataGetSaleInvoiceCreditorById] = useState(Array<SaleInvoiceDetailClient>());

  const GetData = async (ID: any) => {

    try {
      let dataGetSaleInvoiceCreditorById = await GetSaleInvoiceCreditorById(profileInfo.UserID, ID);
      if (dataGetSaleInvoiceCreditorById != null) {
        let result = await dataGetSaleInvoiceCreditorById.data;

        if (result.StatusID == 1) {
          const data: SaleInvoiceClient = await result.SaleInvoice;

          setdataSaleInvoice(data)

          const datadetail: Array<SaleInvoiceDetailClient> = await result.SaleInvoiceDetailList;

          setdataGetSaleInvoiceCreditorById(datadetail)


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
    GetData,
    dataSaleInvoice, setdataSaleInvoice,
    setIDSaleVoice,
    IDOrder,
    dataGetSaleInvoiceCreditorById,
    setdataGetSaleInvoiceCreditorById
  }
}
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { GetSaleInvoiceConfirm } from '../../../services/homeScreen/Finish/GetSaleInvoiceConfirm';
import { SaleInvoiceClient, VoucherSubmitClient } from '../../../components/object/Order';
import lodash from 'lodash'
import { ToastAndroid } from 'react-native';


export const getDataFinish = (props: any) => {
  const dispatch = useDispatch();
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID, setUserID] = useState(profileInfo.UserID);
  const [pageIndex, setPageIndex] = useState(1);
  const [ValueChange, setValueChange] = useState(0)

  const [data, setData] = useState(new Array<VoucherSubmitClient>());
  const [Check, setCheck] = useState(true)
  const [TotalRow, setTotalRow] = useState(0)

  const onPressSearch = async () => {
    if (Check == true) {
      let dataGetSaleInvoiceNotePrinted = await GetSaleInvoiceConfirm(profileInfo.UserID, pageIndex.toString());
      if (dataGetSaleInvoiceNotePrinted != null) {
        let result = dataGetSaleInvoiceNotePrinted.data;
        if (result?.StatusID == 1) {
          const dataa: Array<VoucherSubmitClient> = result.SubmitList;
          const totalrow: number = await result.TotalRow;
          setTotalRow(totalrow)
          if (!lodash.isEmpty(dataa)) {
            setData([...data, ...dataa])
          } else {
            setCheck(false)
          }
          return data;
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
  }
  const getdata = async () => {
    await onPressSearch();
  }

  useEffect(() => {
    getdata()
  }, [pageIndex, ValueChange])

  const handleLoadMore = async () => {
    if (!lodash.isEmpty(data)) {
      let a = pageIndex;
      a = a + 1;
      setPageIndex(a)
    } else {
      return;
    }
  };

  return {
    userID, setUserID,
    pageIndex, setPageIndex,
    onPressSearch,
    data, setData,
    handleLoadMore,
    TotalRow
  }

}


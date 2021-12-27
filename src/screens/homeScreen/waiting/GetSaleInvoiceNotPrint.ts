import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { waittingNotPrint } from '../../../services/homeScreen/Waitting/WaittingNotPrint';
import { SaleInvoiceClient } from '../../../components/object/Order';
import lodash from 'lodash'
import { ToastAndroid } from 'react-native';

export const GetSaleInvoiceNotPrint = (props: any) => {
  const dispatch = useDispatch();
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID, setUserID] = useState(profileInfo.UserID);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchString, setsearchString] = useState('');
  const [ValueChange, setValueChange] = useState(0)

  const [data, setData] = useState(new Array<SaleInvoiceClient>());
  const [Check, setCheck] = useState(true)
  const [TotalRow, setTotalRow] = useState(0)
  const onPressSearch = async () => {
    if (Check == true) {
      let dataGetSaleInvoiceNotePrinted = await waittingNotPrint(profileInfo.UserID, pageIndex, searchString);
      if (dataGetSaleInvoiceNotePrinted != null) {
        let result = dataGetSaleInvoiceNotePrinted.data;

        if (result?.StatusID == 1) {
          const dataa: Array<SaleInvoiceClient> = result.SaleInvoiceList;
          const totalrow: number = await result.TotalRow;
          setTotalRow(totalrow)
          if (!lodash.isEmpty(dataa)) {
            setData([...data, ...dataa])
          } else {
            setCheck(false)
          }
        }
        else {
          setData([]);
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
  const getdata = async () => {
    await onPressSearch();
  }


  const search = () => {
    setCheck(true)
    setData([])
    if (pageIndex == 1) {
      let value = ValueChange + 1;
      setValueChange(value)
    }
    else {
      setPageIndex(1)
    }

  }
  return {
    userID, setUserID,
    pageIndex, setPageIndex,
    onPressSearch,
    data, setData,
    searchString, setsearchString,
    handleLoadMore, search,
    TotalRow,
  }

}


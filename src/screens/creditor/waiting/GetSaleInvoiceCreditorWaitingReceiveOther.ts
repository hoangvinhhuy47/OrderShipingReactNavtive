import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { GetSaleInvoiceCreditorWaitingReceiveOther } from '../../../services/CreditorScreen/waitingCreditor/GetSaleInvoiceCreditorWaitingReceiveOther';
import { SaleInvoiceClient } from '../../../components/object/Order';
import lodash from 'lodash'
import { ToastAndroid } from 'react-native';


export const getSaleInvoiceCreditorWaitingReceiveOther = (props: any) => {
  const dispatch = useDispatch();
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID, setUserID] = useState(profileInfo.UserID);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageIndex1, setPageIndex1] = useState(2);
  const [searchString, setsearchString] = useState('');
  const [data, setData] = useState(new Array<SaleInvoiceClient>());
  const [Check, setCheck] = useState(true)
  const [TotalRow, setTotalRow] = useState(0)
  const [ValueChange, setValueChange] = useState(0)
  const [IsAbc, setIsAbc] = useState(0)

const onPressSearch = async () => {
    if (Check == true) {
      let dataGetSaleInvoiceCreditorWaitingReceiveOther = await GetSaleInvoiceCreditorWaitingReceiveOther(profileInfo.UserID, pageIndex, searchString);
      if (dataGetSaleInvoiceCreditorWaitingReceiveOther != null) {
        let result = dataGetSaleInvoiceCreditorWaitingReceiveOther.data;
        if (result?.StatusID == 1) {
          const dataa: Array<SaleInvoiceClient> = result.SaleInvoiceList;
          const totalrow: number = await result.TotalRow;
          setTotalRow(totalrow)
          if (!lodash.isEmpty(dataa)) {
            setData([...dataa])
          } else {
            setCheck(false)
          }
        }
        else {
          setData([]);
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
  const onPressSearchLoadMore = async () => {
    if (Check == true) {
      let dataGetSaleInvoiceCreditorWaitingReceiveOther = await GetSaleInvoiceCreditorWaitingReceiveOther(profileInfo.UserID, pageIndex1, searchString);
      if (dataGetSaleInvoiceCreditorWaitingReceiveOther != null) {
        let result = dataGetSaleInvoiceCreditorWaitingReceiveOther.data;
        if (result?.StatusID == 1) {
          const dataa: Array<SaleInvoiceClient> = result.SaleInvoiceList;
          const totalrow: number = await result.TotalRow;
          setTotalRow(totalrow)
          if (!lodash.isEmpty(dataa)) {
            setData([...data,...dataa])
          } else {
            setCheck(false)
          }
        }
        else {
          setData([]);
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
  const getdata2 = async () => {
    await onPressSearchLoadMore();
  }

  useEffect(() => {
    setIsAbc(1);
  }, [pageIndex1, ValueChange, pageIndex])
  const handleLoadMore1 = async () => {
    if (!lodash.isEmpty(data)) {
      let a = pageIndex1;
      a = a + 1;
      setPageIndex1(a)
    } else {
      setCheck(false)
      return;

    }
    
  };
  const handleLoadMore = async () => {
    handleLoadMore1();
    if(IsAbc == 1){
      getdata2();
    }
    
  };

  const search1 = () => {
    setPageIndex1(2)
    setCheck(true)
    setData([])
    if (pageIndex == 1 && pageIndex1 != 2) {
      let value = ValueChange + 1;
      setValueChange(value)
    }
    else {
      setPageIndex(1)
    }

  }
  const search = () => {
   search1();
   if(searchString == ''){
    actionMain.showModalWarm({
        status: true,
        title: 'Thông báo',
        content: 'Vui lòng nhập chứng từ cần tìm!',
      });
   }else{
    if(IsAbc == 1){
        getdata();
      }
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

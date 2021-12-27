import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { GetSaleInvoiceNotPrintByCode } from '../../../services/homeScreen/Detail/GetSaleInvoiceNotPrintByCode';
import { SaleInvoiceClient } from '../../../components/object/Order';
import { SaleInvoiceDetailClient } from '../../../components/object/Order';
import { ToastAndroid } from 'react-native';
export const getSaleInvoiceNotPrintBycode = (props: any) => {
    const { profileInfo } = useSelector((state: any) => ({
        profileInfo: state?.auth?.profileInfo,
    }));
    const dispatch = useDispatch();
    const [dataSaleInvoiceNotPrintCode, setdataSaleInvoiceNotPrintCode] = useState<SaleInvoiceClient>()
    const [dataSaleInvoiceDetailNotPrintCode, setdataSaleInvoiceDetailNotPrintCode] = useState(Array<SaleInvoiceDetailClient>());

    const GetDataCodeNotPrint = async (code: any) => {
        try {
            let dataGetSaleInvoiceNoteReceive = await GetSaleInvoiceNotPrintByCode(profileInfo.UserID, code);
            if (dataGetSaleInvoiceNoteReceive != null) {


                let result = await dataGetSaleInvoiceNoteReceive.data;

                if (result.StatusID == 1) {
                    const data: SaleInvoiceClient = await result.SaleInvoice;

                    setdataSaleInvoiceNotPrintCode(data)

                    const datadetail: Array<SaleInvoiceDetailClient> = await result.SaleInvoiceDetailList;

                    setdataSaleInvoiceDetailNotPrintCode(datadetail)

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

        GetDataCodeNotPrint,
        dataSaleInvoiceNotPrintCode, setdataSaleInvoiceNotPrintCode,
        dataSaleInvoiceDetailNotPrintCode,
        setdataSaleInvoiceDetailNotPrintCode
    }
}
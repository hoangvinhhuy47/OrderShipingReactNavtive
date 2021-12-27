import { $axios } from '../../../constants';
import { useSelector } from 'react-redux';
import store from '../../../redux/store';
import {SaleInvoiceClient,SaleInvoiceDetailClient,PaymentInfo} from '../../../components/object/Order'
import { actionMain } from '../../../utils/mainActions';

export const DebitSaleInvoiceCreditor = async (userId: string, saleInvoice: string,dataPayment:PaymentInfo) => {
    try {
        let body = {
            UserID: userId,
            SaleInvoice: saleInvoice,
            PaymentInfo:dataPayment

        };
        return await $axios.post('DebitSaleInvoiceCreditor', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
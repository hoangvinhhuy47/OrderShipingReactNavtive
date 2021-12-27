import { $axios } from '../../../constants';
import { useSelector } from 'react-redux';
import store from '../../../redux/store';
import { actionMain } from '../../../utils/mainActions';
import {VoucherSubmitDetail,VoucherSubmit} from '../../../components/object/Order'

export const ApplySaleInvoiceCreditorByID = async (userId: string, VoucherSubmit: VoucherSubmit,VoucherSubmitDetail:Array<VoucherSubmitDetail>) => {
    try {
        let body = {
            UserID: userId,
            VoucherSubmit: VoucherSubmit,
            VoucherSubmitDetailList: VoucherSubmitDetail,
        };
        return await $axios.post('ApplySaleInvoiceCreditorByID', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
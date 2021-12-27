import { $axios } from '../../../constants';
import { useSelector } from 'react-redux';
import store from '../../../redux/store';
import { actionMain } from '../../../utils/mainActions';

export const GetSaleInvoiceNoPrintById = async (userId: string, idDetail: string) => {
    try {
        return await $axios.get('GetSaleInvoiceNotPrintById', {
            params: {
                userid: userId,
                id: idDetail
            }
        });
    }
    catch (error) {
        actionMain.loading(false, '');
        return null;
    }


};
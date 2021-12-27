import { $axios } from '../../../constants';
import { useSelector } from 'react-redux';
import store from '../../../redux/store';
import { actionMain } from '../../../utils/mainActions';

export const GetSaleInvoiceCreditorById = async (userId: string, idDetail: string) => {
    try {
        return await $axios.get('GetSaleInvoiceCreditorById', {
            params: {
                userid: userId,
                id: idDetail
            }
        });
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }


};
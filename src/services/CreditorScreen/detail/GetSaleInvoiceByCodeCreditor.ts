import { $axios } from '../../../constants';
import { useSelector } from 'react-redux';
import store from '../../../redux/store';
import { actionMain } from '../../../utils/mainActions';

export const GetSaleInvoiceCreditorByCode = async (userId: string, codeString: string) => {
    try {
        return await $axios.get('GetSaleInvoiceCreditorByCode', {
            params: {
                userid: userId,
                code: codeString
            }
        });
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }



};
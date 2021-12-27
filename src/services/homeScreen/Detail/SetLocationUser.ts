import { $axios } from '../../../constants';
import { useSelector } from 'react-redux';
import store from '../../../redux/store';
import {SaleInvoiceClient,SaleInvoiceDetailClient,PaymentInfo} from '../../../components/object/Order'
import { actionMain } from '../../../utils/mainActions';

export const SetLocationUser = async (userId: string, AddressID: string,Latitue:string,Longitue:string) => {
    try {
        let body = {
            UserID: userId,
            AddressID: AddressID,
            Latitue:Latitue,
            Longitue:Longitue

        };
        return await $axios.post('SetLocation', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
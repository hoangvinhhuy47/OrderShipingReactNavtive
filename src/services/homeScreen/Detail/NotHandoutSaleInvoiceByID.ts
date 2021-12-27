import {$axios} from '../../../constants';
import {useSelector} from 'react-redux';
import store from '../../../redux/store';
import { actionMain } from '../../../utils/mainActions';

export const NotHandoutSaleInvoiceByID = async (userId: string,saleInvoiceID:string,reasonString) => {
    try {
      let body = {
          UserID: userId,
          SaleInvoiceID: saleInvoiceID,
          Reason:reasonString
        };
      return await $axios.post('NotHandoutSaleInvoiceByID', body);
    } catch (error) {
      actionMain.loading(false, '');
      return null;
    }
  };
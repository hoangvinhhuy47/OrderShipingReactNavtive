import {$axios} from '../../../constants';
import {useSelector} from 'react-redux';
import store from '../../../redux/store';
import { actionMain } from '../../../utils/mainActions';


  export const ReturnSaleInvoiceCreditor = async (userId: string, saleInvoiceID: string) => {
    try {
      let body = {
          UserID: userId,
          SaleInvoiceID: saleInvoiceID,
        };
      return await $axios.post('ReturnSaleInvoiceCreditor', body);
    } catch (error) {
      actionMain.loading(false, '');
      return null;
    }
  };

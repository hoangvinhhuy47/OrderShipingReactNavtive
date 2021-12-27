import {$axios} from '../../../constants';
import {useSelector} from 'react-redux';
import store from '../../../redux/store';
import { actionMain } from '../../../utils/mainActions';


  export const ReceiveSaleInvoiceByCode = async (userId: string, CodeString: string) => {
    try {
      let body = {
          UserID: userId,
          SaleInvoiceCode: CodeString,
        };
      return await $axios.post('ReceiveSaleInvoiceByCode', body);
    } catch (error) {
      actionMain.loading(false, '');
      return null;
    }
  };

import {$axios} from '../../../constants';
import {useSelector} from 'react-redux';
import store from '../../../redux/store';
import { actionMain } from '../../../utils/mainActions';

export const DeleteSaleInvoiceCreditorSubmit = async (userId: string, voucherSubmitID: string) => {
    try {
      let body = {
          UserID: userId,
          VoucherSubmitID: voucherSubmitID,
        };
      return await $axios.post('DeleteSaleInvoiceCreditorSubmit', body);
    } catch (error) {
      actionMain.loading(false, '');
      return null;
    }
  };
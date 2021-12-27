import {$axios} from '../../../constants';
import {useSelector} from 'react-redux';
import store from '../../../redux/store';
import { actionMain } from '../../../utils/mainActions';

export const GetSaleInvoiceConfirm = async (userId: string, pageIndex: string) => {
    try {
      let body = {
          UserID: userId,
          PageIndex: pageIndex,
        };
      return await $axios.post('GetSubmit', body);
    } catch (error) {
      actionMain.loading(false, '');
      return null;
    }
  };
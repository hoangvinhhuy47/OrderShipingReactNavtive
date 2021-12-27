import {$axios} from '../../../constants';
import {useSelector} from 'react-redux';
import store from '../../../redux/store';
import {actionMain} from '../../../utils/mainActions'

  export const WaitingCreditor = async (userId: string, pageIndex: number,searchString:string) => {
    try {
      let body = {
          UserID: userId,
          PageIndex: pageIndex,
          SearchString:searchString
        };
      return await $axios.post('GetSaleInvoiceCreditorWaitingReceive', body);
    } catch (error) {
      actionMain.loading(false, '');
      return null;
    }
  };
 
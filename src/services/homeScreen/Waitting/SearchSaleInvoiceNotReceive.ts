import {$axios} from '../../../constants';
import {useSelector} from 'react-redux';
import store from '../../../redux/store';
import {actionMain} from '../../../utils/mainActions'

  export const SearchSaleInvoiceNotReceive = async (userId: string, searchString: string,pageIndex:number) => {
    try {
      let body = {
          UserID: userId,
          PageIndex:pageIndex,
          SearchString: searchString
        };
      return await $axios.post('SearchSaleInvoiceNotReceive', body);
    } catch (error) {
      actionMain.loading(false, '');
      return null;
    }
  };

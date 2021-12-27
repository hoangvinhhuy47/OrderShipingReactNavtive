import {$axios} from '../../../constants';
import {useSelector} from 'react-redux';
import store from '../../../redux/store';
import { actionMain } from '../../../utils/mainActions';

export const GetDataMap = async (userId: string, pageIndex: number) => {
    try {
      let body = {
          UserID: userId,
          PageIndex: pageIndex
        
        };
      return await $axios.post('GetDataMap', body);
    } catch (error) {
      actionMain.loading(false, '');
      return null;
    }
  };
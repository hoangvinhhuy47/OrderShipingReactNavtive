import { $axios } from '../../../constants';
import { useSelector } from 'react-redux';
import store from '../../../redux/store';
import { actionMain } from '../../../utils/mainActions';

export const GetAccountBankingType = async () => {
    try {
        return await $axios.get('GetAccountBankingType', {
            params: {

            }
        });
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }


};
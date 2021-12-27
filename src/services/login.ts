import {$axios} from '../constants';
import {useSelector} from 'react-redux';
import store from '../redux/store'
import { actionMain } from '../utils';

  export const login = async (userName: string, password: string) => {
    try {
      let body = {
          UserName: userName,
          Password: password,
        };
      
      return await $axios.post('CheckLogin', body);
    } catch (error) {
      actionMain.loading(false, '');
      return null;
    }
  };
export const checkSecondLoginServices = async (userName: string, passwordEnscrypt: string)=>{
  try {
    let body = {
      UserName: userName,
      Password: passwordEnscrypt
    }

    return await $axios.post('CheckSecondLogin', body, {transformRequest: [
      function (data, headers) {
        return JSON.stringify(data);
      }
    ], transformResponse:[
      (data)=>{
        return JSON.parse(data)
      }
    ]});
  } catch (error) {
    actionMain.loading(false, '');
    return null;
  }
}
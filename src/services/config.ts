import { $axios } from '../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../utils';

export const configApp = async (urlString: string, siteId: string, storeId: string) => {
  try {
    let deviceName = await DeviceInfo.getDeviceName();
    let body = { DeviceName: deviceName, SiteID: siteId, StoreID: storeId };
    return await $axios.post(urlString + '/API/stock/SetingConfig', body);
  } catch (error) {
    actionMain.loading(false, '');
    return null;
  }
};

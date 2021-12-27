import React, { useEffect, useState } from 'react';
import {
  BackHandler,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { configApp } from '../../services/config';
import { ModalCustom } from '../../components/modal';
import { actionMain } from '../../utils/mainActions';
import getDataByThing from '../../utils/getDataByThing';
import Toast from 'react-native-toast-message';
import urlExist from 'url-exist';

export const configApi = (props: any) => {
  const dispatch = useDispatch();

  const [guidId, setGuidId] = useState('');
  const [siteId, setSiteId] = useState('');
  const [storeId, setStoreId] = useState('');
  const [urlString, setUrlString] = useState('');
  const onPress = async () => {
    let isValidUrl = getDataByThing.validateURL(urlString);
    if (!isValidUrl || !urlString && !siteId && !storeId) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi, hãy kiểm tra lại!',
      });
    }
    else if (urlString && siteId && storeId && isValidUrl) {
      let a = getDataByThing.lowerCaseText(urlString)
      actionMain.loading(true, '');
      if (await urlExist(a)) {
        let _configApp = await configApp(urlString, siteId, storeId);
        if (_configApp != null) {
          let result = _configApp.data
          if (result?.StatusID == 1) {
            const dataConfig = {
              GuidID: result?.GUID,
              SiteID: siteId,
              StoreID: storeId,
              UrlString: urlString
            };
            dispatch({ type: 'CONFIG_SUCCESS', payload: dataConfig });
          }
          else {
            actionMain.showModalWarm({
              status: true,
              title: "Đăng Nhập Thất Bại",
              content: "Dữ Liệu Của Bạn Không Đúng",
            })
          }
        }
        else {
          actionMain.showModalWarm({
            status: true,
            title: 'Lỗi',
            content: 'Vui Lòng Kiểm Tra Kết Nối Mạng',
          });
        }
        //console.log(configApp);

      } else {
        actionMain.loading(false, '');
        actionMain.showModalWarm({
          status: true,
          title: "Đăng Nhập Thất Bại",
          content: "Lỗi! vui lòng kiểm tra lại WebAIP",
        })
      }
    } else if (!siteId) {
      Toast.show({
        type: 'error',
        text1: 'Mã công ty bị trống!',
      });
    } else if (!storeId) {
      Toast.show({
        type: 'error',
        text1: 'Mã cửa hàng bị trống!',
      });
    }
  };

  const onPressBack = (value: any) => {
    dispatch({ type: 'CLEAR_CONFIG' });
    BackHandler.exitApp();
    // }

  };
  return {
    guidId,
    setGuidId,
    siteId,
    setSiteId,
    storeId,
    setStoreId,
    urlString,
    setUrlString,
    onPress,
    onPressBack,
  };
};

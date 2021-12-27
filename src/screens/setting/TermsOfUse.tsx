import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { BackgroundDetailCellScreen } from '../../components/backgroundScreen/backgroudDetailCellScreen/BackgroundDetailCellScreen.view';
import { WebView } from 'react-native-webview';

const TermsOfUse = (props: any) => {
  const goBack = () => {
    props.navigation.goBack()
  }
  return (
    <BackgroundDetailCellScreen goBack = {() => goBack()} title='Điều khoản sử dụng' navigation={props.navigation}>
      <WebView source={{ uri: 'https://nguyenhafood.vn/blog/quy-dinh-va-chinh-sach/dieu-khoan-su-dung-17' }}/>
    </BackgroundDetailCellScreen>
  );
};

export default TermsOfUse;

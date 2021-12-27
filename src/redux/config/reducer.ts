import { types } from './actions';

const initState = {
  UrlString: '',
  GuidID: '',
  SiteID: '',
  StoreID: '',
  isCodePush: false
};
export const configReducer: any = (state = initState, actions: any) => {
  const { payload } = actions;
  switch (actions.type) {
    case types.CONFIG:
      return { ...state, token: '' };
    case types.CONFIG_FAIL:
      return { ...state, token: '', messAuth: payload };
    case types.CONFIG_SUCCESS:
      return { ...payload };
    case types.SET_CONFIG_INFO:
      return { ...state };
    case types.CLEAR_CONFIG:
      return { ...state, UrlString: '', GuidID: '', SiteID: '', StoreID: '' };
    case types.SET_CODEPUSH:
      return { ...state, isCodePush: payload };
    default:
      return state;
  }
};

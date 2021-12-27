export const types = {
    CONFIG: 'CONFIG',
    CONFIG_SUCCESS: 'CONFIG_SUCCESS',
    CONFIG_FAIL: 'CONFIG_FAIL',
    SET_CONFIG_INFO: 'SET_CONFIG_INFO',
    CLEAR_CONFIG: 'CLEAR_CONFIG',
    SET_CODEPUSH: 'SET_CODEPUSH',
    
  };
  const action = (type: string, payload?: any) => ({type, payload});
  export const configAction = {
    config: (payload: any) => action(types.CONFIG, payload),
    configSuccess: (payload: any) => action(types.CONFIG_SUCCESS, payload),
    configFail: (payload: any) => action(types.CONFIG_FAIL, payload),
    setConfigInfo: (payload: any) => action(types.SET_CONFIG_INFO, payload),
    clearConfig: (payload: any) => action(types.CLEAR_CONFIG, payload),
    setCodePush: (payload: any) => action(types.SET_CODEPUSH, payload)
  };

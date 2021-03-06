export const types = {
    SET_LOADING: 'SET_LOADING',
    SET_SPLASH_LOAD: 'SET_SPLASHLOAD',
    SET_SPLASH_LOAD_SECOND_LOGIN: 'SET_SPLASH_LOAD_SECOND_LOGIN'
}
const action = (type: string, payload?: any) => ({type, payload});

export const systemAction = {
    setLoading: (payload: any) => action(types.SET_LOADING, payload),
    setSplashLoad: (payload: any) => action(types.SET_SPLASH_LOAD, payload),
    setSplashLoadSecondLogin: (payload: any)=>action(types.SET_SPLASH_LOAD_SECOND_LOGIN, payload)
}
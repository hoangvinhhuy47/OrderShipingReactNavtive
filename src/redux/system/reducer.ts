import {types} from './actions';

const initState = {
    isLoading: false,
    message: '',
    splashLoad: true,
    splashLoadSecondLogin: true
};

export const systemReducer: any = (state = initState, actions: any) => {
    const {payload} = actions;
    switch (actions.type) {
      case types.SET_LOADING:
        return {...state, isLoading: payload.status, message: payload.message};
      case types.SET_SPLASH_LOAD:
        return {...state, splashLoad: payload};
        case types.SET_SPLASH_LOAD_SECOND_LOGIN:
        return {...state, splashLoadSecondLogin: false};
      default:
        return state;
    }
};
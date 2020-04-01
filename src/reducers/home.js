import * as types from '../actions/types';

const initialState = {
    isLoading: '',
    CATEGORYALL:''
};
export default function (state = initialState, action = {}) {
    switch (action.type) {
        case types.IS_LOADING:
            return {
                ...state,
                isLoading: action.bool
            }
        case types.CATEGORYALL:
            return {
                ...state,
                CATEGORYALL: action.data
            }
        default:
            return state;
    }
}
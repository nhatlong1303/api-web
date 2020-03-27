import * as types from '../actions/types';

const initialState = {
    isLoading:''
};
export default function (state = initialState, action = {}) {
    switch (action.type) {
        case types.IS_LOADING:
            return{
                ...state,
                isLoading:action.bool
            }
        default:
            return state;
    }
}
import * as Types from './types';
import Api from '../services/api';

export function categoryLV0(param, cb) {
    return (dispatch) => {
        Api.post('/category', param)
            .then(result => {
                if (result && result.code === 200) {
                    if (cb) cb(null, result.data);
                } else {
                    if (cb) cb(result.data, null);
                }
            });
    };
}
export function categoryAll(param, cb) {
    return (dispatch) => {
        Api.post('/categoryAll', param)
            .then(result => {
                if (result && result.code === 200) {
                    if (cb) cb(null, result.data);
                    dispatch(listCategoryAll(result.data))
                } else {
                    if (cb) cb(result.data, null);
                    dispatch(listCategoryAll(result.data))
                }
            });
    };
}
function listCategoryAll(data) {
    return {
        type: Types.CATEGORYALL,
        data
    }
}

export function products(param, cb) {
    return (dispatch) => {
        Api.post('/products/category', param)
            .then(result => {
                if (result && result.code === 200) {
                    if (cb) cb(null, result.data);
                } else {
                    if (cb) cb(result.data, null);
                }
            });
    };
}
export function isLoading(bool) {
    return {
        type: Types.IS_LOADING,
        bool
    }
}



//import * as Types from './types';
import Api from '../services/api';

export function onDelete(param, cb) {
    return (dispatch) => {
        Api.post('/products/delete', param)
            .then(result => {
                if(result && result.code===200 ) {
                    if(cb) cb(null, result);
                } else {
                    if(cb) cb(result, null);
                }
            });
    };
}
export function onInsert(param, cb) {
    return (dispatch) => {
        Api.post('/products/insert', param)
            .then(result => {
                if(result && result.code===200 ) {
                    if(cb) cb(null, result);
                } else {
                    if(cb) cb(result, null);
                }
            });
    };
}
export function onUpdate(param, cb) {
    return (dispatch) => {
        Api.post('/products/update', param)
            .then(result => {
                if(result && result.code===200 ) {
                    if(cb) cb(null, result);
                } else {
                    if(cb) cb(result, null);
                }
            });
    };
}


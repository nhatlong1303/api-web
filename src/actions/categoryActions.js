import Api from '../services/api';
export function onDelete(param, cb) {
    return (dispatch) => {
        Api.post('/category/delete', param)
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
        Api.post('/category/insert', param)
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
        Api.post('/category/update', param)
            .then(result => {
                if(result && result.code===200 ) {
                    if(cb) cb(null, result);
                } else {
                    if(cb) cb(result, null);
                }
            });
    };
}


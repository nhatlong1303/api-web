import * as Types from './types';
import Api from '../services/api';

export function categoryLV0(param, cb) {
    return (dispatch) => {
        global.db.collection('category').where('categoryParent', '==', '0').get().then((querySnapshot) => {
            if (cb) cb(null, querySnapshot.docs);
        }).catch(function (error) {
            if (cb) cb(null, null);
        });
    };
}
export function categoryAll(param, cb) {
    return (dispatch) => {
        global.db.collection('category').get().then((querySnapshot) => {
            if (cb) cb(null, querySnapshot.docs);
            dispatch(listCategoryAll(querySnapshot.docs))
        }).catch(function (error) {
            if (cb) cb(null, null);
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
        if (param.Level3 !== undefined) {
            global.db.collection('products').where('Level1', '==', param.Level1).where('Level2', '==', param.Level2).where('Level3', '==', param.Level3).get().then((querySnapshot) => {
                if (cb) cb(null, querySnapshot.docs);
            }).catch(function (error) {
                if (cb) cb(null, null);
            });
        } else if (param.Level2 !== undefined) {
            global.db.collection('products').where('Level1', '==', param.Level1).where('Level2', '==', param.Level2).get().then((querySnapshot) => {
                if (cb) cb(null, querySnapshot.docs);
            }).catch(function (error) {
                if (cb) cb(null, null);
            });
        } else {
            global.db.collection('products').where('Level1', '==', param.Level1).get().then((querySnapshot) => {
                if (cb) cb(null, querySnapshot.docs);
            }).catch(function (error) {
                if (cb) cb(null, null);
            });
        }


    };
}
export function isLoading(bool) {
    return {
        type: Types.IS_LOADING,
        bool
    }
}



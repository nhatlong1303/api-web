//import Config from '../actions/config';
//import {browserHistory} from "react-router";
// const Config ='http://apricot.diginet.com.vn:4002/ioms/public/api'; //server test


const Config = 'http://localhost:3000'; //server chính

localStorage.setItem('API',Config)
class Api {
    static headers() {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': 'content-type,Authorization,secret'
        };

        headers.Authorization = "Bearer " + JSON.parse(localStorage.getItem('TOKEN'));
        return headers;
    }

    static get(route, params) {
        return this.xhr(route, params, 'GET');
    }

    static put(route, params) {
        return this.xhr(route, params, 'PUT');
    }

    static post(route, params) {
        return this.xhr(route, params, 'POST');
    }

    static delete(route, params) {
        return this.xhr(route, params, 'DELETE')
    }

    static upload(route, params) {
        const url = Config + route;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'token': JSON.parse(localStorage.getItem('TOKEN'))
            },
            body: params
        };

        return fetch(url, options)
            .then(resp => {
                if (resp && resp.ok) {
                    return resp.json();
                }

                return resp.json().then(err => { Api.checkSystemError(err); });
            });
    } F
    static xhr(route, params, method) {

        let url = route.indexOf("://");
        url = url === -1 ? Config + route : route;
        const options = {
            method: method,
            headers: Api.headers(),
            body: params ? JSON.stringify(params) : null
        };

        // console.log('==== url: ', url);
        // console.log('==== options: ', options);

        return fetch(url, options)
            .then(async (resp) => {
                if (resp && resp.ok) {
                    // console.log('===== API.xhr => data:', resp);
                    try {
                        const data = await resp.json();

                        // console.log('===== API.xhr => data:', data);
                        if (data && data.code && parseInt(data.code, 10) === 2000) {
                            return data;
                        } else {
                            return Api.checkSystemError(data);
                        }

                    } catch (e) {
                        return Api.checkSystemError({ code: 'SYS001', message: 'System error!' });
                    }
                } else {
                    return Api.checkSystemError({ code: 'SYS001', message: 'System error!' });
                }
            }).catch(e => Api.checkSystemError(e));
    }

    static checkSystemError = (error) => {
        const code = error.code || null;

        switch (code) {
            case "SYS001":
                error = { code: 'SYS001', message: 'System error!' };
                break;
            case "SYS002":
                error = { code: 'SYS002', message: "Authentication token is required" };
                alert("Vui lòng đăng nhập.");
                // Config.logout();
                break;
            case "SYS003":
                error = { code: 'SYS003', message: "Authentication token are not matching" };
                alert("Bạn đã đăng nhập tài khoản trên một thiết bị khác.\nVui lòng đăng nhập lại.");
                break;
            case "SYS004":
                error = { code: 'SYS004', message: "Authentication token is expired" };
                alert("Phiên làm việc đã hết hạn.\nVui lòng đăng nhập lại.");
                break;
            case "SYS005":
                error = { code: 'SYS005', message: "Authentication error request timeout" };
                break;
            case "SYS006":
                error = { code: 'SYS006', message: "Update token fail" };
                break;
            case "SYS007":
                error = { code: 'SYS007', message: "Socket error" };
                break;
            case "SYS008":
                error = { code: 'SYS008', message: "The data is not in JSON format" };
                break;
            case "SYS009":
                error = { code: 'SYS009', message: "The data is not in list" };
                break;
            case "SYS010":
                error = { code: 'SYS010', message: "The data is not number" };
                break;
            case "SYS011":
                error = { code: 'SYS011', message: "The data is unique" };
                break;
            case "SYS500":
                error = { code: 'SYS500', message: "The unknown error has occurred" };
                break;
            default:
                error = { code: 'SYS500', message: "The unknown error has occurred", ...error };
                break;
        }

        if (error.code === 'SYS500' || error.code === 'SYS001') {
            // browserHistory.push(Config + '/error-page');
            return true;
        }
        if (error.code === 'SYS002' || error.code === 'SYS003') {
            //Config.logout();
            return true;
        }
        else return error;
    }
}

export default Api;
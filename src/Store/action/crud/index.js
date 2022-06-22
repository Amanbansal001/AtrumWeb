import { 
    GET,
    POST,
    DELETE,
    API_INVOCATION } from "../../actionType";
import * as constdata from '../../../Utils/constants';
import * as consturl from '../../../Utils/url';
import * as token from '../../../Utils/token';

export const _list = (endpoint,_payload, resolve, reject) => {
    
    const url = `${consturl.BASE_URL.API}/${endpoint}${_payload}`;
    const authToken = token.authToken();
    const payload = {
        action: GET,
        isLoader:true,
        method: constdata.GET,
        apiConfig: {
            headers: {...constdata.HEADERS,...authToken}
        },
        url: url,
        resolve,
        reject
    };
    return { type: API_INVOCATION, payload };
}

export const _get = (endpoint,_payload, resolve, reject) => {
    
    const url = `${consturl.BASE_URL.API}/${endpoint}`;
    const authToken = token.authToken();
    const payload = {
        action: GET,
        isLoader:true,
        method: constdata.GET,
        apiConfig: {
            headers: {...constdata.HEADERS,...authToken}
        },
        url: url,
        resolve,
        reject
    };
    return { type: API_INVOCATION, payload };
}

export const _post = (endpoint,_payload, resolve, reject,isLoader=true) => {
    
    const url = `${consturl.BASE_URL.API}/${endpoint}`;
    const authToken = token.authToken();
    const payload = {
        action: POST,
        isLoader:true,
        method: constdata.POST,
        apiConfig: {
            headers: {...constdata.HEADERS,...authToken}
        },
        url: url,
        data:_payload,
        resolve,
        reject,
        isLoader
    };
    return { type: API_INVOCATION, payload };
}

export const _post_form = (endpoint,_payload, resolve, reject) => {
    
    const url = `${consturl.BASE_URL.TEST_API}/${endpoint}`;
    const authToken = token.authToken();
    const payload = {
        action: POST,
        isLoader:true,
        method: constdata.POST,
        apiConfig: {
            headers: {...constdata.HEADERS_UPLOAD,...authToken}
        },
        url: url,
        data:_payload,
        resolve,
        reject
    };
    return { type: API_INVOCATION, payload };
}

export const _put = (endpoint,_payload, resolve, reject) => {
    
    const url = `${consturl.BASE_URL.API}/${endpoint}`;
    const authToken = token.authToken();
    const payload = {
        action: POST,
        isLoader:true,
        method: constdata.PUT,
        apiConfig: {
            headers: {...constdata.HEADERS,...authToken}
        },
        url: url,
        data:_payload,
        resolve,
        reject
    };
    return { type: API_INVOCATION, payload };
}

export const _delete = (endpoint,_payload, resolve, reject) => {
    
    const url = `${consturl.BASE_URL.API}/${endpoint}`;
    const authToken = token.authToken();
    const payload = {
        action: DELETE,
        isLoader:true,
        method: constdata.DELETE,
        apiConfig: {
            headers: {...constdata.HEADERS,...authToken}
        },
        url: url,
        resolve,
        reject
    };
    return { type: API_INVOCATION, payload };
}
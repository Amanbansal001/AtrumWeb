import { LOGIN_WITH_PASSWORD, API_INVOCATION } from "../../actionType";
import * as constdata from '../../../Utils/constants';
import * as consturl from '../../../Utils/url';

export const login = (script,_payload, resolve, reject) => {

    const url = `${consturl.BASE_URL.API}/${script}`;
    
    const payload = {
        action: LOGIN_WITH_PASSWORD,
        isLoader:true,
        method: constdata.POST,
        apiConfig: {
            headers: {...constdata.HEADERS}
        },
        url: url,
        data:_payload,
        resolve,
        reject
    };

    return { type: API_INVOCATION, payload };
}

export const _otp = (script,_payload, resolve, reject) => {

    const url = `${consturl.BASE_URL.API}/${script}`;
    
    const payload = {
        action: LOGIN_WITH_PASSWORD,
        isLoader:true,
        method: constdata.POST,
        apiConfig: {
            headers: {...constdata.HEADERS}
        },
        url: url,
        data:_payload,
        resolve,
        reject
    };

    return { type: API_INVOCATION, payload };
}
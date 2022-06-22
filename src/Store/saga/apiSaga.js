import { CancelToken } from "axios";
import { actionChannel, take, fork, call, put } from "redux-saga/effects";
import getAxios from "./axiosAPI";
import history from '../history/history';
import { toast } from 'react-toastify'; 
import * as utils from '../../Utils';
var https = require('https');

const pendingRequests = {};

// At request level
const agent = new https.Agent({  
  rejectUnauthorized: false
});

const similarPendingRequestExist = (actionType, url) =>
  pendingRequests[actionType] && pendingRequests[actionType].url === url;

function* invokeAPI(action) {
  const { payload } = action;
  const {
    method,
    url,
    data,
    apiConfig,
    action: actionType,
    resolve,
    reject,
    isLoader,
  } = payload;
  try {
    let response = {};

    if(isLoader){
      utils.showLoader();
    }
    const api = getAxios();
    switch (method) {
      case "GET": {
        if (similarPendingRequestExist(actionType, url)) {
          throw new Error("Similar axios request detected!");
        } else {
          const source = CancelToken.source();
          const cancelToken = source.token;
          pendingRequests[actionType] = { url, api, source };

          response = yield call([api, api.get], url, {
            ...apiConfig,
            cancelToken,
          });
        }
        break;
      }
      case "POST":
        response = yield call([api, api.post], url, data, { ...apiConfig,...agent });
        break;

      case "PUT":
        response = yield call([api, api.put], url, data, { ...apiConfig });
        break;

      case "PATCH":
        response = yield call([api, api.patch], url, data, { ...apiConfig });
        break;

      case "DELETE":
        response = yield call([api, api.delete],url,{ ...apiConfig });
        break;

      case "EMPTY":
        response = { status: 200, data: { status: 200 } }
        break;

      default:
        throw new Error(`API method ${method} is not supported!`);
    }


    utils.hideLoader();


    if (response.status === Number(200)
      || response.status === Number(201)
      || response.status === Number(201)
    ) {
      
      yield* dispatchFulfilled(action, response.data);
      

    } else if (response.status === Number(401)) {

      localStorage.clear();
      toast.error(`Session Timed out! Please login again`);
      yield call(forwardTo, '/');

      yield* dispatchRejected(payload.action, action, "Internal server error");
      
    } else {
      yield* dispatchRejected(payload.action, action, "Internal server error");
   
    }
    delete pendingRequests[actionType];
    if (resolve) {
      resolve(response.data);
    }
  } catch (error) {
    utils.hideLoader();

    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href="/";
    }
    yield* dispatchFulfilled(action, { status: 200, data: {} });
    if (reject) {
      reject(error);
    }
  } finally {
    
  }
}

function forwardTo(location) {
  history.push(location);
}

function* dispatchFulfilled(action, response) {
  yield put({ type: `${action.payload.action}_SUCCESS`, payload: response });
}

function* dispatchRejected(actionType, action, error) {
  yield put({
    type: `${actionType}_ERROR`,
    actualAction: action,
    payload: { response: error },
  });
}

function* apiSaga() {
  const actionQueue = yield actionChannel("API_INVOCATION");
  while (true) {
    const action = yield take(actionQueue);
    yield fork(invokeAPI, action);
  }
}

export { invokeAPI };
export default apiSaga;

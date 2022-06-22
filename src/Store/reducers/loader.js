import {
    START_LOADER,
    STOP_LOADER,
    SHOW_TOAST_MESSAGE,
    RESET_SHOW_TOAST_MESSAGE
} from "../actionType";
const INITIAL_STATE = {
    loaderStatus: false,
    toast: {
        message: null,
        type: null,
    }
};
const loader = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case START_LOADER:
            return {
                ...state,
                loaderStatus: true,
            };
        case STOP_LOADER:
            return {
                ...state,
                loaderStatus: false,
            };
        case SHOW_TOAST_MESSAGE:
            return {
                ...state,
                toast: {
                    message: action.payload.message,
                    type: action.payload.type,
                }
            };
        case RESET_SHOW_TOAST_MESSAGE:
            return {
                ...state,
                toast: INITIAL_STATE.toast
            };
        default:
            return state
    }
};
export default loader;
import {
    SHOW_TOAST_MESSAGE,
    RESET_SHOW_TOAST_MESSAGE,
    START_LOADER,
    STOP_LOADER
} from "../../actionType";

export const setStartLoader = _payload => {
    return { type: START_LOADER, payload: _payload }
}

export const setStopLoader = _payload => {
    return { type: STOP_LOADER, payload: _payload }
};

export const showToastMessage = _payload => {
    return { type: SHOW_TOAST_MESSAGE, payload: _payload }
};

export const resetToastMessage = _payload => {
    return { type: RESET_SHOW_TOAST_MESSAGE, payload: _payload }
};
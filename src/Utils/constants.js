export const LOCALSTORAGE = {
    translations: "translations",
    lang: "lang"
}

export const FALLBACK_LANG = "en";

export const LANG = localStorage.getItem("lang") || FALLBACK_LANG;

// Request Methods
export const GET = "GET"
export const POST = "POST"
export const PATCH = "PATCH"
export const PUT = "PUT"
export const DELETE = "DELETE"

// Headers
export const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key':`DSJOTPTcUhj2U9ghp2YztjLyx0HtbiP4`,
    'x-app-name':`atrumart.com`,
    'x-app-type':`web`,
    'x-app-version':`10.0.1`
};

export const HEADERS_UPLOAD = {
    'Content-Type': 'multipart/form-data',
};

export const ROLE_TYPE={
    PLANT_USER:"PLANT USER",
    PLANT_HEAD:"PLANT HEAD",
    HO_ADMIN:"HO ADMIN"
};

export const HYPERPAY_URL= `https://oppwa.com`;

// API
export const LOGIN = "auth/login";
export const OTP = "otp";
export const INVENTORY = "inventory";
export const DAILY_INVENTORY = "inventory/daily";
export const PLANTS = "plant";
export const PRODUCTS = "product";
import { ROLE_TYPE } from "./constants";

export const getTokenCookie = () => {
  let allcookies = document.cookie.split(';');
  let token = false;
  for (let i = 0; i < allcookies.length; i++) {
    if (allcookies[i].split("=")[0].trim() === "access_token") {
      token = allcookies[i].split("=")[1];
    }
  }

  return token;
};

export const setToken = (access_token) => {

  let token = localStorage.setItem("access_token", access_token);

  return token;
};

export const parseJwtAndSave =(token)=> {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  jsonPayload =  JSON.parse(jsonPayload).user;
  setProfile(jsonPayload);
};

export const setProfile = (data) => {

  let token = localStorage.setItem("profile", JSON.stringify(data));

  return token;
};

export const getToken = () => {

  let token = localStorage.getItem("access_token");

  return token;
};

export const getProfile =()=> {

  let token = JSON.parse(localStorage.getItem("profile"));

  return token;
};


export const isLogin = () => {

  let token = localStorage.getItem("access_token");
  if (token) {
    return true;
  }
  return false;
};

export const logout = (props) => {
  localStorage.clear();
  props.history.push('/logout');
}

export const logoutRedirect = (props) => {
  localStorage.clear();
  props.history.push('/?logout=true');
}

export const authToken = () => {
  const token = getToken();
  if(!token){return null}
  return {
    "Authorization": `Bearer ${token}`
  }
};

export const loginToken = (email, password) => {
  return {
    "Authorization": 'Basic ' + btoa(email + ':' + password)
  }
};

export const gotoDashboard = (props,data) => {
  setTimeout(() => {
    if(data.roleType===ROLE_TYPE.HO_ADMIN){
      props.history.push('/toll-ops');
    }else{
      props.history.push('/dashboard');
    }
    
  }, 500);
}




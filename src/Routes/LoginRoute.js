import React from 'react';  
import { Redirect, Route } from 'react-router-dom';
 import {getToken} from '../Utils/token';
const LoginRoute = ({ component: Component,trackPage ,...rest }) => {
  const userToken = getToken();
  return (
      <Route {...rest} render={props => {
        return (
          (!userToken ?
              <Component {...props} {...rest}/>
              :
              <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
        )
      }
    }/>
  );
};

export default LoginRoute; 
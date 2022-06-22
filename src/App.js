import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import routes from "./Routes/Routes";
import history from "./Store/history/history";
import PrivateRoute from './Routes/PrivateRoutes';
import ToastMessage from './Components/ToastMessage';
import { showToastMessage, resetToastMessage, setStartLoader, setStopLoader } from './Store/action/loader';


console.log = () => {}
console.error = () => {}
console.debug = () => {}
console.warn = () => {}

function App(props) {
  const {
    toast,
  } = props
  const resolvePrivateRoutes = (routes) => {
    
    if (routes && Array.isArray(routes)) {
      return routes.map((route) => {
        if (route.isPrivate) {
          route.render = (props) => (
            <PrivateRoute component={route.component} {...props}/>
          );
        }
        if (route.isAuth) {
          route.render = (props) => (
            <PrivateRoute component={route.component} {...props}/>
          );

        }
        if (route.routes) {
          resolvePrivateRoutes(route.routes);
        }
        return route;
      });
    }
  };


  return (
    <>
      
      <Router history={history} basename={process.env.PUBLIC_URL}>
        <ToastMessage toastData={toast && toast} />

        {renderRoutes(resolvePrivateRoutes(routes))}

      </Router>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    toast: state.loader.toast,
    loaderStatus: state.loader.loaderStatus,
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    showToastMessage,
    resetToastMessage,
    setStartLoader,
    setStopLoader,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

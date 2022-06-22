import React, { Suspense } from "react";
import { renderRoutes } from "react-router-config";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";

const LoaderLocal = () => (
  <></>
)
const Guest = (props) => {
  const {
    route,
  } = props;

  return (
    <div>

      <Suspense
        fallback={<LoaderLocal />}
      >

        <Loader identifier='0' />
        {renderRoutes(route.routes)}

      </Suspense >
    </div>
  );
};

Guest.propTypes = {
  route: PropTypes.object,
};

export default Guest;

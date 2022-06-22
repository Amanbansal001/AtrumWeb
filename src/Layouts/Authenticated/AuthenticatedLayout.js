import React, { Suspense, useEffect } from "react";
import { renderRoutes } from "react-router-config";
import { useLocation } from "react-router";
import LoaderPost from "../../Components/Loader";

const Loader = () => (
  <></>
)

const AuthenticatedLayout = (props) => {

  const { route } = props;
  const location = useLocation();


  useEffect(() => {

    if (location.pathname) {

    }

  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>

      <LoaderPost identifier='0' />

      <Suspense
        fallback={<Loader />}
      >

        {renderRoutes(route.routes)}

      </Suspense >
    </>
  );
};

export default AuthenticatedLayout;

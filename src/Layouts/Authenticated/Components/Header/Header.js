import React, { useEffect } from "react";

const Header = ({ props }) => {

  // const toggleNotificationBox = () => setToggleNotification(true)


  useEffect(() => {



  }, [])// eslint-disable-line react-hooks/exhaustive-deps


  const logout = () => {
    localStorage.clear();
    props.history.push("/");
  };

  return (
    <>


    </>
  );
};

export default Header;

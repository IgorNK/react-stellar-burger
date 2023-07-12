import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../../services/actions/auth";

export const ProtectedRouteElement = ({ authRequired, element }) => {
  const dispatch = useDispatch();
  const { getUserRequest, refreshTokenRequest, user, accessToken } =
    useSelector((store) => store.auth);

  const init = useCallback(() => {
    dispatch(getUser(accessToken));
  }, [accessToken, dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  // While request is pending, show nothing
  if (getUserRequest || refreshTokenRequest) {
    console.log("returning null for now");
    return <h1>Загрузка...</h1>;
  }

  console.log("got past null");

  if (authRequired) {
    console.log("auth required block");
    return user ? element : <Navigate to="/login" replace />;
  } else {
    console.log("auth not required block");
    return user ? <Navigate to="/profile" replace /> : element;
  }
};

import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../../services/actions/auth";
import { GoBack } from "../go-back/go-back";

export const ProtectedRouteElement = ({ authRequired, element }) => {
  const dispatch = useDispatch();
  const { getUserRequest, refreshTokenRequest, user, accessToken } =
    useSelector((store) => store.auth);

  const init = useCallback(() => {
    !user && dispatch(getUser(accessToken));
  }, [accessToken, dispatch, user]);

  useEffect(() => {
    init();
  }, [init]);

  // While request is pending, show nothing
  if (getUserRequest || refreshTokenRequest) {
    return <h1>Загрузка...</h1>;
  }

  if (authRequired) {
    return user ? element : <Navigate to="/login" />;
  } else {
    return user ? <GoBack /> : element;
  }
};

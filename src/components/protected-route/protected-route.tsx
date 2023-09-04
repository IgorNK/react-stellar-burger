import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "../../services/hooks";
import { Navigate } from "react-router-dom";
import { getUser } from "../../services/actions/auth";
import { GoBack } from "../go-back/go-back";
import { getCookie } from "../../utils/cookies";

export const ProtectedRouteElement: React.FC<{
  authRequired: boolean, 
  element: React.ReactElement | React.ReactElement[] | null
}> = ({ authRequired, element }) => {
  const dispatch = useDispatch();
  const { getUserRequest, refreshTokenRequest, user } = useSelector(
    (store) => store.auth
  );

  const init = useCallback(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = getCookie("token");
    if ((refreshToken || accessToken) && !user) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

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

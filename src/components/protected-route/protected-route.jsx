import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom";
import { getUser } from "../../services/actions/auth";

export const ProtectedRouteElement = ({ authRequired, element }) => {
  const dispatch = useDispatch();
  const { getUserRequest, user, accessToken } = useSelector((store) => ({
    getUserRequest: store.auth.getUserRequest,
    user: store.auth.user,
    accesssToken: store.auth.accessToken
  }));
  
  const init = () => {
    dispatch(getUser(accessToken));
  };

  useEffect(() => {
    init();
  }, []);

  // While request is pending, show nothing
  if (getUserRequest) {
    return null;
  }

  // Otherwise, show element or redirect
  const redirect = authRequired ? "/login" : "/profile";
  return user ? element : <Navigate to={redirect} replace/>;
}
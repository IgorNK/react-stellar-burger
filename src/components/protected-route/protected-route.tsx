import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "../../services/hooks";
import { Navigate } from "react-router-dom";
import { getUser } from "../../services/actions/auth";
import { GoBack } from "../go-back/go-back";
import { getCookie } from "../../utils/cookies";

export const ProtectedRouteElement: React.FC<{
  authRequired: boolean;
  element: React.ReactElement;
}> = ({ authRequired, element }) => {
  const dispatch = useDispatch();
  const {
    getUserRequest,
    updateTokenRequest,
    getUserFailed,
    updateTokenFailed,
    refreshUserFailed,
    user,
  } = useSelector((store) => store.auth);

  const init = useCallback(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = getCookie("token");
    if ((refreshToken || accessToken) && !user) {
      dispatch(getUser());
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  if (getUserRequest || updateTokenRequest) {
    console.log("we're in the middle of a request");
    return null;
  }

  if (
    authRequired &&
    (getUserFailed || updateTokenFailed || refreshUserFailed)
  ) {
    console.log("failed to login, returning to login page");
    return <Navigate to="/login" />;
  }

  if (authRequired && user) {
    console.log("youre authed, showing content");
    return element;
  }

  if (!authRequired && !user) {
    console.log("you're not authed, but it's ok");
    return element;
  }

  if (!authRequired && user) {
    console.log("you're authed so you can't see login page! Go back!");
    return <GoBack />;
  }

  if (authRequired && !user) {
    dispatch(getUser());
  }

  console.log("This shouldn't happen");
  return null;

  // if (authRequired) {
  //   if (user) {
  //     console.log("Got user, drawing element");
  //     return element;
  //   } else {
  //     console.log("no user object, redirecting to login");
  //     return <Navigate to="/login" />;
  //   }
  // } else {
  //   if (user) {
  //     console.log("You're logged in, so sending you back");
  //     return <GoBack />;
  //   } else {
  //     console.log("you're not logged in, so it's ok");
  //     return element;
  //   }
  // }
};

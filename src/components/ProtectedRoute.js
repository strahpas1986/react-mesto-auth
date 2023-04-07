import { Navigate } from "react-router-dom";

function ProtectedRouteElement({ component: Component, ...props }) {
  return props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace/>;
}

export default ProtectedRouteElement;

import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";
import { decodedToken } from "../utils/decodedToken";
import { Tuser } from "../redux/featuers/auth/authSlice";

type TProtectRouteProps = {
  children: ReactNode;
  role: string;
};

const ProtectRoute = ({ children, role }: TProtectRouteProps) => {
  const { token } = useAppSelector((state) => state.auth);
  let user;
  if (token) {
    user = decodedToken(token as string);
  }

  if (role !== undefined && role !== (user as Tuser)?.role) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return <>{children}</>;
};

export default ProtectRoute;

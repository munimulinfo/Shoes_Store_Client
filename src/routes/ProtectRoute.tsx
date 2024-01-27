import { ReactNode, useEffect } from "react";

import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
const ProtectRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  if (!token) {
    useEffect(() => {
      navigate("/login", { replace: true });
    }, [token, navigate]);
  }
  return <>{children}</>;
};

export default ProtectRoute;

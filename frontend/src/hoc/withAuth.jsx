import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (Component) => {
  return (props) => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!isLoading && !user && !token) {
        navigate("/login");
      }
    }, [navigate, user, isLoading]);

    if (isLoading) {
      return <Loading />;
    }

    return user ? <Component {...props} /> : null;
  };
};

export default withAuth;

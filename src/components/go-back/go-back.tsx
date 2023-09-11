import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const GoBack: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(-1);
  }, [navigate]);
  return <></>;
};

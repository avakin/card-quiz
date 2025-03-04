import { APP } from "@lib/utils/constants";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";

export const NotFound = () => {
  const redirect = useNavigate();

  const onRedirect = useCallback(() => {
    redirect(APP.routes.home);
  }, [redirect]);

  useEffect(() => {
    onRedirect();
  }, [onRedirect]);

  return null;
};

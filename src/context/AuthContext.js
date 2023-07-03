// ** React Imports
import { createContext, useEffect, useState } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Axios
import axios from "axios";

// ** Config
import authConfig from "src/configs/auth";

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};
const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  // ** States
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(
        authConfig.storageTokenKeyName,
      );
      if (storedToken) {
        setLoading(true);
        await axios
          .get(`${apiUrl}/api/users/me`, {
            headers: {
              Authorization: storedToken,
            },
          })
          .then(async (response) => {
            console.log("responseme", response);
            setLoading(false);
            setUser({ ...response.data });
          })
          .catch(() => {
            localStorage.removeItem("userData");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            setUser(null);
            setLoading(false);
            if (
              authConfig.onTokenExpiration === "logout" &&
              !router.pathname.includes("login")
            ) {
              router.replace("/login");
            }
          });
      } else {
        setLoading(false);
      }
    };
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (params, errorCallback) => {
    params.identifier = params.email;
    axios
      .post(`${apiUrl}/api/auth/local`, params)
      .then(async (response) => {
        console.log("response", response);
        params.rememberMe
          ? window.localStorage.setItem(
              authConfig.storageTokenKeyName,
              "Bearer" + " " + response.data.jwt,
            )
          : null;
        const returnUrl = router.query.returnUrl;
        setUser({ ...response.data.user });
        params.rememberMe
          ? window.localStorage.setItem(
              "userData",
              JSON.stringify(response.data.user),
            )
          : null;
        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";
        router.replace(redirectURL);
      })
      .catch((err) => {
        if (errorCallback) errorCallback(err);
      });
  };
  const handleRegister = (params, errorCallback) => {
    params.username = params.email;
    params.accountType = "landlord";

    axios
      .post(`${apiUrl}/api/auth/local/register`, params)
      .then(async (response) => {
        console.log(response);
        router.push("/login?registration=success");
      });
  };
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    router.push("/login");
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };

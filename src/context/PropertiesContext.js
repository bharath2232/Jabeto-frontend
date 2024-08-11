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
  properties: [],
  propertyById: {},
};
const PropertiesContext = createContext(defaultProvider);

const PropertiesProvider = ({ children }) => {
  // ** States
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);
  const [properties, setProperties] = useState(defaultProvider.properties);
  const [propertyById, setProperty] = useState(defaultProvider.propertyById);
  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(
        authConfig.storageTokenKeyName
      );
      console.log("sssst", storedToken);
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
              "Bearer" + " " + response.data.jwt
            )
          : null;
        const returnUrl = router.query.returnUrl;
        setUser({ ...response.data.user });
        params.rememberMe
          ? window.localStorage.setItem(
              "userData",
              JSON.stringify(response.data.user)
            )
          : null;
        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";
        router.replace(redirectURL);
      })
      .catch((err) => {
        if (errorCallback) errorCallback(err);
      });
  };
  const handelSaveProperty = (params, errorCallback) => {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName
    );
    console.log("param1", params);
    let data = {
      data: params,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/properties`,
      headers: {
        "Content-Type": "application/json",
        Authorization: storedToken,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("prod9", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchProperties = (params, errorCallback) => {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName
    );
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/properties`,
      headers: {
        "Content-Type": "application/json",
        Authorization: storedToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log("setProperties");
        setProperties(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchPropertyById = (id, errorCallback) => {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName
    );
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/properties/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: storedToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log("setProperties");
        setProperty(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    saveProperty: handelSaveProperty,
    fetchProperties: fetchProperties,
    fetchPropertyById: fetchPropertyById,
    properties,
    propertyById,
  };

  return (
    <PropertiesContext.Provider value={values}>
      {children}
    </PropertiesContext.Provider>
  );
};

export { PropertiesContext, PropertiesProvider };

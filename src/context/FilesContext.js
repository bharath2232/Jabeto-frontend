// ** React Imports
import { createContext, useEffect, useState } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Axios
import axios from "axios";

// ** Defaults
const defaultProvider = {
  files: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  upload: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};
const FilesContext = createContext(defaultProvider);
const token = "";
const FilesProvider = ({ children }) => {
  // ** States
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();

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
  const handleUpload = async (files, errorCallback) => {
    console.log("dude", files.files[0]);
    let filesData = new FormData();

    for (const item of files.files) {
      filesData.append("files", item); // appending every file to formdata
    }

    console.log("ffffff", filesData);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:1337/api/upload",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjkwMjgyMjgzLCJleHAiOjE2OTI4NzQyODN9.pfv1ULuRb0KpfYX-O60JWHlrKX6BbvISpXHi2ueRzDk",
        "Content-Type": "multipart/form-data",
      },
      data: filesData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        if (errorCallback) errorCallback(error);
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
    upload: handleUpload,
    logout: handleLogout,
  };

  return (
    <FilesContext.Provider value={values}>{children}</FilesContext.Provider>
  );
};

export { FilesContext, FilesProvider };

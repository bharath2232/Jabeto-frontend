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
  const [files, setFiles] = useState([]);

  const [loading, setLoading] = useState(defaultProvider.loading);
  console.log("heavy user", user);

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
      url: `${apiUrl}/api/upload`,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzEwNzg1Mzk2LCJleHAiOjE3MTMzNzczOTZ9.lDnXW-K5Na-mTyTIzt3O6XR2A8a7Kgf5-gppzwqjVjA",
        "Content-Type": "multipart/form-data",
      },
      data: filesData,
    };

    axios
      .request(config)
      .then((response) => {
        setFiles(response.data);
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
    files,
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

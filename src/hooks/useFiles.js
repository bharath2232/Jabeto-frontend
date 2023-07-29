import { useContext } from "react";
import { FilesContext } from "src/context/FilesContext";
export const useFiles = () => useContext(FilesContext);

import { useContext } from "react";
import { GlobalModalContext } from "../contexts/globalModalContext";

export const useGlobalModal = () => useContext(GlobalModalContext)
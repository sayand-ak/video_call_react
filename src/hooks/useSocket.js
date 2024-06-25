import { useContext } from "react";
import { SocketContext } from "../provider/Socket";

export const useSocket = () => {
    return useContext(SocketContext);
};
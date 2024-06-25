import React, { useMemo } from "react";
import { io } from "socket.io-client";
import PropTypes from "prop-types";

export const SocketContext = React.createContext(null);



export function SocketProvider({ children }) {
    const socket = useMemo(() => io("http://localhost:3001"), []);
    
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}

SocketProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SocketProvider;

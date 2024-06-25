import { useContext } from "react"
import { PeerContext } from "../provider/Peer"

export const usePeer = () => {
    return useContext(PeerContext)
}
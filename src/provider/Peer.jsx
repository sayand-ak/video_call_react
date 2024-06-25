import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const PeerContext = React.createContext();

export function PeerProvider({ children }) {
    const [remoteStream, setRemoteStream] = useState(null);

    const peer = useMemo(() => {
        const pc = new RTCPeerConnection({
            iceServers: [
                {
                    urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
                },
            ],
        });

        pc.addEventListener("track", (event) => {
            setRemoteStream(event.streams[0]);
        });

        return pc;
        
    }, []);

    const createOffer = async () => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
    };

    const createAnswer = async (offer) => {
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(new RTCSessionDescription(answer));
        return answer;
    };

    const setRemoteAns = async (ans) => {
        try {
            await peer.setRemoteDescription(new RTCSessionDescription(ans));
        } catch (error) {
            console.log(error, "setRemoteAns")
        }
    };

    const sendStream = (stream) => {
        if (stream) {
            stream.getTracks().forEach((track) => {
                peer.addTrack(track, stream);
            });
        } else {
            console.error("No stream to send.");
        }
    };
    

    const handleTrackEvent = useCallback((event) => {
        try {
            const stream = event.streams[0];
            setRemoteStream(stream);
        } catch (error) {
            console.log(error, "handleTrackEvent")
        }
    }, []);

    useEffect(() => {
        peer.addEventListener("track", handleTrackEvent);
        return () => {
            peer.removeEventListener("track", handleTrackEvent);
        };
    }, [handleTrackEvent, peer]);

    const hangUp = () => {
        peer.close();
        setRemoteStream(null);
    };

    return (
        <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAns, sendStream, remoteStream, hangUp }}>
            {children}
        </PeerContext.Provider>
    );
}

PeerProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

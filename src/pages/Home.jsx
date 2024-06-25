import { IoVideocam } from "react-icons/io5";
import "./home.css";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function Home () {
    const [email, setEmail] = useState('');
    const [roomId, setRoomId] = useState('');
    const { socket } = useSocket();
    const navigate = useNavigate();

    
    useEffect(() => {
        socket.on("joined-room", ({ roomId }) => {
           navigate(`/room/${roomId}`);
        });
        
        return () => {
            socket.off("joined-room");
        }
    }, [navigate, socket]);

    function handleJoinRoom() {
        socket.emit('join-room', {email: email, roomId: roomId});
    }

    return (
        <div className="h-[100vh] w-[100vw] bg-[#000] overflow-hidden">
            <h1 className="header text-[#fff] w-full bg-[#2672ED] h-[10vh] pl-10 font-semibold text-xl drop-shadow-lg flex gap-3 items-center">
                <IoVideocam className="text-[30px]"/>
                <p>Video caller</p>
            </h1>

            <div className="h-full flex items-center justify-center flex-col">
                <div className="form-container p-16 flex flex-col gap-8 bg-white rounded-[30px] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-[#8886866c]">
                    <h1 className="text-white font-bold text-2xl">Join in a call</h1>
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="email" 
                            className="text-white font-semibold"
                        >
                            Email
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Enter your email"
                            className="w-80 text-sm h-10 rounded-md"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="roomId" 
                            className="text-white font-semibold"
                        >
                            RoomId
                        </label>
                        <input 
                            type="text" 
                            name="roomId" 
                            id="roomId" 
                            placeholder="Enter your email"
                            className="w-80 h-10 text-sm rounded-md"
                            onChange={(e) => setRoomId(e.target.value)}
                        />
                    </div>
                    <div className="w-full h-10">
                        <button 
                            className="bg-[#2672ED] text-white font-semibold py-2 px-5 w-full rounded-md hover:border-[1px] hover:border-[#2672ED] hover:bg-transparent"
                            onClick={handleJoinRoom}
                        >
                            Join
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
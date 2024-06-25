import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import SocketProvider from './provider/Socket'
import { Room } from './pages/Room'
import { PeerProvider } from './provider/Peer'

function App() {

    return (
        <>
            <SocketProvider>
                <PeerProvider>
                    <Router>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/room/:id" element={<Room />} />
                            </Routes>
                    </Router>
                </PeerProvider>
            </SocketProvider>
        </>
    )
}

export default App

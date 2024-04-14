import { Routes, Route } from 'react-router-dom';

import Authentication from './components/Authentication/Authentication';
import Boards from './components/Boards/Boards';
import Board from './components/Board/Board';
import Navbar from './components/Elements/Navbar/Navbar';

import './App.css';
import './styles/colors.css';
import './styles/utilities.css';
import './styles/queries.css';
import AuthenticatedRoutes from './components/ProtectedRoutes/AuthenticatedRoutes';
import GuestRoutes from './components/ProtectedRoutes/GuestRoutes';

const App = () => {
    return (
        <>
            <AuthenticatedRoutes>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Boards />} />
                    <Route path="/board/:id" element={<Board />} />
                </Routes>
            </AuthenticatedRoutes>
            <GuestRoutes>
                <Routes>
                    <Route path="/auth" element={<Authentication />} />
                </Routes>
            </GuestRoutes>
        </>
    );
};

export default App;

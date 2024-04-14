import { Routes, Route } from 'react-router-dom';

import AuthenticatedRoutes from './components/ProtectedRoutes/AuthenticatedRoutes';
import Authentication from './components/Authentication/Authentication';
import GuestRoutes from './components/ProtectedRoutes/GuestRoutes';
import Analytics from './components/Analytics/Analytics';
import Boards from './components/Boards/Boards';
import Board from './components/Board/Board';
import Navbar from './components/Elements/Navbar/Navbar';
import Footer from './components/Elements/Footer/Footer';

import './App.css';
import './styles/colors.css';
import './styles/utilities.css';
import './styles/queries.css';

const App = () => {
    return (
        <>
            <AuthenticatedRoutes>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Boards />} />
                    <Route path="/board/:id" element={<Board />} />
                    <Route path="/analytics" element={<Analytics />} />
                </Routes>
                <Footer/>
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

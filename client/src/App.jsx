import { Routes, Route } from 'react-router-dom';

import Authentication from './components/Authentication/Authentication';
import Boards from './components/Boards/Boards';
import Board from './components/Board/Board';
import Navbar from './components/Elements/Navbar/Navbar';

import './App.css';
import './styles/colors.css';
import './styles/utilities.css';
import './styles/queries.css';

const App = () => {
    return (
        <>
            {/* <Navbar /> */}
            <Routes>
                <Route path="/auth" element={<Authentication />} />
                <Route path="/boards" element={<Boards />} />
                <Route path="/board/:id" element={<Board />} />
            </Routes>
        </>
    );
};

export default App;

import { Routes, Route } from 'react-router-dom';

import Authentication from './components/Authentication/Authentication';

import './App.css';
import './styles/colors.css';
import './styles/utilities.css';
import './styles/queries.css';

const App = () => {
    return (
        <Routes>
            <Route path="/auth" element={<Authentication />} />
        </Routes>
    );
};

export default App;

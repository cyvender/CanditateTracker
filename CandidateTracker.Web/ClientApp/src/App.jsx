import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import AddCandidate from './Pages/AddCandidate';
import Pending from './Pages/Pending';
import Confirmed from './Pages/Confirmed';
import Denied from './Pages/Denied';
import ViewDetails from './components/ViewDetails';
import CandidateCountContextComponent from './CandidateCountContext';

const App = () => {
    return (
        <CandidateCountContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/AddCandidate' element={<AddCandidate />} />
                    <Route path='/Pending' element={<Pending />} />
                    <Route path='/Confirmed' element={<Confirmed />} />
                    <Route path='/Denied' element={<Denied />} />
                    <Route path='/ViewDetails/:candidateId' element={<ViewDetails />} />
                </Routes>
            </Layout>
        </CandidateCountContextComponent>

    );
}

export default App;
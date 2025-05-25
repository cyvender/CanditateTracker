import { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';

const CandidateCountContext = createContext();

const CandidateCountContextComponent = (props) => {

    // const [candidateCount, setCandidateCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [confirmedCount, setConfirmedCount] = useState(0);
    const [deniedCount, setDeniedCount] = useState(0);

    const refreshCandidateCount = async () => {

        const { data } = await axios.get('/api/candidatetracker/getcandidates');
        const pending = data.filter(c => c.status === 'Pending').length;
        const confirmed = data.filter(c => c.status === 'Confirmed').length;
        const denied = data.filter(c => c.status === 'Denied').length;
        setPendingCount(pending);
        setConfirmedCount(confirmed);
        setDeniedCount(denied);
    }

    useEffect(() => {
        refreshCandidateCount();
    }, []);

    const counts = {
        pendingCount,
        confirmedCount,
        deniedCount,
        refreshCandidateCount
    }

    return <CandidateCountContext.Provider value={counts}>
        {props.children}
    </CandidateCountContext.Provider>
}

const useCandidateCount = () => {
    return useContext(CandidateCountContext);
}

export default CandidateCountContextComponent;
export { useCandidateCount };
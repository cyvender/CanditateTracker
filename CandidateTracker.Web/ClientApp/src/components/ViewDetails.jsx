import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCandidateCount } from '../CandidateCountContext';



const ViewDetails = () => {

    const [candidate, setCandidate] = useState({});

    const { candidateId } = useParams();

    const { refreshCandidateCount } = useCandidateCount();

    useEffect(() => {
        const getCandidate = async () => {
            const { data } = await axios.get(`/api/CandidateTracker/getcandidate?id=${candidateId}`);
            setCandidate(data);
        }

        getCandidate();
    }, [])

    const onButtonClick = async (status) => {
        await axios.post('/api/candidatetracker/updatestatus', { candidateId, status });
        const newStatus = status === 1 ? 'Confirmed' : 'Denied';
        const copy = {...candidate, status: newStatus};
        setCandidate(copy);
        
        refreshCandidateCount();
    }

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body bg-light">
                        <h4>Name: {candidate.firstName} {candidate.lastName}</h4>
                        <h4>Email: {candidate.email}</h4>
                        <h4>Phone: {candidate.phone}</h4>
                        <h4>Status: {candidate.status}</h4>
                        <h4>Notes: {candidate.notes}</h4>
                        <p></p>
                        {candidate.status === "Pending" && <div>
                            <button onClick={() => onButtonClick(1)} className="btn btn-primary">Confirm</button>
                            <button onClick={() => onButtonClick(2)} className="btn btn-danger">Deny</button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewDetails;
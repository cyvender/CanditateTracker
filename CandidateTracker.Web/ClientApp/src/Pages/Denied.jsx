import { useState, useEffect } from 'react';
import axios from 'axios';

const Denied = () => {

    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const getCandidates = async () => {
            const { data } = await axios.get('/api/candidatetracker/getcandidates');
            setCandidates(data.filter(c => c.status === 'Denied'));
        }

        getCandidates();
    }, [])

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <h1>Denied</h1>
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(c => (
                        <tr key={c.id}>
                            <td>{c.firstName}</td>
                            <td>{c.lastName}</td>
                            <td>{c.phone}</td>
                            <td>{c.email}</td>
                            <td>{c.notes}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default Denied;


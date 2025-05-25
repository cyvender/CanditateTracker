import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Pending = () => {

    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const getCandidates = async () => {
            const { data } = await axios.get('/api/candidatetracker/getcandidates');
            setCandidates(data.filter(c => c.status === 'Pending'));
        }

        getCandidates();
    }, [])

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(c => (
                        <tr key={c.id}>
                            <td>
                                <Link to={`/viewdetails/${c.id}`}>View Details</Link>
                            </td>
                            <td>{c.firstName}</td>
                            <td>{c.lastName}</td>
                            <td>{c.phone}</td>
                            <td>{c.email}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default Pending;
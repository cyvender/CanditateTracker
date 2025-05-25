import { useState } from 'react';
import axios from 'axios';
import { useCandidateCount } from '../CandidateCountContext';
import { useNavigate } from 'react-router-dom';

const AddCandidate = () => {

    const { refreshCandidateCount } = useCandidateCount();

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);



    const onSumbitClick = async () => {
        setIsSubmitting(true);
        await axios.post('/api/candidatetracker/addcandidate', {
            firstName,
            lastName,
            phone,
            email,
            notes
        });
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setNotes('');
        setIsSubmitting(false);
        refreshCandidateCount();
        navigate('/');
    }

    const isFormValid = firstName !== '' && lastName !== '' && phone !== '' && email !== '' && !isSubmitting;

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body bg-light">
                        <h4>Add Candidate</h4>
                        <div>

                            <label>   First Name <span className="text-danger">*</span></label>
                            <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" className="form-control" /><br />
                            <label>   Last Name <span className="text-danger">*</span></label>
                            <input value={lastName} onChange={e => setLastName(e.target.value)} type="text" className="form-control" /><br />
                            <label>   Email <span className="text-danger">*</span></label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" /><br />
                            <label>   Phone Number <span className="text-danger">*</span></label>
                            <input value={phone} onChange={e => setPhone(e.target.value)} type="text" className="form-control" /><br />
                            <label>   Notes: </label>
                            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows="5" className="form-control" ></textarea><br />
                            <button disabled={!isFormValid} onClick={onSumbitClick} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCandidate;
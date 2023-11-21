// Tahrirlash.js
import React, { useState } from 'react';

const Tahrirlash = ({ id }) => {
    const [status, setStatus] = useState(true);

    const handleToggle = () => {
        // Toggle the status
        setStatus((prevStatus) => !prevStatus);
        fetch(`/api/updateStatus/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: !status }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update status');
                }
            })
            .catch((error) => {
                console.error('Error updating status:', error);
            });
    };

    return (
        <button onClick={handleToggle}>
            {status ? 'Deactivate' : 'Activate'}
        </button>
    );
};

export default Tahrirlash;

import React from 'react';

export default function AccessRequestSection({ formData, handleInputChange }) {
  return (
    <>
        <div className="header-container">
            <h4 style={{ color: '#555555' }}>Exits</h4>
        </div>
        <div className="request-change-content">
            <p style={{ fontSize: '0.8em' }}><strong>The employee will not retain their email account or their H drive.</strong></p>                 
            <div className="radio-group">
            <label>Reason for leaving the division:</label>
            <div>
                <input
                type="radio"
                id="leave_reason_permanent"
                name="leave_reason"
                value="permanent"
                checked={formData.leave_reason === 'permanent'}
                onChange={handleInputChange}
                />
                <label htmlFor="leave_reason_permanent">Permanent Position</label>
            </div>
            <div>
                <input
                type="radio"
                id="leave_reason_retire"
                name="leave_reason"
                value="retire"
                checked={formData.leave_reason === 'retire'}
                onChange={handleInputChange}
                />
                <label htmlFor="leave_reason_retire">Retirement</label>
            </div>
            <div>
                <input
                type="radio"
                id="leave_reason_terminate"
                name="leave_reason"
                value="terminate"
                checked={formData.leave_reason === 'terminate'}
                onChange={handleInputChange}
                />
                <label htmlFor="leave_reason_terminate">Termination</label>
            </div>
            <div>
                <input
                type="radio"
                id="leave_reason_other"
                name="leave_reason"
                value="other"
                checked={formData.leave_reason === 'other'}
                onChange={handleInputChange}
                />
                <label htmlFor="leave_reason_other">Other</label>
            </div>
        </div>
            
        <br></br>
        <p style={{ fontSize: '0.8em' }}>
        <strong><span style={{ backgroundColor: 'yellow' }}>
            Please note the last day the employee requires access to government systems. Resignation/Offer letters from another position must be submitted by the supervisor to the PSA through a MyHR request.
        </span></strong>
        </p>
    </div>
    </>
  );
}

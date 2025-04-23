import React from 'react';

export default function AccessRequestSection({ formData, handleInputChange }) {
  return (
    <>
        <div className="header-container">
            <h4 style={{ color: '#555555' }}>Exits</h4>
        </div>
        <div className="request-change-content">
            <p style={{ fontSize: '0.8em' }}><strong>The employee will not retain their email account or their H drive. All relevant documentation must be submitted by the supervisor to the PSA through a MyHR request.</strong></p>                 
            <div className="radio-group">
            <label>Reason for leaving the division:</label>
            <div>
                <input
                type="radio"
                id="leave_reason_transfer"
                name="leave_reason"
                value="transfer"
                checked={formData.leave_reason === 'transfer'}
                onChange={handleInputChange}
                />
                <label htmlFor="leave_reason_transfer">Transfer to another Ministry</label>
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
            {formData.leave_reason === 'transfer' && (
            <>
                <div>
                <label htmlFor="transfer_ministry">
                    Ministry the employee is transferring to:
                </label><br></br>
                <input
                    id="transfer_ministry"
                    type="text"
                    name="transfer_ministry"
                    value={formData.transfer_ministry}
                    onChange={handleInputChange}
                />
                </div>
                <div>
                <label htmlFor="transfer_supervisor">
                    Receiving Supervisor at new ministry/division:
                </label><br></br>
                <input
                    id="transfer_supervisor"
                    type="text"
                    name="transfer_supervisor"
                    value={formData.transfer_supervisor}
                    onChange={handleInputChange}
                />
                </div>
                <div className="radio-group">
                <label>Is this a Temporary Appointment to another Division or Ministry?</label>
                <div>
                    <input
                    type="radio"
                    id="ta_transfer_yes"
                    name="ta_transfer"
                    value="yes"
                    checked={formData.ta_transfer === 'yes'}
                    onChange={handleInputChange}
                    />
                    <label htmlFor="ta_transfer_yes">Yes</label>
                </div>
                <div>
                    <input
                    type="radio"
                    id="ta_transfer_no"
                    name="ta_transfer"
                    value="no"
                    checked={formData.ta_transfer === 'no'}
                    onChange={handleInputChange}
                    />
                    <label htmlFor="ta_transfer_no">No</label>
                </div>
                </div>                
                {formData.ta_transfer === 'yes' && (
                <>
                    <div className="date-field">
                    <label htmlFor="return_date">
                    Employee Return Date: 
                    </label>
                    <input
                    type="date"
                    id="return_date"
                    name="return_date"
                    value={formData.return_date || ''}
                    onChange={handleInputChange}
                    />
                </div>
                </>
                )}
            </>
            )}
            <br></br>
            <p style={{ fontSize: '0.8em' }}>
            <strong><span style={{ backgroundColor: 'yellow' }}>
                Please note the last day the employee requires access to government systems. All relevant documentation must be submitted by the supervisor to the PSA through a MyHR request.
            </span></strong>
            </p>
        </div>
        </>
  );
}

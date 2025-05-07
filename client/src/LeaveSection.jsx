import React from 'react';
import JobTitleDropdown from './JobTitleDropdown';
import OfficeDropdown from './OfficeDropdown';

const LeaveSection = ({ formData, handleInputChange }) => {
  return (
    <>
      <div className="header-container">
        <h4 style={{ color: '#555555' }}>Leave - Departing/Returning</h4>
      </div>
      <div className="request-change-content">
        <section className="info-section">
          <p>Request for leave may include:</p>
          <ul>
            <li>STIIP leave greater than 1 month</li>
            <li>Maternity/paternity/extended child care leave</li>
            <li>Long-term disability</li>
            <li>Leave prior to retirement</li>
            <li>Leave without pay</li>
            <li>Educational leave</li>
          </ul>
        </section>
        <div className="radio-group">
          <label>The employee is:</label>
          <div>
            <input
              type="radio"
              id="leave_departing"
              name="leave"
              value="yes"
              checked={formData.leave === 'yes'}
              onChange={handleInputChange}
            />
            <label htmlFor="leave_departing">Departing for leave</label>
          </div>
          <div>
            <input
              type="radio"
              id="leave_returning"
              name="leave"
              value="no"
              checked={formData.leave === 'no'}
              onChange={handleInputChange}
            />
            <label htmlFor="leave_returning">Returning from leave</label>
          </div>
        </div>

        {formData.leave === 'yes' && (
          <>
            <div className="textarea-field">
              <label htmlFor="leave_comment">What is the reason for the leave?</label>
              <textarea
                id="leave_comment"
                name="leave_comment"
                rows={4}
                value={formData.leave_comment || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="radio-group">
              <label>Does the employee have an existing Employee Initiated Transfer Request (EITR)?</label>
              <div>
                <input
                  type="radio"
                  id="eitr_yes"
                  name="eitr"
                  value="yes"
                  checked={formData.eitr === 'yes'}
                  onChange={handleInputChange}
                />
                <label htmlFor="eitr_yes">Yes</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="eitr_no"
                  name="eitr"
                  value="no"
                  checked={formData.eitr === 'no'}
                  onChange={handleInputChange}
                />
                <label htmlFor="eitr_no">No</label>
              </div>
            </div>
          </>
        )}

        {formData.leave === 'no' && (
          <div className="form-grid">
            <JobTitleDropdown
              id="return_job_title"
              name="return_job_title"
              value={formData.return_job_title}
              onChange={handleInputChange}
            />
            <div>
              <label htmlFor="return_classification">Employee Classification:</label>
              <input
                id="return_classification"
                type="text"
                name="return_classification"
                value={formData.return_classification}
                onChange={handleInputChange}
              />
            </div>
            <OfficeDropdown
              id="return_office"
              name="return_office"
              value={formData.return_office}
              onChange={handleInputChange}
            />
            <div>
              <label htmlFor="updated_office">ICM service office:</label>
              <input
                id="updated_office"
                type="text"
                name="updated_office"
                value={formData.updated_office}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        <p style={{ fontSize: '0.8em' }}>
          <strong>
            <span style={{ backgroundColor: 'yellow' }}>
              Please communicate the departure and return date for the leave below if possible. All relevant documentation must be submitted by the supervisor to the PSA through a MyHR request.
            </span>
          </strong>
        </p>
      </div>
    </>
  );
};

export default LeaveSection;
import React from 'react';

export default function ChangeOfHoursSection({ formData, onChange }) {
  return (
    <>
      <div className="header-container">
        <h4 style={{ color: '#555555' }}>Change of Hours</h4>
      </div>
      <div className="request-change-content">
        <p style={{ fontSize: '0.8em' }}>
          <strong>
            It is the supervisor's responsibility to update their staff's Time &amp; Leave and contact Scheduling and Workload Management to update Teleopti schedule. (SDSI.OPS.Support.Scheduling.and.Workload.Management@gov.bc.ca)
          </strong>
        </p>

        <div className="date-field">
          <label htmlFor="change_hours_start_date">Start Date:</label>
          <input
            type="date"
            id="change_hours_start_date"
            name="change_hours_start_date"
            value={formData.change_hours_start_date || ''}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="total_hours">
            How many total hours will the staff be working every 2 weeks:
          </label>
          <input
            style={{ marginTop: 4 }}
            id="total_hours"
            type="text"
            name="total_hours"
            value={formData.total_hours || ''}
            onChange={onChange}
          />
        </div>

        <div className="radio-group">
          <label>Is this change of hours permanent:</label>
          {[
            { id: 'permanent_hours_yes', value: 'yes', label: 'Yes' },
            { id: 'permanent_hours_no',  value: 'no',  label: 'No' },
          ].map(({ id, value, label }) => (
            <div key={id}>
              <input
                type="radio"
                id={id}
                name="permanent_hours"
                value={value}
                checked={formData.permanent_hours === value}
                onChange={onChange}
              />
              <label htmlFor={id}>{label}</label>
            </div>
          ))}
        </div>

        {formData.permanent_hours === 'no' && (
          <div className="date-field">
            <label htmlFor="change_hours_end_date">
              End date to temporary change:
            </label>
            <input
              type="date"
              id="change_hours_end_date"
              name="change_hours_end_date"
              value={formData.change_hours_end_date || ''}
              onChange={onChange}
            />
          </div>
        )}
      </div>
    </>
  );
}

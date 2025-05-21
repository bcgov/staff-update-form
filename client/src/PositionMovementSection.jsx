import React from 'react';
import JobTitleDropdown from './JobTitleDropdown';
import OfficeDropdown from './OfficeDropdown';
import ProgramAreaDropdown from './ProgramAreaDropdown';

export default function PositionMovementSection({ formData, onChange }) {
  return (
    <>
      <div className="header-container">
        <h4 style={{ color: '#555555' }}>Position Movement</h4>
      </div>
      <div className="request-change-content">
        <div>
          <p className="field-note">
            For Employee Initiated Transfer Requests a Staff Update form is not required
          </p>
          <label htmlFor="movement_type">
            <span className="required">*</span> Movement Type:
          </label>
          <br />
          <select
            id="movement_type"
            name="movement_type"
            value={formData.movement_type || ''}
            onChange={onChange}
            required
          >
            <option value="">Please Select:</option>
            <option value="AUX (TERM)">AUX (TERM)</option>
            <option value="OFR">OFR</option>
            <option value="Placement">Placement</option>
            <option value="Internal Reassignment">Internal Reassignment</option>
            <option value="Lateral Transfer">Lateral Transfer</option>
            <option value="Demotion">Demotion</option>
          </select>
        </div>

        <div>
          <label htmlFor="movement_staffing_req_num">Staffing Request Number:</label>
          <br />
          <input
            id="movement_staffing_req_num"
            type="number"
            name="movement_staffing_req_num"
            value={formData.movement_staffing_req_num || ''}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="movement_position_num">
            <span className="required">*</span> New Position Number:
          </label>
          <br />
          <input
            id="movement_position_num"
            type="number"
            name="movement_position_num"
            value={formData.movement_position_num || ''}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label htmlFor="movement_supervisor">
            <span className="required">*</span> New Supervisor:
          </label>
          <br />
          <input
            id="movement_supervisor"
            type="text"
            name="movement_supervisor"
            value={formData.movement_supervisor || ''}
            onChange={onChange}
            required
          />
        </div>

        <JobTitleDropdown
          id="movement_job_title"
          name="movement_job_title"
          value={formData.movement_job_title || ''}
          onChange={onChange}
        />

        <div>
          <label htmlFor="movement_classification">New Classification:</label>
          <br />
          <input
            id="movement_classification"
            type="text"
            name="movement_classification"
            value={formData.movement_classification || ''}
            onChange={onChange}
          />
        </div>

        <OfficeDropdown
          id="movement_office"
          name="movement_office"
          value={formData.movement_office || ''}
          onChange={onChange}
        />

        <ProgramAreaDropdown
          id="movement_program_area"
          name="movement_program_area"
          value={formData.movement_program_area || ''}
          onChange={onChange}
        />

        <div>
          <label htmlFor="movement_paylist">New Paylist:</label>
          <br />
          <input
            id="movement_paylist"
            type="text"
            name="movement_paylist"
            value={formData.movement_paylist || ''}
            onChange={onChange}
          />
        </div>

        <br />
      </div>
    </>
  );
}
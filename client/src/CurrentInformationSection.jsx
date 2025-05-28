import React from 'react';
import JobTitleDropdown from './JobTitleDropdown';
import ProgramAreaDropdown from './ProgramAreaDropdown';
import OfficeDropdown from './OfficeDropdown';

const CurrentInformationSection = ({ formData, onChange }) => {
  const handleChange = (e) => onChange(e);

  return (
    <>
      <div className="header-container">
        <h4 style={{ color: '#555555' }}>Current Information</h4>
      </div>
      <br />
      <div className="form-grid">
        <div>
          <label htmlFor="firstname">
            <span className="required">*</span> Employee First Name:
          </label>
          <input
            id="firstname"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastname">
            <span className="required">*</span> Employee Last Name:
          </label>
          <input
            id="lastname"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="employee_id">
            <span className="required">*</span> Employee ID:
          </label>
          <input
            id="employee_id"
            type="number"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="other_names">Other names known by:</label>
          <input
            id="other_names"
            type="text"
            name="other_names"
            value={formData.other_names}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="idir">
            <span className="required">*</span> Employee Username (IDIR):
          </label>
          <input
            id="idir"
            type="text"
            name="idir"
            value={formData.idir}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="supervisor">
            <span className="required">*</span> Employee's Supervisor:
          </label>
          <input
            id="supervisor"
            type="text"
            name="supervisor"
            value={formData.supervisor}
            onChange={handleChange}
            required
          />
        </div>
        <OfficeDropdown
          id="office"
          name="office"
          value={formData.office}
          onChange={handleChange}
        />
        
        <div>
          <label htmlFor="position_num">Position Number:</label>
          <input
            id="position_num"
            type="number"
            name="position_num"
            value={formData.position_num || ''}
            onChange={onChange}
          />
        </div>

        <JobTitleDropdown
          id="job_title"
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
        />
        <div>
          <label htmlFor="classification">Employee Classification:</label>
          <input
            id="classification"
            type="text"
            name="classification"
            value={formData.classification}
            onChange={handleChange}
          />
        </div>

        <ProgramAreaDropdown
          id="program_area"
          name="program_area"
          value={formData.program_area}
          onChange={handleChange}
        />
        <div>
          <label htmlFor="paylist">Employee Paylist:</label>
          <input
            id="paylist"
            type="text"
            name="paylist"
            value={formData.paylist}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="employee_email">Employee Email:</label>
          <input
            id="employee_email"
            type="email"
            name="employee_email"
            value={formData.employee_email}
            onChange={handleChange}
          />
          <p className="field-note">
            This email address <strong>will not</strong> receive a copy of this submission
          </p>
        </div>
      </div>
      <br />
    </>
  );
};

export default CurrentInformationSection;
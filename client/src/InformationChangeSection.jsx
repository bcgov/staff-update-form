import React from 'react';
import OfficeDropdown from './OfficeDropdown';
import ProgramAreaDropdown from './ProgramAreaDropdown';

export default function InformationChangeSection({ formData, onChange }) {
  return (
    <>
      <div className="header-container">
        <h4 style={{ color: '#555555' }}>Information Change</h4>
      </div>
      <div className="request-change-content">
        <section className="info-section">
          <p>Request for an information change may include a change of:</p>
          <ul>
            <li>Name or title</li>
            <li>Office or Location</li>
            <li>Supervisor</li>
            <li>Branch and Unit/Team</li>
            <li>ICM information</li>
          </ul>
        </section>
        <div className="form-grid">
          <div>
            <label htmlFor="updated_name">Updated Name:</label>
            <input
              id="updated_name"
              type="text"
              name="updated_name"
              value={formData.updated_name || ''}
              onChange={onChange}
            />
          </div>
          <OfficeDropdown
            id="updated_office"
            name="updated_office"
            value={formData.updated_office}
            onChange={onChange}
          />
          <div>
            <label htmlFor="updated_supervisor">Updated Supervisor:</label>
            <input
              id="updated_supervisor"
              type="text"
              name="updated_supervisor"
              value={formData.updated_supervisor || ''}
              onChange={onChange}
            />
          </div>
          <ProgramAreaDropdown
            id="updated_program_area"
            name="updated_program_area"
            value={formData.updated_program_area}
            onChange={onChange}
          />
          <div>
            <label htmlFor="updated_paylist">Updated Paylist:</label>
            <input
              id="updated_paylist"
              type="text"
              name="updated_paylist"
              value={formData.updated_paylist || ''}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="updated_service_office">
              Updated ICM Service Office:
            </label>
            <input
              id="updated_service_office"
              type="text"
              name="updated_service_office"
              value={formData.updated_service_office || ''}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="radio-group" style={{ marginTop: '1rem' }}>
          <label>Are there access requests associated with this information change?</label>
          <div>
            <input
              type="radio"
              id="access_yes"
              name="access_request"
              value="yes"
              checked={formData.access_request === 'yes'}
              onChange={onChange}
            />
            <label htmlFor="access_yes">Yes</label>
          </div>
          <div>
            <input
              type="radio"
              id="access_no"
              name="access_request"
              value="no"
              checked={formData.access_request === 'no'}
              onChange={onChange}
            />
            <label htmlFor="access_no">No</label>
          </div>
        </div>

        { (formData.updated_office || formData.updated_program_area) && (
          <div className="radio-group" style={{ marginTop: '1rem' }}>
            <label>Is this an EITR or OFR?</label>
            <div>
              <input
                type="radio"
                id="eitr"
                name="info_change_eitr_ofr"
                value="eitr"
                checked={formData.info_change_eitr_ofr === 'eitr'}
                onChange={onChange}
              />
              <label htmlFor="eitr">EITR</label>
            </div>
            <div>
              <input
                type="radio"
                id="ofr"
                name="info_change_eitr_ofr"
                value="ofr"
                checked={formData.info_change_eitr_ofr === 'ofr'}
                onChange={onChange}
              />
              <label htmlFor="ofr">OFR</label>
            </div>
          </div>
        ) }
      </div>
    </>
  );
}

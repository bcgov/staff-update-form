import React from 'react';
import ProgramAreaDropdown from './ProgramAreaDropdown';

export default function TemporaryAppointmentSection({ formData, onChange }) {
  return (
    <>
      <div className="header-container">
        <h4 style={{ color: '#555555' }}>
          Temporary Appointment or Acting Opportunities
        </h4>
      </div>
      <div className="request-change-content">
        <div className="radio-group">
          <label>Is this a Temporary Appointment to another Division or Ministry?</label>
          <div>
            <input
              type="radio"
              id="temp_appt_yes"
              name="temp_appt"
              value="yes"
              checked={formData.temp_appt === 'yes'}
              onChange={onChange}
            />
            <label htmlFor="temp_appt_yes">Yes</label>
          </div>
          <div>
            <input
              type="radio"
              id="temp_appt_no"
              name="temp_appt"
              value="no"
              checked={formData.temp_appt === 'no'}
              onChange={onChange}
            />
            <label htmlFor="temp_appt_no">No</label>
          </div>
        </div>

        {formData.temp_appt === 'yes' && (
          <>
            <div>
              <label htmlFor="transfer_ministry">
                The Division or Ministry the employee is transferring to:
              </label><br></br>
              <input
                id="transfer_ministry"
                type="text"
                name="transfer_ministry"
                value={formData.transfer_ministry || ''}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="transfer_supervisor">
                Who will their direct report be? (supervisor/manager)
              </label><br></br>
              <input
                id="transfer_supervisor"
                type="text"
                name="transfer_supervisor"
                value={formData.transfer_supervisor || ''}
                onChange={onChange}
              />
            </div>
          </>
        )}

        {formData.temp_appt === 'no' && (
          <>
            <p style={{ fontSize: '0.8em' }}>
              <strong>
                Please note that Time & Leave access is only provided for TA/acting terms 21 working days or longer.
              </strong>
            </p>
            <div className="radio-group">
              <label>Is this a Temporary Appointment for over seven months?</label>
              {[
                { id: 'ta_over_7months_no', value: 'no', label: 'TA under 7 Months' },
                { id: 'ta_over_7months_yes', value: 'yes', label: 'TA 7 Months or over (meritorious process required)' },
                { id: 'ta_over_7months_ext', value: 'extension', label: 'TA Extensions (if > 7 Months, meritorious process required)' },
              ].map(({ id, value, label }) => (
                <div key={id}>
                  <input
                    type="radio"
                    id={id}
                    name="ta_over_7months"
                    value={value}
                    checked={formData.ta_over_7months === value}
                    onChange={onChange}
                  />
                  <label htmlFor={id}>{label}</label>
                </div>
              ))}
            </div>

            {(formData.ta_over_7months === 'yes' || formData.ta_over_7months === 'extension') && (
              <div className="radio-group">
                <label>Has the employees gone through a meritorious process?</label>
                {[
                  { id: 'meritorious_process_yes', value: 'yes', label: 'Yes' },
                  { id: 'meritorious_process_no', value: 'no', label: 'No' },
                ].map(({ id, value, label }) => (
                  <div key={id}>
                    <input
                      type="radio"
                      id={id}
                      name="meritorious_process"
                      value={value}
                      checked={formData.meritorious_process === value}
                      onChange={onChange}
                    />
                    <label htmlFor={id}>{label}</label>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label htmlFor="acting_title">Acting Title:</label><br></br>
              <input
                id="acting_title"
                type="text"
                name="acting_title"
                value={formData.acting_title || ''}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="position_incumbent">Position Incumbent:</label><br></br>
              <input
                id="position_incumbent"
                type="text"
                name="position_incumbent"
                value={formData.position_incumbent || ''}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="staffing_request_num">Staffing Request Number:</label><br></br>
              <input
                id="staffing_request_num"
                type="number"
                name="staffing_request_num"
                value={formData.staffing_request_num || ''}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="position_number_TA">Position Number for TA:</label><br></br>
              <input
                id="position_number_TA"
                type="number"
                name="position_number_TA"
                value={formData.position_number_TA || ''}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="position_number_SR">Position Number from staffing request:</label><br></br>
              <input
                id="position_number_SR"
                type="number"
                name="position_number_SR"
                value={formData.position_number_SR || ''}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="position_supervisor">Position Supervisor:</label><br></br>
              <input
                id="position_supervisor"
                type="text"
                name="position_supervisor"
                value={formData.position_supervisor || ''}
                onChange={onChange}
              />
            </div>

            <ProgramAreaDropdown
              id="ta_program_area"
              name="ta_program_area"
              value={formData.ta_program_area}
              onChange={onChange}
            />

            <div>
              <label htmlFor="ta_paylist">Employee Paylist:</label><br></br>
              <input
                id="ta_paylist"
                type="text"
                name="ta_paylist"
                value={formData.ta_paylist || ''}
                onChange={onChange}
              />
            </div>

            <div className="radio-group">
              <label>Is this opportunity for 21 consecutive days or longer?</label>
              {['yes','no'].map(val => (
                <div key={val}>
                  <input
                    type="radio"
                    id={`over_21_days_${val}`}
                    name="over_21_days"
                    value={val}
                    checked={formData.over_21_days === val}
                    onChange={onChange}
                  />
                  <label htmlFor={`over_21_days_${val}`}>{val === 'yes' ? 'Yes' : 'No'}</label>
                </div>
              ))}
            </div>

            {formData.over_21_days === 'yes' && (
              <div className="radio-group">
                <p style={{ fontSize: '0.8em' }}>
                  <strong>
                    If PSA has not completed a Temporary Assignment letter the Ops Support Staffing team will produce one.
                  </strong>
                </p>
                <label>Is Time & Leave access required?</label>
                {['yes','no'].map(val => (
                  <div key={val}>
                    <input
                      type="radio"
                      id={`timeleave_access_${val}`}
                      name="timeleave_access"
                      value={val}
                      checked={formData.timeleave_access === val}
                      onChange={onChange}
                    />
                    <label htmlFor={`timeleave_access_${val}`}>{val === 'yes' ? 'Yes' : 'No'}</label>
                  </div>
                ))}
              </div>
            )}

            <div className="textarea-field">
              <label htmlFor="ta_comments">What specific drives and folders are required:</label>
              <textarea
                id="ta_comments"
                name="ta_comments"
                rows="4"
                value={formData.ta_comments || ''}
                onChange={onChange}
              />
              <p className="field-note">
                Please include the S# of the drive that you are requesting and specific folders. Example S\\12345\Folder
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

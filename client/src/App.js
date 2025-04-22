import './App.css';
import logo from './logo.png';
import banner from './banner.png';
import { useState } from 'react';
import ProgramAreaDropdown from './ProgramAreaDropdown';
import paylistMapping from './programAreaPaylistMapping';
import JobTitleDropdown from './JobTitleDropdown';
import classificationMapping from './jobTitleClassificationMapping';
import OfficeDropdown from './OfficeDropdown';
import RequestTypeButtons from './RequestTypeButtons';
import { generatePDF } from './pdfGenerator';

function App() {
  // State to capture form data
  const [formData, setFormData] = useState({   
    request_type: [],
    name: '',
    email: '',
    comments: "Please do not include unnecessary private information in the comments",
    attachments: []
  });

  const [attachments, setAttachments] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Update program_area and auto-populate paylist based on program_area mapping
    if (name === 'program_area') {
      const updatedPaylist = paylistMapping[value] || '';
      setFormData((prevFormData) => ({
        ...prevFormData,
        program_area: value,
        paylist: updatedPaylist,
      }));   
    } else if (name === 'updated_program_area') {
      const updatedPaylist = paylistMapping[value] || '';
      setFormData((prevFormData) => ({
        ...prevFormData,
        updated_program_area: value,
        updated_paylist: updatedPaylist,
      }));   
    } else if (name === 'ta_program_area') {
      const updatedPaylist = paylistMapping[value] || '';
      setFormData((prevFormData) => ({
        ...prevFormData,
        ta_program_area: value,
        ta_paylist: updatedPaylist,
      }));   
    } else if (name === 'movement_program_area') {
      const updatedPaylist = paylistMapping[value] || '';
      setFormData((prevFormData) => ({
        ...prevFormData,
        movement_program_area: value,
        movement_paylist: updatedPaylist,
      }));    
    } else if (name === 'new_hire_program_area') {
      const updatedPaylist = paylistMapping[value] || '';
      setFormData((prevFormData) => ({
        ...prevFormData,
        new_hire_program_area: value,
        new_hire_paylist: updatedPaylist,
      }));   
    // Update job_title and auto-populate classification based on job_title mapping
    } else if (name === 'job_title') {
      const updatedClassification = classificationMapping[value] || '';
      setFormData((prevFormData) => ({
        ...prevFormData,
        job_title: value,
        classification: updatedClassification,
      }));
    } else if (name === 'movement_job_title') {
      const updatedClassification = classificationMapping[value] || '';
      setFormData((prevFormData) => ({
        ...prevFormData,
        movement_job_title: value,
        movement_classification: updatedClassification,
      }));
    } else if (name === 'return_job_title') {
      const updatedClassification = classificationMapping[value] || '';
      setFormData((prevFormData) => ({
        ...prevFormData,
        return_job_title: value,
        return_classification: updatedClassification,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  // Toggle function for request types (multi-select)
  const handleRequestTypeSelect = (type) => {
    setFormData((prevData) => {
      const currentSelections = prevData.request_type || [];
      if (currentSelections.includes(type)) {
        // Remove type if it's already selected
        return {
          ...prevData,
          request_type: currentSelections.filter((t) => t !== type)
        };
      } else {
        // Add the type to selections
        return {
          ...prevData,
          request_type: [...currentSelections, type]
        };
      }
    });
  };

  // handle form attachments
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    setFormData((prevData) => ({
      ...prevData,
      attachments: files
    }));
  };

  const handleAddAttachment = (e, index) => {
    const files = Array.from(e.target.files);
    setAttachments((prevAttachments) => {
      const updatedAttachments = [...prevAttachments];
      updatedAttachments[index] = files[0]; // Replace or add the file at the specific index
      return updatedAttachments;
    });
  };

  const addNewAttachmentField = () => {
    setAttachments((prevAttachments) => [...prevAttachments, null]); // Add a placeholder for a new file
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setSubmitted(true);
    console.log('Form submitted:', formData);
  
    try {
      // Generate the PDF
      const pdfDataUri = await generatePDF();
  
      // Define the email recipient (you can hard-code this or get it from your form)
      const recipientEmail = 'recipient@example.com';
  
      // Send the PDF to your backend API
      const response = await fetch('https://your-backend-endpoint/send-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfData: pdfDataUri,
          email: recipientEmail,
        }),
      });
  
      if (response.ok) {
        console.log('Email sent successfully!');
      } else {
        console.error('Error sending email');
      }
    } catch (error) {
      console.error('Error generating PDF or sending email:', error);
    }
  };
  

  return (
    <div className="App">
      {!submitted ? (
        <form id="form-to-pdf" onSubmit={handleSubmit}>
          <div className="content">
            <div className="header">
              <img src={logo} alt="Logo" className="logo" />
              <img src={banner} alt="Banner" className="banner" />
              <h2 style={{ textAlign: 'left', paddingLeft: '10px', color: '#444444' }}>Staff Update Form</h2>
            </div>

            <div className="request-type-container">
              <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>
                Request Type:
              </label>
              <RequestTypeButtons
                selected={formData.request_type}
                onSelect={handleRequestTypeSelect}
              />
            </div>
            {formData.request_type && formData.request_type.length > 0 && (
              formData.request_type.length === 1 ? (
                <div className="request-type-info">
                  <p>
                    Please fill in the employee's details in the <b>Current Information</b> section of the form, and their <b>{formData.request_type[0]}</b> details in the section below.
                  </p>
                </div>
              ) : (
                <div className="request-type-info">
                  <p>
                    Please fill in the employee's details in the <b>Current Information</b> section of the form, and their <b>Updated Information</b> in the sections below.
                  </p>
                </div>
              )
            )}       
            <div className="header-container">
              <h4 style={{ color: '#555555' }}>Current Information</h4>
            </div> 
            <br></br> 
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="employee_id">
                  <span className="required">*</span> Employee ID Number:
                </label>
                <input
                  id="employee_id"
                  type="number"
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="other_names">
                  Other names known by:
                </label>
                <input
                  id="other_names"
                  type="text"
                  name="other_names"
                  value={formData.other_names}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  required
                />
              </div>
              <JobTitleDropdown
                id="job_title"
                name="job_title"
                value={formData.job_title}
                onChange={handleInputChange}
              />
              <div>
                <label htmlFor="classification">
                  Employee Classification:
                </label>
                <input
                  id="classification"
                  type="text"
                  name="classification"
                  value={formData.classification}
                  onChange={handleInputChange}
                />
              </div>
              <ProgramAreaDropdown
                id="program_area"
                name="program_area"
                value={formData.program_area}
                onChange={handleInputChange}
              />
              <div>
                <label htmlFor="paylist">
                  Employee Paylist:
                </label>
                <input
                  id="paylist"
                  type="text"
                  name="paylist"
                  value={formData.paylist}
                  onChange={handleInputChange}
                />
              </div>
              <OfficeDropdown
                id="office"
                name="office"
                value={formData.office}
                onChange={handleInputChange}
              />
              <div>
                <label htmlFor="employee_email">
                  Employee Email:
                </label>
                <input
                  id="employee_email"
                  type="email"
                  name="employee_email"
                  value={formData.employee_email}
                  onChange={handleInputChange}
                />
                <p className="field-note">This email address <strong>will not</strong> receive a copy of this submission</p>
              </div>
            </div>
            <br></br>

            {formData.request_type && formData.request_type.includes('Information Change') && (
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
                      <label htmlFor="updated_name">
                        Updated Name:
                      </label>
                      <input
                        id="updated_name"
                        type="text"
                        name="updated_name"
                        value={formData.updated_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <OfficeDropdown
                      id="updated_office"
                      name="updated_office"
                      value={formData.updated_office}
                      onChange={handleInputChange}
                    />
                    <div>
                      <label htmlFor="updated_supervisor">
                        Updated Supervisor:
                      </label>
                      <input
                        id="updated_supervisor"
                        type="text"
                        name="updated_supervisor"
                        value={formData.updated_supervisor}
                        onChange={handleInputChange}
                      />
                    </div>
                    <ProgramAreaDropdown
                      id="updated_program_area"
                      name="updated_program_area"
                      value={formData.updated_program_area}
                      onChange={handleInputChange}
                    />
                    <div>
                      <label htmlFor="updated_paylist">
                        Updated Paylist:
                      </label>
                      <input
                        id="updated_paylist"
                        type="text"
                        name="updated_paylist"
                        value={formData.updated_paylist}
                        onChange={handleInputChange}
                      />
                    </div><div>
                      <label htmlFor="updated_service_office">
                        Updated ICM Service Office:
                      </label>
                      <input
                        id="updated_service_office"
                        type="text"
                        name="updated_service_office"
                        value={formData.updated_service_office}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                  </div><br></br>
                  <div className="radio-group">
                    <label>Are there access requests associated with this information change?</label>
                    <div>
                      <input
                        type="radio"
                        id="access_yes"
                        name="access_request"
                        value="yes"
                        checked={formData.access_request === 'yes'}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                      />
                      <label htmlFor="access_no">No</label>
                    </div>
                  </div><br></br>
                  {(formData.updated_office || formData.updated_program_area) && (
                    <>
                      <div className="radio-group">
                      <label> Is this an EITR or OFR?</label>
                      <div>
                        <input
                          type="radio"
                          id="eitr"
                          name="info_change_eitr_ofr"
                          value="eitr"
                          checked={formData.info_change_eitr_ofr === 'eitr'}
                          onChange={handleInputChange}
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
                          onChange={handleInputChange}
                        />
                        <label htmlFor="ofr">OFR</label>
                      </div>
                    </div>
                  </>
                  )}
                </div>
              </>
            )}

            {formData.request_type && formData.request_type.includes('Temporary Appointment or Acting Opportunities') && (
              <>
                <div className="header-container">
                  <h4 style={{ color: '#555555' }}>Temporary Appointment or Acting Opportunities</h4>
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                          value={formData.transfer_ministry}
                          onChange={handleInputChange}
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
                          value={formData.transfer_supervisor}
                          onChange={handleInputChange}
                        />
                      </div><br></br>
                    </>
                  )}
                  {formData.temp_appt === 'no' && (
                    <>
                      <p style={{ fontSize: '0.8em' }}><strong>Please note that Time & Leave access is only provided for TA/acting terms longer than 20 days.</strong></p>
                      <div className="radio-group">
                        <label>Is this a Temporary Appointment for over seven months?</label>
                        <div>
                          <input
                            type="radio"
                            id="ta_over_7months_no"
                            name="ta_over_7months"
                            value="no"
                            checked={formData.ta_over_7months === 'no'}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="ta_over_7months_no">TA under 7 Months</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="ta_over_7months_yes"
                            name="ta_over_7months"
                            value="yes"
                            checked={formData.ta_over_7months === 'yes'}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="ta_over_7months_yes">TA over 7 Months (meritorious process required)</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="ta_over_7months_ext"
                            name="ta_over_7months"
                            value="extension"
                            checked={formData.ta_over_7months === 'extension'}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="ta_over_7months_ext">TA Extensions (if &gt; 7 Months, meritorious process required)</label>
                        </div>
                      </div>
                      {(formData.ta_over_7months === 'yes' || formData.ta_over_7months === 'extension') && (
                        <>
                          <div className="radio-group">
                            <label>Has the employess gone through a meritorious process?</label>
                            <div>
                              <input
                                type="radio"
                                id="meritorious_process_yes"
                                name="meritorious_process"
                                value="yes"
                                checked={formData.meritorious_process === 'yes'}
                                onChange={handleInputChange}
                              />
                              <label htmlFor="tmeritorious_processs_yes">Yes</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="meritorious_process_no"
                                name="meritorious_process"
                                value="no"
                                checked={formData.meritorious_process === 'no'}
                                onChange={handleInputChange}
                              />
                              <label htmlFor="meritorious_process_no">No</label>
                            </div>
                          </div>
                        </>
                      )}
                      <div>
                        <label htmlFor="acting_title">
                          Acting Title:
                        </label><br></br>
                        <input
                          id="acting_title"
                          type="text"
                          name="acting_title"
                          value={formData.acting_title}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="position_incumbent">
                          Position Incumbent:
                        </label><br></br>
                        <input
                          id="position_incumbent"
                          type="text"
                          name="position_incumbent"
                          value={formData.position_incumbent}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="staffing_request_num">
                          Staffing Request Number:
                        </label><br></br>
                        <input
                          id="staffing_request_num"
                          type="number"
                          name="staffing_request_num"
                          value={formData.staffing_request_num}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="position_number_TA">
                          Position Number for TA:
                        </label><br></br>
                        <input
                          id="position_number_TA"
                          type="number"
                          name="position_number_TA"
                          value={formData.position_number_TA}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="position_number_SR">
                          Position Number from staffing request:
                        </label><br></br>
                        <input
                          id="position_number_SR"
                          type="number"
                          name="position_number_SR"
                          value={formData.position_number_SR}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="position_supervisor">
                          Position Supervisor:
                        </label><br></br>
                        <input
                          id="position_supervisor"
                          type="text"
                          name="position_supervisor"
                          value={formData.position_supervisor}
                          onChange={handleInputChange}
                        />
                      </div>
                      <ProgramAreaDropdown
                        id="ta_program_area"
                        name="ta_program_area"
                        value={formData.ta_program_area}
                        onChange={handleInputChange}
                      />
                      <div>
                        <label htmlFor="ta_paylist">
                          Employee Paylist:
                        </label><br></br>
                        <input
                          id="ta_paylist"
                          type="text"
                          name="ta_paylist"
                          value={formData.ta_paylist}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="radio-group">
                        <label>Is this opportunity for 21 consecutive days or longer?</label>
                        <div>
                          <input
                            type="radio"
                            id="over_21_days_yes"
                            name="over_21_days"
                            value="yes"
                            checked={formData.over_21_days === 'yes'}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="temp_appt_yes">Yes</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="over_21_days_no"
                            name="over_21_days"
                            value="no"
                            checked={formData.over_21_days === 'no'}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="over_21_days_no">No</label>
                        </div>
                      </div>

                      {formData.over_21_days === 'yes' && (
                        <> 
                          <p style={{ fontSize: '0.8em' }}><strong>If PSA has not completed a Temporary Assignment letter the Ops Support Staffing team will produce one.</strong></p>
                          <div className="radio-group">
                            <label>Is Time & Leave access required?</label>
                            <div>
                              <input
                                type="radio"
                                id="timeleave_access_yes"
                                name="timeleave_access"
                                value="yes"
                                checked={formData.timeleave_access === 'yes'}
                                onChange={handleInputChange}
                              />
                              <label htmlFor="timeleave_access_yes">Yes</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="timeleave_access_no"
                                name="timeleave_access"
                                value="no"
                                checked={formData.timeleave_access === 'no'}
                                onChange={handleInputChange}
                              />
                              <label htmlFor="timeleave_access_no">No</label>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="textarea-field">
                        <label htmlFor="ta_comments">What specific drives and folders are required:</label> <br></br>
                        <textarea
                          id="ta_comments"
                          name="ta_comments"
                          rows="4" 
                          value={formData.ta_comments || ''}
                          onChange={handleInputChange}
                        />
                        <p className="field-note">Please include the S# of the drive that you are requesting and specific folders. Example S\\12345\Folder</p>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            {formData.request_type && formData.request_type.includes('Change of Hours') && (
              <>
                <div className="header-container">
                  <h4 style={{ color: '#555555' }}>Change of Hours</h4>
                </div> 
                <div className="request-change-content">
                  <p style={{ fontSize: '0.8em' }}><strong>It is the supervisor's responsibility to update their staff's Time & Leave and contact Scheduling and Workload Management to update Teleopti schedule. (SDSI.OPS.Support.Scheduling.and.Workload.Management@gov.bc.ca)</strong></p>               
                  <div className="date-field">
                    <label htmlFor="change_hours_start_date">
                      Start Date: 
                    </label>
                    <input
                      type="date"
                      id="change_hours_start_date"
                      name="change_hours_start_date"
                      value={formData.change_hours_start_date || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="total_hours">
                      How many total hours will the staff be working every 2 weeks:
                    </label><br></br>
                    <input
                      id="total_hours"
                      type="text"
                      name="total_hours"
                      value={formData.total_hours}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="radio-group">
                    <label>Is this change of hours permanent:</label>
                    <div>
                      <input
                        type="radio"
                        id="permanent_hours_yes"
                        name="permanent_hours"
                        value="yes"
                        checked={formData.permanent_hours === 'yes'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="permanent_hours_yes">Yes</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="permanent_hours_no"
                        name="permanent_hours"
                        value="no"
                        checked={formData.permanent_hours === 'no'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="permanent_hours_no">No</label>
                    </div>
                  </div>
                  {formData.permanent_hours === 'no' && (
                    <>
                      <div className="date-field">
                        <label htmlFor="change_hours_end_date">
                          End date to temporary change:
                        </label>
                        <input
                          type="date"
                          id="change_hours_end_date"
                          name="change_hours_end_date"
                          value={formData.change_hours_end_date || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            {formData.request_type && formData.request_type.includes('Position Movement') && (
              <>
                <div className="header-container">
                  <h4 style={{ color: '#555555' }}>Position Movement</h4>
                </div> 
                <div className="request-change-content">
                  <div>
                    <label htmlFor="movement_type">
                    <span className="required">*</span> Movement Type:
                    </label><br></br>
                    <select
                      id="movement_type"
                      name="movement_type"
                      value={formData.movement_type}
                      onChange={handleInputChange}
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
                    <label htmlFor="movement_staffing_req_num">
                      Staffing Request Number:
                    </label><br></br>
                    <input
                      id="movement_staffing_req_num"
                      type="number"
                      name="movement_staffing_req_num"
                      value={formData.movement_staffing_req_num}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="movement_position_num">
                      <span className="required">*</span> Position Number:
                    </label><br></br>
                    <input
                      id="movement_position_num"
                      type="number"
                      name="movement_position_num"
                      value={formData.movement_position_num}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="movement_supervisor">
                      <span className="required">*</span> Employee's Supervisor:
                    </label><br></br>
                    <input
                      id="movement_supervisor"
                      type="text"
                      name="movement_supervisor"
                      value={formData.movement_supervisor}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <JobTitleDropdown
                    id="movement_job_title"
                    name="movement_job_title"
                    value={formData.movement_job_title}
                    onChange={handleInputChange}
                  />
                  <div>
                    <label htmlFor="movement_classification">
                      Employee Classification:
                    </label>
                    <br></br>
                    <input
                      id="movement_classification"
                      type="text"
                      name="movement_classification"
                      value={formData.movement_classification}
                      onChange={handleInputChange}
                    />
                  </div>
                  <OfficeDropdown
                    id="movement_office"
                    name="movement_office"
                    value={formData.movement_office}
                    onChange={handleInputChange}
                  />
                  <ProgramAreaDropdown
                    id="movement_program_area"
                    name="movement_program_area"
                    value={formData.movement_program_area}
                    onChange={handleInputChange}
                  />
                  <div>
                    <label htmlFor="movement_paylist">
                      Employee Paylist:
                    </label><br></br>
                    <input
                      id="movement_paylist"
                      type="text"
                      name="movement_paylist"
                      value={formData.movement_paylist}
                      onChange={handleInputChange}
                    />
                  </div>
                  <br></br>
                </div>
              </>
            )}
            {formData.request_type && formData.request_type.includes('Leave - Departing/Returning') && (
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
                        <label htmlFor="leave_comment">What is the reason for the leave?</label> <br></br>
                        <textarea
                          id="leave_comment"
                          name="leave_comment"
                          rows="4" 
                          value={formData.leave_comment || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="radio-group">
                        <label>Do you have an active EITR?</label>
                        <div>
                          <input
                            type="radio"
                            id="eitr_yes"
                            name="eitr"
                            value="yes"
                            checked={formData.eitr === 'yes'}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="eitr_yes">Departing for leave</label>
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
                          <label htmlFor="eitr_no">Returning from leave</label>
                        </div>
                      </div>
                    </>
                  )}
                  {formData.leave === 'no' && (
                    <>
                      <div className="form-grid">
                        <JobTitleDropdown
                          id="return_job_title"
                          name="return_job_title"
                          value={formData.return_job_title}
                          onChange={handleInputChange}
                        />
                        <div>
                          <label htmlFor="return_classification">
                            Employee Classification:
                          </label>
                          <br></br>
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
                          <label htmlFor="updated_office">
                            ICM service office:
                          </label>
                          <input
                            id="updated_office"
                            type="text"
                            name="updated_office"
                            value={formData.updated_office}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  <p style={{ fontSize: '0.8em' }}>
                    <strong><span style={{ backgroundColor: 'yellow' }}>
                        Please communicate the departure and return date for the leave below if possible. All relevant documentation must be submitted by the supervisor to the PSA through a MyHR request.
                    </span></strong>
                  </p>
                </div>
              </>
            )}

            {(
              formData.request_type.includes('Access Request') ||
              (formData.request_type.includes('Information Change') && formData.access_request === 'yes') ||
              (formData.request_type.includes('Leave - Departing/Returning') && formData.leave === 'no')
            ) && (
              <>
                <div className="header-container">
                  <h4 style={{ color: '#555555' }}>Access Request</h4>
                </div>
                <div className="request-change-content">
                  <section className="info-section">
                    <p>Select all that apply:</p>
                    <div className="checkbox-group">
                      <div>
                        <input
                          type="checkbox"
                          id="drive_folders"
                          name="drive_folders"
                          checked={formData.drive_folders || false}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="drive_folders">Drive/Folders</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="mailboxes"
                          name="mailboxes"
                          checked={formData.mailboxes || false}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="mailboxes">Mailboxes</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="iexpense"
                          name="iexpense"
                          checked={formData.iexpense || false}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="iexpense">iExpense</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="expense_authority"
                          name="expense_authority"
                          checked={formData.expense_authority || false}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="expense_authority">Signing/Expense Authority</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="software"
                          name="software"
                          checked={formData.software || false}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="software">Software</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="plms"
                          name="plms"
                          checked={formData.plms || false}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="plms">PLMS</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="third_party_checks"
                          name="third_party_checks"
                          checked={formData.third_party_checks || false}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="third_party_checks">Third Party Checks</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="icbc"
                          name="icbc"
                          checked={formData.icbc || false}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="icbc">ICBC</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="vital_stats"
                          name="vital_stats"
                          checked={formData.vital_stats || false}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="vital_stats">Vital Statistics</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="new_hires"
                          name="new_hires"
                          checked={formData.new_hires || false}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="new_hires">New Hires</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="webaob"
                          name="webaob"
                          checked={formData.webaob || false}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="webaob">WebAOB</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="bconline"
                          name="bconline"
                          checked={formData.bconline || false}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="bconline">BC Online</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="CDW_OBIEE"
                          name="CDW_OBIEE"
                          checked={formData.CDW_OBIEE || false}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="CDW_OBIEE">CDW/OBIEE</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="other_access"
                          name="other_access"
                          checked={formData.other_access || false}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="other_access">Other</label>
                      </div>
                    </div>
                    <p>
                      For ICE ID requests and Teleopti Access requests, please contact the &nbsp;
                      <a 
                        href="mailto:SDSI.OPS.SUPPORT.Scheduling.and.Workload.Management@gov.bc.ca" 
                        style={{ color: '#4A90E2', textDecoration: 'underline' }}
                      >
                        Scheduling and Workload Management inbox
                      </a>.
                    </p>                
                  </section>
                  {formData.drive_folders === true && (
                    <>
                      <div>
                        <label htmlFor="drives_folders">
                          What specific drives and folders are required?
                        </label><br></br>
                        <input
                          id="drives_folders"
                          type="text"
                          name="drives_folders"
                          value={formData.drives_folders}
                          onChange={handleInputChange}
                        />
                      </div>
                      <p className="field-note">
                        Please include the S# of the drive that you are requesting and specific folders. Example S\\12345\Folder
                      </p>
                    </>
                  )}
                  {formData.mailboxes === true && (
                    <>
                      <div className="radio-group">
                        <label><strong>Mailbox change request</strong></label>
                        <div>
                          <input
                            type="radio"
                            id="send_from"
                            name="mailbox_radio"
                            value="send_from"
                            checked={formData.mailbox_radio === 'send_from'}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="send_from">'Send From' access</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="ownership"
                            name="mailbox_radio"
                            value="ownership"
                            checked={formData.mailbox_radio === 'ownership'}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="ownership">Mailbox ownership</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="backup"
                            name="mailbox_radio"
                            value="backup"
                            checked={formData.mailbox_radio === 'backup'}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="backup">Backup ownership</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="removal"
                            name="mailbox_radio"
                            value="removal"
                            checked={formData.mailbox_radio === 'removal'}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="removal">Removal</label>
                        </div>
                      </div>
                      <div className="textarea-field">
                        <label htmlFor="mailbox_comments">Provide the names and emails of the required mailboxes as per the GAL:</label> <br></br>
                        <textarea
                          id="mailbox_comments"
                          name="mailbox_comments"
                          rows="4" 
                          value={formData.mailbox_comments || ''}
                          onChange={handleInputChange}
                        />
                      </div><br></br>  
                    </>
                  )}
                  {formData.expense_authority === true && (
                    <>
                      <label>
                      <p>
                        For signing/expense authority access, please ensure that you complete an &nbsp;
                        <a 
                          href="https://intranet.gov.bc.ca/assets/intranet/documents/sdpr/sdd/operations-support/centralized-recruitment-and-staffing/expense_authority_-_signature_request_form.pdf" 
                          style={{ color: '#4A90E2', textDecoration: 'underline' }} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Expense Authority Signature Request 
                        </a> 
                        &nbsp; and send it to the &nbsp;
                        <a 
                          href="mailto:SDSI.OPSSupport.Staffing@gov.bc.ca" 
                          style={{ color: '#4A90E2', textDecoration: 'underline' }}
                        >
                          Staffing Inbox
                        </a>.
                      </p>
                      </label>
                    </>
                  )}
                  {formData.software === true && (
                    <>
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <label htmlFor="software_request">
                            Software requested:
                          </label><br></br>
                          <select
                            id="software_request"
                            name="software_request"
                            value={formData.software_request}
                            onChange={handleInputChange}
                          >
                            <option value="">Please Select:</option>
                            <option value="Adobe Acrobat Pro">Adobe Acrobat Pro ($66.60/year)</option>
                            <option value="Adobe Photoshop">Adobe Photoshop ($294.48/year)</option>
                            <option value="Adobe Lightroom">Adobe Lightroom ($108.96/year)</option>
                            <option value="TechSmith Camtasia">TechSmith Camtasia ($278.19/year)</option>
                            <option value="MS Visio">MS Visio ($174.00/year)</option>
                            <option value="MS Project">MS Project ($376.44/year)</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div style={{ flex: 1 }}>
                          <label htmlFor="computer_number">
                            Computer number:
                          </label><br></br>
                          <input
                            id="computer_number"
                            type="text"
                            name="computer_number"
                            value={formData.computer_number}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="textarea-field" style={{ marginTop: '20px' }}>
                        <label htmlFor="software_case">Business case:</label> <br></br>
                        <textarea
                          id="software_case"
                          name="software_case"
                          rows="4" 
                          value={formData.software_case || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                      <p className="field-note">Provide a justification for the item requested.</p>
                      <br></br>  
                    </>
                  )}
                  {formData.third_party_checks === true && (
                    <>
                      <label>
                      <p>
                      <strong>For all Equifax password resets</strong> and/or certificate renewals please contact the&nbsp;
                        <a 
                          href="mailto:SDSI.OPSSupport.Staffing@gov.bc.ca" 
                          style={{ color: '#4A90E2', textDecoration: 'underline' }}
                        >
                          Staffing Inbox
                        </a>.
                      </p>
                      </label>
                      <div>
                        <label htmlFor="third_party_checks_request">
                          Equifax request details:
                        </label><br></br>
                        <input
                          id="third_party_checks_request"
                          type="text"
                          name="third_party_checks_request"
                          value={formData.third_party_checks_request}
                          onChange={handleInputChange}
                        />
                      </div><br></br>
                    </>
                  )}
                  {formData.icbc === true && (
                    <>
                      <label>
                        <strong>ICBC request</strong>
                      </label>
                      <div className="radio-group">
                        <label>Has this employee completed IM117 (Protection of Privacy, Access to Information and Records Management) within the past 24 months?</label>
                        <div>
                          <input
                            type="radio"
                            id="im117_yes"
                            name="icbc_im117"
                            value="yes"
                            checked={formData.icbc_im117 === 'yes'}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="im117_yes">Yes</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="im117_no"
                            name="icbc_im117"
                            value="no"
                            checked={formData.icbc_im117 === 'no'}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="im117_no">No</label>
                        </div>
                      </div>  
                      <div className="date-field">
                        <label htmlFor="im117_date">
                          Date completed:
                        </label>
                        <input
                          type="date"
                          id="im117_date"
                          name="im117_date"
                          value={formData.im117_date || ''}
                          onChange={handleInputChange}
                        />
                      </div> 
                    </>
                  )}
                  {formData.vital_stats === true && (
                    <>
                      <label>
                        <strong>Vital Statistics</strong>
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                          <label htmlFor="vital_name">Name:</label><br />
                          <input
                            id="vital_name"
                            type="text"
                            name="vital_name"
                            value={formData.vital_name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="vital_idir">IDIR:</label><br />
                          <input
                            id="vital_idir"
                            type="text"
                            name="vital_idir"
                            value={formData.vital_idir}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="vital_email">Email address:</label><br />
                          <input
                            id="vital_email"
                            type="email"
                            name="vital_email"
                            value={formData.vital_email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <OfficeDropdown
                          id="vital_office"
                          name="vital_office"
                          value={formData.vital_office}
                          onChange={handleInputChange}
                        />
                      </div>
                      <br />
                    </>
                  )}
                  {formData.new_hires === true && (
                    <>
                      <label>
                        <strong>New hire details</strong>
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <ProgramAreaDropdown
                          id="new_hire_program_area"
                          name="new_hire_program_area"
                          value={formData.new_hire_program_area}
                          onChange={handleInputChange}
                        />
                        <div>
                          <label htmlFor="new_hire_position">Position:</label>
                          <input
                            id="new_hire_position"
                            type="text"
                            name="new_hire_position"
                            value={formData.new_hire_position}
                            onChange={handleInputChange}
                          />
                        </div>
                        <OfficeDropdown
                          id="new_hire_office"
                          name="new_hire_office"
                          value={formData.new_hire_office}
                          onChange={handleInputChange}
                        />
                        <div>
                          <label htmlFor="new_hire_service_office">ICM service office:</label><br />
                          <input
                            id="new_hire_service_office"
                            type="text"
                            name="new_hire_service_office"
                            value={formData.new_hire_service_office}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div style={{ marginTop: '20px' }}>
                        <label htmlFor="new_hire_drives">Drive/folder to be added:</label><br />
                        <input
                          id="new_hire_drives"
                          type="text"
                          name="new_hire_drives"
                          value={formData.new_hire_drives}
                          onChange={handleInputChange}
                          style={{ width: '100%' }}
                        />
                        <p className="field-note">Please include the S# of the drive that you are requesting and specific folders. Example S\\12345\Folder</p>
                      </div>
                    </>
                  )}
                  {formData.webaob === true && (
                    <>
                      <label>
                      <p>
                      For WebAOB access requests and WebAOB password resets please email: &nbsp;
                        <a 
                          href="mailto:SDPR.ThirdPartyAccess@gov.bc.ca" 
                          style={{ color: '#4A90E2', textDecoration: 'underline' }}
                        >
                          SDPR.ThirdPartyAccess@gov.bc.ca
                        </a>.
                      </p>
                      </label>
                    </>
                  )}
                  {formData.other_access === true && (
                    <>
                      <div className="textarea-field">
                        <label htmlFor="access_comments">What do you need access to?</label> <br></br>
                        <textarea
                          id="access_comments"
                          name="access_comments"
                          rows="4" 
                          value={formData.access_comments || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                    </>
                  )}
                  <p className="field-note">We are unable to mirror the access of an existing employee</p>
                </div>
              </>
            )}

            {formData.request_type && formData.request_type.includes('Exits') && (
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
            )}

            <div className="header-container">
              <h4 style={{ color: '#555555' }}>Dates</h4>
            </div> 
            <div className="date-container">
              <div className="date-field">
                <label htmlFor="start_date">
                  <span className="required">*</span> Start Date: 
                </label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="date-field">
                <label htmlFor="end_date">
                  End Date: 
                </label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="date-field">
                <label htmlFor="todays_date">
                  <span className="required">*</span> Today's Date: 
                </label>
                <input
                  type="date"
                  id="todays_date"
                  name="todays_date"
                  value={formData.todays_date || ''}
                  onChange={handleInputChange}
                  required
                />
                <p className="field-note">Date you are submitting this request</p>
              </div>
            </div>
            <div className="textarea-field">
              <label htmlFor="comments">Comments:</label> <br></br>
              <textarea
                id="comments"
                name="comments"
                rows="4" 
                value={formData.comments || ''}
                onChange={handleInputChange}
              />
            </div><br></br>
            <div>
              <label htmlFor="requestor_email">
                <span className="required">*</span> Requestor Email:<br></br>
              </label>
              <input
                id="requestor_email"
                type="email"
                name="requestor_email"
                value={formData.requestor_email}
                onChange={handleInputChange}
                required
              />
              <p className="field-note">This email address <strong>will</strong> receive a copy of this submission</p>
            </div>
            <div>
              <label htmlFor="attachments">
                Attachments:
              </label><br></br>
              <input
                type="file"
                id="attachments"
                name="attachments"
                onChange={handleFileChange}
              />
              </div><p></p>
            <div>
              {attachments.map((attachment, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <input
                    type="file"
                    onChange={(e) => handleAddAttachment(e, index)}
                  />
                </div>
              ))}
              <p className="field-note">You can upload pdf's, documents, or other files</p>            
              <button type="button" onClick={addNewAttachmentField}>
                Add Another Attachment
              </button>
            </div>

            <br></br>
            <button type="submit" style={{ backgroundColor: '#2172ff', color: 'white' }}>Email</button>
            
          </div>
        </form>
        ) : (
          <div>
            <div className="header">
              <img src={logo} alt="Logo" className="logo" />
              <img src={banner} alt="Banner" className="banner" />
              <h2 style={{ textAlign: 'left', paddingLeft: '10px', color: '#444444' }}>Staff Update Form</h2>
            </div>
            <h2>Thank you for submitting!</h2>
            <p>An email has been sent to the Staffing inbox, as well as: <br></br>{formData.requestor_email}</p>
            <button onClick={() => setSubmitted(false)}>Submit Another</button>
          </div>
        )}
    </div>
  );
}

export default App;

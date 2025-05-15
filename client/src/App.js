// import libraries
import './App.css';
import logo from './logo.png';
import banner from './banner.png';
import React, { useState, useRef, useEffect } from 'react';
import { generatePDF } from './pdfGenerator';
import { getKeycloak, getUserEmail } from './keycloak'; // Import the simplified getKeycloak function
// import mappings
import paylistMapping from './programAreaPaylistMapping';
import classificationMapping from './jobTitleClassificationMapping';
import RequestTypeButtons from './RequestTypeButtons';
// import sections
import CurrentInformationSection from './CurrentInformationSection';
import InformationChangeSection from './InformationChangeSection';
import TemporaryAppointmentSection from './TemporaryAppointmentSection';
import ChangeOfHoursSection from './ChangeOfHoursSection';
import PositionMovementSection from './PositionMovementSection';
import LeaveSection from './LeaveSection';
import AccessRequestSection from './AccessRequestSection';
import ExitsSection from './ExitsSection';

function App() {
  const today = new Date().toISOString().split('T')[0];
  const initialFormData = {
    request_type: [],
    firstname: '',
    lastname: '',
    employee_id: '',
    start_date: today,
    todays_date: today,
    requestor_email: '',
    comments: 'Please do not include unnecessary private information in the comments',
  };
  
  const formRef = useRef(null)
  const [formData, setFormData] = useState(initialFormData);
  const [attachments, setAttachments] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null); // State to store the token

  useEffect(() => {
    getKeycloak()
      .then((keycloak) => {
        setInitialized(true);
        setAuthenticated(keycloak.authenticated);

        // Set the email of the logged-in user
        const user_email = getUserEmail();
        if (user_email) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            requestor_email: user_email,
          }));
        }

        // Store the token
        setToken(keycloak.token);
      })
      .catch((err) => {
        console.error('Keycloak initialization failed:', err);
      });
  }, []);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <div>Authentication required. Redirecting...</div>;
  }

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
  const handleFileChange = e => {
    const file = e.target.files[0]; // get the attached file
    if (!file) return; // if no file selected, do nothing
    setAttachments(prev => {
      const next = [...prev];
      next[0] = file;
      return next;
    });
  };

  const handleAddAttachment = (e, index) => {
    const file = e.target.files[0];
    setAttachments(prev => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
  };

  const addNewAttachmentField = () => {
    setAttachments((prevAttachments) => [...prevAttachments, null]); // Add a placeholder for a new file
  };

  // handle form submission
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      // 0) collect the user‐picked File[] attachments
      const files = attachments.filter(Boolean); // drop any null placeholders

      // 1) PDF first
      const dataUri    = await generatePDF();
      const pdfBase64  = dataUri.split(',')[1];

      // 2) now turn each File into { filename, content: base64, contentType }
      const filePromises = files.map(
        file =>
          new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onerror = rej;
            reader.onload  = () => {
              // reader.result is "data:<mime>;base64,AAAA..."
              const [meta, base64] = reader.result.split(',');
              res({
                filename:    file.name,
                content:     base64,
                contentType: file.type
              });
            };
            reader.readAsDataURL(file);
          })
      );
      const attachmentsPayload = await Promise.all(filePromises);

      // Separate facilities and finance emails for BCC
      const facilitiesEmail = process.env.REACT_APP_FACILITIES_EMAIL;
      const financeEmail = process.env.REACT_APP_FINANCE_EMAIL;

      // 3) POST them
      const API = process.env.REACT_APP_MAIL_SERVER_URL;
      await fetch(`${API}/send-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Use the token from state
        },
        body: JSON.stringify({
          email:        process.env.REACT_APP_STAFFING_EMAIL,
          pdfBase64,
          firstname:    formData.firstname,
          lastname:     formData.lastname,
          employeeID:   formData.employee_id,
          ccMail:       formData.requestor_email, 
          bccMail:      `${facilitiesEmail}; ${financeEmail}`, // Add facilities and finance emails to BCC
          date:         formData.todays_date,
          attachments:  attachmentsPayload
        })
      });

      // 3) show success and reset
      window.alert('Message sent!');

      // reset all form fields, clear out your attachments array
      setFormData(initialFormData);
      setAttachments([]);
      formRef.current?.reset() // reset the form element
    } catch (err) {
      console.error(err);
      window.alert(`Error: ${err.message}`);
    }
  }

  return (
    <div className="App">
      {!submitted ? (
        <form ref={formRef} id="form-to-pdf" onSubmit={handleSubmit}>
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
            <br></br>
            
            {formData.request_type && formData.request_type.length > 0 && (
              <div className="request-type-info">
                <p style={{ fontSize: '0.8em' }}>
                <b>Collection Notice:</b> We are collecting your personal information for the purpose of obtaining the approvals for access to SDPR HR Data under section 26(c) of the Freedom of Information and Protection of Privacy Act. If you have any questions, please contact WIRTeam@gov.bc.ca.
                </p>
              </div>
            )}     

            {/* display current information section */}
            <CurrentInformationSection
              formData={formData}
              onChange={handleInputChange}
            />

            {/* if selected, insert information change section */}
            {formData.request_type.includes('Information Change') && (
              <InformationChangeSection
                formData={formData}
                onChange={handleInputChange}
              />
            )}

            {/* if selected, insert TA section */}
            {formData.request_type.includes('Temporary Appointment or Acting Opportunities') && (
              <TemporaryAppointmentSection
                formData={formData}
                onChange={handleInputChange}
              />
            )}

            {/* if selected, insert change of hours section */}
            {formData.request_type.includes('Change of Hours') && (
              <ChangeOfHoursSection
                formData={formData}
                onChange={handleInputChange}
              />
            )}

            {/* if selected, insert position movement section */}
            {formData.request_type.includes('Position Movement') && (
              <PositionMovementSection
                formData={formData}
                onChange={handleInputChange}
              />
            )}

            {/* if selected, insert leave section */}
            {formData.request_type && formData.request_type.includes('Leave - Departing/Returning') && (
              <LeaveSection 
                formData={formData} 
                handleInputChange={handleInputChange} 
              />
            )}

            {/* if selected, insert access request section */}
            {(
              formData.request_type.includes('Access Request') ||
              (formData.request_type.includes('Information Change') && formData.access_request === 'yes') ||
              (formData.request_type.includes('Leave - Departing/Returning') && formData.leave === 'no')
            ) && (
              <AccessRequestSection 
                formData={formData} 
                handleInputChange={handleInputChange} 
              />
            )}

            {/* if selected, insert exits section */}
            {formData.request_type && formData.request_type.includes('Exits') && (
              <ExitsSection 
                formData={formData} 
                handleInputChange={handleInputChange} 
              />
            )}

            {/* display the dates/comments/attachments section */}
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
              <button type="button" onClick={addNewAttachmentField}>
                Attach a file
              </button>
              <p className="field-note">You can upload pdf's, documents, or other files</p>            
            </div>
            {attachments.map((attachment, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <input
                  type="file"
                  onChange={(e) => handleAddAttachment(e, index)}
                />
              </div>
            ))}

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

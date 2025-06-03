import React from 'react';
import OfficeDropdown from './OfficeDropdown';
import ProgramAreaDropdown from './ProgramAreaDropdown';

export default function AccessRequestSection({ formData, handleInputChange }) {
  return (
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
                <div className="textarea-field">
                    <label htmlFor="drives_folders">What specific drives and folders are required?</label> <br></br>
                    <textarea
                        id="drives_folders"
                        name="drives_folders"
                        rows="2" 
                        value={formData.drives_folders || ''}
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
                    <label htmlFor="new_hire_position">Position:</label><br></br>
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
  );
}

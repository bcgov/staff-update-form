import React from 'react';

const programAreaOptions = [
    { value: '', label: 'Please Select:' },
    { value: 'Strategic Services Branch - Strategic Partnerships and Communications', label: 'Strategic Services Branch - Strategic Partnerships and Communications' },
    { value: 'Strategic Services Branch - Strategic Projects & Technology Support', label: 'Strategic Services Branch - Strategic Projects & Technology Support' },
    { value: 'Strategic Services Branch - Knowledge Management', label: 'Strategic Services Branch - Knowledge Management' },
    { value: 'Prevention and Loss Management Services - Criminal Investigation Unit', label: 'Prevention and Loss Management Services - Criminal Investigation Unit' },
    { value: 'Prevention and Loss Management Services - Operations Management', label: 'Prevention and Loss Management Services - Operations Management' },
    { value: 'Prevention and Loss Management Services - Vancouver Island PLMS - Victoria', label: 'Prevention and Loss Management Services - Vancouver Island PLMS - Victoria' },
    { value: 'Prevention and Loss Management Services - Vancouver Island PLMS - Nanaimo', label: 'Prevention and Loss Management Services - Vancouver Island PLMS - Nanaimo' },
    { value: 'Prevention and Loss Management Services - START Task Team', label: 'Prevention and Loss Management Services - START Task Team' },
    { value: 'Prevention and Loss Management Services - Vancouver Coastal PLMS - Vancouver North', label: 'Prevention and Loss Management Services - Vancouver Coastal PLMS - Vancouver North' },
    { value: 'Prevention and Loss Management Services - Fraser PLMS - Fraser West', label: 'Prevention and Loss Management Services - Fraser PLMS - Fraser West' },
    { value: 'Prevention and Loss Management Services - Fraser PLMS - Fraser East', label: 'Prevention and Loss Management Services - Fraser PLMS - Fraser East' },
    { value: 'Prevention and Loss Management Services - Interior PLMS - Kelowna', label: 'Prevention and Loss Management Services - Interior PLMS - Kelowna' },
    { value: 'Prevention and Loss Management Services - North PLMS Regional Office', label: 'Prevention and Loss Management Services - North PLMS Regional Office' },
    { value: 'Prevention and Loss Management Services - Vancouver Coastal PLMS - Vancouver South', label: 'Prevention and Loss Management Services - Vancouver Coastal PLMS - Vancouver South' },
    { value: 'Prevention and Loss Management Services - Eligibility Reviews', label: 'Prevention and Loss Management Services - Eligibility Reviews' },
    { value: 'Prevention and Loss Management Services - Service Quality Unit', label: 'Prevention and Loss Management Services - Service Quality Unit' },
    { value: 'Prevention and Loss Management Services - Program Integrity & Evaluation', label: 'Prevention and Loss Management Services - Program Integrity & Evaluation' },
    { value: 'Prevention and Loss Management Services - Program Evaluation', label: 'Prevention and Loss Management Services - Program Evaluation' },
    { value: 'Prevention and Loss Management Services - Program Support', label: 'Prevention and Loss Management Services - Program Support' },
    { value: 'Operations Support - Finance, Contracts and Records Management', label: 'Operations Support - Finance, Contracts and Records Management' },
    { value: 'Operations Support - Records Management', label: 'Operations Support - Records Management' },
    { value: 'Operations Support - Recruitment, Staffing, Facilities and Assets', label: 'Operations Support - Recruitment, Staffing, Facilities and Assets' },
    { value: 'Operations Support - Analytics and Business Intelligence', label: 'Operations Support - Analytics and Business Intelligence' },
    { value: 'Operations Support - Communications, Engagement and Organizational Health', label: 'Operations Support - Communications, Engagement and Organizational Health' },
    { value: 'Virtual Services - Intake', label: 'Virtual Services - Intake' },
    { value: 'Virtual Services - Specialized Intake', label: 'Virtual Services - Specialized Intake' },
    { value: 'Virtual Services - Management Intake', label: 'Virtual Services - Management Intake' },
    { value: 'Virtual Services - Employment Plans', label: 'Virtual Services - Employment Plans' },
    { value: 'Virtual Services - Special Care Faclities', label: 'Virtual Services - Special Care Faclities' },
    { value: 'Virtual Services - Management Health and Specialized Services', label: 'Virtual Services - Management Health and Specialized Services' },
    { value: 'Virtual Services - Case Reviews', label: 'Virtual Services - Case Reviews' },
    { value: 'Virtual Services - OAS-GIS', label: 'Virtual Services - OAS-GIS' },
    { value: 'Virtual Services - Disablility Applications', label: 'Virtual Services - Disablility Applications' },
    { value: 'Virtual Services - Medical Equipment and Supplies', label: 'Virtual Services - Medical Equipment and Supplies' },
    { value: 'Virtual Services - Medical Transportation', label: 'Virtual Services - Medical Transportation' },
    { value: 'Virtual Services - Health Resource Team', label: 'Virtual Services - Health Resource Team' },
    { value: 'Virtual Services - Funeral Services', label: 'Virtual Services - Funeral Services' },
    { value: 'Virtual Services - Bus Pass', label: 'Virtual Services - Bus Pass' },
    { value: 'Virtual Services - Management Contact Centre', label: 'Virtual Services - Management Contact Centre' },
    { value: 'Virtual Services - Victoria CC', label: 'Virtual Services - Victoria CC' },
    { value: 'Virtual Services - Lower Mainland  CC', label: 'Virtual Services - Lower Mainland  CC' },
    { value: 'Virtual Services - Kamloops CC', label: 'Virtual Services - Kamloops CC' },
    { value: 'Virtual Services - PG CC', label: 'Virtual Services - PG CC' },
    { value: 'Virtual Services - After Hours', label: 'Virtual Services - After Hours' },
    { value: 'Virtual Services - Chilliwack Contact Centre', label: 'Virtual Services - Chilliwack Contact Centre' },
    { value: 'Community Integration Services - Management', label: 'Community Integration Services - Management' },
    { value: 'Community Integration Services - Performance and Reporting', label: 'Community Integration Services - Performance and Reporting' },
    { value: 'Community Integration Services - Practice and Partnerships', label: 'Community Integration Services - Practice and Partnerships' },
    { value: 'Community Integration Services - Management Service Delivery', label: 'Community Integration Services - Management Service Delivery' },
    { value: 'Community Integration Services - Van Island South', label: 'Community Integration Services - Van Island South' },
    { value: 'Community Integration Services - Fraser North', label: 'Community Integration Services - Fraser North' },
    { value: 'Community Integration Services - Fraser Surrey', label: 'Community Integration Services - Fraser Surrey' },
    { value: 'Community Integration Services - Interior North', label: 'Community Integration Services - Interior North' },
    { value: 'Community Integration Services - North', label: 'Community Integration Services - North' },
    { value: 'Community Integration Services - Van Downtown/DTES', label: 'Community Integration Services - Van Downtown/DTES' },
    { value: 'Community Integration Services - Van Island Central/North', label: 'Community Integration Services - Van Island Central/North' },
    { value: 'Community Integration Services - Interior South', label: 'Community Integration Services - Interior South' },
    { value: 'Community Integration Services - Van East/South Richmond', label: 'Community Integration Services - Van East/South Richmond' },
    { value: 'Community Integration Services - Van North Sunshine Sea-Sky', label: 'Community Integration Services - Van North Sunshine Sea-Sky' },
    { value: 'Community Integration Services - Fraser South', label: 'Community Integration Services - Fraser South' },
    { value: 'Community Services - Management', label: 'Community Services - Management' },
    { value: 'Community Services - Vefra - Victoria', label: 'Community Services - Vefra - Victoria' },
    { value: 'Community Services - Gateway - Victoria', label: 'Community Services - Gateway - Victoria' },
    { value: 'Community Services - Nanaimo South', label: 'Community Services - Nanaimo South' },
    { value: 'Community Services - Nanaimo North', label: 'Community Services - Nanaimo North' },
    { value: 'Community Services - Port Alberni', label: 'Community Services - Port Alberni' },
    { value: 'Community Services - Abbotsford', label: 'Community Services - Abbotsford' },
    { value: 'Community Services - Courtenay', label: 'Community Services - Courtenay' },
    { value: 'Community Services - Powell River', label: 'Community Services - Powell River' },
    { value: 'Community Services - Campbell River', label: 'Community Services - Campbell River' },
    { value: 'Community Services - Duncan', label: 'Community Services - Duncan' },
    { value: 'Community Services - Mission', label: 'Community Services - Mission' },
    { value: 'Community Services - Maple Ridge', label: 'Community Services - Maple Ridge' },
    { value: 'Community Services - Sechelt', label: 'Community Services - Sechelt' },
    { value: 'Community Services - Reports, Utilities and ID Team', label: 'Community Services - Reports, Utilities and ID Team' },
    { value: 'Community Services - Langley', label: 'Community Services - Langley' },
    { value: 'Community Services - Chilliwack', label: 'Community Services - Chilliwack' },
    { value: 'Community Services - Hope', label: 'Community Services - Hope' },
    { value: 'Community Services - Tri-Cities', label: 'Community Services - Tri-Cities' },
    { value: 'Community Services - Management', label: 'Community Services - Management' },
    { value: 'Community Services - Cranbrook', label: 'Community Services - Cranbrook' },
    { value: 'Community Services - Grand Forks SBC', label: 'Community Services - Grand Forks SBC' },
    { value: 'Community Services - Trail', label: 'Community Services - Trail' },
    { value: 'Community Services - Nelson', label: 'Community Services - Nelson' },
    { value: 'Community Services - Oliver', label: 'Community Services - Oliver' },
    { value: 'Community Services - Penticton', label: 'Community Services - Penticton' },
    { value: 'Community Services - Westbank', label: 'Community Services - Westbank' },
    { value: 'Community Services - Kelowna', label: 'Community Services - Kelowna' },
    { value: 'Community Services - Vernon', label: 'Community Services - Vernon' },
    { value: 'Community Services - Salmon Arm', label: 'Community Services - Salmon Arm' },
    { value: 'Community Services - Kamloops South', label: 'Community Services - Kamloops South' },
    { value: 'Community Services - Kamloops North', label: 'Community Services - Kamloops North' },
    { value: 'Community Services - Merritt SBC', label: 'Community Services - Merritt SBC' },
    { value: 'Community Services - 100 Mile House', label: 'Community Services - 100 Mile House' },
    { value: 'Community Services - Williams Lake', label: 'Community Services - Williams Lake' },
    { value: 'Community Services - Quesnel', label: 'Community Services - Quesnel' },
    { value: 'Community Services - Dawson Creek', label: 'Community Services - Dawson Creek' },
    { value: 'Community Services - Fort St John', label: 'Community Services - Fort St John' },
    { value: 'Community Services - Prince George', label: 'Community Services - Prince George' },
    { value: 'Community Services - Vanderhoof SBC', label: 'Community Services - Vanderhoof SBC' },
    { value: 'Community Services - Smithers', label: 'Community Services - Smithers' },
    { value: 'Community Services - Terrace', label: 'Community Services - Terrace' },
    { value: 'Community Services - Prince Rupert', label: 'Community Services - Prince Rupert' },
    { value: 'Community Services - Provincial Profiling Team', label: 'Community Services - Provincial Profiling Team' },
    { value: 'Community Services - Service BC Support Team', label: 'Community Services - Service BC Support Team' },
    { value: 'Community Services - Change in Circumstance Team', label: 'Community Services - Change in Circumstance Team' },
    { value: 'Community Services - File Review Team', label: 'Community Services - File Review Team' },
    { value: 'Community Services - Admin Underpayment Team', label: 'Community Services - Admin Underpayment Team' },
    { value: 'Community Services - Management', label: 'Community Services - Management' },
    { value: 'Community Services - Richmond', label: 'Community Services - Richmond' },
    { value: 'Community Services - Dockside', label: 'Community Services - Dockside' },
    { value: 'Community Services - Strathcona', label: 'Community Services - Strathcona' },
    { value: 'Community Services - Kiwassa', label: 'Community Services - Kiwassa' },
    { value: 'Community Services - Grandview', label: 'Community Services - Grandview' },
    { value: 'Community Services - New Westminster', label: 'Community Services - New Westminster' },
    { value: 'Community Services - Mountainview', label: 'Community Services - Mountainview' },
    { value: 'Community Services - West End', label: 'Community Services - West End' },
    { value: 'Community Services - Burnaby Metro Pointe', label: 'Community Services - Burnaby Metro Pointe' },
    { value: 'Community Services - North Van', label: 'Community Services - North Van' },
    { value: 'Community Services - Fleetwood', label: 'Community Services - Fleetwood' },
    { value: 'Community Services - Surrey North', label: 'Community Services - Surrey North' },
    { value: 'Community Services - Park Place', label: 'Community Services - Park Place' }
  ];

const ProgramAreaDropdown = ({ id, name, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id}>Branch/Program Area:</label>
      <br></br>
      <select id={id} name={name} value={value} onChange={onChange}>
        {programAreaOptions.map((option) => (
          <option key={option.value || 'default'} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProgramAreaDropdown;

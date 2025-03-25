import React from 'react';

const officeOptions = [
  { value: '', label: 'Please Select:' },
  { value: '055 Victoria Contact Center', label: '055 Victoria Contact Center' },
  { value: '070 Health and Specialized Services', label: '070 Health and Specialized Services' },
  { value: '100 Nanaimo', label: '100 Nanaimo' },
  { value: '100 Victoria Regional', label: '100 Victoria Regional' },
  { value: '106 Vefra Victoria', label: '106 Vefra Victoria' },
  { value: '107 Gateway Victoria', label: '107 Gateway Victoria' },
  { value: '129 Duncan', label: '129 Duncan' },
  { value: '132 Nanaimo South', label: '132 Nanaimo South' },
  { value: '135 Nanaimo North', label: '135 Nanaimo North' },
  { value: '138 Port Alberni', label: '138 Port Alberni' },
  { value: '139 Courtney', label: '139 Courtney' },
  { value: '141 Powell River', label: '141 Powell River' },
  { value: '143 Campbell River', label: '143 Campbell River' },
  { value: '144 Port Hardy (SBC)', label: '144 Port Hardy (SBC)' },
  { value: '251 Dockside', label: '251 Dockside' },
  { value: '253 Strathcona', label: '253 Strathcona' },
  { value: '254 Kiwassa', label: '254 Kiwassa' },
  { value: '256 Grandview', label: '256 Grandview' },
  { value: '262 West End', label: '262 West End' },
  { value: '265 Mountainview', label: '265 Mountainview' },
  { value: '270 North Shore', label: '270 North Shore' },
  { value: '272 Sechelt', label: '272 Sechelt' },
  { value: '280 Richmond', label: '280 Richmond' },
  { value: '313 Burnaby Metro Point', label: '313 Burnaby Metro Point' },
  { value: '315 New Westminister', label: '315 New Westminister' },
  { value: '322 Surrey North', label: '322 Surrey North' },
  { value: '326 Park Place', label: '326 Park Place' },
  { value: '327 Fleetwood', label: '327 Fleetwood' },
  { value: '328 Langley', label: '328 Langley' },
  { value: '330 Abbotsford', label: '330 Abbotsford' },
  { value: '331 Chilliwack', label: '331 Chilliwack' },
  { value: '333 Hope', label: '333 Hope' },
  { value: '334 Mission', label: '334 Mission' },
  { value: '335 Maple Ridge', label: '335 Maple Ridge' },
  { value: '337 Tri-Cities', label: '337 Tri-Cities' },
  { value: '350 Lower Mainland Conact Centre (LMCC)', label: '350 Lower Mainland Conact Centre (LMCC)' },
  { value: '400 Kamloops Regional', label: '400 Kamloops Regional' },
  { value: '403 Kelowna Landmark', label: '403 Kelowna Landmark' },
  { value: '411 Cranbrook (SBC)', label: '411 Cranbrook (SBC)' },
  { value: '412 Fernie (SBC)', label: '412 Fernie (SBC)' },
  { value: '413 Golden (SBC)', label: '413 Golden (SBC)' },
  { value: '420 Grand Forks (SBC)', label: '420 Grand Forks (SBC)' },
  { value: '421 Trail', label: '421 Trail' },
  { value: '422 Nelson', label: '422 Nelson' },
  { value: '432 Nakusp (SBC)', label: '432 Nakusp (SBC)' },
  { value: '430 Princeton (SBC)', label: '430 Princeton (SBC)' },
  { value: '431 Oliver', label: '431 Oliver' },
  { value: '432 Penticton', label: '432 Penticton' },
  { value: '433 Westbank (West Kelowna)', label: '433 Westbank (West Kelowna)' },
  { value: '434 Kelowna', label: '434 Kelowna' },
  { value: '460 Vernon', label: '460 Vernon' },
  { value: '463 Salmon Arm (SBC)', label: '463 Salmon Arm (SBC)' },
  { value: '470 Kamloops Contact Centre (ICC)', label: '470 Kamloops Contact Centre (ICC)' },
  { value: '471 Kamloops South', label: '471 Kamloops South' },
  { value: '472 Kamloops North', label: '472 Kamloops North' },
  { value: '474 Merritt (SBC)', label: '474 Merritt (SBC)' },
  { value: '480 100 Mile House', label: '480 100 Mile House' },
  { value: '481 Williams Lake', label: '481 Williams Lake' },
  { value: '482 Quesnel', label: '482 Quesnel' },
  { value: '500 Prince George Regional', label: '500 Prince George Regional' },
  { value: '510 Mackenzie (SBC)', label: '510 Mackenzie (SBC)' },
  { value: '511 Dawson Creek (SBC)', label: '511 Dawson Creek (SBC)' },
  { value: '513 Fort St John (SBC)', label: '513 Fort St John (SBC)' },
  { value: '583 Prince George Contact Centre (NCC)', label: '583 Prince George Contact Centre (NCC)' },
  { value: '585 Prince George', label: '585 Prince George' },
  { value: '589 Smithers (SBC)', label: '589 Smithers (SBC)' },
  { value: '594 Terrace (SBC)', label: '594 Terrace (SBC)' },
  { value: '596 Prince Rupert', label: '596 Prince Rupert' },
  { value: '597 Masset (SBC)', label: '597 Masset (SBC)' },
  { value: '989 Victoria (Belmont)', label: '989 Victoria (Belmont)' },
  { value: '904 HITT (PLMS)', label: '904 HITT (PLMS)' },
  { value: '932 CIU (108A)', label: '932 CIU (108A)' },
  { value: '934 START (PLMS)', label: '934 START (PLMS)' },
  { value: '996 Admin (PLMS)', label: '996 Admin (PLMS)' },
  { value: '997 SQ (PLMS)', label: '997 SQ (PLMS)' },
  { value: '0X5 Prince George (4th Ave)', label: '0X5 Prince George (4th Ave)' },
  { value: 'X10 Vefra Victoria (Pandora)', label: 'X10 Vefra Victoria (Pandora)' },
  { value: 'X12 Operations Management (PLMS)', label: 'X12 Operations Management (PLMS)' },
  { value: 'X20 Metro Vancouver', label: 'X20 Metro Vancouver' },
  { value: 'X21 Metro Vancouver', label: 'X21 Metro Vancouver' },
  { value: 'X30 Metro Vancouver', label: 'X30 Metro Vancouver' },
  { value: 'X31 Surrey (King George)', label: 'X31 Surrey (King George)' },
  { value: 'X40 Kelowna (Richter)', label: 'X40 Kelowna (Richter)' },
  { value: 'X41 Kamloops', label: 'X41 Kamloops' },
  { value: 'Other', label: 'Other' }
];

const OfficeDropdown = ({ id, name, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id}>Employee Physical Office:</label>
      <br></br>
      <select id={id} name={name} value={value} onChange={onChange}>
        {officeOptions.map((option) => (
          <option key={option.value || 'default'} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OfficeDropdown;

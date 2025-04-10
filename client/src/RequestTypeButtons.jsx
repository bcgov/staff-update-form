import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './RequestTypeButtons.css';

const RequestTypeButtons = ({ selected, onSelect }) => {
  const requestTypes = [
    "Information Change",
    "Access Request",
    "Temporary Appointment or Acting Opportunities",
    "Change of Hours",
    "Position Movement",
    "Leave - Departing/Returning",
    "Exits: Transfer to Another Ministry",
    "Exits: Resignation, Retirement, or Other",
    "Other"
  ];

  const getTooltipText = (type) => {
    if (type === "Access Request") {
      return "Access to drives, folders, mailboxes, ICE, Teleopti, I-Expense, Signing/Expense Authority, etc.";
    } else if (type === "Information Change") {
      return "Change name, title, office, location, supervisor, branch/program area, TALM roles, etc.";
    } 
    return "";
  };

  return (
    <div className="request-type-buttons">
      {requestTypes.map((type) => {
        const tooltipText = getTooltipText(type);
        const isSelected = selected.includes(type);
        const button = (
          <button
            type="button"
            className={`request-type-button ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(type)}
          >
            {type}
          </button>
        );
        return tooltipText 
          ? (
            <Tippy key={type} content={tooltipText} delay={[0, 0]}>
              {button}
            </Tippy>
          )
          : (
            <React.Fragment key={type}>
              {button}
            </React.Fragment>
          );
      })}
    </div>
  );
};

export default RequestTypeButtons;

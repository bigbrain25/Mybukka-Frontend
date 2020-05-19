import React, { Fragment } from 'react';
import './index.scss';

const activeDay = 'monday';

const altSchedule = [
  { day: 'monday', openingHour: '8 am', closingHour: '8 pm', closed: false },
  { day: 'tuesday', openingHour: '8 am', closingHour: '8 pm', closed: false },
  { day: 'wednessday', openingHour: '8 am', closingHour: '8 pm', closed: false },
  { day: 'thursday', openingHour: '8 am', closingHour: '8 pm', closed: false },
  { day: 'friday', openingHour: '8 am', closingHour: '8 pm', closed: false },
  { day: 'saturday', openingHour: '8 am', closingHour: '8 pm', closed: false },
  { day: 'sunday', openingHour: '8 am', closingHour: '8 pm', closed: false },
];

const BusinessSchedule = ({ schedule, activeSchedule = activeDay }) => {
  const hasSchedule = schedule && schedule.length > 0 ? schedule : altSchedule;
  return (
    <div className="Business-Schedule">
      <div className="Business-Schedule-Header">
        <div className="Business-Schedule-Header-Content">
          <h3 className="Business-Schedule-Header-Title"><span>Open Hours</span></h3>
          <div className="Business-Schedule-Header-Desc"><span>Order Delivery until 3:00 PM</span></div>
        </div>
      </div>

      <div className="Business-Schedule-Body">
        <div className="Business-Schedule-Body-Content">
          {hasSchedule.map(({ day, openingHour, closingHour, closed }) => (
            <div key={day} className={`Business-Schedule-Section${activeSchedule === day ? '--active' : ''}`}>
              <div className="Business-Schedule-Day_Time Schedule-Capitalise"><span>{day}</span></div>
              <div className="Business-Schedule-Day_Time Schedule-Uppercase">
                <span>
                  {closed ? <span>closed</span>
                    : <Fragment>
                      <span>{openingHour}</span>-
                      <span>{closingHour}</span>
                    </Fragment>}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BusinessSchedule;

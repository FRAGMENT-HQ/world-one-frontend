import CountUp, { useCountUp } from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';


export const Counter = ({bgStyle}) => {
  const countertabs = [
    { number: 25000, text: 'Retail Clients Served', suffix: '+' },
    { number: 4000, text: 'Corporate Clients Served', suffix: '+' }, //30+
    { number: 18000, text: 'Student Remittances', suffix: '+' }, //24hrs+
    { number: 40, text: 'Worth Transaction Closed', suffix: 'mn+' }, //6000+
  ];
  return (
    <>
    
      <div  className='landing-counter-container py-2'>
        {countertabs?.map((tab) => (
          // eslint-disable-next-line react/jsx-key
          <div className='landing-counter-subcontainer'>
            <CountUp end={tab.number} suffix={tab.suffix} duration={1.5}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            
            <span className='landing-counter-text  font-semibold'>{tab.text}</span>
          </div>
        ))}
      </div>
     
    </>
  );
};

export default Counter;

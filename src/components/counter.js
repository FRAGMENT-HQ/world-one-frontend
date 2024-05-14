import CountUp, { useCountUp } from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';


export const Counter = () => {
  const countertabs = [
    { number: 25000, text: 'Retails', suffix: '+' },
    { number: 4000, text: 'Coprate', suffix: '+' }, //30+
    { number: 18000, text: 'Students', suffix: '+' }, //24hrs+
    { number: 40, text: 'closed', suffix: 'mn +' }, //6000+
  ];
  return (
    <>
      <hr />
      <div className='landing-counter-container py-2'>
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
            
            <span className='landing-counter-text'>{tab.text}</span>
          </div>
        ))}
      </div>
      <hr />
    </>
  );
};

export default Counter;

import React, { useState } from 'react';
import "../Assets/Styles/Style.scss";

  
const handleStepContentClick = (e) => {
    e.stopPropagation();
  };

const PaymentStep = () => {
    const [curOpen, setCurOpen] = useState(document.querySelector('.step.minimized'));

    const handleNextButtonClick = () => {
        const cur = curOpen;
        if (cur && cur.nextElementSibling) {
          const next = cur.nextElementSibling;
          cur.classList.add('minimized');
          setTimeout(() => {
            next.classList.remove('minimized');
            setCurOpen(next);
          }, 400);
        }
        
      };
  
    const handleCloseButtonClick = () => {
      const cur = curOpen;
      cur.classList.add('minimized');
      setCurOpen(null);
    };

  
    const handleStepClick = (step) => {
        if (curOpen === step) {
          // If the clicked step is already open, minimize it
          step.classList.add('minimized');
          setCurOpen(null);
        } else {
          // If a different step is clicked, close the current one and open the clicked one
          if (curOpen !== null) {
            const currentStep = curOpen;
            currentStep.classList.add('minimized');
            setTimeout(() => {
              step.classList.remove('minimized');
              setCurOpen(step);
            }, 300);
          } else {
            // If no step is open, just open the clicked one
            step.classList.remove('minimized');
            setCurOpen(step);
          }
        }
      };
      
      
      
      
  return (
    <div>
    <div className="first-image-container">
    <h2 className="first-container-heading">
        Payment Step
    </h2>
    </div>
    <div className="steps">
      <div className="step" onClick={() => handleStepClick(document.querySelector('.step.minimized'))}>
        <div className="step-header">
          <div className="header">Hello This is step one!</div>
          <div className="subheader">Hopefully this looks cool</div>
        </div>
        <div className="step-content one" onClick={handleStepContentClick}>
          <button className="next-btn" onClick={handleNextButtonClick}>
            Next
          </button>
        </div>
      </div>
      <div className="step minimized" onClick={() => handleStepClick(document.querySelector('.step.minimized'))}>
        <div className="step-header">
          <div className="header">This is step two!</div>
          <div className="subheader">The content is a little bigger!</div>
        </div>
        <div className="step-content two" onClick={handleStepContentClick}>
          <button className="next-btn" onClick={handleNextButtonClick}>
            Next
          </button>
        </div>
      </div>
      <div className="step minimized" onClick={() => handleStepClick(document.querySelector('.step.minimized'))}>
        <div className="step-header">
          <div className="header">And finally step three!</div>
          <div className="subheader">Last but not least!</div>
        </div>
        <div className="step-content three" onClick={handleStepContentClick}>
          <button className="close-btn" onClick={handleCloseButtonClick}>
            Close
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default PaymentStep
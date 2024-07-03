import React from "react";
import { PropertiesFormStepProps } from ".";
import { Button } from "antd";

function Basic({ currentStep, setCurrentStep }: PropertiesFormStepProps) {
  return (
    <div>
      <span>Basic</span>
      <div className="flex justify-end gap-5">
        <Button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Basic;

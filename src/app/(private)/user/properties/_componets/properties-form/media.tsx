"use client";
import React, { useState } from "react";
import { PropertiesFormStepProps } from ".";
import { Button, Upload } from "antd";

function Media({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) {
  const [tempFiles, setTempFiles] = useState<any[]>([]);
  const onFinish = () => {
    setFinalValues({
      ...finalValues,
      media: {
        newlyUploadedFiles: tempFiles,
        images: finalValues.media.images,
      },
    });
    setCurrentStep(currentStep + 1);
  };
  return (
    <div>
      <Upload
        listType="picture-card"
        multiple
        beforeUpload={(file: any) => {
          setTempFiles((prev) => [...prev, file]);
          return false;
        }}
      >
        Upload
      </Upload>
      <div className="flex justify-end gap-5">
        <Button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button type="primary" htmlType="submit" onClick={onFinish}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Media;

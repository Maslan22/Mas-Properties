import React from "react";
import { PropertiesFormStepProps } from ".";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { cities } from "@/constants";

function Location({
  currentStep,
  setCurrentStep,
  setFinalValues,
  finalValues,
}: PropertiesFormStepProps) {
  const onFinish = (values: any) => {
    setFinalValues({ ...finalValues, location: values });
    setCurrentStep(currentStep + 1);
  };
  //city, pincode, landmark, address
  return (
    <Form layout="vertical" onFinish={onFinish} initialValues={finalValues.location}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: "Please input City" }]}
        >
          <Select options={cities} placeholder="City" />
        </Form.Item>
        <Form.Item
          name="pincode"
          label="Pincode"
          rules={[{ required: true, message: "Please input Pincode" }]}
        >
          <InputNumber placeholder="Pincode"  className="w-full"/>
        </Form.Item>
        <Form.Item
          name="landmark"
          label="Landmark"
          rules={[{ required: true, message: "Please input Landmark" }]}
        >
          <Input placeholder="Landmark" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input Address" }]}
          className="col-span-1 lg:col-span-3"
        >
          <Input.TextArea rows={5} placeholder="Address" />
        </Form.Item>
      </div>
      <div className="flex justify-end gap-5 mt-7">
        <Button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button htmlType="submit" type="primary">Next</Button>
      </div>
    </Form>
  );
}

export default Location;

import React from "react";
import { PropertiesFormStepProps } from ".";
import { Button, Input, InputNumber, Select, Form } from "antd";
import { facingTypes, parkingTypes, furnishingTypes } from "@/constants";
function Amenities({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) {
  const onFinish = (values: any) => {
    setFinalValues({ ...finalValues, amenities: values });
    setCurrentStep(currentStep + 1);
  };

  //bedrooms, bathrooms, balconies, parking, furnishing, area, totalFloors, facing, age
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={finalValues.amenities}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Form.Item
          name="bedrooms"
          label="Bedrooms"
          rules={[{ required: true, message: "Please input Bedrooms" }]}
        >
          <InputNumber placeholder="Bedrooms" className="w-full"/>
        </Form.Item>
        <Form.Item
          name="bathrooms"
          label="Bathrooms"
          rules={[{ required: true, message: "Please input Bathrooms" }]}
        >
          <InputNumber placeholder="Bathrooms" className="w-full"/>
        </Form.Item>
        <Form.Item
          name="balconies"
          label="Balconies"
          rules={[{ required: true, message: "Please input Balconies" }]}
        >
          <InputNumber placeholder="Balconies" className="w-full"/>
        </Form.Item>
        <Form.Item
          name="parking"
          label="Parking"
          rules={[{ required: true, message: "Please input Parking" }]}
        >
          <Select options={parkingTypes} placeholder="Parking" />
        </Form.Item>
        <Form.Item
          name="furnishing"
          label="Furnishing"
          rules={[{ required: true, message: "Please input Furnishing" }]}
        >
          <Select options={furnishingTypes} placeholder="Furnishing" />
        </Form.Item>
        <Form.Item
          name="floors"
          label="Floors"
          rules={[{ required: true, message: "Please input Floors" }]}
        >
          <InputNumber placeholder="Floors" className="w-full"/>
        </Form.Item>
        <Form.Item
          name="area"
          label="Area"
          rules={[{ required: true, message: "Please input Area" }]}
        >
          <InputNumber placeholder="Area" className="w-full"/>
        </Form.Item>
        <Form.Item
          name="facing"
          label="Facing"
          rules={[{ required: true, message: "Please input Facing" }]}
        >
          <Select options={facingTypes} placeholder="Facing" className="w-full"/>
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, message: "Please input Age" }]}
        >
          <InputNumber placeholder="Age" className="w-full"/>
        </Form.Item>
      </div>
      <div className="flex justify-end gap-5 mt-7">
        <Button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button htmlType="submit" type="primary">
          Next
        </Button>
      </div>
    </Form>
  );
}

export default Amenities;

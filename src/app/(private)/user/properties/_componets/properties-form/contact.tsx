import React from "react";
import { PropertiesFormStepProps } from ".";
import { Button, Form, Input, InputNumber, Select, message } from "antd";
import { UploadFilesToFirebaseAndReturnUrls } from "@/helpers/upload-media";
import { AddProperty } from "@/actions/properties";

function Contact({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) {
  const onFinish = async (values: any) => {
    try {
      const tempFinalValues = { ...finalValues, contact: values };
      const tempMedia = tempFinalValues.media;
      tempMedia.images = await UploadFilesToFirebaseAndReturnUrls(
        tempMedia.newlyUploadedFiles
      );
      tempFinalValues.media = tempMedia;
      const valuesAsPerDb = {
        ...tempFinalValues.basic,
        ...tempFinalValues.location,
        ...tempFinalValues.details,
        ...tempFinalValues.contact,
        images: tempFinalValues.media.images,
      };
      await AddProperty(valuesAsPerDb);
      message.success("Property added successfully");
    } catch (error: any) {
      message.error(error.message);
    }
  };
  //ownerName, ownerEmail, ownerNumber, ownerAddress, showOwnerDetails
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={finalValues.contact}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Form.Item
          name="ownerName"
          label="Owner Name"
          rules={[{ required: true, message: "Please input Owner Name" }]}
        >
          <Input placeholder="Owner Name" />
        </Form.Item>
        <Form.Item
          name="ownerEmail"
          label="Owner Email"
          rules={[{ required: true, message: "Please input Owner Email" }]}
        >
          <Input placeholder="Owner Email" />
        </Form.Item>
        <Form.Item
          name="ownerPhone"
          label="Owner Phone"
          rules={[{ required: true, message: "Please input Owner Number" }]}
        >
          <Input placeholder="Owner Phone" />
        </Form.Item>
        <Form.Item
          name="showOwnerContact"
          label="Show Owner Contact"
          rules={[
            { required: true, message: "Please input Show Owner Contact" },
          ]}
        >
          <Select
            placeholder="Owner Address"
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
          />
        </Form.Item>
      </div>
      <div className="flex justify-end gap-5 mt-7">
        <Button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}

export default Contact;

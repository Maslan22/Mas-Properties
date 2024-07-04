import React from "react";
import { PropertiesFormStepProps } from ".";
import { Button, Form, Input, message, Select } from "antd";
import { UploadFilesToFirebaseAndReturnUrls } from "@/helpers/upload-media";
import { AddProperty } from "@/actions/properties";
import { useRouter } from "next/navigation";

function Contact({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
  loading,
  setLoading,
}: PropertiesFormStepProps) {
  const router = useRouter();
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const tempFinalValues = { ...finalValues, contact: values };
      const tempMedia = tempFinalValues.media;
      tempMedia.images = await UploadFilesToFirebaseAndReturnUrls(
        tempMedia.newlyUploadedFiles
      );
      tempFinalValues.media = tempMedia;

      const valuesAsPerDb = {
        ...tempFinalValues.basic,
        ...tempFinalValues.location,
        ...tempFinalValues.amenities,
        ...tempFinalValues.contact,
        images: tempFinalValues.media.images,
        userId: tempFinalValues.basic.userId,
      };

      await AddProperty(valuesAsPerDb);
      message.success("Property added successfully");
      router.push("/user/properties");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

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
          rules={[{ required: true, message: "Please input Owner Phone" }]}
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
            placeholder="Show Owner Contact"
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
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
        <Button type="primary" htmlType="submit" loading={loading}>
          Save Property
        </Button>
      </div>
    </Form>
  );
}

export default Contact;

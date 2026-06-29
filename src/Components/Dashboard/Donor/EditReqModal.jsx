"use client";
import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";
import { editReqInfo } from "@/lib/api/action";
import { authClient } from "@/lib/auth-client";

import {
  Button,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";
import { Edit2Icon } from "lucide-react";
import { useState } from "react";

const EditReqModal = ({ data }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(
    data?.recipientDistrict || "",
  );
  const [selectedUpazila, setSelectedUpazila] = useState(
    data?.recipientUpazila || "",
  );
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(
    data?.bloodGroup || "",
  );
  const [filteredUpazilas, setFilteredUpazilas] = useState(
    upazilasData.filter((u) => u.district_id === data?.recipientDistrict) || [],
  );

  const id = data?._id

  const [formData, setFormData] = useState({
    recipientName: data?.recipientName || "",
    hospitalName: data?.hospitalName || "",
    fullAddress: data?.fullAddress || "",
    donationDate: data?.donationDate || "",
    donationTime: data?.donationTime || "",
    requestMessage: data?.requestMessage || "",
  });

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

  const onSubmit = async (e) => {
    e.preventDefault();
    ;

    const updatedData = {
      ...formData,
      bloodGroup: selectedBloodGroup,
      recipientDistrict: selectedDistrict,
      recipientUpazila: selectedUpazila,
      _id: id,
    };
     const {data: token} = await authClient.token()
          // console.log("hello token", token)

    const result = await editReqInfo(updatedData, id, token)

    console.log("updatedData:", updatedData);
  };
  return (
    <div>
      <Modal>
        <Button
          variant="none"
          className={
            "border bg-white text-ink rounded-xl hover:bg-ink hover:text-white "
          }
        >
          Edit
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md md:max-w-lg">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-danger-soft text-danger-soft-foreground">
                  <Edit2Icon  />
                </Modal.Icon>

                <Modal.Heading className="">Edit Request</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Update the details of your blood donation request below.
                </p>
              </Modal.Header>
              <Modal.Body className="p-6">
                <Form onSubmit={onSubmit}>
                  <Fieldset className="w-full">
                    <Fieldset.Group className="grid grid-cols-2 sm:grid-cols-6 gap-4 sm:gap-5">
                      {/* --- SECTION 1: REQUESTER INFO (READ-ONLY) --- */}
                      <TextField
                        isRequired
                        name="requesterName"
                        className="col-span-1 sm:col-span-3"
                      >
                        <Label>Requester Name</Label>
                        <Input
                          readOnly
                          value={data?.requesterName || ""}
                          className="bg-gray-50 border border-gray-200 text-gray-800  focus:border-red-600 focus:ring-2 focus:ring-red-100 cursor-not-allowed"
                        />
                      </TextField>

                      <TextField
                        isRequired
                        name="requesterEmail"
                        className="col-span-1 sm:col-span-3"
                      >
                        <Label>Requester Email</Label>
                        <Input
                          readOnly
                          value={data?.requesterEmail || ""}
                          className="bg-gray-50 border border-gray-200 text-gray-800  focus:border-red-600 focus:ring-2 focus:ring-red-100 cursor-not-allowed"
                        />
                      </TextField>

                      <div className="col-span-2 sm:col-span-6 border-b border-dashed border-gray-200 my-2" />

                      {/* --- SECTION 2: RECIPIENT & LOGISTICAL PACK --- */}
                      <TextField
                        isRequired
                        name="recipientName"
                        className="col-span-2 sm:col-span-4"
                      >
                        <Label className="text-crimson">Recipient Name</Label>
                        <Input
                          placeholder="Patient's Full Name"
                          value={formData.recipientName}
                          onChange={handleChange}
                          className="border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100"
                        />
                        <FieldError />
                      </TextField>

                      {/* Blood Group Select */}
                      <Select
                        isRequired
                        name="bloodGroup"
                        className="col-span-2 sm:col-span-2"
                        placeholder="Select Group"
                        selectedKey={selectedBloodGroup}
                        onSelectionChange={(key) => setSelectedBloodGroup(key)}
                      >
                        <Label className="text-crimson">
                          Required Blood Group
                        </Label>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {[
                              "A+",
                              "A-",
                              "B+",
                              "B-",
                              "AB+",
                              "AB-",
                              "O+",
                              "O-",
                            ].map((bg) => (
                              <ListBox.Item key={bg} id={bg} textValue={bg}>
                                {bg}
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>

                      {/* District dropdown */}
                      <Select
                        className="col-span-2 sm:col-span-3"
                        placeholder="Select recipient district"
                        selectedKey={selectedDistrict}
                        onSelectionChange={(key) => {
                          setSelectedDistrict(key);
                          setSelectedUpazila("");
                          const upazilas = upazilasData?.filter(
                            (u) => u.district_id === key,
                          );
                          setFilteredUpazilas(upazilas);
                        }}
                      >
                        <Label className="text-crimson">
                          Recipient District
                        </Label>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {districtsData?.map((d) => (
                              <ListBox.Item
                                key={d.id}
                                id={d.id}
                                textValue={d.name}
                              >
                                {d.name}
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>

                      {/* Upazila dropdown */}
                      <Select
                        className="col-span-2 sm:col-span-3"
                        placeholder="Select recipient upazila"
                        selectedKey={selectedUpazila}
                        // isDisabled={!selectedDistrict}
                        onSelectionChange={(key) => setSelectedUpazila(key)}
                      >
                        <Label className="text-crimson">
                          Recipient Upazila
                        </Label>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {filteredUpazilas?.map((u) => (
                              <ListBox.Item
                                key={u.id}
                                id={u.id}
                                textValue={u.name}
                              >
                                {u.name}
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>

                      <TextField
                        isRequired
                        name="hospitalName"
                        className="col-span-2 sm:col-span-6"
                      >
                        <Label className="text-crimson">Hospital Name</Label>
                        <Input
                          placeholder="e.g., Dhaka Medical College Hospital"
                          value={formData.hospitalName}
                          onChange={handleChange}
                          className="border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100"
                        />
                        <FieldError />
                      </TextField>

                      <TextField
                        isRequired
                        name="fullAddress"
                        className="col-span-2 sm:col-span-6"
                      >
                        <Label className="text-crimson">
                          Full Address Line
                        </Label>
                        <Input
                          placeholder="Ward No, Area, Landmark details"
                          value={formData.fullAddress}
                          onChange={handleChange}
                          className="border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100"
                        />
                        <FieldError />
                      </TextField>

                      {/* Date Picker */}
                      <TextField
                        isRequired
                        name="donationDate"
                        type="date"
                        className="col-span-2 sm:col-span-3"
                      >
                        <Label className="text-crimson">Donation Date</Label>
                        <Input
                          value={formData.donationDate}
                          onChange={handleChange}
                          className="border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100 w-full"
                        />
                        <FieldError />
                      </TextField>

                      {/* Time Picker */}
                      <TextField
                        isRequired
                        name="donationTime"
                        type="time"
                        className="col-span-2 sm:col-span-3"
                      >
                        <Label className="text-crimson">Donation Time</Label>
                        <Input
                          value={formData.donationTime}
                          onChange={handleChange}
                          className="border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100 w-full"
                        />
                        <FieldError />
                      </TextField>

                      {/* Textarea Request Message */}
                      <TextField
                        isRequired
                        name="requestMessage"
                        className="col-span-2 sm:col-span-6"
                      >
                        <Label className="text-crimson">Request Message</Label>
                        <Input
                          placeholder="State the patient condition, medical complications or specific requirements here..."
                          value={formData.requestMessage}
                         onChange={handleChange}
                          className="border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100 h-20 py-2 align-top text-start"
                        />
                        <FieldError />
                      </TextField>
                    </Fieldset.Group>
                    <Modal.Footer>
                      <Button slot="close" variant="none" className={"border hover:bg-gray-600 hover:text-white"}>
                        Cancel
                      </Button>
                      <Button slot="close" type="submit" className={'bg-crimson text-white hover:bg-crimson-dark'}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Fieldset>
                </Form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default EditReqModal;

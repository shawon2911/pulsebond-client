"use client";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";
import {
  Description,
  Fieldset,
  Label,
  Surface,
  TextField,
  ListBox,
  Select,
  FieldError,
  Input,
  Button,
  Form,
} from "@heroui/react";

const CreateRequestPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Dropdown Custom Filter State Matrix
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");

  const [formData, setFormData] = useState({
    recipientName: "",
    hospitalName: "",
    fullAddress: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const nativeFormData = new FormData(e.currentTarget);
    const nativeData = Object.fromEntries(nativeFormData.entries());

    const completeRequestPayload = {
      requesterName: user?.name,
      requesterEmail: user?.email,

      ...nativeData,

      recipientDistrict: selectedDistrict,
      recipientUpazila: selectedUpazila,
      bloodGroup: selectedBloodGroup,

      status: "pending",
    };

    try {
      console.log(
        "Final Blood Donation Data Package: ",
        completeRequestPayload,
      );

      // Apnar framework Server action trigger layout standard process implementation code eikhane call korun:
      // const res = await createBloodRequest(completeRequestPayload);
      alert("Blood donation request submitted successfully as 'Pending'!");
      window.location.reload();
    } catch (error) {
      console.error("Submission layout exception crash tracking: ", error);
    }
  };

  if (!user)
    return (
      <div className="p-10 text-center">
        Loading User Authorization Scope...
      </div>
    );

  return (
    <Surface className="w-full max-w-3xl py-12 px-10 bg-white rounded-2xl border shadow-red-300 shadow-lg mx-auto my-8">
      <Form onSubmit={onSubmit}>
        <Fieldset className="w-full">
          <Fieldset.Legend className="text-center font-bold font-display text-3xl mb-1 text-red-600">
            Create Blood Request
          </Fieldset.Legend>
          <Description className="text-center text-sm text-gray-500 mb-8">
            Fill in the details to look for matching donor nodes inside the
            dashboard platform.
          </Description>

          <Fieldset.Group className="grid grid-cols-6 gap-5">
            {/* --- SECTION 1: REQUESTER INFO (READ-ONLY) --- */}
            <TextField isRequired name="requesterName" className="col-span-3" isDisabled={true}>
              <Label>Requester Name</Label>
              <Input
                
                value={user?.name || ""}
                className="bg-gray-50 border border-gray-200 text-gray-800 cursor-not-allowed"
              />
            </TextField>

            <TextField isRequired name="requesterEmail" className="col-span-3" isDisabled={true}>
              <Label>Requester Email</Label>
              <Input
                
                value={user?.email || ""}
                className="bg-gray-50 border border-gray-200 text-gray-800 cursor-not-allowed"
              />
            </TextField>

            <div className="col-span-6 border-b border-dashed border-gray-200 my-2" />

            {/* --- SECTION 2: RECIPIENT & LOGISTICAL PACK --- */}
            <TextField isRequired name="recipientName" className="col-span-4">
              <Label>Recipient Name</Label>
              <Input
                placeholder="Patient's Full Name"
                value={formData.recipientName}
                onChange={handleInputChange}
                className="border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100"
              />
              <FieldError />
            </TextField>

            {/* Blood Group Select */}
            <Select
              isRequired
              name="bloodGroup"
              className="col-span-2"
              placeholder="Select Group"
              selectedKey={selectedBloodGroup}
              onSelectionChange={(key) => setSelectedBloodGroup(key)}
            >
              <Label>Required Blood Group</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (bg) => (
                      <ListBox.Item key={bg} id={bg} textValue={bg}>
                        {bg}
                      </ListBox.Item>
                    ),
                  )}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* District dropdown tracking matching reference framework rules */}
            <Select
              className="col-span-3"
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
              <Label>Recipient District</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {districtsData?.map((d) => (
                    <ListBox.Item key={d.id} id={d.id} textValue={d.name}>
                      {d.name}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Upazila dropdown component architecture */}
            <Select
              className="col-span-3"
              placeholder="Select recipient upazila"
              selectedKey={selectedUpazila}
              isDisabled={!selectedDistrict}
              onSelectionChange={(key) => setSelectedUpazila(key)}
            >
              <Label>Recipient Upazila</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {filteredUpazilas?.map((u) => (
                    <ListBox.Item key={u.id} id={u.id} textValue={u.name}>
                      {u.name}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <TextField isRequired name="hospitalName" className="col-span-6">
              <Label>Hospital Name</Label>
              <Input
                placeholder="e.g., Dhaka Medical College Hospital"
                value={formData.hospitalName}
                onChange={handleInputChange}
                className="border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100"
              />
              <FieldError />
            </TextField>

            <TextField isRequired name="fullAddress" className="col-span-6">
              <Label>Full Address Line</Label>
              <Input
                placeholder="Ward No, Area, Landmark details"
                value={formData.fullAddress}
                onChange={handleInputChange}
                className="border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100"
              />
              <FieldError />
            </TextField>

            {/* Date Picker Element input */}
            <TextField
              isRequired
              name="donationDate"
              type="date"
              className="col-span-3"
            >
              <Label>Donation Date</Label>
              <Input
                value={formData.donationDate}
                onChange={handleInputChange}
                className="border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100 w-full"
              />
              <FieldError />
            </TextField>

            {/* Time Picker Element input */}
            <TextField
              isRequired
              name="donationTime"
              type="time"
              className="col-span-3"
            >
              <Label>Donation Time</Label>
              <Input
                value={formData.donationTime}
                onChange={handleInputChange}
                className="border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100 w-full"
              />
              <FieldError />
            </TextField>

            {/* Textarea Request Message details box block */}
            <TextField isRequired name="requestMessage" className="col-span-6">
              <Label>Request Message</Label>
              <Input
                placeholder="State the patient condition, medical complications or specific requirements here..."
                value={formData.requestMessage}
                onChange={handleInputChange}
                className="border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100 h-20 py-2 align-top text-start"
              />
              <FieldError />
            </TextField>
          </Fieldset.Group>

          {/* Submit creation trigger transaction key button */}
          <Button
            type="submit"
            className="w-full mt-8 bg-crimson text-white rounded-xl hover:bg-maroon font-bold tracking-wide transition-all shadow-md py-3 text-md"
          >
            Request
          </Button>
        </Fieldset>
      </Form>
    </Surface>
  );
};

export default CreateRequestPage;

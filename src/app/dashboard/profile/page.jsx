"use client";
import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Avatar,
  FieldError,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  Button,
} from "@heroui/react";
import { updateUserData } from "@/lib/api/action";

const UserProfilePage = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const { data: session } = authClient.useSession();
  const user = session?.user; // Direct session data

  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  // Session thake data state-e set kora
  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        bloodGroup: user?.bloodGroup || "",
      });
      setSelectedDistrict(user?.district || "");
      setSelectedUpazila(user?.upazila || "");
      if (user?.district) {
        const initialUpazilas = upazilasData.filter(
          (u) => u.district_id === user.district,
        );
        setFilteredUpazilas(initialUpazilas);
      }
    }
  }, [user]);

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nativeData = Object.fromEntries(formData.entries());
    const allData = {
      ...nativeData,
      email: user?.email,
      district: selectedDistrict,
      upazila: selectedUpazila,
    };

    try {
      const result = await updateUserData(allData);

      if (result && result.success) {
        alert("Profile updated successfully!");
        setIsEditable(false);
      } else {
        console.error("Update failed:", result?.message);
        alert(result?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Form submit error context:", error);
      alert("Internal server error. Please try again.");
    }
  };

  return (
   <div className="max-w-xl mx-auto py-8 px-4 sm:py-10 sm:px-15 bg-white rounded-2xl border shadow-red-300 shadow-lg">
      <div className="flex justify-between items-center py-5">
        <h3 className="font-bold text-xl sm:text-2xl text-crimson-dark">My <span className="">Information</span> </h3>
        <Button
          variant="outline"
          onClick={() => setIsEditable(!isEditable)}
          className="border border-red-700 text-red-700 px-5 py-1 text-xs rounded"
        >
          {isEditable ? "Cancel" : "Edit"}
        </Button>
      </div>

      {/* image avatar */}
      <div className="flex flex-col items-start mb-4">
        <Avatar size="lg" aria-label="Menu">
          <Avatar.Image
            referrerPolicy="no-referrer"
            alt="John Doe"
            src={user?.image}
          />
          <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
        </Avatar>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Name */}
        <TextField isRequired name="name" className="col-span-3">
          <Label className="text-crimson">Name</Label>
          <Input
            type="text"
            value={formData.name}
            disabled={!isEditable}
            variant="secondary"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border border-gray-300 focus:border-red-800 focus:ring-2 focus:ring-red-200"
          />
          <FieldError />
        </TextField>

        {/* Email */}
        <TextField isRequired name="email" type="email" className="col-span-3">
          <Label className="text-crimson">Email</Label>
          <Input
            value={formData.email}
            variant="secondary"
            disabled={true}
            className="border border-gray-300 cursor-not-allowed"
          />
          <FieldError />
        </TextField>

        {/* Blood Group */}
        <Select
          isRequired
          name="bloodGroup"
          selectedKey={formData.bloodGroup}
          onSelectionChange={(key) =>
            setFormData({ ...formData, bloodGroup: key })
          }
        >
          <Label className="text-crimson">Blood Group</Label>
          <Select.Trigger isDisabled={!isEditable}>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <ListBox.Item key={bg} id={bg} textValue={bg}>
                  {bg}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* District */}
        <Select
          selectedKey={selectedDistrict}
          onSelectionChange={(key) => {
            setSelectedDistrict(key);
            setSelectedUpazila("");
            const upazilas = upazilasData.filter((u) => u.district_id === key);
            setFilteredUpazilas(upazilas);
          }}
        >
          <Label className="text-crimson">Select District</Label>
          <Select.Trigger isDisabled={!isEditable}>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {districtsData.map((district) => (
                <ListBox.Item
                  key={district.id}
                  id={district.id}
                  textValue={district.name}
                >
                  {district.name}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Upazila */}
        <Select
          selectedKey={selectedUpazila}
          onSelectionChange={(key) => {
            setSelectedUpazila(key);
          }}
        >
          <Label className="text-crimson">Select Upazila</Label>
          <Select.Trigger isDisabled={!isEditable || !selectedDistrict}>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {filteredUpazilas.map((upazila) => (
                <ListBox.Item
                  key={upazila.id}
                  id={upazila.id}
                  textValue={upazila.name}
                >
                  {upazila.name}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {isEditable && (
          <button
            type="submit"
            className="w-full bg-crimson hover:bg-crimson-dark text-white p-2 rounded-2xl mt-5"
          >
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default UserProfilePage;


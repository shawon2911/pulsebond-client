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
      const initialUpazilas = upazilasData.filter((u) => u.district_id === user.district);
      setFilteredUpazilas(initialUpazilas);
    }
    }
  }, [user]);

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl relative border">
      <Button
        variant="outline"
        onClick={() => setIsEditable(!isEditable)}
        className="absolute top-4 right-4 border border-red-700 text-red-700 px-5 py-1 text-xs rounded"
      >
        {isEditable ? "Cancel" : "Edit"}
      </Button>

      {/* image avatar */}
      <div className="flex flex-col items-center mb-4">
        {/* <Image src={user.image || "/logo.png"} width={80} height={80} alt="Avatar" className="rounded-full" /> */}
        <Avatar size="lg" aria-label="Menu">
          <Avatar.Image
            referrerPolicy="no-referrer"
            alt="John Doe"
            src={user?.image}
          />
          <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
        </Avatar>
      </div>

      <form className="space-y-4">
        {/* Name */}
        <TextField isRequired name="name" className="col-span-3">
          <Label>Name</Label>
          <Input
            type="text"
            value={formData.name}
            disabled={!isEditable}
            variant="secondary"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border border-gray-300 focus:border-red-800 focus:ring-2 focus:ring-red-200 "
          />
          <FieldError />
        </TextField>

        {/* Email */}
        <TextField isRequired name="email" type="email" className="col-span-3">
          <Label>Email</Label>
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
          // React Aria standard dynamic binding props
          selectedKey={formData.bloodGroup}
          onSelectionChange={(key) =>
            setFormData({ ...formData, bloodGroup: key })
          }
        >
          <Label>Blood Group</Label>
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
          
          
          // Dynamic props configuration
          selectedKey={selectedDistrict}
           
          onSelectionChange={(key) => {
            setSelectedDistrict(key);
            setSelectedUpazila(""); 

            // Filter upazilas based on the newly selected district id
            const upazilas = upazilasData.filter((u) => u.district_id === key);
            setFilteredUpazilas(upazilas);
          }}
        >
          <Label>Select District</Label>
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
          
         
          // Dynamic props configuration
          selectedKey={selectedUpazila}
          // Disabled if not editable OR if no district is selected yet
          
          onSelectionChange={(key) => {
            setSelectedUpazila(key);
          }}
        >
          <Label>Select Upazila</Label>
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
            className="w-full bg-red-600 text-white p-2 rounded"
          >
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default UserProfilePage;

//       {/* District */}
//       <Select
//         className="col-span-2"
//         selectedKey={selectedDistrict}
//         onSelectionChange={(key) => {

//           setSelectedDistrict(key);
//           setSelectedUpazila("");

//           const upazilas = upazilasData.filter(
//             (u) => u.district_id === key,
//           );

//           setFilteredUpazilas(upazilas);
//         }}
//         placeholder="Select district"
//       >
//         <Label>Select District</Label>

//         <Select.Trigger>
//           <Select.Value />
//           <Select.Indicator />
//         </Select.Trigger>

//         <Select.Popover>
//           <ListBox>
//             {districtsData.map((district) => (
//               <ListBox.Item
//                 key={district.id}
//                 id={district.id}
//                 textValue={district.name}
//               >
//                 {district.name}
//               </ListBox.Item>
//             ))}
//           </ListBox>
//         </Select.Popover>
//       </Select>

//       {/* upazila */}
//       <Select
//         className="col-span-2"
//         selectedKey={selectedUpazila}
//         onSelectionChange={(key) => {
//           const upazila = filteredUpazilas.find((u) => u.id === key);
//           setSelectedUpazila(key);
//         }}
//         isDisabled={!selectedDistrict}
//         placeholder="Select upazila"
//       >
//         <Label>Select Upazila</Label>

//         <Select.Trigger>
//           <Select.Value />
//           <Select.Indicator />
//         </Select.Trigger>

//         <Select.Popover>
//           <ListBox>
//             {filteredUpazilas.map((upazila) => (
//               <ListBox.Item
//                 key={upazila.id}
//                 id={upazila.id}
//                 textValue={upazila.name}
//               >
//                 {upazila.name}
//               </ListBox.Item>
//             ))}
//           </ListBox>
//         </Select.Popover>
//       </Select>

//       {/* Password */}
//       <TextField
//         isRequired
//         name="password"
//         type="password"
//         className="col-span-3"
//         validate={(value) => {
//           if (!value) return "Password is required";

//           if (value.length < 8) {
//             return "Password must be at least 8 characters";
//           }
//           if (!/[A-Z]/.test(value)) {
//             return "Password must contain at least one uppercase letter";
//           }
//           if (!/[0-9]/.test(value)) {
//             return "Password must contain at least one number";
//           }

//           return null;
//         }}
//       >
//         <Label>Password</Label>
//         <Input
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           variant="secondary"
//           className="border border-gray-300 focus:border-red-800 focus:ring-2 focus:ring-red-200"
//         />
//         <FieldError />
//       </TextField>

//       {/* Confirm Password */}
//       <TextField
//         isRequired
//         name="confirmPassword"
//         type="password"
//         className="col-span-3"
//         validate={(value) => {
//           if (!value) return "Please confirm your password";
//           if (value !== password) return "Passwords do not match";
//           return null;
//         }}
//       >
//         <Label>Confirm Password</Label>
//         <Input
//           placeholder="Confirm Password"
//           variant="secondary"
//           className="border border-gray-300 focus:border-red-800 focus:ring-2 focus:ring-red-200"
//         />
//         <FieldError />
//       </TextField>
//     </Fieldset.Group>

//     {/* Submit */}
//     <Button
//       type="submit"
//       className="w-full bg-crimson-dark rounded-lg hover:bg-maroon"
//     >
//       Register
//     </Button>
//     <div className="flex items-center justify-center gap-1">
//       <p className="text-muted text-sm">Already have an account?</p>
//       <Link href="/signin">
//         <p className="text-sm font-bold text-crimson-dark">Log In</p>
//       </Link>
//     </div>
//   </Fieldset>
// </Form>

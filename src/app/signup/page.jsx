"use client";

import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

import { useState } from "react";

export default function SignUpPage() {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image || "",
      bloodGroup: user.bloodGroup,
      district: selectedDistrict,
      upazila: selectedUpazila,
      role: "donor",
    });

    console.log({ data: data, error: error });

    if (error) return;
    router.push("/");
  };

  return (
    <div className=" bg-[radial-gradient(circle_at_30%_20%,#3a0f1c,#15101A_60%)] min-h-screen flex items-center justify-center">
      <Surface className="w-full max-w-2xl py-15 px-10 bg-white rounded-2xl">
        <Form onSubmit={onSubmit}>
          <Image
            height={40}
            width={40}
            loading="eager"
            src="/logo.png"
            alt="logo"
            className="mx-auto mb-2"
          />
          <Fieldset className="w-full">
            <Fieldset.Legend className="text-center font-bold font-display text-2xl my-2">
              Create your account
            </Fieldset.Legend>

            <Description className="text-center text-md">
              Every new account starts as a Donor
            </Description>

            <Fieldset.Group className="grid grid-cols-6 gap-3">
              {/* Name */}
              <TextField isRequired name="name" className="col-span-3">
                <Label>Name</Label>
                <Input
                  placeholder="John Doe"
                  variant="secondary"
                  className="border border-gray-300 focus:border-red-800 focus:ring-2 focus:ring-red-200 "
                />
                <FieldError />
              </TextField>

              {/* Email */}
              <TextField
                isRequired
                name="email"
                type="email"
                className="col-span-3"
              >
                <Label>Email</Label>
                <Input
                  placeholder="john@example.com"
                  variant="secondary"
                  className="border border-gray-300 focus:border-red-800 focus:ring-2 focus:ring-red-200 "
                />
                <FieldError />
              </TextField>

              {/* Image */}
              <TextField name="image" type="url" className="col-span-6">
                <Label>Image URL</Label>
                <Input
                  placeholder="Image URL"
                  variant="secondary"
                  className="border border-gray-300 focus:border-red-800 focus:ring-2 focus:ring-red-200 "
                />
                <FieldError />
              </TextField>

              {/* Blood Group */}
              <Select
                isRequired
                name="bloodGroup"
                className="col-span-2"
                placeholder="Blood group"
              >
                <Label>Blood Group</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="A+" textValue="A+">
                      A+
                    </ListBox.Item>
                    <ListBox.Item id="A-" textValue="A-">
                      A-
                    </ListBox.Item>
                    <ListBox.Item id="B+" textValue="B+">
                      B+
                    </ListBox.Item>
                    <ListBox.Item id="B-" textValue="B-">
                      B-
                    </ListBox.Item>
                    <ListBox.Item id="AB+" textValue="AB+">
                      AB+
                    </ListBox.Item>
                    <ListBox.Item id="AB-" textValue="AB-">
                      AB-
                    </ListBox.Item>
                    <ListBox.Item id="O+" textValue="O+">
                      O+
                    </ListBox.Item>
                    <ListBox.Item id="O-" textValue="O-">
                      O-
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* District */}
              <Select
                className="col-span-2"
                selectedKey={selectedDistrict}
                onSelectionChange={(key) => {
                  setSelectedDistrict(district?.name || "");
                  setSelectedUpazila("");

                  const upazilas = upazilasData.filter(
                    (u) => u.district_id === key,
                  );

                  setFilteredUpazilas(upazilas);
                }}
                placeholder="Select district"
              >
                <Label>Select District</Label>

                <Select.Trigger>
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

              {/* upazila */}
              <Select
                className="col-span-2"
                selectedKey={selectedUpazila}
                onSelectionChange={(key) => {
                  const upazila = filteredUpazilas.find((u) => u.id === key);
                  setSelectedUpazila(upazila?.name || "");
                }}
                isDisabled={!selectedDistrict}
                placeholder="Select upazila"
              >
                <Label>Select Upazila</Label>

                <Select.Trigger>
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

              {/* Password */}
              <TextField
                isRequired
                name="password"
                type="password"
                className="col-span-3"
                validate={(value) => {
                  if (!value) return "Password is required";

                  if (value.length < 8) {
                    return "Password must be at least 8 characters";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "Password must contain at least one uppercase letter";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "Password must contain at least one number";
                  }

                  return null;
                }}
              >
                <Label>Password</Label>
                <Input
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="secondary"
                  className="border border-gray-300 focus:border-red-800 focus:ring-2 focus:ring-red-200"
                />
                <FieldError />
              </TextField>

              {/* Confirm Password */}
              <TextField
                isRequired
                name="confirmPassword"
                type="password"
                className="col-span-3"
                validate={(value) => {
                  if (!value) return "Please confirm your password";
                  if (value !== password) return "Passwords do not match";
                  return null;
                }}
              >
                <Label>Confirm Password</Label>
                <Input
                  placeholder="Confirm Password"
                  variant="secondary"
                  className="border border-gray-300 focus:border-red-800 focus:ring-2 focus:ring-red-200"
                />
                <FieldError />
              </TextField>
            </Fieldset.Group>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-crimson-dark rounded-lg hover:bg-maroon"
            >
              Register
            </Button>
            <div className="flex items-center justify-center gap-1">
              <p className="text-muted text-sm">Already have an account?</p>
              <Link href="/signin">
                <p className="text-sm font-bold text-crimson-dark">Log In</p>
              </Link>
            </div>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}

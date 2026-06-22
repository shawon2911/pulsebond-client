"use client";
// import { authClient } from "@/lib/auth-client";
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
import { redirect } from "next/navigation";

export default function SignInPage() {
  //   const onSubmit = async (e) => {
  //     e.preventDefault();
  //     const formData = new FormData(e.currentTarget);
  //     const user = Object.fromEntries(formData.entries());

  //     await authClient.signIn.email({
  //       ...user,
  //       callbackURL: "/",
  //     });
  //   };

  return (
    <div className="bg-[radial-gradient(circle_at_30%_20%,#3a0f1c,#15101A_60%)] min-h-screen flex items-center justify-center">
      <Surface className="w-full max-w-md py-15 px-10 bg-white rounded-2xl">
        <Form>
             <Image
              height={40}
              width={40}
              loading="eager"
              src="/logo.png"
              alt="logo"
              className="mx-auto mb-2"
            />
          <Fieldset className="w-full">
           
            <Fieldset.Legend className="text-center font-bold font-display text-2xl my-2">Welcome back</Fieldset.Legend>
            <Description className="text-center text-lg">Log in to manage donations</Description>

            <Fieldset.Group>
              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" className="border border-gray-300 focus:border-red-800 focus:ring-2 focus:ring-red-200 " variant="secondary" />
                <FieldError />
              </TextField>

              <TextField isRequired name="password" type="password">
                <Label>Password</Label>
                <Input placeholder="Password" className="border border-gray-300 focus:border-red-800 focus:ring-2 focus:ring-red-200 " variant="secondary" />
                <FieldError />
              </TextField>
            </Fieldset.Group>

            <Button type="submit" className="w-full bg-crimson-dark rounded-lg hover:bg-maroon">
             Log In
            </Button>
            <div className="flex items-center justify-center gap-1">
              <p className="text-muted text-sm">New here?</p>
            <Link href="/signup"><p className="text-sm font-bold text-crimson-dark">Create an account</p></Link>
            </div>

          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}

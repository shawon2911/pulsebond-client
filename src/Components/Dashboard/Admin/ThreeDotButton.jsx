"use client";


import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  Dropdown,
  Header,
  Kbd,
  Label,
  Separator,
} from "@heroui/react";
import { EllipsisVerticalIcon } from "lucide-react";

export function ThreeDotButton({ role, status, id }) {
  // console.log({role: role, status: status})

  const hadleActions = async (id, payload) => {
    const {data: token} = await authClient.token();
    console.log("tokennn" , token) 
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/update-user-status/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(payload),
      },
    );
    const result = await res.json();
    console.log(result)
  };

  return (
    <Dropdown>
      <Button isIconOnly aria-label="Menu" variant="secondary">
        <EllipsisVerticalIcon className="outline-none" />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
  onAction={(key) => {
    if (key === "make-volunteer") hadleActions(id, { role: "volunteer" });
    if (key === "block") hadleActions(id, { status: "blocked" });
    if (key === "unblock") hadleActions(id, { status: "active" });
    if (key === "make-donor") hadleActions(id, { role: "donor" });
  }}
>
  {role === "donor" && status === "active" && (
    <Dropdown.Section>
      <Dropdown.Item id="make-volunteer" textValue="Make Volunteer">
        Make Volunteer
      </Dropdown.Item>
      <Dropdown.Item id="block" textValue="Block User">
        Block User
      </Dropdown.Item>
    </Dropdown.Section>
  )}

  {status === "blocked" && (
    <Dropdown.Section>
      <Dropdown.Item id="unblock" textValue="Unblock">
        Unblock
      </Dropdown.Item>
    </Dropdown.Section>
  )}

  {role === "volunteer" && status === "active" && (
    <Dropdown.Section>
      <Dropdown.Item id="make-donor" textValue="Make Donor">
        Make Donor
      </Dropdown.Item>
      <Dropdown.Item id="block" textValue="Block">
        Block
      </Dropdown.Item>
    </Dropdown.Section>
  )}
</Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

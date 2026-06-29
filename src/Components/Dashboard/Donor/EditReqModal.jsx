"use client";

import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

const EditReqModal = () => {
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
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground"></Modal.Icon>
                <Modal.Heading>Edit Request</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Update the details of your blood donation request below.
                </p>
              </Modal.Header>
              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form className="flex flex-col gap-4">
                    <TextField
                      className="w-full"
                      name="name"
                      type="text"
                      variant="secondary"
                    >
                      <Label>Name</Label>
                      <Input placeholder="Enter your name" />
                    </TextField>
                    <TextField
                      className="w-full"
                      name="email"
                      type="email"
                      variant="secondary"
                    >
                      <Label>Email</Label>
                      <Input placeholder="Enter your email" />
                    </TextField>
                    <TextField
                      className="w-full"
                      name="phone"
                      type="tel"
                      variant="secondary"
                    >
                      <Label>Phone</Label>
                      <Input placeholder="Enter your phone number" />
                    </TextField>
                    <TextField
                      className="w-full"
                      name="company"
                      variant="secondary"
                    >
                      <Label>Company</Label>
                      <Input placeholder="Enter your company name" />
                    </TextField>
                    <TextField
                      className="w-full"
                      name="message"
                      variant="secondary"
                    >
                      <Label>Message</Label>
                      <Input placeholder="Enter your message" />
                    </TextField>
                  </form>
                </Surface>
              </Modal.Body>
              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>
                <Button slot="close">Send Message</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default EditReqModal;




"use client";

import { Button, Chip, Table } from "@heroui/react";
import Link from "next/link";
import EditReqModal from "../Donor/EditReqModal";
import DeleteButton from "../Donor/DeleteButton";
import { doneButtonAction, cancelBtn } from "@/lib/api/action";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const AdminAllReqTable = ({ data }) => {
  const router = useRouter();
  const requests = data || [];

  const handleDoneButton = async (id) => {
    try {
      const { data: token } = await authClient.token();
      const result = await doneButtonAction(id, token?.token);
      if (result.success) router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelButton = async (id) => {
    try {
      const { data: token } = await authClient.token();
      const result = await cancelBtn(id, token?.token);
      if (result.success) router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <Table className="bg-paper">
        <Table.ResizableContainer>
          <Table.Content
            aria-label="All donation requests"
            className="min-w-[900px]"
          >
            <Table.Header className="bg-[#e6d8d2]">
              <Table.Column isRowHeader defaultWidth="1fr" id="name" minWidth={140} className="uppercase">
                Recipient <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="requester" minWidth={160} className="uppercase">
                Requester <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="location" minWidth={180} className="uppercase">
                Location <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="date" minWidth={160} className="uppercase">
                Date / Time <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="group" minWidth={80} className="uppercase">
                Group <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="status" minWidth={110} className="uppercase">
                Status <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="donor" minWidth={110} className="uppercase">
                Donor <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="2fr" id="actions" minWidth={320} className="uppercase">
                Actions <Table.ColumnResizer />
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {requests.map((req) => (
                <Table.Row key={req._id}>
                  <Table.Cell>{req.recipientName}</Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">{req.requesterName}</span>
                      <span className="text-xs text-muted">{req.requesterEmail}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{req.fullAddress}</Table.Cell>
                  <Table.Cell>{req.donationDate} / {req.donationTime}</Table.Cell>
                  <Table.Cell>
                    <span className="bg-red-50 text-crimson font-bold px-2 py-1 rounded-lg text-xs border border-red-100">
                      {req.bloodGroup}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="soft"
                      color={
                        req.status === "pending" ? "warning"
                        : req.status === "inprogress" ? "primary"
                        : req.status === "Done" ? "success"
                        : "danger"
                      }
                    >
                      {req.status}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>{req.donorName || "—"}</Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Button variant="none" className="border rounded-xl hover:bg-ink hover:text-white">
                        <Link href={`/donation-requests/${req._id}`} className="text-xs">
                          View
                        </Link>
                      </Button>

                      <EditReqModal data={req} />
                      <DeleteButton id={req._id} />

                      {req.status === "inprogress" && (
                        <>
                          <Button
                            onClick={() => handleDoneButton(req._id)}
                            variant="none"
                            className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-xl"
                          >
                            Done
                          </Button>
                          <Button
                            onClick={() => handleCancelButton(req._id)}
                            variant="none"
                            className="border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white rounded-xl"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </div>
  );
};

export default AdminAllReqTable;
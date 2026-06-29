import { Button, Chip, Table } from "@heroui/react";
import Link from "next/link";
import EditReqModal from "./EditReqModal";


const HomePagetable = ({ data}) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <Table className="bg-paper">
        <Table.ResizableContainer>
          <Table.Content
            aria-label="Recent donation requests"
            className="min-w-[700px]"
          >
            <Table.Header className="bg-[#e6d8d2]">
              <Table.Column
                isRowHeader
                defaultWidth="1fr"
                id="name"
                minWidth={160}
                className="uppercase"
              >
                Recipient
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column
                defaultWidth="1fr"
                id="location"
                minWidth={220}
                className="uppercase"
              >
                Location
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column
                defaultWidth="1fr"
                id="date"
                minWidth={200}
                className="uppercase"
              >
                Date / Time
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column
                defaultWidth="1fr"
                id="group"
                minWidth={100}
                className="uppercase"
              >
                Group
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column
                defaultWidth="1fr"
                id="status"
                minWidth={120}
                className="uppercase"
              >
                Status
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column
                defaultWidth="1fr"
                id="donor"
                minWidth={120}
                className="uppercase"
              >
                Donor
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column
                defaultWidth="2fr"
                id="actions"
                minWidth={280}
                className="uppercase "
                
              >
                Actions
                <Table.ColumnResizer />
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {data.map((req) => (
                <Table.Row key={req._id}>
                  <Table.Cell>{req.recipientName}</Table.Cell>
                  <Table.Cell>{req.fullAddress}</Table.Cell>
                  <Table.Cell>
                    {req.donationDate} / {req.donationTime}
                  </Table.Cell>
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
                        req.status === "pending"
                          ? "warning"
                          : req.status === "inprogress"
                            ? "primary"
                            : req.status === "done"
                              ? "success"
                              : "danger"
                      }
                    >
                      {req.status}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>{req.donorName || "—"}</Table.Cell>
                  <Table.Cell >
                    <div className="flex items-center gap-2">
                       <Button variant="none" className={'border rounded-xl hover:bg-ink hover:text-white'}>
                        <Link
                        href={`/donation-requests/${req._id}`}
                        className="text-xs   "
                      >
                        View
                      </Link>
                       </Button>
                      {
                        req.status === "pending" ?
                            <div className="flex items-center gap-2">
                              <EditReqModal />
                                
                                <Button variant="none" className={'border border-crimson text-crimson hover:bg-crimson hover:text-white rounded-xl'}>Delete</Button>
                            </div> : req.status === "inprogress" ?
                                <div className="flex items-center gap-2">
                                    <Button variant="none" className={'border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-xl'}>Done</Button>
                                    <Button variant="none" className={'border  border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white rounded-xl'}>Cancel</Button>
                                </div> : <></>
                      }
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

export default HomePagetable;

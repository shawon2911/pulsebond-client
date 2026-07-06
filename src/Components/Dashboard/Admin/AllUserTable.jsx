import { Avatar, Chip, Table } from "@heroui/react";

const AllUserTable = ({ data }) => {
  return (
    <div>
      <Table className="bg-paper ">
        <Table.ResizableContainer>
          <Table.Content aria-label="user-list" className="min-w-[700px] ">
            <Table.Header className="bg-[#e6d8d2]">
              <Table.Column
                isRowHeader
                defaultWidth="1fr"
                id="user"
                minWidth={160}
                className="uppercase"
              >
                user
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column
                defaultWidth="1fr"
                id="email"
                minWidth={220}
                className="uppercase"
              >
                email
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column
                defaultWidth="1fr"
                id="role"
                minWidth={200}
                className="uppercase"
              >
                role
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column
                defaultWidth="1fr"
                id="status"
                minWidth={100}
                className="uppercase"
              >
                status
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column
                defaultWidth="1fr"
                id="action"
                minWidth={100}
                className="uppercase"
              >
                <Table.ColumnResizer />
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {data.map((req) => (
                <Table.Row key={req._id}>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" aria-label="Menu">
                        <Avatar.Image
                          referrerPolicy="no-referrer"
                          alt={req?.name}
                          src={req?.image}
                        />
                        <Avatar.Fallback>{req?.name.charAt(0)}</Avatar.Fallback>
                      </Avatar>
                      {req.name}
                    </div>
                  </Table.Cell>
                  <Table.Cell>{req.email}</Table.Cell>
                  <Table.Cell>{req.role}</Table.Cell>

                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="soft"
                      color={req.status === "active" ? "success" : "danger"}
                    >
                      {req.status}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>hello</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </div>
  );
};

export default AllUserTable;

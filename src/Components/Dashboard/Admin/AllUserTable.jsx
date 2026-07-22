import { Avatar, Chip, Table } from "@heroui/react";
import { ThreeDotButton } from "./ThreeDotButton";

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
                minWidth={220}
                className="uppercase"
              >
                user
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column
                defaultWidth="2fr"
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
                minWidth={220}
                className="uppercase"
              >
                role
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column
                defaultWidth="1fr"
                id="status"
                minWidth={220}
                className="uppercase"
              >
                status
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column
                defaultWidth="1fr"
                id="action"
                minWidth={220}
                className="uppercase"
              >
                <Table.ColumnResizer />
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {data.map((req) => (
                <Table.Row key={req._id} >
                  <Table.Cell  className={'capitalize'}>
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
                  <Table.Cell className={'capitalize'}>
                    <Chip >
                      {req.role}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell className={'capitalize'}>
                    <Chip
                      size="sm"
                      variant="soft"
                      color={req.status === "active" ? "success" : "danger"}
                    >
                      {req.status}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell><ThreeDotButton id={req?._id} role={req?.role} status={req?.status} /></Table.Cell>
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

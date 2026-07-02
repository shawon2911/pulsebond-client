import { Button, Table } from "@heroui/react";




const SearchDonorTable = ({data, selectedDistrictLabel, selectedUpazilaLabel}) => {
    // console.log("from table page", data)
    return (
        <div>
            <Table className="bg-paper ">
                    <Table.ResizableContainer>
                      <Table.Content
                        aria-label="donor-list"
                        className="min-w-[700px] "
                      >
                        <Table.Header className="bg-[#e6d8d2]">
                          <Table.Column
                            isRowHeader
                            defaultWidth="1fr"
                            id="name"
                            minWidth={160}
                            className="uppercase"
                          >
                            Donor
                            <Table.ColumnResizer />
                          </Table.Column>
                          <Table.Column
                            defaultWidth="1fr"
                            id="location"
                            minWidth={220}
                            className="uppercase"
                          >
                            Blood Group
                            <Table.ColumnResizer />
                          </Table.Column>
                          <Table.Column
                            defaultWidth="1fr"
                            id="date"
                            minWidth={200}
                            className="uppercase"
                          >
                            District / Upazila
                            <Table.ColumnResizer />
                          </Table.Column>
                          <Table.Column
                            defaultWidth="1fr"
                            id="group"
                            minWidth={100}
                            className="uppercase"
                          >
                            Contact
                            <Table.ColumnResizer />
                          </Table.Column>
                         
                          
                          
                        </Table.Header>
            
                        <Table.Body>
                          {data.map((req) => (
                            <Table.Row key={req._id}>
                              <Table.Cell>{req.name}</Table.Cell>
                              <Table.Cell>
                                <span className="bg-red-50 text-crimson font-bold px-2 py-1 rounded-lg text-xs border border-red-100">
                                  {req.bloodGroup}
                                </span>
                              </Table.Cell>
                              <Table.Cell>
                                {selectedDistrictLabel} / {selectedUpazilaLabel}
                              </Table.Cell>
                              
                              <Table.Cell>{req.email}</Table.Cell>
                             
                              
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table.Content>
                    </Table.ResizableContainer>
                  </Table>
        </div>
    );
};

export default SearchDonorTable;







// bloodGroup
// : 
// "A+"
// createdAt
// : 
// "2026-06-23T16:44:39.999Z"
// district
// : 
// "13"
// email
// : 
// "user2@gmail.com"
// emailVerified
// : 
// false
// image
// : 
// "https://i.ibb.co.com/Z6xZ9r6L/NRG-for-middle-school-play-equipment.jpg"
// name
// : 
// "user202"
// role
// : 
// "donor"
// status
// : 
// "active"
// upazila
// : 
// "116"
// updatedAt
// : 
// "2026-06-23T16:44:39.999Z"
// _id
// : 
// "6a3ab7
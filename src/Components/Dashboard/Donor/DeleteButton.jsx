
"use client";

import { deleteReq } from "@/lib/api/action";
import { authClient } from "@/lib/auth-client";
import {AlertDialog, Button} from "@heroui/react";
const DeleteButton = ({id}) => {

    const handleDelete = async(id) =>{
        const { data: token } = await authClient.token();
        // console.log("my token",  token);
        const result = await deleteReq(id, token)
    }
    return (
    <AlertDialog>
      <Button variant="none" className={"border border-crimson text-crimson hover:bg-crimson hover:text-white rounded-xl"}>Delete</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Request permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete this request and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary" className={"border hover:bg-gray-600 hover:text-white"}>
                Cancel
              </Button>
              <Button onClick={()=>handleDelete(id)} slot="close" variant="danger" className={'bg-crimson text-white hover:bg-crimson-dark'}>
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteButton;





  

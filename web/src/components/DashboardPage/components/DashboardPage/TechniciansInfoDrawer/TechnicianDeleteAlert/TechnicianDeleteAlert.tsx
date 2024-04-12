import {Button, CircularProgress, Dialog, DialogTitle} from "@mui/material";
import {
    useDeleteTechnicianById,
} from "../../../../../../services/api/graphQL/graphQlQueries.ts";
import {useState} from "react";
import {IApiRes} from "../../../../../../types";

type IProps = {
    deleteAlertOpen: boolean;
    handleAlertClose: () => void;
    technicianId: number;
}

function TechnicianDeleteAlert(props: IProps) {
    const {mutateAsync: deleteTechnicianById, isPending: isDeleting} = useDeleteTechnicianById();

    const [errText, setErrText] = useState<string | null>(null);
    const handleDelete = async () => {
        try {
            const result: IApiRes = await deleteTechnicianById(props.technicianId);
            if (result.status == 200) {
                setErrText(null);
                props.handleAlertClose();
            }
            setErrText(result.data.message);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Dialog
            open={props.deleteAlertOpen}
            onClose={props.handleAlertClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

            }}
        >
            <DialogTitle id="alert-dialog-title">
                {"Confirm technician delete ?"}
            </DialogTitle>
            <div className={'flex justify-around p-6'}>
                <Button color={"success"} variant={"contained"}
                        onClick={() => handleDelete()}>YES</Button>
                <Button color={"error"} variant={"outlined"} onClick={props.handleAlertClose}>NO</Button>
            </div>
            <div className={'h-10 w-auto mx-auto'}>
                {isDeleting ?
                    <CircularProgress/>
                    :
                    <h1 className={'text-red-600 text-center font-extrabold'}>{errText}</h1>
                }
            </div>
        </Dialog>
    );
}

export default TechnicianDeleteAlert;
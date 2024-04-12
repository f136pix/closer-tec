import {useState} from "react";
import FillScreenWrapper from "../../../Utils/ScreenWrapper.tsx";
import CreateTechnicianForm from "./CreateTechnicianForm/CreateTechnicianForm.tsx";

function LoginPage() {
    const [isSnackBarOpen, setSnackBarOpen] = useState<boolean>(false);
    const [isErrorSnackBarOpen, setErrorSnackBarOpen] = useState<boolean>(false);
    const [snackBarMsg, setSnackBarMsg] = useState<string>("");

    const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorSnackBarOpen(false);
        setSnackBarOpen(false);
    };

    const showSnackBar = (msg: string, isError: boolean) => {
        if (isError) {
            setSnackBarOpen(false);
            setErrorSnackBarOpen(true);
        } else {
            setErrorSnackBarOpen(false);
            setSnackBarOpen(true);
        }
        setSnackBarMsg(msg);
    };

    return (
        <FillScreenWrapper>
            <CreateTechnicianForm></CreateTechnicianForm>
        </FillScreenWrapper>
    );
}

export default LoginPage;
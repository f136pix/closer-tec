import {useState} from "react";
import {Link} from "react-router-dom";
import {MapPin} from "lucide-react";

import FillScreenWrapper from "../Utils/ScreenWrapper.tsx";

import CreateUserForm from "./CreateUserForm/CreateUserForm.tsx";
import LoginUserForm from "./LoginUserForm/LoginUserForm.tsx";

function LoginPage() {
    // const [isSnackBarOpen, setSnackBarOpen] = useState<boolean>(false);
    // const [isErrorSnackBarOpen, setErrorSnackBarOpen] = useState<boolean>(false);
    //const [snackBarMsg, setSnackBarMsg] = useState<string>("");

    const [isRegisterForm, setIsRegisterForm] = useState(true);


    // const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setErrorSnackBarOpen(false);
    //     setSnackBarOpen(false);
    // };

    // const showSnackBar = (msg: string, isError: boolean) => {
    //     if (isError) {
    //         setSnackBarOpen(false);
    //         setErrorSnackBarOpen(true);
    //     } else {
    //         setErrorSnackBarOpen(false);
    //         setSnackBarOpen(true);
    //     }
    //     setSnackBarMsg(msg);
    // };

    const handleFormChange = () => {
        if (isRegisterForm) {
            setIsRegisterForm(false);
        } else {
            setIsRegisterForm(true);
        }
    };

    return (
        <FillScreenWrapper>
            <div className={'mt-12 flex w-[28%] mx-auto text-center justify-around'}>
                <h1 className={'font-extrabold text-[4rem]'}>CLOSER </h1><MapPin className={'font-extrabold my-auto'}
                                                                                 size={70}/>
            </div>
            <div className={"flex w-[40%] mx-auto text-center justify-around"}>
                <h1 className={'font-extrabold text-[4rem]'}>TECHNICIAN</h1>
            </div>
            {isRegisterForm ?
                <LoginUserForm handleSwitchForm={handleFormChange}/>
                :
                <CreateUserForm handleSwitchForm={handleFormChange}/>
            }

            <footer className={'sticky bg-black bottom-0 w-full mt-16'}>
                <div className={'text-white text-center p-4'}>
                    <p>Filipe Furlan Cinel, 2024</p>
                    <p><Link to={"https://github.com/f136pix/closer-tec.git"} className={"underline"}>Github
                        Repo</Link></p>
                </div>
            </footer>
        </FillScreenWrapper>
    );
}

export default LoginPage;

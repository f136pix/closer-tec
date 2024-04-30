import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Alert, Button, TextField} from "@mui/material";
import {Box, Grid} from "@mui/material";

import {registerValidationSchema} from "../../../lib/validation";
import {useRegisterUser} from "../../../services/api/auth/authQueries.ts";
import {IRegisterUserDto} from "../../../types";

type IProps = {
    handleSwitchForm: () => void
}


function CreateUserForm(props: IProps) {
    const {mutateAsync: registerUser, isPending: isRegistering} = useRegisterUser();
    const [errMessage, setErrMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    const form = useForm({
        resolver: zodResolver(registerValidationSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
        }
    });

    const onSubmit = async (data: any) => {
        setSuccessMessage("");
        setErrMessage("");
        const loginUserDto: IRegisterUserDto = {
            username: data.username,
            email: data.email,
            password: data.password
        };

        await registerUser(loginUserDto)
            .catch((err) => {
                console.log(err.message)
                if(err.message) {
                    setErrMessage(err.message);
                    throw err;
                }
                setErrMessage("There was a error, try again later");
                throw err;  // throw the error to stop the promise chain
            })
            .then((res) => {
                if (res?.status !== 201) {
                    console.log(res);
                    res?.data.message ?
                        setErrMessage(res.data.message) :
                        setErrMessage("There was a error, try again later");
                    return;
                }
                setErrMessage("");
                setSuccessMessage("User created successfully");
            });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={'mt-16 w-1/3 mx-auto'}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField className={'h-20'}
                               label="Username"
                               {...form.register('username')}
                               error={!!form.formState.errors.username}
                               helperText={form.formState.errors.username?.message}
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField className={'h-20'}
                               label="Email"
                               {...form.register('email')}
                               error={!!form.formState.errors.email}
                               helperText={form.formState.errors.email?.message}
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField className={'h-20'}
                               label="Password"
                               type="password"
                               {...form.register('password')}
                               error={!!form.formState.errors.password}
                               helperText={form.formState.errors.password?.message}
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField className={'h-20'}
                               label="Confirm Password"
                               type="password"
                               {...form.register('passwordConfirm')}
                               error={!!form.formState.errors.passwordConfirm}
                               helperText={form.formState.errors.passwordConfirm?.message}
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 className={''}>Already have a account ? <a
                            className={'text-blue-700 underline cursor-pointer'} onClick={props.handleSwitchForm}>Log
                            In</a></h2>
                        {isRegistering ?
                            <Button type="submit" variant="contained" disabled>
                                Submitting...
                            </Button> :
                            <Button type="submit" variant="contained">
                                Submit
                            </Button>
                        }
                    </Box>
                </Grid>
                {errMessage?.length > 0
                    && <Alert severity="error" className="mt-6">{errMessage}</Alert>
                }
                {successMessage?.length > 0
                    && <Alert severity="success" className="mt-6">{successMessage}</Alert>
                }
            </Grid>
        </form>
    );
}

export default CreateUserForm;

import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Alert, Box, Button, Grid, TextField} from "@mui/material";

import {useAuth} from "../../../hooks/useAuth.tsx";
import {loginValidationSchema} from "../../../lib/validation";
import {useAuthenticateUser} from "../../../services/api/auth/authQueries.ts";
import {ILoginUserDto} from "../../../types";

type IProps = {
    handleSwitchForm: () => void
}


function LoginUserForm(props: IProps) {
    const auth = useAuth();
    const {mutateAsync: authenticateUser, isPending: isLogging} = useAuthenticateUser();
    //const mutation = useAuthenticateUser();
    const [errMessage, setErrMessage] = useState("");
    //const navigate = useNavigate();



    const form = useForm({
        resolver: zodResolver(loginValidationSchema),
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const onSubmit = async (data: any) => {
        const loginUserDto: ILoginUserDto = {
            username: data.username,
            password: data.password
        };

        const res = await authenticateUser(loginUserDto)
            .catch((err) => {
                setErrMessage("Invalid username or password");
                console.log(err);
                return;
            });

        if (res?.status !== 200) {
            res?.data.message ?
                setErrMessage(res.data.message) :
                setErrMessage("Invalid username or password");
            return;
        }
        setErrMessage("");
        auth!.login(res.data);
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
                               label="Password"
                               type="password"
                               {...form.register('password')}
                               error={!!form.formState.errors.password}
                               helperText={form.formState.errors.password?.message}
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 className={''}>Don't have a account ? <a
                            className={'text-blue-700 underline cursor-pointer'}
                            onClick={props.handleSwitchForm}>
                            Sign Up
                        </a>
                        </h2>
                        {isLogging ?
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
            </Grid>
        </form>
    );
}

export default LoginUserForm;

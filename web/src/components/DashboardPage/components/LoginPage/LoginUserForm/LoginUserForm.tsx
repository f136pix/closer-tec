import {Box, Button, Grid, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerValidationSchema} from "../../../../../lib/validation";

type IProps = {
    handleSwitchForm: () => void
}

function LoginUserForm(props: IProps) {

    const form = useForm({
        resolver: zodResolver(registerValidationSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={'mt-16 w-1/3 mx-auto'}>
            <Grid container spacing={2}>
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
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 className={''}>Don't have a account ? <a
                            className={'text-blue-700 underline cursor-pointer'}
                            onClick={props.handleSwitchForm}>
                            Sing Up
                        </a>
                        </h2>
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
}

export default LoginUserForm;
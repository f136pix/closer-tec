import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, TextField} from "@mui/material";
import {Box, Grid} from "@mui/material";

import {registerValidationSchema} from "../../../lib/validation";

type IProps = {
    handleSwitchForm: () => void
}


function CreateUserForm(props : IProps) {

    const form = useForm({
        resolver: zodResolver(registerValidationSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
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
                               label="Name"
                               {...form.register('name')}
                               error={!!form.formState.errors.name}
                               helperText={form.formState.errors.name?.message}
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
                        <h2 className={''}>Already have a account ? <a className={'text-blue-700 underline cursor-pointer'} onClick={props.handleSwitchForm}>Log In</a></h2>
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
}

export default CreateUserForm;

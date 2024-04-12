import {Controller, Form, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, FormControl, Input, InputLabel} from "@mui/material";
import {z} from "zod";

import {registerValidationSchema} from "../../../../../lib/validation";

function CreateTechnicianForm() {

    const form = useForm<z.infer<typeof registerValidationSchema>>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: zodResolver(registerValidationSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: ''
        }
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

        return (
        <section className={'bg-zinc-600 h-auto'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({
                                     field: {value, onChange,},
                                 }) => (
                            <FormControl className={'h-auto'}>
                                <InputLabel>First Name</InputLabel>
                                <Input
                                    onChange={onChange}
                                    value={value}
                                />
                            </FormControl>
                        )}
                    />
                    <Button type="submit" className={'mt-[6rem] bg-bg-calm-green'}>Submit</Button>
                </form>
            </Form>
        </section>
    );
}

export default CreateTechnicianForm;
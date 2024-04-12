import {useEffect, useRef, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {
    Alert,
    Backdrop,
    Box,
    Button,
    Fade,
    FormControl, FormHelperText,
    Input,
    InputLabel, MenuItem,
    Modal, Select,
    Typography
} from "@mui/material";

import {technicianRoles} from "../../../../../data/presetData.tsx";
import {useCreateTechnician} from "../../../../../services/api/graphQL/graphQlQueries.ts";
import {IApiRes, ICreateTechnicianDto} from "../../../../../types";

import './AddTechnicianModal.css';

type IProps = {
    isOpen: boolean,
    handleClose: () => void,
    showSnackBar: (msg: string) => void
};

type ISelectedPlace = {
    lat: number;
    lng: number;
    address: string;
}


const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "45%",
    bgcolor: 'white',
    boxShadow: 24,
    borderRadius: 5,
};

function AddTechnicianModal({isOpen, handleClose, showSnackBar}: IProps) {
    // create technician query
    const {mutateAsync: createTechnician} = useCreateTechnician();


    const [isCreatingTechnician, setIsCreatingTechnician] = useState(false);
    const [errMsg, setErrMsg] = useState<string | null>(null);
    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const [selectedPlace, setSelectedPlace] = useState<ISelectedPlace | null>(null);

    const cityInputRef = useRef<HTMLInputElement>();

    // activate autoComplete api once the input is focused
    useEffect(() => {
        {
            if (!isOpen) {
                return;
            }
        }
        const autoComplete = new window.google.maps.places.Autocomplete(
            cityInputRef!.current as HTMLInputElement
        );
        autoComplete.addListener('place_changed', () => {
            const place = autoComplete.getPlace();
            if (!place.geometry || !place?.geometry?.location) {
                setErrMsg("This location is not available");
            }
            if (place!.geometry!.viewport || place!.geometry!.location) {
                const selectedPlace: ISelectedPlace = {
                    address: place!.formatted_address!,
                    lat: place!.geometry!.location!.lat(),
                    lng: place!.geometry!.location!.lng(),
                };
                setErrMsg(null);
                setSelectedPlace(selectedPlace);
            }
        });
    }, [inputFocused]);

    // closes error message after seconds
    useEffect(() => {
        if (errMsg) {
            const timer = setTimeout(() => {
                setErrMsg(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errMsg]);

    const {control, handleSubmit, reset} = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
    });

    // all uncontrolled forms refs/ not using zod in here
        const submitValues = async (values: any) => {
        try {
            setIsCreatingTechnician(true);
            if (!values.firstName) {
                setErrMsg("First Name is required");
                return;
            }
            if (!values.lastName) {
                setErrMsg("Last Name is required");
                return;
            }
            if (!values.email) {
                setErrMsg("Email is required");
                return;
            }
            if (!values.role) {
                setErrMsg("Role is required");
                return;
            }
            if (cityInputRef!.current!.value.split(' ').pop()! !== selectedPlace!.address.split(' ').pop()!) {
                setErrMsg("Select one of the provided locations");
                return;
            }
            setErrMsg(null);
            const dto: ICreateTechnicianDto = {
                address: selectedPlace!.address,
                city: selectedPlace!.address,
                email: values.email,
                role: values.role,
                firstName: values.firstName,
                lastName: values.lastName,
                latitude: selectedPlace!.lat,
                longitude: selectedPlace!.lng
            };
            const res: IApiRes = await createTechnician(dto);
            console.log(res);
            if (res.status == 200) {
                // reseting form values
                reset({
                    firstName: '',
                    lastName: '',
                    email: '',
                    role: '',
                    location: '',
                });
                showSnackBar("Technician created successfully");
                handleClose();
            }
            if (res.status == 500) {
                setErrMsg(`${res.data.errors[0].message}`);
            }
        } finally {
            setIsCreatingTechnician(false);
        }
    };

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={isOpen}>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2"
                                    style={{borderTopRightRadius: 'inherit', borderTopLeftRadius: 'inherit'}}
                                    className={'bg-slate-300'}>
                            <h1 className={'font-bold text-[1.5rem] text-black pl-8 pt-4 mb-4'}>Register Technician</h1>
                        </Typography>
                        <form className={'flex'} noValidate onSubmit={handleSubmit(submitValues)}>
                            <Box
                                className={'flex flex-col mx-auto'}
                                sx={{display: 'flex', gap: '1rem', p: '1rem'}}
                            >
                                <Controller
                                    name="firstName"
                                    control={control}
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
                                <Controller
                                    name="lastName"
                                    control={control}
                                    render={({
                                                 field: {value, onChange,},
                                             }) => (
                                        <FormControl className={'h-auto'}>
                                            <InputLabel>Last Name</InputLabel>
                                            <Input
                                                onChange={onChange}
                                                value={value}/>
                                        </FormControl>
                                    )}
                                />
                                <Controller
                                    name="location"
                                    control={control}
                                    render={() => (
                                        <FormControl className={'h-auto w-[20rem]'}>
                                            {/*<Autocomplete onPlaceChanged={() => console.log(autoComplete.getPlace())}>*/}
                                            <Input className={'w-[20rem]'}
                                                   placeholder={'Select your address'}
                                                   inputRef={cityInputRef}
                                                   onFocus={() => setInputFocused(true)}
                                                   onBlur={() => setInputFocused(false)}
                                            />
                                            <FormHelperText className={'h-0'}>* Recommended to use the full address</FormHelperText>
                                            {/*</Autocomplete>*/}
                                        </FormControl>
                                    )}
                                />
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({
                                                 field: {value, onChange,},
                                             }) => (
                                        <FormControl className={'h-auto'}>
                                            <InputLabel>Email</InputLabel>
                                            <Input
                                                onChange={onChange}
                                                value={value}
                                            />
                                        </FormControl>
                                    )}
                                />
                                <Controller
                                    name={"role"}
                                    control={control}
                                    render={({
                                                 field: {value, onChange,},
                                             }) => (
                                        <FormControl className={'h-auto'} variant={'standard'}>
                                            <InputLabel className={'ml-4'}>Role</InputLabel>
                                            <Select
                                                label="Age"
                                                value={value}
                                                onChange={onChange}
                                            >
                                                <MenuItem value="UNDEFINED">
                                                    <em>Undefined</em>
                                                </MenuItem>
                                                {technicianRoles.map((role, index) => {
                                                    return <MenuItem key={index}
                                                                     value={role.value}>{role.label}</MenuItem>;
                                                })}
                                            </Select>
                                        </FormControl>
                                    )}
                                />

                                {errMsg ?
                                    <Alert severity="error" style={{
                                        position: 'absolute',
                                        top: '110%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '70%',
                                        textAlign: 'center'
                                    }}>{errMsg}</Alert>
                                    :
                                    null}
                                {isCreatingTechnician ?
                                    <Button type={'submit'} variant={'contained'}>Creating...</Button> :
                                    <Button type={'submit'} variant={'contained'}>Create</Button>
                                }
                            </Box>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default AddTechnicianModal;
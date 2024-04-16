import {useState} from "react";
import {Alert, Button, Snackbar, TextField} from "@mui/material";
import {useLoadScript} from "@react-google-maps/api";
import {Database} from "lucide-react";

import {technicianRoles} from "../../../../data/presetData.tsx";
import {useGetTechniciansByQueries} from "../../../../services/api/graphQL/graphQlQueries.ts";
import {IGetTechniciansByQueries, ITechncian} from "../../../../types";
import MultiSelect from "../../../Shared/MultiSelect.tsx";
import FillScreenWrapper from "../../../Utils/ScreenWrapper.tsx";

import AddTechnicianModal from "./AddTechnicianModal/AddTechnicianModal.tsx";
import Map from "./Map/Map.tsx";
import TechniciansInfoDrawer from "./TechniciansInfoDrawer/TechniciansInfoDrawer.tsx";

function DashboardPage() {
    //const {mutateAsync: createNewTechnician, isPending: isCreatingTech} = useCreateTechnician();
    //const {mutateAsync: getAllTechnicians, isPending: isGettingAll} = useGetAllTechnicians();
    const {mutateAsync: getTechniciansByQuery, isPending: isGettingByQuery} = useGetTechniciansByQueries();

    // snackbar msg
    const [snackBarMsg, setSnackBarMsg] = useState<string>("");

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: '#######',
        libraries: ['places']
    });

    const [filteredTechnicians, setFilteredTechnicians] = useState<ITechncian[] | null>(null);
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    // multiSelect values
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    // teehcnician name input
    const [technicianName, setTechnicianName] = useState<string>('');
    // city name input
    const [cityName, setCityName] = useState<string>('');
    // is open create technician modal
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    // is open lateral drawer
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

    const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    };

    const handleRetrieving = async () => {
        try {
            const queryDto: IGetTechniciansByQueries = {
                name: technicianName,
                city: cityName,
                role: selectedOptions
            };
            const result = await getTechniciansByQuery(queryDto);
            if (result.status == 200) {
                setFilteredTechnicians(result.data.techniciansByQuery);
                showSnackBar("Data updated!");
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleOpenModal = () => setIsOpenModal(true);

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    const handleOpenDrawer = () => {
        setIsOpenDrawer(true);
    };

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
    };

    const showSnackBar = (msg: string) => {
        setSnackBarMsg(msg);
        setSnackBarOpen(true);
    }
    return (
        <FillScreenWrapper>
            <section className={'flex flex-row content-center justify-start h-[10%] min-h-[10vh]'}>
                <MultiSelect listOptions={technicianRoles} selectedOptions={selectedOptions}
                             setSelectedOptions={setSelectedOptions}/>
                <TextField
                    sx={{
                        'input::placeholder': {fontStyle: 'italic'},
                        'input': {height: 10},
                        marginY: 'auto',
                        marginRight: 1
                    }}
                    label={'Technician Name'}
                    placeholder={'Any'}
                    value={technicianName}
                    onChange={(e) => setTechnicianName(e.target.value)}
                    variant={'filled'}
                />
                <TextField
                    sx={{
                        'input::placeholder': {fontStyle: 'italic'},
                        'input': {height: 10},
                        marginY: 'auto',
                        marginRight: 1
                    }}
                    label={'City Name'}
                    placeholder={'Any'}
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    variant={'filled'}
                />
                {isGettingByQuery ?
                    <Button disabled className={'w-[3rem] h-10'}
                            sx={{marginLeft: 'auto', marginRight: 1, marginY: 'auto', background: 'lightgray'}}>
                        ...
                    </Button>

                    :
                    <Button onClick={handleRetrieving} className={"w-[3rem] h-10"}
                            sx={{marginLeft: 'auto', marginRight: 1, marginY: 'auto', background: 'lightgray'}}
                            variant={'text'}>
                        Filter
                    </Button>
                }
            </section>
            <section className={'h-[90%] w-screen'}>
                {isLoaded ? <Map filteredTechnicians={filteredTechnicians}/> : null}
                {/*add technician modal*/}
                <AddTechnicianModal isOpen={isOpenModal} handleClose={handleCloseModal} showSnackBar={showSnackBar}/>
                {/*lateral drawer*/}
                <TechniciansInfoDrawer isOpenDrawer={isOpenDrawer} handleCloseDrawer={handleCloseDrawer} techniciansList={filteredTechnicians} retrieveTechnicians={handleRetrieving}/>
                <Snackbar open={snackBarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
                    <Alert
                        onClose={handleSnackbarClose}
                        severity="success"
                        variant="filled"
                        sx={{width: '100%'}}
                    >
                        {snackBarMsg}
                    </Alert>
                </Snackbar>
                <div className="fixed inset-x-0 bottom-0 flex items-end justify-center z-10 mb-10 w-10 mx-auto">
                    <Button
                        onClick={handleOpenModal}
                        className={''}
                        variant={'contained'}
                        sx={{
                            background: 'white',
                            color: 'blue',
                            width: 55,
                            height: 55,
                            borderRadius: '50%',
                            ":hover": {background: 'darkblue', color: 'white'}
                        }}>
                        +
                    </Button>
                </div>
                <div className="fixed ml-10 mt-[7%] top-0 flex items-end justify-center z-10 mb-10 w-10 mx-auto">
                    <Button
                        onClick={handleOpenDrawer}
                        className={''}
                        variant={'contained'}
                        sx={{
                            paddingBlock: 1,
                            height: 30,
                            background: 'white',
                            color: 'blue',
                            ":hover": {background: 'darkblue', color: 'white'}
                        }}>
                        <Database/>
                    </Button>
                </div>
            </section>
        </FillScreenWrapper>
    );
}

export default DashboardPage;
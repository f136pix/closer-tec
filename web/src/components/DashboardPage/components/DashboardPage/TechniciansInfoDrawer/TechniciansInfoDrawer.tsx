import {useEffect, useState} from "react";
import {Button, Divider, Drawer, List, ListItem, ListItemButton} from "@mui/material";
import {ArrowLeft, Inbox, MapPin, Trash2, Wrench} from "lucide-react";

import {ITechncian} from "../../../../../types";

import TechnicianDeleteAlert from "./TechnicianDeleteAlert/TechnicianDeleteAlert.tsx";

type IProps = {
    isOpenDrawer: boolean;
    handleCloseDrawer: () => void;
    techniciansList: ITechncian[] | null;
    retrieveTechnicians: () => void;
}

function TechniciansInfoDrawer(props: IProps) {
    const [techniciansList, setTechniciansList] = useState(props.techniciansList);

    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

    const [alertTechnicianId, setAlertTechnicianId] = useState<number>(0);

    const handleAlertOpen = (id: number) => {
        setAlertTechnicianId(id);
        setDeleteAlertOpen(true);
    };

    const handleAlertClose = () => {
        // updates technicians on modal close
        props.retrieveTechnicians();
        setDeleteAlertOpen(false);
    };

    useEffect(() => {
        // sorting technicians by name
        setTechniciansList(props.techniciansList);
    }, [props.techniciansList]);

    return (
        <Drawer
            sx={{
                width: 200,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: "50%",
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={props.isOpenDrawer}
        >
            <div className={'bg-gray-300 h-10 flex items-center'}>
                <h1 className={'text-lg font-bold ml-8'}>Technician Info</h1>
                <Button className={'ml-52'}
                        sx={{
                            marginLeft: 'auto',
                            marginRight: '15px'
                        }}>
                    <ArrowLeft onClick={props.handleCloseDrawer} className={'cursor-pointer mx-auto'}/>
                </Button>
            </div>
            <Divider/>
            <div className={'p-2'}>
                <List>
                    {techniciansList === null || techniciansList.length == 0 ?
                        <div className={'flex flex-col'}>
                            <h1 className={'text-center mt-4 font-extrabold text-3xl italic'}>No technicians found</h1>
                            <Wrench size={100} className={'mt-[25%] mx-auto'}/>
                        </div> :
                        techniciansList?.map((technician: ITechncian, index: number) => {
                            return (
                                <ListItem key={technician.firstName}
                                          className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} disablePadding>
                                    <ListItemButton className={'h-[8rem] flex flex-col'}>
                                        <div className={'flex justify-between w-full'}>
                                            <h1 className={'font-bold self-start text-xl'}>
                                                {technician.firstName.length + technician.lastName.length > 30 ?
                                                    technician.firstName + ' ' + technician.lastName
                                                        .slice(0, 30 - technician.firstName.length) + '...' :
                                                    technician.firstName + ' ' + technician.lastName}
                                            </h1>
                                            <Trash2 className={'text-red-600'}
                                                    onClick={() => handleAlertOpen(technician.id)}/>
                                        </div>
                                        <div className={'flex justify-start w-full mt-2'}>
                                            <Inbox/>
                                            <h2 className={'ml-4 italic'}>
                                                {technician.email.length > 50 ?
                                                    technician.email.slice(0, 50 - technician.email.length) + '...' :
                                                    technician.email}
                                            </h2>
                                        </div>
                                        <div className={'flex justify-start w-full mt-2'}>
                                            <MapPin/>
                                            <h2 className={'ml-4 italic'}>
                                                {technician.address}
                                            </h2>
                                        </div>
                                    </ListItemButton>
                                </ListItem>);
                        })
                    }
                </List>
            </div>
           <TechnicianDeleteAlert
                deleteAlertOpen={deleteAlertOpen}
                handleAlertClose={handleAlertClose}
                technicianId={alertTechnicianId}
            />
        </Drawer>
    );
}

export default TechniciansInfoDrawer;
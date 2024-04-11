export type IApiRes = {
    status: number;
    data: any;
}

export type ITechncian = {
    id: number;
    email: string;
    address: string;
    firstName: string;
    lastName: string;
    latitude: number;
    longitude: number;
}

export type IGetTechniciansByQueries = {
    role: string[];
    city: string;
    name: string;
}

export type ICreateTechnicianDto = {
    role: string;
    city: string;
    address: string;
    email: string;
    firstName: string;
    lastName: string;
    latitude: number;
    longitude: number;
}
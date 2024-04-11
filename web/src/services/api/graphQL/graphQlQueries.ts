import {useMutation} from "@tanstack/react-query";

import {IApiRes, ICreateTechnicianDto, IGetTechniciansByQueries} from "../../../types";

import {createTechnician, deleteTechnicianById, getAllTechnicians, getTechniciansByQueries} from "./graphQlApi.ts";

export const useCreateTechnician = () => {
    return useMutation(
        {
            mutationFn: async (dto: ICreateTechnicianDto): Promise<IApiRes> => {
                try {
                    console.log(dto);
                    const res = await createTechnician(dto);
                    const data: IApiRes = {
                        status: res.status,
                        data: res.data?.data
                    };
                    return data;
                } catch (err: any) {
                    const data: IApiRes = {
                        status: err.response.status,
                        data: err.response.data
                    };
                    return data;
                }

            }
        }
    );
};

export const useGetAllTechnicians = () => {
    return useMutation(
        {
            mutationFn: async (): Promise<IApiRes> => {
                try {
                    const res = await getAllTechnicians();
                    const data: IApiRes = {
                        status: res.status,
                        data: res.data?.data
                    };
                    return data;
                } catch (err: any) {
                    const data: IApiRes = {
                        status: err.response.status,
                        data: err.response.data
                    };
                    return data;
                }

            }
        }
    );
};
export const useGetTechniciansByQueries = () => {
    return useMutation(
        {
            mutationFn: async (dto: IGetTechniciansByQueries): Promise<IApiRes> => {
                try {
                    const res = await getTechniciansByQueries(dto);
                    const data: IApiRes = {
                        status: res.status,
                        data: res.data?.data
                    };
                    return data;
                } catch (err: any) {
                    const data: IApiRes = {
                        status: err.response.status,
                        data: err.response.data
                    };
                    console.log("err :", data);
                    return data;
                }
            }
        }
    );
};

export const useDeleteTechnicianById = () => {
    return useMutation(
        {
            mutationFn: async (id: number): Promise<IApiRes> => {
                try {
                    const res = await deleteTechnicianById(id);
                    const data: IApiRes = {
                        status: res.status,
                        data: res.data?.data
                    };
                    console.log(data);
                    return data;
                } catch (err: any) {
                    const data: IApiRes = {
                        status: err.response.status,
                        data: err.response.data
                    };
                    console.log("err :", data);
                    return data;
                }
            }
        }
    );
};
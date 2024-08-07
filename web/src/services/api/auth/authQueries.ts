import {useMutation} from "@tanstack/react-query";

import {IApiRes, ILoginUserDto, IRegisterUserDto} from "../../../types";

import {authenticateUser, registerUser} from "./authApi.ts";

export const useAuthenticateUser = () => {
    return useMutation(
        {
            mutationFn: async (dto: ILoginUserDto): Promise<IApiRes> => {
                try {
                    console.log(dto);
                    const res = await authenticateUser(dto);
                    const data: IApiRes = {
                        status: res.status,
                        data: res.data
                    };
                    return data;
                } catch (err: any) {
                    const data: IApiRes = {
                        status: err.response.status,
                        data: err.response.data
                    };
                    throw new Error(data.data.message);
                }

            }
        }
    );
};


export const useRegisterUser = () => {
    return useMutation(
        {
            mutationFn: async (dto: IRegisterUserDto): Promise<IApiRes> => {
                try {
                    console.log(dto);
                    const res = await registerUser(dto);
                    const data: IApiRes = {
                        status: res.status,
                        data: res.data
                    };
                    return data;
                } catch (err: any) {
                    const data: IApiRes = {
                        status: err.response.status,
                        data: err.response.data
                    };
                    throw new Error(data.data);
                }

            }
        }
    );
};

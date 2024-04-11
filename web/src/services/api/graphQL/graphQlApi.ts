import {ICreateTechnicianDto, IGetTechniciansByQueries} from "../../../types";
import axios from "../../config.ts";

export const createTechnician = async (dto: ICreateTechnicianDto) => {

    const res = await axios.post('/graphql', {
            query: `
              mutation {
                createTechnician(
                  technicianCreateDto: {
                    city: "${dto.city}"
                    address :"${dto.address}"
                    email: "${dto.email}"
                    firstName: "${dto.firstName}"
                    lastName: "${dto.lastName}"
                    role: ${dto.role}
                    latitude: ${dto.latitude}
                    longitude: ${dto.longitude}
                  }
                ) {
                  firstName
                  lastName
                  email
                  city
                }
              }`
        }
    );
    return res;
};

export const getAllTechnicians = async () => {
    const res = await axios.post('/graphql', {
            query: `
                 query { 
                     technicians{
                        id,
                        firstName,
                        lastName,
                        city,
                        latitude,
                        longitude
                      }
                 }`
        }
    );
    return res;
};

export const getTechniciansByQueries = async (dto: IGetTechniciansByQueries) => {
    const res = await axios.post('/graphql', {
            query: `
                query {
                    techniciansByQuery(technicianQueryDto: {name: "${dto.name}", city:"${dto.city}", role:[${dto.role}]}) {
                        id,
                        firstName,
                        lastName,
                        email,
                        address,
                        latitude,
                        longitude,
                        role
                    }
                  }`
        }
    );
    return res;
};

export const deleteTechnicianById = async (id: number) => {
    const res = await axios.post('/graphql', {
            query: `
                mutation {
                    deleteTechnician(id: ${id}) 
                }`
        }
    );
    return res;
};
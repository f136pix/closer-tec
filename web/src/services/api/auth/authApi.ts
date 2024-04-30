import {ILoginUserDto} from "../../../types";
import axios from "../../config.ts";

// export const authenticateUser = async () => {
//     const res = await axios.post("/api/Auth/register")
// }

export const authenticateUser = async (dto: ILoginUserDto) => {
    return await axios.post("/api/Auth/login", dto);
};


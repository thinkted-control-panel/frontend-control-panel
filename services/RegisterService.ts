import IRegister from "../interfaces/IRegister";
import { api } from "@/config/apiConfig";

export const register = async (userData: IRegister): Promise<void> => {
    try {
        await api.post("/auth/register", userData);
    } catch (error) {
        throw error;
    }
}
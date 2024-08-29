import { httpAxios } from "@/helper/httpHelper"

export const addShift=async(shift_creation)=>{
    const result=await httpAxios.post("/api/users/employee",shift_creation).then(response=>response).catch(error=>error)
    return result;
}
export const getShift=async()=>{
    const result=await httpAxios.get("/api/users/employee",).then(response=>response).catch(error=>error)
    return result;
}
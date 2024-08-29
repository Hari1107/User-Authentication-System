import { httpAxios } from "@/helper/httpHelper"

export const addUser=async(user)=>{
    const result=await httpAxios.post("/api/users/register",user).then(response=>response).catch(error=>error)
    return result;
}

export const loginUser=async(user)=>{
    const result=await httpAxios.post("/api/users/login",user).then(response=>response).catch(error=>error)
    return result
}
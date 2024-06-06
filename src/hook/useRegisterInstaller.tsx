import { useState } from "react";
import { toast } from "react-toastify";

import dbApi from '@/api/DbApi';

import { createInstallerInterface } from "@/interfaces/installerInterface";

export const useRegisterInstaller = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const submitRegister = async(body: createInstallerInterface) => {
        setIsLoading(true);
        try {
            await dbApi.post('/installer', body);
            setIsLoading(false);
            setSuccess(true);
        } catch (error: any) {
            setIsLoading(false);
            if (error.response.data.data) {
                toast.error(error.response.data.data.split(':')[1])
            }
            console.log(error.response.data)
        }
    }
    
    return {
        isLoading,
        success,
        submitRegister
    }
}
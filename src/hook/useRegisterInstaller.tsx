import { useState } from "react";
import { toast } from "react-toastify";

import dbApi from '@/api/DbApi';

import { createInstallerInterface } from "@/interfaces/installerInterface";

export const useRegisterInstaller = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const submitRegister = async(body: createInstallerInterface) => {
        setIsLoading(true);
        body.installer.employeesNumber = Number(body.installer.employeesNumber);
        body.installer.yearsExperience = Number(body.installer.yearsExperience);
        body.installer.ownOffice = Boolean(body.installer.ownOffice);
        body.installer.ownVehicle = Boolean(body.installer.ownVehicle);

        try {
            await dbApi.post('/installer', body);
            setIsLoading(false);
            setSuccess(true);
        } catch (error: any) {
            setIsLoading(false);
            if (error.response.data) {
                toast.error(error.response.data.message)
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
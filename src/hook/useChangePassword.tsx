import { useState } from "react";

import dbApi from '@/api/DbApi';
import { changePasswordReponseInterface } from "@/interfaces/changePasswordInterface";

export const useChangePassword = () => {

    const [userInformation, setUserInformation] = useState({
        status: '',
        updatePassword: true,
        passwordChanged: false
    });

    const getStatusUpdatePassword = async(token: string) => {
        
        try {
            const { data } = await dbApi.get<changePasswordReponseInterface>('/user/getUserStatusAndUpdateByToken', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setUserInformation({
                ...userInformation,
                status: data.status,
                updatePassword: data.updatePassword
            });
        } catch (error: any) {
            console.log(error)
        }
    };

    const updatePassword = async(token: string, password: string) => {
        try {
            const { data } = await dbApi.put('/user/changePasswordByTokenInEmail', { password }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserInformation({
                ...userInformation,
                passwordChanged: true
            });
        } catch (error: any) {
            console.log(error)
        }
    }

    return { 
        userInformation,
        getStatusUpdatePassword,
        updatePassword
    };
};
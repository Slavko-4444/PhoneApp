
export interface UserInfoDto {
        userId: number;
        email: string;
        forename: string;
        surname: string;
        phoneNumber: string;
        userInfo: {
            userInfoId: number;
            address: string;
            birthDate: string;
            occupation: string;
        }
    
}
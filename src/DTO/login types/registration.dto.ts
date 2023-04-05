export interface UserRegistrationDto { 
    email: string;
    password: string;
    forename: string;
    surname: string;
    phoneNumber: string;
    address: string;
    birthDate: string;
    occupation: string;
    contact: "email" | "phone-conntact";
    
}
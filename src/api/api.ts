import axios, {AxiosResponse, AxiosRequestConfig } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiConfig } from '../config/api.config';

export default async function api(
    path: string, 
    method: 'get' | 'post' | 'patch' | 'delete',
    body: any | undefined,
    role: 'user' | 'administrator' = 'user'
) {
    const requestDATA = {
        method: method,
        baseURL: ApiConfig.API_URL, // baseUrl + url === complited url
        url: path,
        data: body,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization':await getToken(role),
        }
    }
    
    return new Promise<ApiResponse>((resolve) => {
        axios(requestDATA)
            .then(res => responseHandler(res, resolve))
            .catch(async error => {
                if (error.response.status === 401) {
                    console.log('401')
                    const newToken = await refreshToken(role);
                    
                    if (!newToken) {
                        const response: ApiResponse = {
                            status: 'login Error',
                            data: null
                        }

                        return resolve(response);
                    }
                    saveToken(newToken, role);

                    requestDATA.headers['Authorization'] = await getToken(role);
                    return await repeatRequest(resolve, requestDATA);
                }

                const response: ApiResponse = {
                    status: 'service Error',
                    data: error
                }
                resolve(response);
            });
    });

}

async function responseHandler(res: AxiosResponse<any>, resolve: (value: ApiResponse) => void) {
    

    // greska kod servera ()
    if (res.status < 200 || res.status >= 300) {

        // 
        const response: ApiResponse = {
            status: 'service Error',
            data: res.data
        };

        return resolve(response)
    }

    // u slucaju odgovora backend-a...
    let response: ApiResponse;
    if (res.data.statusCode < 0)
        response = {
            status: 'login Error',
            data: res.data,
        }
    else 
        response = {
            status: 'ok',
            data: res.data
        }
    
    return resolve(response);
}

async function repeatRequest(resolve: (value: ApiResponse) => void, requestDATA: AxiosRequestConfig) {
    console.log("We repeated the call");
    await axios(requestDATA)
        .then(res => {
            let response: ApiResponse;

            if (res.status === 401)
                response = {
                    status: 'login Error',
                    data: res.data
                }
            else
                response = {
                    status: 'ok',
                    data: res.data
                }
            
            return resolve(response);
        })
        .catch(err => {

            const response: ApiResponse = {
                status: 'service Error',
                data: err
            }
            return resolve(response);
        });
}

export interface ApiResponse {
    status: 'ok' | 'login Error' | 'service Error';
    data: any;
}

async function refreshToken(role: 'user'|'administrator'): Promise<string | null> {

    const path = '/auth/Admin/'+ role +'/refresh';
    const data = {
        token: await getRefreshToken(role)
    }

    const refreshTokenRequestDATA: AxiosRequestConfig = {
        url: path,
        method: 'post',
        baseURL: ApiConfig.API_URL,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const rts: { data: { token: string | undefined } } = await axios(refreshTokenRequestDATA)

    if (!rts.data.token)
        return null;
    return rts.data.token;
}

export async function getToken(role:'user'|'administrator'): Promise<string> {
    const token = await AsyncStorage.getItem('api_token' + role);
    return 'Berer ' + token;
}

export async function saveToken(token: string, role:'user'|'administrator') {
    await AsyncStorage.setItem('api_token' + role, token);       
}

export async function saveIdentity(identity: string, role:'user'|'administrator') {
    await AsyncStorage.setItem('api_identity' + role, identity);       
}

export async function getIdentity(role: 'user' | 'administrator') {
    await AsyncStorage.getItem('api_identity' + role);       
}

async function  getRefreshToken(role: 'user' | 'administrator'): Promise<string> {
    const token = await AsyncStorage.getItem('api_refreshToken' + role);
    
    return token + '';
}
export async function saveRefreshToken(token: string, role:'user'|'administrator') {
    await AsyncStorage.setItem('api_refreshToken' + role, token);       
}
 


export interface ResponseInterface {
    success: boolean;
    data: any;
    error: any;
    message?: string | string[]; 
};
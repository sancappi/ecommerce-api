import { ExceptionFilter , HttpException, Catch,
    ArgumentsHost} from "@nestjs/common";
import { Response } from "express";
import { ResponseInterface } from "../interfaces/response.interface";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const status = exception.getStatus();

        const errorMessage = exception.getResponse()["message"]
            ? exception.getResponse()["message"]
            : exception.message || "Internal server error";

        const error: any = exception.getResponse() || 
            exception.getResponse();
        
            delete error["message"];

            const body: ResponseInterface = {
                success: false,
                message: errorMessage,
                data: null,
                error
            };

        response.status(status).json(body);
    }
}

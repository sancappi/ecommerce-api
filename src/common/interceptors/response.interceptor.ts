import { Injectable, NestInterceptor, ExecutionContext,
    CallHandler
} from "@nestjs/common";
import { Observable, map } from "rxjs";
import { ResponseInterface } from "../interfaces/response.interface";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        handler: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        return handler.handle().pipe(
            map((data: ResponseInterface) => {
                const message = data && data.message 
                    ? data.message 
                    : "Request successful";

                if (data?.message) delete data?.message;

                const data_ = data instanceof Error 
                    ? null 
                    : data?.data 
                        ? data.data 
                        : data;

                const success = !(data instanceof Error)
                    && data_ !== null;

                return {
                    success,
                    data: data_,
                    error: data instanceof Error 
                        ? data 
                        : null,
                    message
                };
            }) 
        );
    }
}
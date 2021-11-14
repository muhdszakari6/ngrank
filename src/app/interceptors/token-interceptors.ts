import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APICONSTANTS } from "../shared/consts/APICONSTANTS";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private token = APICONSTANTS.Token

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

            request = request.clone({ headers: request.headers.set('Authorization', 'Token ' + this.token) });
        

        return next.handle(request);
    }
}
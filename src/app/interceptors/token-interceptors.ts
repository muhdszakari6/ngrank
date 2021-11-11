import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { APICONSTANTS } from "../services/consts/APICONSTANTS";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private token = APICONSTANTS.Token

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

            request = request.clone({ headers: request.headers.set('Authorization', 'Token ' + this.token) });
        

        return next.handle(request);
    }
}
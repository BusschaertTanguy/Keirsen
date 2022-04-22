import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthorizationService} from "../services/authorization.service";
import {Observable, switchMap} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
    constructor(private readonly authorizationService: AuthorizationService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authorizationService.getToken().pipe(switchMap(token => {
            if (!!token) {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }

            return next.handle(req);
        }));
    }
}

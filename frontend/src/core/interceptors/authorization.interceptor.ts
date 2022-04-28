import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthorizationService} from "../services/authorization.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
    public constructor(private readonly authorizationService: AuthorizationService) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authorizationService.getToken();

        if (!!token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(req);
    }
}

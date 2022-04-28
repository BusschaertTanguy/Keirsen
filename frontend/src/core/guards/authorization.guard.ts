import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthorizationService} from "../services/authorization.service";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AuthorizationGuard implements CanActivate {
    public constructor(private readonly authorizationService: AuthorizationService, private router: Router) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authorizationService.isAuthenticated()) {
            this.authorizationService.login();
            return false;
        }

        return true;
    }

}

import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, tap} from "rxjs";
import {AuthorizationService} from "../services/authorization.service";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AuthorizationGuard implements CanActivate {
    constructor(private readonly authorizationService: AuthorizationService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log("GUARD");
        return this.authorizationService.isAuthenticated().pipe(tap((isAuthenticated: boolean) => {
            if (!isAuthenticated) {
                this.router.navigate(["authentication", "login"]);
            }
        }));
    }

}

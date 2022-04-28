import {Component} from "@angular/core";
import {AuthorizationService} from "./core/services/authorization.service";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})
export class AppComponent {
    public constructor(private readonly authorizationService: AuthorizationService) {
    }

    public isAuthenticated(): boolean {
        return this.authorizationService.isAuthenticated();
    }

    public logout(): Promise<void> {
        return this.authorizationService.logout();
    }
}

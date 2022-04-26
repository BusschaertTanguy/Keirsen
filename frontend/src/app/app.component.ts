import {Component} from "@angular/core";
import {AuthorizationService} from "../core/services/authorization.service";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})
export class AppComponent {
    public constructor(private readonly authorizationService: AuthorizationService) {
    }

    public logout(): Promise<void> {
        return this.authorizationService.signOut();
    }
}

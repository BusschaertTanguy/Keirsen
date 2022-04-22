import {Component} from "@angular/core";
import {AuthorizationService} from "../../core/services/authorization.service";

@Component({
    selector: "app-product",
    template: `
        <div>
            product works!
        </div>
        <div>
            <button (click)="logOut()">Log out</button>
        </div>
    `,
    styles: []
})
export class ProductComponent {
    public constructor(private readonly authorizationService: AuthorizationService) {
    }

    public logOut(): Promise<void> {
        return this.authorizationService.signOut();
    }
}

import {Component, OnInit} from "@angular/core";
import {AuthorizationService} from "../../../core/services/authorization.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: "app-login",
    template: ""
})
export class LoginComponent implements OnInit {

    constructor(private readonly authorizationService: AuthorizationService, private readonly activatedRoute: ActivatedRoute, private readonly router: Router) {
    }

    public async ngOnInit(): Promise<void> {
        const action = this.activatedRoute.snapshot.url[1];

        switch (action.path) {
            case "login":
                await this.authorizationService.signIn();
                break;
            case "login-callback" :
                await this.authorizationService.completeSignIn(window.location.href);
                await this.router.navigate([""]);
                break;
        }
    }
}

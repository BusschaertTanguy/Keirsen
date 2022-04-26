import {Component, OnInit} from "@angular/core";
import {AuthorizationService} from "../../../core/services/authorization.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: "app-log-out",
    template: ""
})
export class LogOutComponent implements OnInit {

    public constructor(private readonly authorizationService: AuthorizationService, private readonly activatedRoute: ActivatedRoute, private readonly router: Router) {
    }

    public async ngOnInit(): Promise<void> {
        const action = this.activatedRoute.snapshot.url[1];

        switch (action.path) {
            case "logout":
                await this.authorizationService.signOut();
                break;
            case "logout-callback" :
                await this.authorizationService.completeSignOut(window.location.href);
                await this.router.navigate([""]);
                break;
        }
    }
}

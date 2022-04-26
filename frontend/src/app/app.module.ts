import {APP_INITIALIZER, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./authentication/login/login.component";
import {LogOutComponent} from "./authentication/log-out/log-out.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthorizationInterceptor} from "../core/interceptors/authorization.interceptor";
import {AuthorizationService} from "../core/services/authorization.service";
import {BaseUrlInterceptor} from "../core/interceptors/base-url.interceptor";

function loadAuthorizationService(authorizationService: AuthorizationService): () => Promise<void> {
    return () => authorizationService.load();
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LogOutComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: loadAuthorizationService,
            deps: [AuthorizationService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthorizationInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseUrlInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

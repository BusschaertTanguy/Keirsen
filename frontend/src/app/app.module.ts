import {APP_INITIALIZER, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BaseUrlInterceptor} from "../core/interceptors/base-url.interceptor";
import {AuthConfig, OAuthModule} from "angular-oauth2-oidc"
import {AuthorizationService} from "../core/services/authorization.service";
import {AuthorizationInterceptor} from "../core/interceptors/authorization.interceptor";
import {environment} from "../environments/environment";

function loadAuthorizationService(authorizationService: AuthorizationService): () => Promise<void> {
    const authCodeFlowConfig: AuthConfig = {
        issuer: environment.apiUrl,
        redirectUri: window.location.origin,
        clientId: "Keirsen",
        responseType: "code",
        scope: "openid profile PresentationAPI",
        showDebugInformation: true
    };

    return () => authorizationService.load(authCodeFlowConfig);
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        OAuthModule.forRoot()
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
            useClass: BaseUrlInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthorizationInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

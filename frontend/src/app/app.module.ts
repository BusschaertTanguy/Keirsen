import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./authentication/login/login.component";
import {LogOutComponent} from "./authentication/log-out/log-out.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthorizationInterceptor} from "../core/interceptors/authorization.interceptor";

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
        {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

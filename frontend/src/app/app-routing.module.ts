import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./authentication/login/login.component";
import {LogOutComponent} from "./authentication/log-out/log-out.component";

const routes: Routes = [
    {path: "authentication/login", component: LoginComponent},
    {path: "authentication/login-callback", component: LoginComponent},
    {path: "authentication/logout", component: LogOutComponent},
    {path: "authentication/logout-callback", component: LogOutComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

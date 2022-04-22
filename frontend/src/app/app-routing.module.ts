import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./authentication/login/login.component";
import {LogOutComponent} from "./authentication/log-out/log-out.component";
import {AuthorizationGuard} from "../core/guards/authorization.guard";

const routes: Routes = [
    {path: "authentication/login", component: LoginComponent},
    {path: "authentication/login-callback", component: LoginComponent},
    {path: "authentication/logout", component: LogOutComponent},
    {path: "authentication/logout-callback", component: LogOutComponent},
    {
        path: "product",
        loadChildren: () => import("./product/product.module").then(m => m.ProductModule),
        canActivate: [AuthorizationGuard]
    },
    {path: "", pathMatch: "full", redirectTo: "product"}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

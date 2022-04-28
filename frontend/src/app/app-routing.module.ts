import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthorizationGuard} from "./core/guards/authorization.guard";

const routes: Routes = [
    {
        path: "products",
        loadChildren: () => import("./features/products/products.module").then(m => m.ProductsModule),
        canActivate: [AuthorizationGuard]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

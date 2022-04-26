import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./products.component";
import {AddProductComponent} from "./containers/add-product/add-product.component";

const routes: Routes = [
    {
        path: "", component: ProductsComponent, children: [
            {path: "add", component: AddProductComponent},
            {path: "", redirectTo: "add", pathMatch: "full"}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {
}

import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./products.component";
import {AddProductComponent} from "./containers/add-product/add-product.component";
import {ProductDetailComponent} from "./containers/product-detail/product-detail.component";

const routes: Routes = [
    {
        path: "", component: ProductsComponent, children: [
            {path: "", redirectTo: "add"},
            {path: "add", component: AddProductComponent},
            {path: ":id", component: ProductDetailComponent},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {
}

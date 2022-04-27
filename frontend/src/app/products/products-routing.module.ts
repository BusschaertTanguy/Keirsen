import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./products.component";
import {AddProductComponent} from "./containers/add-product/add-product.component";
import {ProductDetailComponent} from "./containers/product-detail/product-detail.component";
import {ProductListComponent} from "./containers/product-list/product-list.component";
import {
    ChangeProductInformationComponent
} from "./containers/change-product-information/change-product-information.component";

const routes: Routes = [
    {
        path: "", component: ProductsComponent, children: [
            {path: "", component: ProductListComponent},
            {path: "add", component: AddProductComponent},
            {path: "change-information", component: ChangeProductInformationComponent},
            {path: ":id", component: ProductDetailComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {
}

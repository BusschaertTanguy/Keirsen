import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ProductsRoutingModule} from "./products-routing.module";
import {ProductsComponent} from "./products.component";
import {AddProductComponent} from "./containers/add-product/add-product.component";
import {AddProductFormComponent} from "./components/add-product-form/add-product-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ProductDetailComponent} from "./containers/product-detail/product-detail.component";
import {ProductDetailFormComponent} from "./components/product-detail-form/product-detail-form.component";
import {ProductListComponent} from "./containers/product-list/product-list.component";
import {ProductListTableComponent} from "./components/product-list-table/product-list-table.component";
import {
    ChangeProductInformationComponent
} from "./containers/change-product-information/change-product-information.component";
import {
    ChangeProductInformationFormComponent
} from "./components/change-product-information-form/change-product-information-form.component";


@NgModule({
    declarations: [
        ProductsComponent,
        AddProductComponent,
        AddProductFormComponent,
        ProductDetailComponent,
        ProductDetailFormComponent,
        ProductListComponent,
        ProductListTableComponent,
        ChangeProductInformationComponent,
        ChangeProductInformationFormComponent
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        ReactiveFormsModule
    ]
})
export class ProductsModule {
}

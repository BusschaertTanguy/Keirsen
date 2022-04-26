import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ProductsRoutingModule} from "./products-routing.module";
import {ProductsComponent} from "./products.component";
import {AddProductComponent} from "./containers/add-product/add-product.component";
import {AddProductFormComponent} from "./components/add-product-form/add-product-form.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        ProductsComponent,
        AddProductComponent,
        AddProductFormComponent
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        ReactiveFormsModule
    ]
})
export class ProductsModule {
}

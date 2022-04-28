import {ChangeDetectionStrategy, Component} from "@angular/core";
import {ProductDetailService} from "./services/product-detail.service";

@Component({
    selector: "app-products",
    templateUrl: "products.component.html",
    styleUrls: ["products.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ProductDetailService]
})
export class ProductsComponent {
}

import {ChangeDetectionStrategy, Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../../core/services/product.service";
import {Observable, switchMap} from "rxjs";
import {ProductDetailModel} from "../../../../shared/models/product.model";

@Component({
    selector: "app-product-detail",
    templateUrl: "product-detail.component.html",
    styleUrls: ["product-detail.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
    public product$: Observable<ProductDetailModel | null>;

    public constructor(route: ActivatedRoute, productService: ProductService) {
        this.product$ = route.params.pipe(
            switchMap((params) => productService.get(params["id"]))
        );
    }
}

import {ChangeDetectionStrategy, Component, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription, tap} from "rxjs";
import {ProductDetailModel} from "../../../../shared/models/product.model";
import {ProductDetailService} from "../../services/product-detail.service";

@Component({
    selector: "app-product-detail",
    templateUrl: "product-detail.component.html",
    styleUrls: ["product-detail.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnDestroy {
    private _subscription = new Subscription();

    public product$: Observable<ProductDetailModel | null>;

    public constructor(route: ActivatedRoute, productDetailService: ProductDetailService) {
        this.product$ = productDetailService.product$;

        const subscription = route.params.pipe(
            tap((params) => productDetailService.loadProduct(params["id"])),
        ).subscribe();

        this._subscription.add(subscription);
    }

    public ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}

import {ChangeDetectionStrategy, Component, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../../core/services/product.service";
import {BehaviorSubject, Observable, Subscription, switchMap, tap} from "rxjs";
import {ProductDetailModel} from "../../../../shared/models/product.model";

@Component({
    selector: "app-product-detail",
    templateUrl: "product-detail.component.html",
    styleUrls: ["product-detail.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnDestroy {
    private subscription = new Subscription();
    private product = new BehaviorSubject<ProductDetailModel | null>(null);

    public product$: Observable<ProductDetailModel | null>;

    public constructor(route: ActivatedRoute, productService: ProductService) {
        this.product$ = this.product.asObservable();

        const subscription = route.params.pipe(
            switchMap((params) => productService.get(params["id"])),
            tap(product => this.product.next(product))
        ).subscribe();

        this.subscription.add(subscription);
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

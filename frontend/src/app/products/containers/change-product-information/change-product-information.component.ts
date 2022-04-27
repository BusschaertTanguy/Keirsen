import {ChangeDetectionStrategy, Component, OnDestroy} from "@angular/core";
import {combineLatest, mergeMap, Observable, of, Subject, Subscription, switchMap} from "rxjs";
import {ProductDetailModel} from "../../../../shared/models/product.model";
import {ProductDetailService} from "../../services/product-detail.service";
import {ChangeProductInformationCommand} from "../../../../shared/commands/product.command";
import {ProductService} from "../../../../core/services/product.service";
import {Router} from "@angular/router";

@Component({
    selector: "app-change-product-information",
    templateUrl: "change-product-information.component.html",
    styleUrls: ["change-product-information.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeProductInformationComponent implements OnDestroy {
    private _subscription = new Subscription();
    private _changeInformation = new Subject<ChangeProductInformationCommand>();

    public product$: Observable<ProductDetailModel | null>;

    public constructor(productDetailService: ProductDetailService, productService: ProductService, router: Router) {
        this.product$ = productDetailService.product$;

        const subscription = this._changeInformation.pipe(
            mergeMap(command => combineLatest([productService.changeInformation(command), of(command.productId)])),
            switchMap(([_, productId]) => router.navigate(["/products", productId]))
        ).subscribe();

        this._subscription.add(subscription);
    }

    public changeInformation(command: ChangeProductInformationCommand): void {
        this._changeInformation.next(command);
    }

    public ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}

import {ChangeDetectionStrategy, Component, OnDestroy} from "@angular/core";
import {BehaviorSubject, Observable, Subscription, switchMap, tap} from "rxjs";
import {ProductListModel} from "../../../../shared/models/product.model";
import {ProductService} from "../../../../core/services/product.service";

@Component({
    selector: "app-product-list",
    templateUrl: "product-list.component.html",
    styleUrls: ["product-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnDestroy {
    private _subscriptions = new Subscription();
    private _products = new BehaviorSubject<ProductListModel[]>([]);
    private _getAllProducts = new BehaviorSubject<{ pageIndex: number, pageSize: number }>({
        pageIndex: 0,
        pageSize: 25
    });

    public products$: Observable<ProductListModel[]>;

    public constructor(productService: ProductService) {
        this.products$ = this._products.asObservable();

        const subscription = this._getAllProducts.pipe(
            switchMap((page) => productService.getAll(page)),
            tap((products) => this._products.next(products))
        ).subscribe()

        this._subscriptions.add(subscription);
    }

    public ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }
}

import {ChangeDetectionStrategy, Component, OnDestroy} from "@angular/core";
import {catchError, map, Observable, Subject, Subscription, switchMap} from "rxjs";
import {ProductListModel} from "../../../../shared/models/product.model";
import {ProductService} from "../../../../core/services/product.service";
import {Store} from "@ngxs/store";
import {ProductListState} from "../../stores/product-list.state";
import {PageModel} from "../../../../shared/models/page.model";
import {GetProducts, GetProductsFailed, GetProductsSuccess} from "../../stores/product-list.action";

@Component({
    selector: "app-product-list",
    templateUrl: "product-list.component.html",
    styleUrls: ["product-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: []
})
export class ProductListComponent implements OnDestroy {
    private _subscriptions = new Subscription();
    private _getAllProducts = new Subject<PageModel>();

    public loading$: Observable<boolean>;
    public currentPage$: Observable<PageModel>;
    public products$: Observable<ProductListModel[]>;
    public error$: Observable<string | null>;

    public constructor(productService: ProductService, store: Store) {
        this.loading$ = store.select(ProductListState.loading);
        this.currentPage$ = store.select(ProductListState.currentPage);
        this.products$ = store.select(ProductListState.products);
        this.error$ = store.select(ProductListState.error);

        const subscription = this._getAllProducts.pipe(
            switchMap((page) => store.dispatch(new GetProducts(page)).pipe(
                map(_ => page)
            )),
            switchMap((page) => productService.getAll(page).pipe(
                catchError(_ => store.dispatch(new GetProductsFailed())),
            )),
            switchMap((products) => store.dispatch(new GetProductsSuccess(products)))
        ).subscribe()

        this._subscriptions.add(subscription);
    }

    public getAllProducts(page: PageModel): void {
        this._getAllProducts.next(page);
    }

    public ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }
}

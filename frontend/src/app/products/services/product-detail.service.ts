import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, Observable, Subject, Subscription, switchMap, tap} from "rxjs";
import {ProductDetailModel} from "../../../shared/models/product.model";
import {ProductService} from "../../../core/services/product.service";

@Injectable()
export class ProductDetailService implements OnDestroy {
    private _subscription = new Subscription();
    private _product = new BehaviorSubject<ProductDetailModel | null>(null);
    private _loadProduct = new Subject<string>();

    public product$: Observable<ProductDetailModel | null>;

    public constructor(productService: ProductService) {
        this.product$ = this._product.asObservable();

        const subscription = this._loadProduct.pipe(
            switchMap(id => productService.getById(id)),
            tap(product => this._product.next(product))
        ).subscribe();

        this._subscription.add(subscription);
    }

    public loadProduct(id: string): void {
        this._loadProduct.next(id);
    }

    public ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}

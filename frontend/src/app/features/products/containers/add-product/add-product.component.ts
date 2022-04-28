import {ChangeDetectionStrategy, Component, OnDestroy} from "@angular/core";
import {ProductService} from "../../../../core/services/product.service";
import {filter, mergeMap, Subject, Subscription, switchMap} from "rxjs";
import {AddProductCommand} from "../../../../shared/commands/product.command";
import {Router} from "@angular/router";

@Component({
    selector: "app-add-product",
    templateUrl: "add-product.component.html",
    styleUrls: ["add-product.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductComponent implements OnDestroy {
    private _subscriptions = new Subscription();
    private _addProduct = new Subject<AddProductCommand>();

    public constructor(productService: ProductService, router: Router) {
        const subscription = this._addProduct.pipe(
            mergeMap((command) => productService.add(command)),
            filter((id) => !!id),
            switchMap((id) => router.navigate(["/products", id]))
        ).subscribe();

        this._subscriptions.add(subscription);
    }

    public addProduct(command: AddProductCommand): void {
        this._addProduct.next(command);
    }

    public ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }
}

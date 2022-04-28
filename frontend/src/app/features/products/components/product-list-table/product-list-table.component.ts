import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {ProductListModel} from "../../../../shared/models/product.model";

@Component({
    selector: "app-product-list-table",
    templateUrl: "product-list-table.component.html",
    styleUrls: ["product-list-table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListTableComponent {
    private _products: ProductListModel[] = [];

    @Input()
    public set products(products: ProductListModel[] | null) {
        this._products = products ?? [];
    }

    public get products(): ProductListModel[] {
        return this._products;
    }
}

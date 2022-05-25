import {PageModel} from "../../../shared/models/page.model";
import {ProductListModel} from "../../../shared/models/product.model";

export class GetProducts {
    public static readonly type = "[Product List] Get Products";

    public constructor(public readonly newPage?: PageModel) {
    }
}

export class GetProductsSuccess {
    public static readonly type = "[Product List] Get Products Success";

    public constructor(public readonly products: ProductListModel[]) {
    }
}

export class GetProductsFailed {
    public static readonly type = "[Product List] Get Products Failed";
}
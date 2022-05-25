import {ProductListModel} from "../../../shared/models/product.model";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {DefaultPage, PageModel} from "../../../shared/models/page.model";
import {GetProducts, GetProductsFailed, GetProductsSuccess} from "./product-list.action";
import {Injectable} from "@angular/core";

export interface ProductListStateModel {
    readonly products: ProductListModel[];
    readonly loading: boolean;
    readonly currentPage: PageModel;
    readonly error: string | null;
}

@State<ProductListStateModel>({
    name: "product-list",
    defaults: {
        products: [],
        loading: true,
        currentPage: DefaultPage(),
        error: null
    }
})
@Injectable()
export class ProductListState {
    @Selector()
    public static products({products}: ProductListStateModel): ProductListModel[] {
        return products;
    }

    @Selector()
    public static loading({loading}: ProductListStateModel): boolean {
        return loading;
    }

    @Selector()
    public static currentPage({currentPage}: ProductListStateModel): PageModel {
        return currentPage;
    }

    @Selector()
    public static error({error}: ProductListStateModel): string | null {
        return error;
    }

    @Action(GetProducts)
    public getProducts(ctx: StateContext<ProductListStateModel>, action: GetProducts): void {
        ctx.patchState({
            loading: true,
            currentPage: action.newPage,
            error: null
        });
    }

    @Action(GetProductsSuccess)
    public getProductsSuccess(ctx: StateContext<ProductListStateModel>, action: GetProductsSuccess): void {
        ctx.patchState({
            loading: false,
            products: action.products
        });
    }

    @Action(GetProductsFailed)
    public getProductsFailed(ctx: StateContext<ProductListStateModel>): void {
        ctx.patchState({
            loading: false,
            error: null
        });
    }
}
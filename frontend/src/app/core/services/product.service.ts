import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AddProductCommand, ChangeProductInformationCommand} from "../../shared/commands/product.command";
import {map, Observable} from "rxjs";
import {ProductDetailModel, ProductListModel} from "../../shared/models/product.model";
import {PageModel, toHttpParams} from "../../shared/models/page.model";

@Injectable({
    providedIn: "root"
})
export class ProductService {
    private readonly endpoint = "api/products";

    public constructor(private readonly http: HttpClient) {
    }

    public add(command: AddProductCommand): Observable<string | null> {
        return this.http.post<void>(this.endpoint, command, {observe: "response"}).pipe(
            map((response) => {
                const endpoint = response.headers.get("location");

                return endpoint ? endpoint.split("/").reverse()[0] : null;
            })
        );
    }

    public changeInformation(command: ChangeProductInformationCommand): Observable<void> {
        const url = `${this.endpoint}/change-information`;

        return this.http.post<void>(url, command);
    }

    public getAll(page: PageModel): Observable<ProductListModel[]> {
        const params = toHttpParams(page);

        return this.http.get<ProductListModel[]>(this.endpoint, {params});
    }

    public getById(id: string): Observable<ProductDetailModel | null> {
        const url = `${this.endpoint}/${id}`;

        return this.http.get<ProductDetailModel | null>(url);
    }
}

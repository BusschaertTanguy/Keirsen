import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AddProductCommand} from "../../shared/commands/product.command";
import {map, Observable} from "rxjs";
import {ProductDetailModel} from "../../shared/models/product.model";

@Injectable({
    providedIn: "root"
})
export class ProductService {
    private readonly endpoint = "products";

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

    public get(id: string): Observable<ProductDetailModel | null> {
        const url = `${this.endpoint}/${id}`;

        return this.http.get<ProductDetailModel | null>(url);
    }
}

import {ChangeDetectionStrategy, Component} from "@angular/core";
import {ProductService} from "../../../../core/services/product.service";
import {filter, Subject, switchMap} from "rxjs";
import {AddProductCommand} from "../../../../shared/commands/product.command";
import {Router} from "@angular/router";

@Component({
    selector: "app-add-product",
    templateUrl: "add-product.component.html",
    styleUrls: ["add-product.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductComponent {
    private addProductCommand = new Subject<AddProductCommand>();

    public constructor(productService: ProductService, router: Router) {
        this.addProductCommand.pipe(
            switchMap((command) => productService.add(command)),
            filter((id) => !!id),
            switchMap((id) => router.navigate(["/products", id]))
        ).subscribe();
    }

    public addProduct(command: AddProductCommand): void {
        this.addProductCommand.next(command);
    }
}

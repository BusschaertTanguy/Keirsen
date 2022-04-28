import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {ProductDetailModel} from "../../../../shared/models/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: "app-product-detail-form",
    templateUrl: "product-detail-form.component.html",
    styleUrls: ["product-detail-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailFormComponent {
    @Input()
    public set product(product: ProductDetailModel | null) {
        this.exists = !!product;

        if (!product) {
            this.form.reset();
            return;
        }

        this.form.setValue({
            id: product.id,
            name: product.name,
            description: product.description
        })
    }

    public form: FormGroup;
    public exists: boolean;

    public constructor(private readonly formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            id: [null],
            name: [null],
            description: [null]
        });

        this.exists = false;
    }
}

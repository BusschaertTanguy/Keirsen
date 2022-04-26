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
    public form: FormGroup;
    public exists: boolean;

    @Input()
    public set product(model: ProductDetailModel | null) {
        this.exists = !!model;

        if (!model) {
            this.form.reset();
            return;
        }

        this.form.setValue({
            id: model.id,
            name: model.name,
            description: model.description
        })
    }

    public constructor(private readonly formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            id: [null],
            name: [null],
            description: [null]
        });

        this.exists = false;
    }
}

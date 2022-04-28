import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {ProductDetailModel} from "../../../../shared/models/product.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChangeProductInformationCommand} from "../../../../shared/commands/product.command";

@Component({
    selector: "app-change-product-information-form",
    templateUrl: "change-product-information-form.component.html",
    styleUrls: ["change-product-information-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeProductInformationFormComponent {
    @Input()
    public set product(product: ProductDetailModel | null) {
        if (!product) {
            return;
        }

        this.form.setValue({
            id: product.id,
            name: product.name,
            description: product.description
        })
    }

    @Output()
    public productInformationChanged = new EventEmitter<ChangeProductInformationCommand>();

    public form: FormGroup;

    public constructor(private readonly formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            id: [null, Validators.required],
            name: [null, Validators.required],
            description: [null, Validators.required]
        });
    }

    public save(): void {
        const command: ChangeProductInformationCommand = {
            productId: this.form.get("id")?.value,
            name: this.form.get("name")?.value,
            description: this.form.get("description")?.value
        };

        this.productInformationChanged.emit(command);
    }
}

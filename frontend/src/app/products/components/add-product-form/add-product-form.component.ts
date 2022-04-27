import {ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddProductCommand} from "../../../../shared/commands/product.command";

@Component({
    selector: "app-add-product-form",
    templateUrl: "add-product-form.component.html",
    styleUrls: ["add-product-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductFormComponent {
    @Output()
    public productAdded = new EventEmitter<AddProductCommand>();

    public form: FormGroup;

    public constructor(formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            name: [null, Validators.required],
            description: [null, Validators.required],
        });
    }

    public add(): void {
        const command: AddProductCommand = {
            name: this.form.get("name")?.value,
            description: this.form.get("description")?.value
        }

        this.productAdded.emit(command);
    }
}

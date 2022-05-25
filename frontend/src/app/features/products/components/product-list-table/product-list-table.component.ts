import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ProductListModel} from "../../../../shared/models/product.model";
import {DefaultPage, PageModel} from "../../../../shared/models/page.model";

@Component({
    selector: "app-product-list-table",
    templateUrl: "product-list-table.component.html",
    styleUrls: ["product-list-table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListTableComponent implements OnInit {
    @Input()
    public loading: boolean | null = null;

    @Input()
    public currentPage: PageModel = DefaultPage();

    @Input()
    public products: ProductListModel[] = [];

    @Input()
    public error: string | null = null;

    @Output()
    public pageChanged = new EventEmitter<PageModel>();

    public ngOnInit(): void {
        this.pageChanged.emit(this.currentPage);
    }

    public next(): void {
        const nextPage: PageModel = {
            index: this.currentPage.index + 1,
            size: this.currentPage.size
        }

        this.pageChanged.emit(nextPage);
    }

    public hasPreviousPage(): boolean {
        return this.currentPage.index !== 0;
    }

    public previous(): void {
        if (!this.hasPreviousPage()) {
            return;
        }

        const previousPage: PageModel = {
            index: this.currentPage.index - 1,
            size: this.currentPage.size
        }

        this.pageChanged.emit(previousPage);
    }
}

import {HttpParams} from "@angular/common/http";

export interface PageModel {
    readonly index: number;
    readonly size: number;
}

export const DefaultPage = (): PageModel => {
    return {
        index: 0,
        size: 25
    }
}

export const toHttpParams = ({index, size}: PageModel): HttpParams => {
    return new HttpParams().append("pageIndex", index).append("pageSize", size);
}
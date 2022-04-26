export interface AddProductCommand {
    readonly name: string;
    readonly description: string;
}

export interface ChangeProductInformationCommand {
    readonly productId: string;
    readonly name: string;
    readonly description: string;
}
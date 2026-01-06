import { DessertsService } from './desserts.service';
export declare class DessertsController {
    private readonly dessertsService;
    constructor(dessertsService: DessertsService);
    getDesserts(): Promise<import("./dto/desserts.dto").DessertDto[]>;
}

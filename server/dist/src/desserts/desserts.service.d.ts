import { DessertDto } from './dto/desserts.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class DessertsService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllDesserts(): Promise<DessertDto[]>;
}

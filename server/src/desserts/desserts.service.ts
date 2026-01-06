import { Injectable, NotFoundException } from '@nestjs/common';
import { DessertDto } from './dto/desserts.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DessertsService {
  constructor(private prisma: PrismaService) {}

  async getAllDesserts(): Promise<DessertDto[]> {
    const desserts = await this.prisma.dessert.findMany();

    if (!desserts || desserts.length === 0) {
      throw new NotFoundException('No desserts found');
    }

    return desserts.map((dessert) => ({
      id: dessert.id,
      name: dessert.name,
      category: dessert.category,
      price: dessert.price,
      image: {
        thumbnail: dessert.thumbnail,
        mobile: dessert.mobile,
        tablet: dessert.tablet,
        desktop: dessert.desktop,
      },
    }));
  }
}

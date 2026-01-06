import { Controller, Get } from '@nestjs/common';
import { DessertsService } from './desserts.service';

@Controller('desserts')
export class DessertsController {
  constructor(private readonly dessertsService: DessertsService) {}

  @Get()
  async getDesserts() {
    return this.dessertsService.getAllDesserts();
  }
}

import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  ForbiddenException,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCatDTo, UpdateCatDTo } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from 'src/cats/interfaces/cats.interface';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles('admin')
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDTo) {
    this.catsService.create(createCatDto);
    return 'success';
  }

  @Get('all')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('error')
  async error() {
    throw new Error('other exception');
    throw new ForbiddenException();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ValidationPipe()) updateCatDto: UpdateCatDTo,
  ) {
    this.catsService.update(id, updateCatDto);
    return `success`;
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    this.catsService.deleteOne(id);
    return 'success';
  }
}

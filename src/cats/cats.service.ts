import { Injectable } from '@nestjs/common';
import { Cat } from 'src/cats/interfaces/cats.interface';
import { CreateCatDTo, UpdateCatDTo } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    { id: 1, name: 'Cat1', age: 1, breed: 'Breed1' },
  ];

  private generateId(): number {
    return Math.floor(Math.random() * 10000);
  }

  create(cat: CreateCatDTo) {
    this.cats.push({
      ...cat,
      id: this.generateId(),
    });
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    const cat = this.cats.find((cat) => cat.id === id);
    if (!cat) {
      throw new Error('Cat not found');
    }
    return cat;
  }

  deleteOne(id: number) {
    const cat = this.findOne(id);
    this.cats.splice(this.cats.indexOf(cat), 1);
  }

  update(id: number, cat: UpdateCatDTo) {
    const catToUpdate = this.findOne(id);
    this.cats.splice(this.cats.indexOf(catToUpdate), 1, {
      ...catToUpdate,
      ...cat,
    });
  }
}

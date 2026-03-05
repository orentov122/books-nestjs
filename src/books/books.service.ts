import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Books } from './entities/books.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-books.dto';
import { UpdateBooksDto } from './dto/update-books.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
  ) {}

  async create(dto: CreateBookDto): Promise<Books> {
    const book = this.booksRepository.create(dto);
    return this.booksRepository.save(book);
  }

  async findAll(): Promise<Books[]> {
    return this.booksRepository.find();
  }

  async findOne(id: number): Promise<Books> {
    const book = await this.booksRepository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException('Книга не найдена');
    }

    return book;
  }
  async findByName(name: string): Promise<Books> {
    const book = await this.booksRepository.findOneBy({ name });

    if (!book) {
      throw new NotFoundException('Книга не найдена');
    }

    return book;
  }

  async update(id: number, dto: UpdateBooksDto): Promise<Books> {
    await this.booksRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.booksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Книга не найдена');
    }
  }
}

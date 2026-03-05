import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-books.dto";
import { BooksService } from "./books.service";
import { UpdateBooksDto } from "./dto/update-books.dto";

@Controller('')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('books')
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }
  @Get('books')
  getAll() {
    return this.booksService.findAll();
  }
  @Get('books/:id')
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(+id);
  }
  @Get('books/:name')
  findName(@Param('name') name: string) {
    return this.booksService.findByName(name);
  }
  @Delete('books/:id')
  remove(@Param('id') id: number) {
    return this.booksService.remove(+id);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateBooksDto) {
    return this.booksService.update(+id, dto);
  }
}
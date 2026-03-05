import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-books.dto';

export class UpdateBooksDto extends PartialType(CreateBookDto) {}

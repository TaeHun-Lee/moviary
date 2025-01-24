import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':docId')
  findOne(@Param('docId') docId: string) {
    return this.moviesService.findOne(docId);
  }

  @Get('title/:title')
  search(@Param('title') title: string) {
    return this.moviesService.search(title);
  }

  @Delete(':docId')
  remove(@Param('docId') docId: string) {
    return this.moviesService.remove(docId);
  }
}

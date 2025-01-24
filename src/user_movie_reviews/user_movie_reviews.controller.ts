import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserMovieReviewsService } from './user_movie_reviews.service';
import { CreateUserMovieReviewDto } from './dto/create-user_movie_review.dto';
import { UpdateUserMovieReviewDto } from './dto/update-user_movie_review.dto';

@Controller('user-movie-reviews')
export class UserMovieReviewsController {
  constructor(private readonly userMovieReviewsService: UserMovieReviewsService) {}

  @Post()
  create(@Body() createUserMovieReviewDto: CreateUserMovieReviewDto) {
    return this.userMovieReviewsService.create(createUserMovieReviewDto);
  }

  @Get()
  findAll() {
    return this.userMovieReviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userMovieReviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserMovieReviewDto: UpdateUserMovieReviewDto) {
    return this.userMovieReviewsService.update(+id, updateUserMovieReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userMovieReviewsService.remove(+id);
  }
}

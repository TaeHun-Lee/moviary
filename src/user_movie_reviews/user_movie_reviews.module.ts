import { Module } from '@nestjs/common';
import { UserMovieReviewsService } from './user_movie_reviews.service';
import { UserMovieReviewsController } from './user_movie_reviews.controller';

@Module({
  controllers: [UserMovieReviewsController],
  providers: [UserMovieReviewsService],
})
export class UserMovieReviewsModule {}

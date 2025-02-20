import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { UserMovieReviewsModule } from './user_movie_reviews/user_movie_reviews.module';

@Module({
  imports: [MoviesModule, UsersModule, UserMovieReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

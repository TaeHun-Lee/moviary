import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { UserMovieReviewsModule } from './user_movie_reviews/user_movie_reviews.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or your preferred database
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    MoviesModule,
    UsersModule,
    UserMovieReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

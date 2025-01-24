import { Test, TestingModule } from '@nestjs/testing';
import { UserMovieReviewsController } from './user_movie_reviews.controller';
import { UserMovieReviewsService } from './user_movie_reviews.service';

describe('UserMovieReviewsController', () => {
  let controller: UserMovieReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMovieReviewsController],
      providers: [UserMovieReviewsService],
    }).compile();

    controller = module.get<UserMovieReviewsController>(UserMovieReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserMovieReviewsService } from './user_movie_reviews.service';

describe('UserMovieReviewsService', () => {
  let service: UserMovieReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMovieReviewsService],
    }).compile();

    service = module.get<UserMovieReviewsService>(UserMovieReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

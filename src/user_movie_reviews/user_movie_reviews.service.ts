import { Injectable } from '@nestjs/common';
import { CreateUserMovieReviewDto } from './dto/create-user_movie_review.dto';
import { UpdateUserMovieReviewDto } from './dto/update-user_movie_review.dto';

@Injectable()
export class UserMovieReviewsService {
  create(createUserMovieReviewDto: CreateUserMovieReviewDto) {
    return 'This action adds a new userMovieReview';
  }

  findAll() {
    return `This action returns all userMovieReviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userMovieReview`;
  }

  update(id: number, updateUserMovieReviewDto: UpdateUserMovieReviewDto) {
    return `This action updates a #${id} userMovieReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMovieReview`;
  }
}

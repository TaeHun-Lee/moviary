import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMovieReviewDto } from './create-user_movie_review.dto';

export class UpdateUserMovieReviewDto extends PartialType(CreateUserMovieReviewDto) {}

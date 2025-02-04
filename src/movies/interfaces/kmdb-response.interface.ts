import { SearchMovieDto } from "../dto/search-movie.dto";

export interface KmdbResponse {
  Data: [{
    Result: SearchMovieDto[];
  }];
} 
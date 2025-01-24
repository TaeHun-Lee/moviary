import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Movie } from './entities/movie.entity';
import { SearchMovieDto } from './dto/search-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}
  private static url: string = 'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp';
  private static apiKey: string = process.env.ServiceKey;
  private static movies = [];
  
  /**
   * 영화 등록
   * @param createMovieDto 
   * @returns 
   */
  create(createMovieDto: CreateMovieDto) {
    MoviesService.movies.push(createMovieDto);
    return { message: 'Movie successfully added', movie: createMovieDto };
  }

  /**
   * 영화 전체 목록 조회
   * @returns 
   */
  findAll() {
    return MoviesService.movies;
  }

  /**
   * 영화 상세정보 조회
   * @param docId 
   * @returns 
   */
  findOne(docId: string) {
    return MoviesService.movies.find(movie => movie.DOCID === docId);
  }

  /**
   * 영화 검색
   * @param title 
   * @returns 
   */
  search(title: string): Observable<SearchMovieDto[]> {
    interface ApiResponse {
      Data: {
        Result: any[];
      }[];
    }
    const params = {
      collection: 'kmdb_new2',
      nation: '대한민국',
      ServiceKey: MoviesService.apiKey,
      query: title,
    };
    const mapToSearchMovieDto = (data: any): SearchMovieDto => ({
      DOCID: data.DOCID,
      movieId: data.movieId,
      movieSeq: data.movieSeq,
      title: data.title,
      titleEng: data.titleEng,
      titleOrg: data.titleOrg,
      titleEtc: data.titleEtc,
      prodYear: data.prodYear,
      nation: data.nation,
      company: data.company,
      runtime: data.runtime,
      rating: data.rating,
      genre: data.genre,
      repRlsDate: data.repRlsDate,
      posters: data.posters,
      stlls: data.stlls,
    });
    return this.httpService.get<ApiResponse>(MoviesService.url, { params }).pipe(
      map(response => response.data.Data[0].Result.map(mapToSearchMovieDto))
    );
  }

  /**
   * 영화 삭제
   * @param docId 
   * @returns 
   */
  remove(docId: string) {
    MoviesService.movies = MoviesService.movies.filter(movie => movie.DOCID !== docId);
    return { message: 'Movie successfully deleted', docId };
  }
}

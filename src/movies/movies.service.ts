import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import * as axios from '@nestjs/axios';
import { SearchMovieDto } from './dto/search-movie.dto';
import { KmdbResponse } from './interfaces/kmdb-response.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: axios.HttpService) {}
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
  async search(title: string): Promise<SearchMovieDto[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<KmdbResponse>(MoviesService.url, {
          params: {
            collection: 'kmdb_new2',
            nation: '대한민국',
            ServiceKey: MoviesService.apiKey,
            query: title
          }
        })
      );

      if (!data.Data[0].Result?.length) {
        throw new NotFoundException(`No movies found with title: ${title}`);
      }

      return data.Data[0].Result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to fetch movies: ${error.message}`);
    }
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

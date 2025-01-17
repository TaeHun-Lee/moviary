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
  
  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  findAll() {
    return `This action returns all movies`;
  }

  findOne(docId: string) {
    return `This action returns a #${docId} movie`;
  }

  search(title: string): Observable<SearchMovieDto[]> {
    interface ApiResponse {
      Data: {
        Result: any[];
      }[];
    }
    const params = {
      collection: 'kmdb_new2',
      nation: '대한민국',
      ServiceKey: process.env.ServiceKey,
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

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}

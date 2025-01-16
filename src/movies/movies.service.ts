import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Movie } from './entities/movie.entity';

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

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  search(title: string): Observable<AxiosResponse<Movie>> {
    const params = {
      collection: 'kmdb_new2',
      nation: '대한민국',
      ServiceKey: '',
      query: title,
    };
    return this.httpService.get(MoviesService.url, { params }).pipe(
      map(response => response.data)
    );
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}

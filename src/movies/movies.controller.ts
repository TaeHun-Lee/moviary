import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  /**
   * 영화 등록
   * @param createMovieDto 영화 생성 DTO
   * @returns 생성된 영화 정보
   */
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  /**
   * 영화 전체 목록 조회
   * @returns 전체 영화 목록
   */
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  /**
   * 영화 상세정보 조회
   * @param docId 영화 ID
   * @returns 영화 상세 정보
   */
  @Get(':docId')
  findOne(@Param('docId') docId: string) {
    return this.moviesService.findOne(docId);
  }

  /**
   * 영화 검색
   * @param title 영화 제목
   * @returns 검색된 영화 목록
   */
  @Get('search/:title')
  search(@Param('title') title: string) {
    return this.moviesService.search(title);
  }

  /**
   * 영화 삭제
   * @param docId 영화 ID
   * @returns 삭제 결과
   */
  @Delete(':docId')
  remove(@Param('docId') docId: string) {
    return this.moviesService.remove(docId);
  }
}

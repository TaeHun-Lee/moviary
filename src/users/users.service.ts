import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private currentId = 1;

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.id = this.currentId++;
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: number): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) return null;

    Object.assign(user, updateUserDto);
    return user;
  }

  async remove(id: number): Promise<void> {
    const index = this.users.findIndex(user => user.id === id);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import {
  createPostType,
  createProfiletype,
  createUserType,
  updateUserType,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private userList = [{ username: '1', passwword: 'devam@gmail.com' }];

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  getUser() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  getUserProfile() {
    return this.profileRepository.find();
  }

  updateUser(id: number, userDetails: updateUserType) {
    return this.userRepository.update({ id }, { ...userDetails });
  }

  createUser(userDetails: createUserType) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async createProfile(id: number, profileObj: createProfiletype) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('USer not found', HttpStatus.NOT_FOUND);
    }

    const newProfile = this.profileRepository.create(profileObj);
    const saveProfile = await this.profileRepository.save(newProfile);
    user.profile = saveProfile;
    return this.userRepository.save(user);
  }

  async createPost(id: number, postObj: createPostType) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('USer not found', HttpStatus.NOT_FOUND);
    }

    const newPost = this.postRepository.create({
      ...postObj,
      user,
    });

    return this.postRepository.save(newPost);
  }
}

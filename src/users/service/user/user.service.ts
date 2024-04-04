import { Injectable } from '@nestjs/common';
import { createUserType } from 'src/utils/types';

@Injectable()
export class UserService {
  private userList = [{ username: '1', email: 'devam@gmail.com' }];
  getUser() {
    return this.userList;
  }

  createUser(userDetails: createUserType) {
    console.log(userDetails, 'in services create');
    this.userList.push(userDetails);
    return this.userList;
  }
}

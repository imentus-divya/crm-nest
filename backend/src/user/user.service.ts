import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  UserUplaodData() {
    return `this action returns to the user upload data`;
  }
  UserDashboard() {
    return `this action returns to the user dashboard`;
  }
}

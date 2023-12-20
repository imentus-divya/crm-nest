import { Controller,Get,Post,Req,Body, HttpCode, HttpStatus ,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/entity/user.entity';
import { AuthGuard } from './auth.guard';
import { Request as ExpressRequest } from 'express'; 

@Controller()

export class AuthController 
{
constructor(private readonly authService:AuthService){}

@HttpCode(HttpStatus.OK)
@Post('/login')
async findAll(@Req() request: ExpressRequest): Promise<User[]> {
return this.authService.Login(request);
}

}

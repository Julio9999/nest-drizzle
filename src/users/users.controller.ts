import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/create-user-request';
import { CreateProfileRequest } from './dto/create-profile-request';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    getUsers(){
        return this.usersService.getUsers();
    }

    @Post('profile')
    createProfile(@Body() request: CreateProfileRequest){
        return this.usersService.createProfile(request)
    }

    @Post()
    createUser(@Body() request: CreateUserRequest){
        return this.usersService.createUser(request)   
    }
}

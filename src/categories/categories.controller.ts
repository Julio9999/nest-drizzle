import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Post()
    createCategory(@Body() request: {name: string}){
        return this.categoriesService.createCategory(request)
    }

    @Get()
    getCategories(){
        return this.categoriesService.getCategories()
    }

    @Post('post')
    addToPost(@Body() request: {postId: number, categoryId: number}){
        return this.categoriesService.addToPost(request);
    }

    
}

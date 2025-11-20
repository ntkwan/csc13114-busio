import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    Put,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Query } from '@nestjs/common';

@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({
        status: 201,
        description: 'User has been successfully created.',
        type: User,
    })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 409, description: 'User already exists.' })
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        description: 'List of all users.',
        type: [User],
    })
    @ApiQuery({
        name: 'is_deleted',
        required: false,
        type: Boolean,
        description:
            'Filter users by deletion status (true for deleted, false for active)',
    })
    findAll(@Query('is_deleted') isDeleted?: boolean): Promise<User[]> {
        return this.usersService.findAll(isDeleted);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiParam({
        name: 'id',
        description: 'User ID',
        type: 'string',
        format: 'uuid',
    })
    @ApiResponse({
        status: 200,
        description: 'User found.',
        type: User,
    })
    @ApiResponse({ status: 404, description: 'User not found.' })
    findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a user' })
    @ApiParam({
        name: 'id',
        description: 'User ID',
        type: 'string',
        format: 'uuid',
    })
    @ApiResponse({
        status: 200,
        description: 'User has been successfully updated.',
        type: User,
    })
    @ApiResponse({ status: 404, description: 'User not found.' })
    updateFull(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a user' })
    @ApiParam({
        name: 'id',
        description: 'User ID',
        type: 'string',
        format: 'uuid',
    })
    @ApiResponse({
        status: 200,
        description: 'User has been successfully updated.',
        type: User,
    })
    @ApiResponse({ status: 404, description: 'User not found.' })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user' })
    @ApiParam({
        name: 'id',
        description: 'User ID',
        type: 'string',
        format: 'uuid',
    })
    @ApiResponse({
        status: 200,
        description: 'User has been successfully deleted.',
    })
    @ApiResponse({ status: 404, description: 'User not found.' })
    remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.usersService.remove(id);
    }
}

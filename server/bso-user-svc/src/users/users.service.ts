import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        // Check if user with this ID already exists
        const existingUser = await this.userRepository.findOne({
            where: { id: createUserDto.id },
        });

        if (existingUser) {
            throw new ConflictException(
                `User with ID ${createUserDto.id} already exists`,
            );
        }

        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    async findAll(isDeleted: boolean = false): Promise<User[]> {
        return this.userRepository.find({
            where: { isDeleted },
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id, isDeleted: false },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id); // This will throw if user doesn't exist

        // Merge the updates
        Object.assign(user, updateUserDto);

        return await this.userRepository.save(user);
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        user.isDeleted = true;
        await this.userRepository.save(user);
    }
}

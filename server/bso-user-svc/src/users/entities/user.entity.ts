import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}
@Entity('users')
export class User {
    @ApiProperty({
        description: 'User ID inherited from auth service',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @PrimaryColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'User full name',
        example: 'John Doe',
    })
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @ApiProperty({
        description: 'User profile picture URL',
        example: 'https://example.com/avatar.jpg',
        required: false,
    })
    @Column({ type: 'varchar', length: 500, nullable: true })
    picture?: string;

    @ApiProperty({
        description: 'User gender',
        example: '1',
    })
    @Column({ type: 'enum', enum: gender, nullable: true })
    gender: gender;

    @ApiProperty({
        description: 'User date of birth',
        example: '1990-01-01',
    })
    @Column({ name: 'date_of_birth', type: 'date', nullable: true })
    dateOfBirth: Date;

    @ApiProperty({
        description: 'User creation timestamp',
        example: '2023-01-01T00:00:00.000Z',
    })
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty({
        description: 'User last update timestamp',
        example: '2023-01-01T00:00:00.000Z',
    })
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ApiProperty({
        description: 'Soft delete flag',
        example: false,
    })
    @Column({ name: 'is_deleted', type: 'boolean', default: false })
    isDeleted: boolean;
}

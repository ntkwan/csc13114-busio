import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { gender } from '../entities/user.entity';
import { IsDateString, IsEnum } from 'class-validator';

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['id'] as const),
) {
    @ApiProperty({
        description: 'User date of birth',
        example: '1990-01-01',
        required: false,
    })
    @IsDateString()
    dateOfBirth?: Date;

    @ApiProperty({
        description: 'User gender',
        example: 'male',
        required: false,
    })
    @IsEnum(gender)
    gender?: gender;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Isaias Oliveira',
  })
  name: string;

  @ApiProperty({
    example: 'isaias@email.com',
  })
  email: string;

  @ApiPropertyOptional({
    example: 'https://meusite.com/avatar.png',
    nullable: true,
  })
  avatarUrl?: string | null;

  @ApiProperty({
    example: '2026-03-17T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2026-03-17T12:00:00.000Z',
  })
  updatedAt: Date;
}
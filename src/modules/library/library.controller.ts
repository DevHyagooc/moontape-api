import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetCurrentUser } from 'src/common/decorators/getCurrentUserDecorator';
import { LibraryService } from './library.service';
import { LibraryResponseDto } from './dto/responses/libraryResponse.dto';

@ApiTags('Library')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @ApiOperation({ summary: 'Get authenticated user library summary' })
  @ApiOkResponse({ type: LibraryResponseDto })
  @Get()
  getLibrary(@GetCurrentUser('userId') userId: number) {
    return this.libraryService.getLibrary(userId);
  }
}
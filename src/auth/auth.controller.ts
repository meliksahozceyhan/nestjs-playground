import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { SkipAuth } from 'src/decorators/decorators'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  @Get('deneme')
  getDeneme() {
    return 'deneme'
  }
}

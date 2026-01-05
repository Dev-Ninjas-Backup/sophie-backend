import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Hello Sophie',
      health: {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
        version: process.env.npm_package_version || '1.0.0',
      },
      developer: {
        name: 'Shazen',
        role: 'Full Stack Developer',
        contact: 'shariyershazan1@gmail.com',
        github: 'https://github.com/shariyerShazan',
        message: 'Built with ❤️ by Shazen',
      },
    };
  }
}
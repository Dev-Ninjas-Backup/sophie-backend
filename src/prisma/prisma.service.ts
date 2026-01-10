import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  admin: PrismaClient['admin'];
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });
    super({ adapter });
  }
  async onModuleInit() {
    this.$connect();
    console.log('Prisma connected');
  }
  async onModuleDestroy() {
    this.$disconnect();
    console.log('Prisma disconnected');
  }
}

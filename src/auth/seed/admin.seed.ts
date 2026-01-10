/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaClient } from '@prisma/client';

import { Injectable, OnModuleInit } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  private prisma = new PrismaClient();
  async onModuleInit() {
    await this.seedAdmin();
  }

  async seedAdmin() {
    const adminEmail = 'talharris14@gmail.com';

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log('Admin already exists. Skipping seed.');
      return;
    }

    const hashedPassword = await bcrypt.hash('Admin123', 12);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    await this.prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('🚀 Admin seeded successfully!');
  }
}

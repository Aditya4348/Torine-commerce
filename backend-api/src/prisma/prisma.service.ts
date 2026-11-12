import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private pool: Pool;

  constructor(configService: ConfigService) {
    const connectionString = configService.get<string>('DATABASE_URL')?.trim();

    if (!connectionString) {
      throw new Error(
        'DATABASE_URL tidak ditemukan. Periksa file backend-api/.env.',
      );
    }

    let databaseUrl: URL;
    try {
      databaseUrl = new URL(connectionString);
    } catch {
      throw new Error('DATABASE_URL bukan URL koneksi PostgreSQL yang valid.');
    }

    if (
      !['postgres:', 'postgresql:'].includes(databaseUrl.protocol) ||
      !databaseUrl.password
    ) {
      throw new Error(
        'DATABASE_URL harus menggunakan PostgreSQL dan menyertakan password.',
      );
    }

    const pool = new Pool({
      connectionString,
    });

    const adapter = new PrismaPg(pool);

    super({ adapter });

    this.pool = pool;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}

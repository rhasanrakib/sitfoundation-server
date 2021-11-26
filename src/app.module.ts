import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntityModule } from './entity/entity.module';
import { SitfoundationModule } from './sitfoundation/sitfoundation.module';

@Module({
  imports: [
    SitfoundationModule,
    EntityModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host: process.env.HOST,
        port: 3306,
        username: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true, // shouldn't be synchronized as true in production - otherwise you can lose production data.
        extra: {
          connectionLimit: 10,
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { IncidentModule } from './incidents/incident.module';
import {WebsocketModule} from '@core/websockets/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    WebsocketModule,
    IncidentModule,
  ],
  controllers: [AppController]
})
export class AppModule {}

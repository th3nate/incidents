import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from './entities/incident.entity';
import { IncidentService } from './incident.service';
import { IncidentController } from './incident.controller';
import {WebsocketService} from '@core/websockets/websocket.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Incident])
    ],
    controllers: [IncidentController],
    providers: [IncidentService, WebsocketService]
})
export class IncidentModule {}

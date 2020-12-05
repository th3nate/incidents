import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Incident} from './entities/incident.entity';
import {IncidentDto} from './dto/incident.dto';
import {MappingHelper} from '@shared/helpers/mapping-helper';
import {isEqual, reduce} from 'lodash';
import {WebsocketService} from '@core/websockets/websocket.service';

const EVENT_NAME = 'incidents-updated';

@Injectable()
export class IncidentService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
    private readonly webSocketService: WebsocketService
  ) {}
  
  public async findById(incidentId: string): Promise<Incident> {
    const incident = await this.incidentRepository.findOne({
      where: {
        incidentId,
      },
    });
    
    if (!incident) {
      throw new NotFoundException(`Incident #${incidentId} not found`);
    }
    
    return incident;
  }
  
  public async findAll(): Promise<Incident[]> {
    const incident = await this.incidentRepository.find();
    
    if (!incident) {
      throw new NotFoundException(`Incidents not found`);
    }
    
    return incident;
  }
  
  public async create(incidentDto: IncidentDto): Promise<Incident> {
    try {
      const dateTime                 = new Date().getTime();
      const incidentEntity: Incident = MappingHelper.mapTo<IncidentDto, Incident>(incidentDto);
      incidentEntity.incidentId      = String(dateTime);
      incidentEntity.createdAt       = dateTime;
      incidentEntity.updatedAt       = dateTime;
      await this.webSocketService.emitMessage(EVENT_NAME, incidentEntity);
      const savedEntity =  await this.incidentRepository.save(incidentEntity);
      return savedEntity
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  
  public async updateIncidentById(id: string, incidentDto: IncidentDto): Promise<Incident> {
    try {
      const dateTime                 = new Date().getTime();
      const incidentEntity: Incident = MappingHelper.mapTo<IncidentDto, Incident>(incidentDto);
      const currentIncident          = await this.incidentRepository.findOne({incidentId: id});
      
      // TODO: add base class
      incidentEntity.name      = incidentDto.name;
      incidentEntity.status    = incidentDto.status;
      incidentEntity.country   = incidentDto.country;
      incidentEntity.priority  = incidentDto.priority;
      incidentEntity.updatedAt = dateTime;
      
      const diff = reduce(incidentEntity, function (result, value, key): any[] {
        return isEqual(value, currentIncident[key]) ?
          result : result.concat({key, value: currentIncident[key]});
      }, []);
      
      // TODO: Move diff to another collection
      const history: any[] = currentIncident.history || [];
      history.push(diff);
      
      incidentEntity.history = history;
      
      await this.incidentRepository.update({incidentId: id}, incidentEntity);
      const savedEntity = await this.incidentRepository.findOne({incidentId: id});
      await this.webSocketService.emitMessage(EVENT_NAME, savedEntity);
      return savedEntity;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  
}

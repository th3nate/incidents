import {Controller, Put, Get, Body, Res, Param, HttpStatus, NotFoundException, Post,} from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IIncident } from './interfaces/incident.interface';
import {IncidentDto} from './dto/incident.dto';
import {Incident} from '@app/incidents/entities/incident.entity';

@Controller('/api/incidents')
export class IncidentController {
  constructor(private readonly incidentsService: IncidentService) {}
  
  @Get('/')
  public async getIncidents(@Res() res): Promise<IIncident> {
    const incidents = await this.incidentsService.findAll();
    
    if (!incidents) {
      throw new NotFoundException('Incident does not exist!');
    }
    
    return res.status(HttpStatus.OK).json({
      incidents,
      status: 200,
    });
  }
  
  @Get('/:incidentId')
  public async getIncident(@Res() res, @Param('incidentId') incidentId: string ): Promise<IIncident> {
    const incident = await this.incidentsService.findById(incidentId);

    if (!incident) {
      throw new NotFoundException('Incident does not exist!');
    }

    return res.status(HttpStatus.OK).json({
      incident: incident,
      status: 200,
    });
  }

  @Post('/')
  public async createIncident(
    @Res() res,
    @Body() incidentDto: IncidentDto
  ): Promise<Incident> {
    try {
      await this.incidentsService.create(incidentDto);

      return res.status(HttpStatus.OK).json({
        message: 'Incident Updated successfully!',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Incident not updated!',
        status: 400,
      });
    }
  }
  
  @Put('/:incidentId')
  public async updateIncidentById(
    @Res() res,
    @Param('incidentId') incidentId: string,
    @Body() incidentDto: IncidentDto
  ): Promise<Incident> {
    try {
      const updatedIncident = await this.incidentsService.updateIncidentById(incidentId, incidentDto);
      // TODO: add types of return
      return res.status(HttpStatus.OK).json({
        message: 'Incident Updated successfully!',
        incident: updatedIncident,
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Incident not updated!',
        status: 400,
      });
    }
  }
}

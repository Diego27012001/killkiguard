import { Module } from '@nestjs/common';
import { IncidentsService } from './service/incident.service';
import { IncidentsController } from './controllers/incidents.controller';
import { Incident, IncidentSchema } from './schemas/incident.schemas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Incident.name, schema: IncidentSchema },
    ]),
  ],
  controllers: [IncidentsController],
  providers: [IncidentsService]
})
export class IncidentModule {}

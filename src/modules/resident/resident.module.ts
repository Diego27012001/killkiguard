import { Module } from '@nestjs/common';
import { ResidentService } from './services/resident.service';
import { ResidentsController } from './controllers/resident.controller';
import { Resident, ResidentSchema } from './schemas/resident.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './schemas/contact.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Resident.name, schema: ResidentSchema },
      { name: Contact.name, schema: ContactSchema}
    ]),
  ],
  controllers: [ResidentsController],
  providers: [ResidentService]
})
export class ResidentModule {}
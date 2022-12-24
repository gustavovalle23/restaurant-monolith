import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationResolver } from './reservation.resolver';

@Module({
  providers: [ReservationResolver, ReservationService]
})
export class ReservationModule {}

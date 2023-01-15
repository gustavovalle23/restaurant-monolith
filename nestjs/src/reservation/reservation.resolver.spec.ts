import { Test, TestingModule } from '@nestjs/testing';
import { ReservationResolver } from './reservation.resolver';
import { ReservationService } from './reservation.service';

describe('ReservationResolver', () => {
  let resolver: ReservationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationResolver, ReservationService],
    }).compile();

    resolver = module.get<ReservationResolver>(ReservationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

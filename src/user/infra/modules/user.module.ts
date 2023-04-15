import { Module } from '@nestjs/common';
import { UserResolver } from '../presentation/user.resolver';
import { UserService } from '../gateways/user.service';

@Module({
  providers: [UserResolver, UserService],
})
export class UserModule {}

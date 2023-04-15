import { Module } from '@nestjs/common';
import { ReservationModule } from './reservation/reservation.module';
import { RecipeModule } from './recipe/recipe.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/infra/modules/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuItemsModule } from './menu-items/infra/modules/menu-items.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [UserModule, OrderModule, RecipeModule, ReservationModule],
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),

    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ReservationModule,
    RecipeModule,
    OrderModule,
    UserModule,
    MenuItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

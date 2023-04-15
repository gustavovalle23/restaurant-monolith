import { Module } from '@nestjs/common';
import { ReservationModule } from './reservation/reservation.module';
import { RecipeModule } from './recipe/recipe.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/infra/modules/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { MenuItemsModule } from './menu-items/infra/modules/menu-items.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [UserModule, OrderModule, RecipeModule, ReservationModule],
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
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

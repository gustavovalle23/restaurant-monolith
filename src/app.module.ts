import { Module } from '@nestjs/common';
import { ReservationModule } from './reservation/reservation.module';
import { RecipeModule } from './recipe/recipe.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [AuthModule, OrderModule, RecipeModule, ReservationModule],
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),

    MongooseModule.forRoot('mongodb://localhost/nest'),
    ReservationModule,
    RecipeModule,
    OrderModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

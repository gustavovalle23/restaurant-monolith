import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class MenuItem {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Recipe {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReservationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

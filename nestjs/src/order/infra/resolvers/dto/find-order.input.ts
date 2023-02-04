import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class FindAllInput {
  @Field()
  skip: number;

  @Field()
  limit: number;

}

import { CreateRecipeInput } from './create-recipe.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRecipeInput extends PartialType(CreateRecipeInput) {
  @Field(() => Int)
  id: number;
}

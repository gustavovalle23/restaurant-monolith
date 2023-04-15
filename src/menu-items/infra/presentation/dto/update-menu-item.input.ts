import { CreateMenuItemInput } from './create-menu-item.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMenuItemInput extends PartialType(CreateMenuItemInput) {
  @Field(() => Int)
  id: number;
}

import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeResolver } from './recipe.resolver';

@Module({
  providers: [RecipeResolver, RecipeService]
})
export class RecipeModule {}

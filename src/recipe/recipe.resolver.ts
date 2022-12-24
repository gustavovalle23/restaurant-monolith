import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RecipeService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';

@Resolver(() => Recipe)
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Mutation(() => Recipe)
  createRecipe(@Args('createRecipeInput') createRecipeInput: CreateRecipeInput) {
    return this.recipeService.create(createRecipeInput);
  }

  @Query(() => [Recipe], { name: 'recipe' })
  findAll() {
    return this.recipeService.findAll();
  }

  @Query(() => Recipe, { name: 'recipe' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.recipeService.findOne(id);
  }

  @Mutation(() => Recipe)
  updateRecipe(@Args('updateRecipeInput') updateRecipeInput: UpdateRecipeInput) {
    return this.recipeService.update(updateRecipeInput.id, updateRecipeInput);
  }

  @Mutation(() => Recipe)
  removeRecipe(@Args('id', { type: () => Int }) id: number) {
    return this.recipeService.remove(id);
  }
}

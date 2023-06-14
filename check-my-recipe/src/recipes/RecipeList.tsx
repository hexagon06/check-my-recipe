import { Referenced } from "../types";
import { Recipe } from "../types/recipe";

type RecipeListProps = { recipes: Referenced<Recipe>[] };
export function RecipeList({ recipes }: RecipeListProps) {
  return (
    <div className="grid grid-cols-1">
      {recipes.map((recipe) => (
        <div className="flex" key={recipe.id}>
          {recipe.name}
        </div>
      ))}
    </div>
  );
}

import { Referenced } from "../types";
import { Recipe } from "../types/recipe";
import { RecipeList } from "./RecipeList";

export function RecipesView() {
  const recipes: Referenced<Recipe>[] = [
    { id: "0", name: "sauce" },
    { id: "1", name: "salsa" },
    { id: "2", name: "pancakes" },
    { id: "3", name: "falafel" },
  ];

  return (
    <div className="w-full h-full overflow-auto bg-green-900">
      <RecipeList recipes={recipes} />
    </div>
  );
}

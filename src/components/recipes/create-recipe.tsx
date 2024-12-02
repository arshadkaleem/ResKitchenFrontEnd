'use client';
import React, { useState, useEffect } from 'react';
import { RecipesService } from '@/services/recipes.service';
import { useRouter } from 'next/navigation';
import type { Recipe } from '@/types/recipe.type';
import type { RecipeItem } from '@/types/recipeItem.type';  
import type { Item } from '@/types/item.type';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ItemsService } from '@/services/items.service';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
const RecipeCreate = () => {
  const [recipe, setRecipe] = useState<Recipe>({
    recipeId: 0,
    recipeName: '',
    recipeDescription: '',
    recipeItems: []
  });

  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadItems = async () => {
      const response = await ItemsService.getItems();

      const itemData = Array.isArray(response) 
              ? response 
              : response?.data 
              ? response.data 
              : [];      
      setItems(itemData);
    };

    loadItems();
  }, []);

  const handleRecipeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleRecipeItemChange = (index: number, field: string, value: any) => {
    const newRecipeItems = [...recipe.recipeItems];
    newRecipeItems[index] = { ...newRecipeItems[index], [field]: value };
    setRecipe({ ...recipe, recipeItems: newRecipeItems });
  };

  const addRecipeItem = () => {
    setRecipe({
      ...recipe,
      recipeItems: [...recipe.recipeItems, { recipeItemId: 0, itemId: 0, itemName: '', quantityPerPortion: 0 }]
    });
  };

  const removeRecipeItem = (index: number) => {
    const newRecipeItems = recipe.recipeItems.filter((_, i) => i !== index);
    setRecipe({ ...recipe, recipeItems: newRecipeItems });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    alert(JSON.stringify(recipe));
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await RecipesService.createRecipe(recipe);
      router.push('/recipes'); // Redirect to recipes list after creation
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while creating the recipe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Recipe</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="recipeName">Name</Label>
          <Input
            type="text"
            id="recipeName"
            name="recipeName"
            value={recipe.recipeName}
            onChange={handleRecipeChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="recipeDescription">Description</Label>
          <textarea
            id="recipeDescription"
            name="recipeDescription"
            value={recipe.recipeDescription || ''}
            onChange={handleRecipeChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <h2 className="text-xl font-bold mb-2">Recipe Items</h2>
        {recipe.recipeItems.map((item, index) => (
          <div key={index} className="mb-4 p-4 border rounded flex justify-between items-center">
            <div className="mb-4">
              <Label htmlFor={`item-${index}`}>Item</Label>
              <select id={`item-${index}`} name={`item-${index}`} value={item.itemId} onChange={(e) => handleRecipeItemChange(index, 'itemId', parseInt(e.target.value))} required className='block'>
                <option value="" disabled>Select an item</option>
                {items.map((item) => (
                  <option key={item.itemId} value={item.itemId}>
                    {item.itemName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <Label htmlFor={`quantity-${index}`}>Quantity Per Portion</Label>
              <Input
                type="number"
                id={`quantity-${index}`}
                name={`quantity-${index}`}
                value={item.quantityPerPortion}
                onChange={(e) => handleRecipeItemChange(index, 'quantityPerPortion', parseFloat(e.target.value))}
                required
              />
            </div>

            <Button type="button" onClick={() => removeRecipeItem(index)}>
              Remove Item
            </Button>
          </div>
        ))}

        <Button type="button" onClick={addRecipeItem}>
          Add Recipe Item
        </Button>

        <div className="flex justify-end mt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Recipe'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RecipeCreate;

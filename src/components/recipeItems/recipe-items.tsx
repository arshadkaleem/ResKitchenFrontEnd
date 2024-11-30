'use client';
import React, { useState, useEffect } from 'react';
import { RecipesService } from '@/services/recipes.service';
import type { Recipe } from '@/types/recipe.type';
import { useRouter } from 'next/router';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const RecipeItemList = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadRecipe = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await RecipesService.getRecipeById(Number(id));
        console.log('Raw API response:', response); // Debug log

        setRecipe(response);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred while fetching the recipe');
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  if (isLoading) {
    return <div>Loading recipe items...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>No recipe found.</div>;
  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{recipe.recipeName}</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity Per Portion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipe.recipeItems?.map((item) => (
              <TableRow key={item.recipeItemId} className="hover:bg-muted/50 cursor-pointer">
                <TableCell className="font-medium">{item.itemName}</TableCell>
                <TableCell>{item.quantityPerPortion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default RecipeItemList;

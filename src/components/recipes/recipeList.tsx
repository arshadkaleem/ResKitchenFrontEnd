'use client';
import React, { useState, useEffect } from 'react';
import { RecipesService } from '@/services/recipes.service';
import type { Recipe } from '@/types/recipe.type';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await RecipesService.getRecipes();
        console.log('Raw API response:', response); // Debug log

        const recipeData = Array.isArray(response) 
          ? response 
          : response?.data 
          ? response.data 
          : [];

        console.log('Processed recipe data:', recipeData); // Debug log
        setRecipes(recipeData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred while fetching recipes');
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (isLoading) {
    return <div>Loading recipes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Recipe List</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recipe Name</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipes.map((recipe) => (
              <TableRow key={recipe.recipeId} className="hover:bg-muted/50 cursor-pointer">
                <Link href={`/recipes/${recipe.recipeId}`} className="contents">
                  <TableCell className="font-medium">{recipe.recipeName}</TableCell>
                  <TableCell>{recipe.recipeDescription}</TableCell>
                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default RecipeList;

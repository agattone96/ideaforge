// hooks/useSortedIdeas.ts
import { useMemo } from 'react';
import { Idea } from '../types';

export type SortOption = 'updatedAt_desc' | 'title_asc' | 'createdAt_asc' | 'createdAt_desc';

export const useSortedIdeas = (ideas: Idea[], sortOption: SortOption): Idea[] => {
  return useMemo(() => {
    const sorted = [...ideas];
    switch (sortOption) {
      case 'title_asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'createdAt_asc':
        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'createdAt_desc':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'updatedAt_desc':
      default:
        sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
    }
    return sorted;
  }, [ideas, sortOption]);
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Route = Database['public']['Tables']['routes']['Row'];
type RouteInsert = Database['public']['Tables']['routes']['Insert'];

export function useRoutes() {
  const queryClient = useQueryClient();

  const routes = useQuery({
    queryKey: ['routes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('routes')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const addRoute = useMutation({
    mutationFn: async (newRoute: RouteInsert) => {
      const { data, error } = await supabase
        .from('routes')
        .insert(newRoute)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] });
    },
  });

  const updateRoute = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Route> & { id: string }) => {
      const { data, error } = await supabase
        .from('routes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] });
    },
  });

  const deleteRoute = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('routes')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] });
    },
  });

  return {
    routes: routes.data ?? [],
    isLoading: routes.isLoading,
    error: routes.error,
    addRoute,
    updateRoute,
    deleteRoute,
  };
}
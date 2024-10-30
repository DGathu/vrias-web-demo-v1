import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type DefectMarker = Database['public']['Tables']['defect_markers']['Row'];
type DefectMarkerInsert = Database['public']['Tables']['defect_markers']['Insert'];

export function useDefectMarkers(routeId: string) {
  const queryClient = useQueryClient();

  const markers = useQuery({
    queryKey: ['defect_markers', routeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('defect_markers')
        .select('*')
        .eq('route_id', routeId)
        .order('time', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!routeId,
  });

  const addMarker = useMutation({
    mutationFn: async (newMarker: DefectMarkerInsert) => {
      const { data, error } = await supabase
        .from('defect_markers')
        .insert(newMarker)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['defect_markers', routeId] });
    },
  });

  const deleteMarker = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('defect_markers')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['defect_markers', routeId] });
    },
  });

  return {
    markers: markers.data ?? [],
    isLoading: markers.isLoading,
    error: markers.error,
    addMarker,
    deleteMarker,
  };
}
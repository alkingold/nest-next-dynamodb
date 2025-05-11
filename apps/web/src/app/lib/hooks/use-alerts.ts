import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Alert,
  CreateAlertDto,
  UpdateAlertDto,
} from "@/app/domain/alert/alert";
import {
  createAlert,
  deleteAlert,
  fetchAlertById,
  fetchAlerts,
  updateAlert,
} from "@/app/infra/api/alert-api";

export function useAlerts() {
  return useQuery<Alert[]>({
    queryKey: ['alerts'],
    queryFn: fetchAlerts,
  });
}

export function useAlert(id: string) {
  return useQuery({
    queryKey: ['alerts', id],
    queryFn: () => fetchAlertById(id),
    enabled: !!id,
  });
}

export function useCreateAlert(options?: UseMutationOptions<Alert, Error, CreateAlertDto>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAlertDto) => createAlert(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['alerts'],
      });
    },
    ...options,
  });
}

type UpdateAlertParams = {
  id: string;
  data: UpdateAlertDto,
};

export function useUpdateAlert(options?: UseMutationOptions<Alert, Error, UpdateAlertParams>) {
  const queryClient = useQueryClient();
  return useMutation<Alert, Error, UpdateAlertParams>({
    mutationFn: ({ id, data }: {id: string; data: UpdateAlertDto}) => updateAlert(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['alerts'],
      });
    },
    ...options,
  });
}

export function useDeleteAlert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAlert(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['alerts'],
      });
    },
  });
}

import { getColumn } from "@/components/dashboard/column/api/column";
import { Column } from "@/types/column";
import { useCallback, useEffect, useState } from "react";

export function useColumn(dashboardId: number | null) {
  const [columns, setColumns] = useState<Column[] | null>(null);
  const [isLoadingColumns, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadColumns = useCallback(
    async ({ loading }: { loading: boolean } = { loading: true }) => {
      setIsLoading(loading);
      setError(null);

      try {
        if (!dashboardId) {
          setColumns(null);
          return;
        }

        const res = await getColumn({ dashboardId });
        setColumns(res?.data ?? []);
      } catch (e) {
        console.error(e);
        setError(e as Error);
        setColumns(null);
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    [dashboardId]
  );

  useEffect(() => {
    loadColumns();
  }, [loadColumns]);

  return {
    columns,
    isLoadingColumns,
    error,
    reloadColumns: loadColumns,
  };
}

import { useQuery } from "@tanstack/react-query";

function ResultGuard<T>({
  key,
  fn,
  select,
}: {
  key: string;
  fn: () => Promise<any>;
  select?: (item: T) => void;
}) {
  if (select) return useQuery({ queryKey: [`${key}`], queryFn: fn, select });
  else return useQuery({ queryKey: [`${key}`], queryFn: fn });
}

export default ResultGuard;

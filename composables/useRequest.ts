import type { UseFetchOptions } from "#app";
export interface IRequestRes<DataT> {
  code: number;
  data?: DataT;
  msg?: string;
}

const useRequest = <ResT = unknown>(url: string, options?: UseFetchOptions<ResT>) => {
  const runtimeConfig = useRuntimeConfig();
  const defaultOptions: UseFetchOptions<unknown> = {
    baseURL: runtimeConfig.public.apiBaseURL,
    /**
     * 此处添加认证
    onRequest({ options: { headers } }) {},
    */
  };
  return useFetch<ResT>(url, {
    ...defaultOptions,
    ...options,
  } as any);
};

export default useRequest;

import type { UseFetchOptions } from "#app";

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

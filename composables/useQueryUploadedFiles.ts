import type { IUploadedFilesQuery, IUploadedFile } from '~/types'
import type { IResponseDataList } from "~/types/request";

export const useQueryUploadedFiles = (query:IUploadedFilesQuery = {
  page: 1,
  pageSize: 10,
}) => {
  return useRequest<IResponseDataList<IUploadedFile>>('/file/list', {
    query,
  });
}

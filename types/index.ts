import type { IRequestList } from './request';

/**
 * 数据记录
 */
export interface IDataRecord {
  /**
   * 记录唯一标识
   */
  id: number;
  /**
   * 记录创建时间
   */
  createdAt: string;
  /**
   * 记录更新时间
   */
  updatedAt: string;
}

/**
 * 板块分类记录
 */
export interface ICategory extends IDataRecord {
  /**
   * 分类标识
   */
  category: string;
  /**
   * 分类名称
   */
  name: string;
}

/**
 * 发布的文章记录（产品/新闻/简介等）
 */
export interface IArticle extends IDataRecord {
	class: number;
	title: string;
	content: string;
	key: string;
	category: string;
	brief: string;
	cover: string;
}

/**
 * 公司简介
 */
export type IBrief = Pick<IArticle, 'id' | 'category' | 'title' | 'cover' | 'brief' | 'content'>;

export type IArticleQuery = Partial<Pick<IArticle, 'id' | 'title'>>

/**
 * 上传的文件记录
 */
export interface IUploadedFile extends IDataRecord {
  /** 文件超链接地址 */
	url: string;
  /** 文件分类标识 */
	key: string;
  /** 文件备注 */
	memo: string;
  /** 文件名 */
	name: string;
}

export type IUploadedFilesQuery = Partial<Pick<IUploadedFile & IRequestList, 'key' | 'memo' | 'page' | 'pageSize'>>;

export interface IContactInfomation {
  company: string;
  phone: string;
  address: string;
  bMapLink: string;
  website: string;
}

export interface ISuggestion {
  content: string;
  name: string;
  email: string;
  phone: string;
}

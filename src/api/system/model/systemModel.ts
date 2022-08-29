import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type AccountParams = BasicPageParams & {
  mobile?: string;
  nickname?: string;
};

export type AcconutParamsAdd = {
  nickname: string;
  username: string;
  password: string;
  role_id: number;
  mobile: string;
};

export type AcconutParamsEdit = AcconutParamsAdd & {
  id: number;
};

export type RoleParams = {
  roleName?: string;
  status?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type RoleParamsAdd = {
  name: string;
  desc: string;
  menu_ids: Array<number>;
  status: number;
};

export type RoleParamsEdit = RoleParamsAdd & {
  id: string;
};

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParamsAdd = {
  type: number;
  pid: number;
  name: string;
  icon?: string;
  auth_key?: string;
  compo?: string;
  route?: string;
  sort?: number;
  status?: number;
};

export type MenuParamsEdit = MenuParamsAdd & {
  id: number;
};

export type Ids = {
  ids: Array<number>;
};

export interface RoleInfo {
  id: number;
  name: string;
  status: number;
  is_preset: boolean;
}

export interface AccountListItem {
  id: number;
  nickname: string;
  username: string;
  mobile: string;
  avatar: string;
  role: RoleInfo;
  role_id: number;
  created_at: string;
  updated_at: string;
  remark: string;
  is_preset: boolean;
}

export interface DeptListItem {
  id: string;
  orderNo: string;
  createTime: string;
  remark: string;
  status: number;
}

export interface MenuListItem {
  id: number;
  type: number;
  pid: number;
  name: string;
  icon: string;
  auth_key: string;
  compo: string;
  sort: number;
  status: number;
  created_at: string;
  updated_at: string;
  children: MenuListItem;
}

export interface RoleListItem {
  id: number;
  name: string;
  roleValue: string;
  status: number;
  desc: string;
  is_super: boolean;
  menu_ids: string[];
  updated_at: string;
  created_at: string;
}

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuEditGetResultModel = BasicFetchResult<MenuParamsEdit>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type MenuListGetResultModel = MenuListItem[];

export type RoleListGetResultModel = RoleListItem[];

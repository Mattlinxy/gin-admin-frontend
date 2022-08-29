import {
  AccountParams,
  AcconutParamsAdd,
  AcconutParamsEdit,
  RoleParamsEdit,
  DeptListItem,
  MenuParamsEdit,
  RoleParams,
  RolePageParams,
  RoleParamsAdd,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
  MenuParamsAdd,
  Ids,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/v1/admin/admins/list',
  AccountAdd = '/v1/admin/admins/create',
  AccountEdit = '/v1/admin/admins/update',
  AccountDel = '/v1/admin/admins/delete',
  IsAccountExist = '/system/accountExist',
  DeptList = '/system/getDeptList',
  setRoleStatus = '/v1/admin/roles/set_status',
  MenuList = '/v1/admin/menus/list',
  MenuEdit = '/v1/admin/menus/update',
  MenuDel = '/v1/admin/menus/delete',
  MenuAdd = '/v1/admin/menus/create',
  RolePageList = '/v1/admin/roles/list',
  RoleAdd = '/v1/admin/roles/create',
  RoleEdit = '/v1/admin/roles/update',
  RoleDel = '/v1/admin/roles/delete',
  GetAllRoleList = '/v1/admin/widgets/list_role',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.post<AccountListGetResultModel>(
    { url: Api.AccountList, params },
    { errorMessageMode: 'none' },
  );

export const doAccountEdit = (params: AcconutParamsEdit) =>
  defHttp.post({ url: Api.AccountEdit, params });

export const doAccountAdd = (params: AcconutParamsAdd) =>
  defHttp.post({ url: Api.AccountAdd, params });

export const doAccountDel = (params: Ids) => defHttp.post({ url: Api.AccountDel, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.post<RolePageListGetResultModel>(
    { url: Api.RolePageList, params },
    { errorMessageMode: 'none' },
  );

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.post<RoleListGetResultModel>(
    { url: Api.GetAllRoleList, params },
    { errorMessageMode: 'none' },
  );

export const setRoleStatus = (id: number, status: number) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } }, { errorMessageMode: 'none' });

export const doRoleEdit = (params: RoleParamsEdit) => defHttp.post({ url: Api.RoleEdit, params });

export const doRoleAdd = (params: RoleParamsAdd) => defHttp.post({ url: Api.RoleAdd, params });

export const doRoleDel = (params: Ids) => defHttp.post({ url: Api.RoleDel, params });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });

export const getMenuList = () =>
  defHttp.post<MenuListGetResultModel>({ url: Api.MenuList }, { errorMessageMode: 'none' });

export const doMenuEdit = (params: MenuParamsEdit) => defHttp.post({ url: Api.MenuEdit, params });

export const doMenuAdd = (params: MenuParamsAdd) => defHttp.post({ url: Api.MenuAdd, params });

export const doMenuDel = (params: Ids) => defHttp.post({ url: Api.MenuDel, params });

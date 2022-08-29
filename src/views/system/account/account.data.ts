import { getAllRoleList } from '/@/api/system/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 120,
  },
  {
    title: '角色',
    dataIndex: 'role_id',
    width: 200,
    customRender: ({ record }) => {
      return h('span', record.role.name);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    helpMessage: '创建后将作为登录账号，无法进行修改',
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
    ],
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
  },
  {
    label: '角色',
    field: 'role_id',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'name',
      valueField: 'id',
    },
    required: true,
  },
  {
    field: 'mobile',
    label: '手机号',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
  },
];

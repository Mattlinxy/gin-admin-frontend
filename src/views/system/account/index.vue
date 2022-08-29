<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <!-- <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" /> -->
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button v-auth="'ADMIN_CREATE'" type="primary" @click="handleCreate">新增账号</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            // {
            //   icon: 'clarity:info-standard-line',
            //   tooltip: '查看用户详情',
            //   onClick: handleView.bind(null, record),
            // },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑用户资料',
              onClick: handleEdit.bind(null, record),
              auth: 'ADMIN_UPDATE',
              ifShow: !record.is_preset,
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除此账号',
              auth: 'ADMIN_DELETE',
              ifShow: !record.is_preset,
              popConfirm: {
                title: '是否确认删除',
                placement: 'left',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getAccountList, doAccountDel } from '/@/api/system/system';
  import { PageWrapper } from '/@/components/Page';
  // import DeptTree from './DeptTree.vue';

  import { useModal } from '/@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'AccountManagement',
    components: { BasicTable, PageWrapper, AccountModal, TableAction },
    setup() {
      const go = useGo();
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload }] = useTable({
        title: '账号列表',
        api: getAccountList,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          console.log('handleSearchInfoFn', info);
          return info;
        },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          auth: ['ADMIN_UPDATE', 'ADMIN_DELETE'],
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await doAccountDel({ ids: [record.id] });
        reload();
      }

      function handleSuccess() {
        reload();
      }

      function handleSelect(deptId = '') {
        searchInfo.deptId = deptId;
        reload();
      }

      function handleView(record: Recordable) {
        go('/system/account_detail/' + record.id);
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        handleView,
        searchInfo,
      };
    },
  });
</script>

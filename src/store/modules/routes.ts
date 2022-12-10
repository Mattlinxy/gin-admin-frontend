import type { AppRouteRecordRaw, AsyncRoutes } from '/@/router/types';
import { defineStore } from 'pinia';
import { toRaw } from 'vue';
import { useUserStore } from '/@/store/modules/user';
import { store } from '/@/store';

interface RouteState {
  routes: AsyncRoutes[];
  asyncRoutes: AppRouteRecordRaw[];
  permCode: string[];
}

export const useRouteStore = defineStore({
  id: 'app-routes',
  state: (): RouteState => ({
    // 后台获取菜单权限信息
    routes: [],
    // 菜单列表
    asyncRoutes: [],
    // 按钮权限
    permCode: [],
  }),
  getters: {
    getRoutes(): AsyncRoutes[] {
      return this.routes;
    },
    getAsyncRoutesList(): AppRouteRecordRaw[] {
      return this.asyncRoutes;
    },
    getPermCode(): string[] {
      return this.permCode;
    },
  },
  actions: {
    setRouteName(routeName: string): string {
      return routeName.replace(/\//g, '').replace(/^\S/, (s) => s.toUpperCase());
    },
    // 多级菜单, 根据项目需求选择二级还是多级菜单
    // setRedirectPath(asyncRoutes: AsyncRoutes[], route: string): string[] | undefined {
    //   for (const v of asyncRoutes) {
    //     if (v.route === route) {
    //       return [v.route];
    //     }
    //     if (v.children) {
    //       const filterRoute = this.setRedirectPath(v.children, route);
    //       if (filterRoute) {
    //         return filterRoute && [v.route, ...filterRoute];
    //       }
    //     }
    //   }
    // },
    // 二级菜单
    setRedirectPath(asyncRoutes: AsyncRoutes): string | undefined {
      if (asyncRoutes.children?.length > 0) {
        return asyncRoutes.route + '/' + asyncRoutes.children[0].route;
      }
      return undefined;
    },
    getAsyncRoutes(asyncRoutes: AsyncRoutes[]): AppRouteRecordRaw[] {
      const routeMap: AppRouteRecordRaw[] = [];
      asyncRoutes.forEach((item) => {
        const temp: AppRouteRecordRaw = {
          path: item.route,
          name: this.setRouteName(item.route),
          component: item.compo,
          meta: {
            title: item.name,
            icon: item.icon,
          },
          // redirect: this.setRedirectPath(this.getRoutes, item.children?.[0].route)?.join('/'),
          redirect: this.setRedirectPath(item),
          children: [],
        };
        if (item.children?.length > 0) {
          temp.children = this.getAsyncRoutes(item.children);
        }
        routeMap.push(temp);
      });
      return routeMap;
    },
    async getPermDetail(): Promise<void> {
      const userStore = useUserStore();
      const { menu_list, btn_list } = toRaw(userStore.getUserInfo);
      this.routes = menu_list;
      this.asyncRoutes = this.getAsyncRoutes(menu_list);
      this.permCode = btn_list?.map((item) => item.auth_key);
    },
  },
});

export function useRouteStoreWithOut() {
  return useRouteStore(store);
}

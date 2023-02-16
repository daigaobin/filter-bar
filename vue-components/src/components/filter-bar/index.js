/*
 * @Author: 牧鱼
 * @Date: 2023-02-15 16:27:24
 * @LastEditTime: 2023-02-15 16:28:33
 * @LastEditors: 牧鱼
 * @Description: 搜索栏
 * @FilePath: \组件库\vue-components\src\components\filter-bar\index.js
 */

import FilterBar from "./src/main.vue";

/* istanbul ignore next */
FilterBar.install = function (Vue) {
  Vue.component(FilterBar.name, FilterBar);
};

export default FilterBar;

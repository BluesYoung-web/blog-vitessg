/*
 * @Author: zhangyang
 * @Date: 2022-01-18 14:46:10
 * @LastEditTime: 2022-01-21 14:21:59
 * @Description: 
 */
import { defineComponent } from 'vue';
import { useDocsStore } from '~/stores/docs';
export default defineComponent({
  setup() {
    const { allDocs } = useDocsStore();
    return () => (
      <div class="bg-red-500">
        <h1>当前目录下的文章：</h1>
        { allDocs.map((item) => <p>{item.title}</p>) }
      </div>
    )
  }
})
/*
 * @Author: zhangyang
 * @Date: 2022-01-18 14:46:10
 * @LastEditTime: 2022-01-18 15:30:52
 * @Description: 
 */
import { defineComponent } from 'vue';
import { useDocsStore } from '~/stores/docs';
export default defineComponent({
  setup() {
    const { allDocs } = useDocsStore();
    return () => (
      <>
        <h1>当前目录下的文章：</h1>
        { allDocs.map((item) => <p>{item.title}</p>) }
      </>
    )
  }
})
/*
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-01-18 15:21:38
 * @Description: 
 */
import { createPinia } from 'pinia';
import type { UserModule } from '~/types';

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ isClient, initialState, app }) => {
  const pinia = createPinia();
  app.use(pinia);
  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
  if (isClient){
    pinia.state.value = (initialState.pinia) || {};
  } else {
    initialState.pinia = pinia.state.value;
  }
}

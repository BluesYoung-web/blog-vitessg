<!--
 * @Author: zhangyang
 * @Date: 2022-01-20 14:33:40
 * @LastEditTime: 2022-02-08 14:51:08
 * @Description: 文章目录
-->
<script lang="ts" setup>
import { useDocsStore } from '~/stores/docs';
import { DocIndexItem } from '~/types';
const { t } = useI18n();
const router = useRouter();
const { docTree, allDocs } = useDocsStore();
const pattern = ref('');

const jump = (_: any, [v , ...__]: DocIndexItem[]) => {
  if (!v.children) {
    router.push(v.path as string);
  }
};
</script>

<template>
  <div class="main">
    <NCard hoverable>
      <div class="container">
        <p class="title">{{ `${t('intro.doc_toc')}(${allDocs.length})` }}</p>
        <div class="data">
          <n-space vertical :size="12" class="w-80">
            <n-input v-model:value="pattern" :placeholder="t('intro.search')" />
            <n-tree
              :pattern="pattern"
              :data="docTree"
              block-line
              class="max-h-120 overflow-auto"
              :on-update:selected-keys="jump"
            />
          </n-space>
        </div>
      </div>
    </NCard>
  </div>
</template>

<style lang="scss" scoped>
.main {
  @apply w-80;
  .container {
    @apply flex flex-col justify-center items-center;

    .title {
      @apply text-lg font-bold my-1;
    }

    .data {
      @apply flex justify-around w-full my-4;
    }
  }
}
</style>
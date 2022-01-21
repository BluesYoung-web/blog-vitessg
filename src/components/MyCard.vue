<!--
 * @Author: zhangyang
 * @Date: 2022-01-20 14:33:40
 * @LastEditTime: 2022-01-21 15:26:57
 * @Description: 个人卡片
-->
<script lang="ts" setup>
import { isClient } from '@vueuse/core';
import { useDocsStore } from '~/stores/docs';
const { t, locale } = useI18n();
const { allDocs, allDirs } = useDocsStore();
const repos = ref(0);
const mail_addr = computed(() => t('nav.mail_addr').replace('&#64;', '@'));
const sendMail = () => {
  const a = document.createElement('a');
  a.href = mail_addr.value;
  a.click();
};
isClient && (async () => {
  const res = await fetch(t('intro.repos_api'));
  repos.value = +(res.headers.get('total_count') ?? 0);
})();
</script>

<template>
  <div class="main">
    <NCard hoverable>
      <div class="container">
        <NImage src="/img/lufei_siwangningshi.jpg" :width="120" class="img" />
        <p class="title">{{ t('intro.anthor') }}</p>
        <p class="intro" :class="[locale === 'en' ? 'indent' : '']">{{ t('intro.say') }}</p>
        <!-- <p class="nums">{{ `${t('intro.nums')} ：${allDocs.length}` }}</p> -->
        <div class="data">
          <NStatistic :label="t('intro.nums')" :value="allDocs.length" />
          <NStatistic :label="t('intro.classess')" :value="allDirs.length" />
          <NStatistic :label="t('intro.repos')" :value="repos" />
        </div>
        <button class="btn" :title="mail_addr" @click="sendMail">
          <mdi-light-email class="mr-1" />
          {{ t('nav.mail') }}
        </button>
      </div>
    </NCard>
  </div>
</template>

<style lang="scss" scoped>
.main {
  @apply w-80;
  .container {
    @apply flex flex-col justify-center items-center;

    .img {
      @apply rounded-full transform hover:rotate-360 transition duration-1000;
    }

    .title {
      @apply text-lg font-bold my-1;
    }

    .intro {
      @apply text-sm font-thin;
    }

    .data {
      @apply flex justify-around w-full my-4;
    }

    .btn {
      @apply flex justify-center items-center w-7/8;
    }
  }
}
</style>
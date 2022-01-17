<!--
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-01-17 14:43:53
 * @Description: 
-->
<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main class="px-4 py-10 text-center text-sky-700 dark:text-gray-200">
    <div>
      <p class="text-4xl">
        <carbon-warning class="inline-block" />
      </p>
    </div>
    <router-view />
    <div>
      <button
        class="btn m-3 text-sm mt-8"
        @click="router.back()"
      >
        {{ t('button.back') }}
      </button>
    </div>
  </main>
</template>

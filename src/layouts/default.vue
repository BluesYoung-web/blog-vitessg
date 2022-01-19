<!--
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-01-18 17:54:35
 * @Description: 
-->
<template>
  <div class="main">
    <Header class="dark:text-gray-100" />
    <div class="container">
      <article class="artical">
        <router-view />
      </article>
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
.main {
  @apply w-full flex justify-center;
}
.container {
  // @apply bg-red-500;
  @apply w-49/50 lg:w-2/5 relative top-30 py-10 px-5 border rounded;
}
.artical {
  @apply text-gray-700 dark:text-gray-100;
}
</style>
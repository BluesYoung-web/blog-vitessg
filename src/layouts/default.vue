<!--
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-04-17 14:55:01
 * @Description: 
-->
<script lang="ts" setup>
import { isClient } from '@vueuse/core';
import PlumBg from '~/components/PlumBg.vue';

const route = useRoute();
const router = useRouter();
const content = ref<HTMLDivElement>();

onMounted(() => {
  const navigate = () => {
    if (location.hash) {
      const target = document.querySelector(decodeURIComponent(location.hash));
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleAnchors = (event: MouseEvent & { target: HTMLElement }) => {
    const link = event.target.closest('a');
    const menu = document.querySelector('.table-of-contents');
    if (
      //  文章标题锚点
      link?.className === 'header-anchor'
      ||
      // @ts-ignore 菜单锚点
      Array.from(event.path).some((ele) => ele === menu)
      ) {
      const url = new URL(`${link?.href ?? location.href}`);
      event.preventDefault();
      const { pathname, hash } = url;
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash);
        navigate();
      }
      else {
        router.push({ path: pathname, hash });
      }
    }
  }

  useEventListener(window, 'hashchange', navigate);
  useEventListener(content.value!, 'click', handleAnchors, { passive: false });

  if (!isClient) {
    return;
  }

  navigate();
  setTimeout(navigate, 500);
});
</script>
<template>
  <div class="main">
    <Header class="dark:text-gray-100" />
    <div class="container">
      <article ref="content" class="artical">
        <h1 class="text-3xl text-center mb-5">{{ route.meta.frontmatter?.title }}</h1>
        <router-view />
      </article>
    </div>
    <Footer />
    <ScrollTop :show="120" />
    <PlumBg />
  </div>
</template>

<style lang="scss" scoped>
.main {
  @apply w-full ;

  .container {
    @apply w-49/50 lg:w-2/5 pt-20 pb-8 m-auto;
  }
  .artical {
    @apply text-gray-700 dark:text-gray-100 min-h-78vh;
  }
}
</style>
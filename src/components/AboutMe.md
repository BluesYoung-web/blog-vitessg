# ❤️关于本人

## <flat-color-icons-contacts /> 联系方式

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const mail_addr = computed(() => String(t('nav.mail_addr')).replace('&#64;', '@'));
</script>

<a :href="mail_addr" :title="t('nav.mail')">📬 {{ mail_addr.slice(7) }}</a>

## 📝 简介

2020 年毕业于武汉工程大学

<n-tag class="mr-2" type="success"> 三好学生 </n-tag>
<n-tag class="mr-2" type="warning"> 国家励志奖学金 </n-tag>
<n-tag class="mr-2" type="info"> 优秀毕业生 </n-tag>

## 🔧 技能

<div class="text-center">
  <logos-javascript class="mr-2 text-6xl" />
  <logos-html-5 class="mr-2 text-6xl" />
  <logos-css-3 class="mr-2 text-6xl" />
  <logos-typescript-icon class="mr-2 text-6xl" />
  <logos-nodejs-icon class="mr-2 text-6xl" />
  <logos-vue class="text-6xl" />
</div>

<div class="text-center mt-2">
  <logos-raspberry-pi class="mr-2 text-6xl" />
  <logos-linux-tux class="mr-2 text-6xl" />
  <logos-nginx class="mr-2 text-6xl" />
  <logos-docker-icon class="mr-2 text-6xl" />
  <logos-python class="mr-2 text-6xl" />
  <logos-php class="text-6xl" />
</div>
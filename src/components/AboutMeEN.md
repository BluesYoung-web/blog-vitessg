# ❤️ About Me

## <flat-color-icons-contacts /> Contact
<style>
.header-anchor {
  display: none;
}
</style>
<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const mail_addr = computed(() => String(t('nav.mail_addr')).replace('&#64;', '@'));
</script>

<a :href="mail_addr" :title="t('nav.mail')">📬 {{ mail_addr.slice(7) }}</a>

## 📝 Introduction

Graduated from Wuhan Institute of Technology in 2020

<n-tag class="mr-2" type="success"> Miyoshi Students </n-tag>
<n-tag class="mr-2" type="info"> Outstanding Graduate </n-tag>
<n-tag class="mr-2 mt-2" type="warning"> Winner of National Inspirational Scholarship </n-tag>


## 🔧 Skill

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
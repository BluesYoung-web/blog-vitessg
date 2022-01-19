/*
 * @Author: zhangyang
 * @Date: 2022-01-16 14:49:24
 * @LastEditTime: 2022-01-19 15:41:53
 * @Description: 一言
 */
import { isClient } from '@vueuse/core';
const refresh_api = `https://v1.hitokoto.cn/`;
const detail_api = `https://hitokoto.cn?uuid=`;

type OneSay = {
  commit_from: string;
  created_at: string;
  creator: string;
  creator_uid: number;
  from: string | null;
  from_who: string | null;
  hitokoto: string;
  id: number;
  length: number;
  reviewer: number;
  type: string;
  uuid: string;
};

export default defineComponent({
  setup() {
    const sayObj = ref<OneSay>();
    const refresh = async () => {
      const res = await fetch(refresh_api);
      sayObj.value = await res.json();
    };
    const { copy, isSupported } = useClipboard();
    const copyContent = async () => {
      if (isSupported) {
        await copy(sayObj.value?.hitokoto ?? '');
        alert('已复制到剪切板');
      } else {
        alert('很遗憾，你的浏览器不支持该操作');
      }
    };
    const goDetail = () => {
      const a = document.createElement('a');
      a.setAttribute('target', '_blank');
      a.setAttribute('href', `${detail_api}${sayObj.value?.uuid}`);
      a.click();
    };
    const eventDiapatcher = (e: MouseEvent) => {
      switch (e.button) {
        case 0:
          refresh();
          break;
        case 1:
          copyContent();
          break;
        case 2:
          goDetail();
          break;
        default:
          refresh();
          break;
      }
    };
    // 只有浏览器端才有 fetch api
    isClient && refresh();
    return () => (
      <div
        class="hover:cursor-pointer"
        title="左键刷新，中键复制，右键跳转详情"
        onClick={eventDiapatcher}
        onAuxclick={eventDiapatcher}
        onContextmenu={(e) => e.preventDefault()}
      >
        <p>{ sayObj.value?.hitokoto ?? '' }</p>
        <p>
          <span>出自：</span>
          {
            `
              ${sayObj.value?.from ?? ''}
              ${sayObj.value?.from_who ? ` —— ${sayObj.value?.from_who}` : ''}
            `
          }
        </p>
      </div>
    )
  }
});
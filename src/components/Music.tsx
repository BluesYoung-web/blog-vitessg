/*
 * @Author: zhangyang
 * @Date: 2022-01-16 16:04:50
 * @LastEditTime: 2022-01-20 19:00:52
 * @Description: 音乐播放器
 */
import 'aplayer/dist/APlayer.min.css';
import './styles/music.scss';

export default defineComponent({
  setup() {
    const { t } = useI18n();
    onMounted(async () => {
      // 确保到了浏览器端挂在的时候再动态载入，解决编译报错
      const APlayer = await (await import('aplayer')).default;
      const res = await fetch(`${t('music.api')}?server=${t('music.server')}&type=${t('music.type')}&id=${t('music.id')}&r=${Math.random()}`);
      const conf = await res.json();
      const mountTarget = document.querySelector('#young-player')
      mountTarget && new APlayer({
        container: mountTarget,
        fixed: true,
        mini: true,
        audio: conf,
        lrcType: 3
      });
    });
    return () => (
      <div id="young-player"></div>
    );
  }
})
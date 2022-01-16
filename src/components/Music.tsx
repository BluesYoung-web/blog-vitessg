/*
 * @Author: zhangyang
 * @Date: 2022-01-16 16:04:50
 * @LastEditTime: 2022-01-16 18:40:00
 * @Description: 音乐播放器
 */
import 'aplayer/dist/APlayer.min.css';
import './styles/music.scss';
import APlayer from 'aplayer';
const PlayListId = 3231649721;
const api_url = 'https://api.i-meto.com/meting/api';
export default defineComponent({
  setup() {
    onMounted(async () => {
      const res = await fetch(`${api_url}?server=netease&type=playlist&id=${PlayListId}&r=${Math.random()}`);
      const conf = await res.json();
      new APlayer({
        container: document.querySelector('#young-player'),
        fixed: true,
        mini: true,
        audio: conf
      });
    });
    return () => (
      <div id="young-player"></div>
    );
  }
})
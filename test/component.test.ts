/*
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-01-25 11:15:04
 * @Description: 
 */
import { mount } from '@vue/test-utils';
import { i18n } from '~/modules/i18n';
import Footer from '../src/components/Footer.vue';

describe('Footer.vue', () => {
  it('should render', () => {
    const wrapper = mount(Footer, {
      global: {
        plugins: [i18n]
      }
    });
    expect(wrapper.text()).toContain('Powerd By Vitesse');
  });

  it('should be interactive', async() => {
    const wrapper = mount(Footer, {
      global: {
        plugins: [i18n]
      }
    });
    expect(wrapper.findAll('a').length).toBe(2);
    
    const [gitee, refer] = wrapper.findAll('a');
    const giteeAttr = gitee.attributes();
    const referAttr = refer.attributes();
    expect(giteeAttr.target).toBe('_blank');
    expect(giteeAttr.href).toBe(wrapper.vm.t('nav.gitee_addr'));

    expect(referAttr.target).toBe('_blank');
    expect(referAttr.href).toBe('https://github.com/antfu/vitesse');
  });
});
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { defineRule } from 'vee-validate'
import rules from '@vee-validate/rules'
// import axios from 'axios'
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

Object.keys(rules).forEach(rule => {
  defineRule(rule, rules[rule])
})

// @FIXME request is call twice and call when fill other field
defineRule('email_exists', value => {
  // const url = `http://chatdmvet.test:8885/api/check/${encodeURIComponent(value)}`
  // const result = await axios.get(url)
  // if (result.data.count > 0) {
  //   return 'this email is already use'
  // }
  console.info('i am trigger')
  console.info(value)
  return true
})

defineRule('custom_rule', value => {
    console.info('custom_rule trigger')

    if (value.includes('x')) {
      return true
    }

    return 'value must contain a x'
})

const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});

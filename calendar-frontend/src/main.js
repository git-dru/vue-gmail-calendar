import Vue from 'vue'
import VCalendar from 'v-calendar';
// import 'v-calendar/dist/style.css';
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VCalendar, {
  formats: {
    title: "MMMM YYYY",
    weekdays: "W",
    navMonths: "MMM",
    input: ["L", "YYYY-MM-DD", "YYYY/MM/DD"],
    dayPopover: "L"
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')

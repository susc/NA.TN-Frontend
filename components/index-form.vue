<template>
  <div>
    <div class="pt-8 px-4 flex justify-center">
      <div class="w-full max-w-6xl bg-white rounded shadow-sm p-4">
        <div class="sm:flex sm:justify-between items-center">
          <!--标题以及图片-->
          <div class="sm:w-1/3 sm:border-r">
            <h1 class="text-lg text-gray-800">缩短您的链接</h1>
            <div class="w-full flex justify-center my-6">
              <object
                class="h-32"
                type="image/svg+xml"
                data="/link_shortener.svg">
              </object>
            </div>
          </div>

          <!--表单部分-->
          <div class="my-2 sm:w-2/3 sm:pl-4">
            <input
              v-model="url"
              class="block py-3 px-3 w-full bg-gray-100 border text-sm text-gray-700 focus:outline-none rounded sm:h-12"
              type="text" placeholder="请输入一个链接">
            <button
              v-if="!loading"
              @click="handleGenerate"
              class="block shadow-md my-3 tracking-widest w-full bg-indigo-500 py-3 rounded text-white text-sm transition ease-linear duration-200 focus:outline-none hover:bg-indigo-700 active:bg-indigo-900">
              生成
            </button>

            <button
              v-if="loading"
              class="block cursor-not-allowed my-3 tracking-widest w-full bg-gray-200 py-3 rounded text-black text-sm focus:outline-none">
              生成中
            </button>
          </div>
        </div>

        <!--系统统计信息-->
        <div class="mt-4">
          <p class="text-sm text-gray-600 text-center">
            目前已生成
            <span class="text-red-400" id="link-count">{{counter.linkCount}}</span>
            个短链接，已服务
            <span class="text-red-400" id="click-count">{{counter.click}}</span>
            次点击
          </p>
        </div>
      </div>
    </div>

    <IndexResult v-show="result.ready" :url="result.r_url" :s_url="result.s_url" :exp_date="result.formatted_date"/>
  </div>

</template>

<script>
  import Swal from 'sweetalert2'
  import axios from "axios"
  import moment from 'moment'
  import anime from 'animejs/lib/anime.es.js';
  import IndexResult from "./index-result";

  // Vue.use(Icon)

  export default {
    name: "index-form",
    components: {IndexResult},
    data() {
      return {
        url: '',
        loading: false,
        counter: {
          click: '-',
          linkCount: '-'
        },
        result: {
          ready: false,
          r_url: '',
          s_url: '',
          exp_date: null,
          formatted_date: ''
        }
      }
    },
    mounted() {
      this.getStat()
    },
    methods: {
      handleGenerate() {
        this.loading = true;
        this.result.ready = false;

        if (this.url === '') {

          Swal.fire({
            icon: 'error',
            title: '错误',
            text: '请输入一个链接',
            confirmButtonText: '确认',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'shadow-md my-3 px-8 tracking-widest bg-indigo-500 py-3 rounded text-white text-sm transition ease-linear duration-200 focus:outline-none hover:bg-indigo-700 active:bg-indigo-900',
            }
          });

          this.loading = false
        } else {
          var matchResult = this.url.match(/^(https?|ftp):\/\/([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/);
          if (matchResult === null) {

            Swal.fire({
              icon: 'error',
              title: '错误',
              text: '请输入一个有效的链接，没有前缀（如 http:// 或 https://）的链接也是无效链接',
              confirmButtonText: '确认',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'shadow-md my-3 px-8 tracking-widest bg-indigo-500 py-3 rounded text-white text-sm transition ease-linear duration-200 focus:outline-none hover:bg-indigo-700 active:bg-indigo-900',
              }
            });

            this.loading = false
          } else {
            // 开始发送请求
            let postBody = {
              url: this.url
            };
            axios.post(`https://api.url.ewrt.top/v1/links?type=guest`, postBody, { headers: { 'content-type': 'application/json' } }).then((res) => {
              // console.log(res);

              this.result.r_url = this.url;
              this.result.s_url = res.data.data.s_url;
              this.result.exp_date = res.data.data.expiry_date;
              let t = moment(this.result.exp_date * 1000);
              this.result.formatted_date = t.format("YYYY-MM-DD HH:mm:ss");

              this.loading = false;
              this.result.ready = true
            }).catch((err) => {

              Swal.fire({
                icon: 'error',
                title: '错误',
                text: err.response.data.error[`zh`] || err.message,
                confirmButtonText: '确认',
                buttonsStyling: false,
                customClass: {
                  confirmButton: 'shadow-md my-3 px-8 tracking-widest bg-indigo-500 py-3 rounded text-white text-sm transition ease-linear duration-200 focus:outline-none hover:bg-indigo-700 active:bg-indigo-900',
                }
              });

              this.loading = false;
              this.result.ready = false;
            });
          }
        }
        return 0
      },
      getStat() {
        // 获取链接数量
        axios.get(`https://api.url.ewrt.top/v1/links/count`).then((res) => {
          this.counter.linkCount = res.data.data;

          // 动画效果
          anime({
            targets: '#link-count',
            innerHTML: this.counter.linkCount,
            round: 1,
            easing: 'easeInOutExpo'
          });
        }).catch((error) => {
          console.error(error)
        });

        // 获取点击数量
        axios.get(`https://api.url.ewrt.top/v1/links/click`).then((res) => {
          this.counter.click = res.data.data;

          // 动画效果
          anime({
            targets: '#click-count',
            innerHTML: this.counter.click,
            round: 1,
            easing: 'easeInOutExpo'
          });
        }).catch((error) => {
          console.error(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>

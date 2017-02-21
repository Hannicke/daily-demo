<template>
  <div class="preview">
    <headerNav :title="htitle.name">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    </headerNav>

    <!-- 多张图片 -->
    <div>
      <div v-if="images.length > 0">
        <ul>
          <li v-for='img in images'>
            <img :src="img" width="100%" @click='delImage($index)'>
          </li>
        </ul>
      </div>
      <div v-else>
        <input type="file" accept="image/png,image/jpg,image/jpeg" @change="onFileChange">
      </div>
    </div>

    <!-- 一张图片 -->
    <!-- div>
      <div v-if="image === ''">
        <input type="file" accept="image/png,image/jpg,image/jpeg" @change="onFileChange">
      </div>
      <div class="head-img" v-else>
        <img :src="image" width="300" height="300">
        <button @click="removeImage">更换其他图片</button>
        <div class="use" @click='upUserPic'>上传头像</div>
      </div>
    </div> -->

  </div>
</template>

<script>
  import headerNav from '../base/header'
  import common from '../../common.js'
  import mui from 'mui'
  export default {
    data () {
      return {
        htitle: {name: '预览头像'},
        image: '',
        images: []
      }
    },
    components: {
      headerNav
    },
    methods: {
      upUserPic () {
        // 一张图片上传
        // this.$http.post(`${common.httpHead}XXX/XXX`, {KEY: this.image})
        
        // 多张图片上传
        this.$http.post(`${common.httpHead}XXX/XXX`, {KEY: `${this.images}`})
          .then(({data: {code, msg, data}}) => {
            if (code === 2000) {
              this.$router.back()
            } else {
              mui.toast('图片上传失败')
            }
          })
      },
      onFileChange (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        this.createImage(this.files)
      },
      createImage (file) {
        let vm = this
        let reader = null
        for (let i = 0; i < file.length; i++) {
          reader = new window.FileReader()
          reader.readAsDataURL(file[i])
          reader.onload = function (e) {
            // 一张图片
            // vm.image = e.target.result

            // 多张图片
            vm.images.push(e.target.result)
          }
        }
      },
      removeImage: function (e) {
        // 移除一张图片
        // this.image = ''

        // 移除全部多张图片
        this.images = []
      },
      // 点击删除当前图片
      delImage: function (index) {
        this.images.shift(index)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .preview {
    margin-top: 44px;
    padding: 10px;
    .head-img {
      display: flex;
      margin-top: 50px;
      flex-direction: column;
      align-items: center; 
      > button {
        margin-top: 10px;
        width: 40%;
      }
    }
    .use {
      width: 100%;
      line-height: 45px;
      background-color: #A6806A;
      color: #fff;
      text-align: center;
      border-radius: 5px;
      margin-top: 25px;
    }
  }
</style>

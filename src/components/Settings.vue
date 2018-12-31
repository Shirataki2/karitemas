<template>
  <div>
    <v-responsive style="background: mediumaquamarine;" height="310px" width="100%"/>
    <v-container>
      <v-card class="elevation-7 main-card">
        <v-layout row wrap>
          <v-flex xs12 align-center justify-center layout text-xs-center>
            <v-avatar size="180" color="gray lighten-4" class="elevation-7 my-avatar">
              <v-img src="https://pbs.twimg.com/profile_images/1076916401061879808/8-GIsbaN.jpg" alt="avatar"/>
            </v-avatar>
          </v-flex>
          <v-container>
            <v-card-title primary-title class="ml-4 mt-2 headline ansi-underline">
              設定の変更
            </v-card-title>
            <v-card-text>
              <form>
                <v-text-field
                  v-model="updateUser.name"
                  :error-messages="nameError"
                  :counter="32"
                  label="名前"
                  required
                  @input="$v.updateUser.name.$touch()"
                  @blur="$v.updateUser.name.$touch()"
                />
                <v-text-field
                  v-model="updateUser.email"
                  :error-messages="emailError"
                  label="メールアドレス"
                  required
                  @input="$v.updateUser.email.$touch()"
                  @blur="$v.updateUser.email.$touch()"
                />
                <v-text-field
                  v-model="updateUser.old_password"
                  :error-messages="oldPasswordError"
                  label="現在のパスワード"
                  required
                  :type="'password'"
                  @click:append="show_password = !show_password"
                  @input="$v.updateUser.old_password.$touch()"
                  @blur="$v.updateUser.old_password.$touch()"
                />
                <v-text-field
                  v-model="updateUser.new_password"
                  :error-messages="passwordError"
                  label="新しいパスワード"
                  required
                  :type="'password'"
                  @click:append="show_password = !show_password"
                  @input="$v.updateUser.new_password.$touch()"
                  @blur="$v.updateUser.new_password.$touch()"
                />
                <v-text-field
                  v-model="updateUser.password_confirmation"
                  :error-messages="passwordConfirmError"
                  label="新しいパスワードの確認"
                  required
                  :type="'password'"
                  @input="$v.updateUser.password_confirmation.$touch()"
                  @blur="$v.updateUser.password_confirmation.$touch()"
                />
                <v-btn @click="submitData" class="primary">更新</v-btn>
                <v-btn @click="clearData" class="secondary">クリア</v-btn>
              </form>
            </v-card-text>
          </v-container>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import equal from 'deep-equal'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import { required, minLength, alphaNum, sameAs, maxLength, email } from 'vuelidate/lib/validators'

Vue.use(VueAxios, axios)

export default {
  name: 'Settings',
  mixins: [validationMixin],
  validations: {
    updateUser: {
      name: {required, maxLength: maxLength(32)},
      email: {required, email},
      old_password: {minLength: minLength(6), alphaNum},
      new_password: {minLength: minLength(6), alphaNum},
      password_confirmation: {sameAs: sameAs('new_password')}
    }
  },
  data: () => ({
    dialog: false,
    show_password: false,
    updateUser: {
      name: '',
      email: '',
      old_password: '',
      new_password: '',
      password_confirmation: ''
    },
    oldUser: {
      name: '',
      email: '',
      old_password: '',
      new_password: '',
      password_confirmation: ''
    },
    user: null
  }),
  beforeCreate () {
    axios.get(`${process.env.API_URL}/api/user/${this.$store.getters.user.id}`, {
      headers: this.$store.getters.token
    })
      .then((res) => {
        console.log(res)
        if (res.data.status === 'USER_NOTFOUND') {
          this.$router.push('/404')
        }
        this.user = res.data
        console.log(res.data)
        this.updateUser.name = this.user.username
        this.updateUser.email = this.user.email
        this.oldUser = Object.assign({}, this.updateUser)
      })
  },
  computed: {
    nameError () {
      const errors = []
      if (!this.$v.updateUser.name.$dirty) return errors
      !this.$v.updateUser.name.maxLength && errors.push('名前は32文字以内にしてください')
      !this.$v.updateUser.name.required && errors.push('必須項目です')
      return errors
    },
    emailError () {
      const errors = []
      if (!this.$v.updateUser.email.$dirty) return errors
      !this.$v.updateUser.email.email && errors.push('不正な形式です')
      !this.$v.updateUser.email.required && errors.push('必須項目です')
      return errors
    },
    oldPasswordError () {
      const errors = []
      if (!this.$v.updateUser.old_password.$dirty) return errors
      !this.$v.updateUser.old_password.minLength && errors.push('6文字以上で入力してください')
      !this.$v.updateUser.old_password.alphaNum && errors.push('英字,数字のみを使用してください')
      return errors
    },
    passwordError () {
      const errors = []
      if (!this.$v.updateUser.new_password.$dirty) return errors
      !this.$v.updateUser.new_password.minLength && errors.push('6文字以上で入力してください')
      !this.$v.updateUser.new_password.alphaNum && errors.push('英字,数字のみを使用してください')
      return errors
    },
    passwordConfirmError () {
      const errors = []
      if (!this.$v.updateUser.password_confirmation.$dirty) return errors
      !this.$v.updateUser.password_confirmation.sameAs && errors.push('一致しません')
      return errors
    }
  },
  beforeRouteLeave (to, from, next) {
    if (!equal(this.oldUser, this.updateUser)) {
      const answer = window.confirm('未保存の変更があります．このページを離れてもよろしいですか？')
      if (answer) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  methods: {
    submitData () {
      this.$v.$touch()
      console.log('PATCH-1')
      if (!this.$v.$pending && !this.$v.$error) {
        console.log('PATCH')
        axios.patch(`${process.env.API_URL}/api/user/${this.user.id}`, {
          username: this.updateUser.name
        }, {
          headers: this.$store.getters.token
        }).then((res) => {
          console.log(res)
          this.oldUser = Object.assign({}, this.updateUser)
        }).catch((err) => {
          console.error(err)
        })
      }
    },
    clearData () {
      console.log(this.$v)
      this.$v.$reset()
      this.updateUser = {
        name: '',
        email: '',
        old_password: '',
        new_password: '',
        password_confirmation: ''
      }
    }
  }
}
</script>

<style scoped>
  .main-card, .main-card>*{
    position: relative;
    bottom: 120px;
  }
  .my-avatar{
    position: relative;
    bottom: -20px;
  }
</style>

<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="600px">
      <v-btn
        slot="activator"
        class="white--text"
        color="green lighten-2"
      >
        Register
      </v-btn>
      <form class="white">
        <v-card>
          <v-card-title>
            <span class="headline">
              ユーザ登録
            </span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="user.name"
              :error-messages="nameError"
              :counter="32"
              label="名前 *"
              required
              @input="$v.user.name.$touch()"
              @blur="$v.user.name.$touch()"
            />
            <v-text-field
              v-model="user.email"
              :error-messages="emailError"
              label="メールアドレス *"
              required
              @input="$v.user.email.$touch()"
              @blur="$v.user.email.$touch()"
            />
            <v-text-field
              v-model="user.password"
              :error-messages="passwordError"
              label="パスワード *"
              required
              :type="'password'"
              @click:append="show_password = !show_password"
              @input="$v.user.password.$touch()"
              @blur="$v.user.password.$touch()"
            />
            <v-text-field
              v-model="user.password_confirmation"
              :error-messages="passwordConfirmError"
              label="パスワードの確認 *"
              required
              :type="'password'"
              @input="$v.user.password_confirmation.$touch()"
              @blur="$v.user.password_confirmation.$touch()"
            />
          </v-card-text>
          <v-btn @click="submit">登録</v-btn>
        </v-card>
      </form>
    </v-dialog>
  </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, alphaNum, sameAs, maxLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    user: {
      name: {required, maxLength: maxLength(32)},
      email: {required, email},
      password: {required, minLength: minLength(6), alphaNum},
      password_confirmation: {required, sameAs: sameAs('password')}
    }
  },
  data: () => ({
    dialog: false,
    show_password: false,
    user: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      agreeTerms: false
    }
  }),
  computed: {
    nameError () {
      const errors = []
      if (!this.$v.user.name.$dirty) return errors
      !this.$v.user.name.maxLength && errors.push('名前は32文字以内にしてください')
      !this.$v.user.name.required && errors.push('必須項目です')
      return errors
    },
    emailError () {
      const errors = []
      if (!this.$v.user.email.$dirty) return errors
      !this.$v.user.email.email && errors.push('不正な形式です')
      !this.$v.user.email.required && errors.push('必須項目です')
      return errors
    },
    passwordError () {
      const errors = []
      if (!this.$v.user.password.$dirty) return errors
      !this.$v.user.password.minLength && errors.push('6文字以上で入力してください')
      !this.$v.user.password.alphaNum && errors.push('英字,数字のみを使用してください')
      !this.$v.user.password.required && errors.push('必須項目です')
      return errors
    },
    passwordConfirmError () {
      const errors = []
      if (!this.$v.user.password.$dirty) return errors
      !this.$v.user.password_confirmation.sameAs && errors.push('一致しません')
      !this.$v.user.password_confirmation.required && errors.push('必須項目です')
      return errors
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
    }
  }
}
</script>

<style scoped>

</style>

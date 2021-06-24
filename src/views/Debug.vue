<template>
  <div>
    <form @submit="onSubmit">
      <pre>
        {{ email }}
        {{ emailError }}
        {{ password }}
        {{ passwordError }}
        Nb request to check email : {{ counter }}
      </pre>
      <p>
        <input name="email" v-model="email" />
        <span>{{ emailError }}</span>
      </p>
      <p>
        <input name="password" v-model="password" type="password" />
        <span>{{ passwordError }}</span>
      </p>
      <button>Submit</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import axios from 'axios'

export default {
  setup () {
    const counter = ref(0)
    // Define a validation schema
    const simpleSchema = {
      async email (value) {
        console.log(value)
        const isExists = await checkEmail(value)
        if (isExists) {
          return 'this email is already in use'
        }

        return true
      },
      password (value) {
        console.log('password >> ', value)
        if (value && value.trim()) {
          return true
        }

        return 'this field is required'
      },
    }

    const checkEmail = async (email) => {
      if (email) {
        const url = `http://chatdmvet.test:8885/api/check/${encodeURIComponent(email)}`
        const result = await axios.get(url)
        console.log(result)
        if (result.data.count > 0) {
          counter.value++
          return true
        }
      }

      return false
    }

    // Create a form context with the validation schema
    const { handleSubmit } = useForm({
      validationSchema: simpleSchema,
    })

    const onSubmit = handleSubmit((values, { resetForm }) => {
      console.log('handleSubmit >> ', values); // send data to API
      // reset the form and the field values to their initial values
      resetForm()
    })

    const { value: email, errorMessage: emailError } = useField('email')
    const { value: password, errorMessage: passwordError } = useField('password')

    return {
      counter,
      email,
      emailError,
      password,
      passwordError,
      onSubmit
    }
  }
}
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <v-form v-slot="{ errors, values, isSubmitting }"
            as="div"
            :initial-values="form"
            :validation-schema="schema">
            <pre>
             errors: {{ errors }}
             values: {{ values }}
             form: {{ form }}
             isSubmitting:  {{ isSubmitting }}
            </pre>
            <form @submit="onSubmit">
              <ion-list>
                <ion-item lines="none">
                  <v-field
                    as="input"
                    label="native"
                    placeholder="native"
                    name="native"
                    type="text"
                  />
                  <v-error as="div" class="error" name="native" />
                </ion-item>
                <ion-item lines="none">
                  <v-field
                    as="ion-input"
                    label="email"
                    placeholder="email"
                    name="email"
                    type="email"
                    inputmode="email"
                    :rules="schema.values"
                    @ionBlur="showMessage($event.target.value)"
                  />
                  <v-error as="div" class="error" name="email" />
                </ion-item>
                <ion-item lines="none">
                  <v-field
                    as="ion-input"
                    label="other email"
                    placeholder="other email"
                    name="other_email"
                    type="email"
                    inputmode="email"
                    @ionBlur="checkEmail($event.target.value, errors)"
                  />
                  <v-error as="div" class="error" name="other_email" />
                </ion-item>
                <ion-item class="white mb-2" lines="none">
                  <v-field
                    as="ion-input"
                    label="firstname"
                    placeholder="firstname"
                    data-cy="firstname"
                    name="firstname"
                    type="text"
                  />
                </ion-item>
                <v-error as="p" class="error" name="firstname" />
                <ion-item lines="none">
                  <v-field
                    data-cy="lastname"
                    as="ion-input"
                    label="lastname"
                    placeholder="lastname"
                    name="lastname"
                    type="text"
                  />
                </ion-item>
                <ion-item>
                  <ion-button>
                    <ion-label>Submit</ion-label>
                  </ion-button>
                </ion-item>
              </ion-list>
            </form>
          </v-form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonButton,
  IonLabel
} from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
import {
  Form as VForm,
  Field as VField,
  ErrorMessage as VError,
  useForm
} from 'vee-validate'
import axios from 'axios'

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonButton,
    IonLabel,
    VForm,
    VField,
    VError
  },
  setup () {
    const { setFieldError, handleSubmit } = useForm()

    const form = reactive({
      email: '',
      firstname: '',
      lastname: ''
    })

    const schema = {
      native: 'required|custom_rule',
      email: 'required|email|email_exists',
      firstname: 'required|min:2|max:20',
      lastname: 'required|min:2|max:64',
      other_email: 'required|email'
    }

    const checkEmail = async (email, errors) => {
      if (email) {
        const url = `http://chatdmvet.test:8885/api/check/${encodeURIComponent(email)}`
        const result = await axios.get(url)
        console.log(result)
        console.log(errors)
        if (result.data.count > 0) {
          await setFieldError('other_email', 'this email is already use')
          errors.email = 'this email is already use'
          alert('this email is already use')
        }
      }
    }

    const showMessage = mesg => {
      alert(mesg)
    }

    const onSubmit = handleSubmit(async (values, { resetForm }) => {
      if (values.email) {
        await checkEmail(values.email)
      }

      resetForm()
    })

    return {
      form,
      schema,
      onSubmit,
      checkEmail,
      showMessage
    }
  }
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>

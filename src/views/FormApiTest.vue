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
        <pre>
          {{email}}
          {{emailError}}
        </pre>
        <!-- <form @submit="onSubmit" > -->
          <ion-list>
            <ion-item lines="none">
              <ion-input
                v-model="email"
                placeholder="email"
                name="email"
                type="email"
                inputmode="email"
              />
              <span>{{ emailError }}</span>
            </ion-item>
            <ion-item>
              <ion-button type="submit">
                <ion-label>Submit</ion-label>
              </ion-button>
            </ion-item>
          </ion-list>

        <!-- </form> -->
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
  IonLabel,
  IonInput
} from '@ionic/vue';
import {
  defineComponent,
  // reactive
} from 'vue';
import {
  useForm,
  useField
} from 'vee-validate'
import axios from 'axios'

export default defineComponent({
  name: 'FormApiTest',
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
    IonInput
    // VForm,
    // VField,
    // VError
  },
  setup () {
    const schema = {
       async email (value) {
         const isExists = await checkEmail(value)
         if (isExists) {
           return 'this email is already in use'
         }
       }
   }

   useForm({
      validationSchema: schema
   })

    const checkEmail = async (email) => {
      if (email) {
        const url = `http://chatdmvet.test:8885/api/check/${encodeURIComponent(email)}`
        const result = await axios.get(url)
        console.log(result)
        if (result.data.count > 0) {
          return true
        }
      }

      return false
    }

    // const onSubmit = handleSubmit(async (values) => {
    //   console.log('handleSubmit >> ', values)
    // })

    const {  value: email, errorMessage: emailError } = useField('email')

    return {
      email,
      emailError,
      // onSubmit
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

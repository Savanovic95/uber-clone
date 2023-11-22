<script setup>
import {vMaska} from 'maska'
import {computed, onMounted, reactive, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";


const credentials = reactive({
  phone: null
});

const waitingOnVerification = ref(false);

const router = useRouter();

const getFormattedCredentials = ()=>{
    return{
      phone: credentials.phone.replaceAll(' ', '').replace('(', '').replace(')', ''),
      login_code: credentials.login_code
    }
}

onMounted(()=>{
    if (localStorage.getItem('token')){
      router.push({
        name:'landing'
      });
    }
});

const handleLogin = () => {
  axios.post('http://127.0.0.1:8000/api/login', getFormattedCredentials())
      .then((response) => {
        console.log(response.data);
        waitingOnVerification.value = true;
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });

}

const handleVerification = () => {
  axios.post('http://127.0.0.1:8000/api/login/verify', getFormattedCredentials())
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('token', response.data);
        router.push({
          name: 'landing'
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });

}

</script>

<template>
  <div class="pt-16 flex flex-col items-center">
    <h3 class="text-center text-xl font-semibold mb-4">Enter your phone number</h3>
    <form v-if="!waitingOnVerification" action="#" @submit.prevent="handleLogin">
      <div class="overflow-hidden shadow md:rounded-md max-w-md mx-auto text-left">
        <div class="bg-white px-4 py-5 md:p-6">
          <div>
            <input type="text" v-maska data-maska="(387) ## ### ####" v-model="credentials.phone" name="phone"
                   id="phone" placeholder="(387) 65 101-010"
                   class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none">
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button type="submit" @submit.prevent="handleLogin"
                  class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">
            Continue
          </button>
        </div>
      </div>
    </form>
    <form v-if="waitingOnVerification" action="#" @submit.prevent="handleVerification">
      <div class="overflow-hidden shadow md:rounded-md max-w-md mx-auto text-left">
        <div class="bg-white px-4 py-5 md:p-6">
          <div>
            <input type="text" v-maska data-maska="######" v-model="credentials.login_code" name="phone" id="phone"
                   placeholder="324568"
                   class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none">
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button type="submit" @submit.prevent="handleVerification"
                  class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">
            Verify
          </button>
        </div>
      </div>
    </form>
  </div>

</template>

<style scoped>

</style>
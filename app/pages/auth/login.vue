<script setup lang="ts">


/** Composables Utilziados */
const { form, loading } = useLoginForm();
const { login } = useAuth();


/** Titulo de la página*/
definePageMeta({
  title: 'Iniciar Session'
})

/** Validacion de login */
const handleLogin = async () => {
  loading.value = true;
  const { error } = await login(form.email, form.password)

  if (error) {
    console.log(error.message)
    return
  }

  navigateTo('/home/products/')
}



</script>

<template>
  <!-- Login -->
  <div class="min-h-52 bg-[#2e2e2e] rounded-2xl p-6">
    <UForm class="flex flex-col gap-8 items-center justify-center">

      <!--- Correo Eléctronico-->
      <UFormField label="Correo Electronico">

        <UInput type="email" leading-icon="lucide:mail" placeholder="example@example.com" v-model="form.email" />

      </UFormField>

      <!--- Contraseña -->
      <UFormField label="Contraseña">

        <UInput type="password" leading-icon="lucide:lock" v-model="form.password" />
      </UFormField>

         <!--- Boton -->
      <UButton class="w-40 cursor-pointer" @click="handleLogin" :loading="loading">
        Iniciar Session
      </UButton>
    </UForm>
  </div>
</template>

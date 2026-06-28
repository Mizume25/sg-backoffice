<script setup lang="ts">
/** Composables Utilziados */
const { form, loading } = useLoginForm();
const ProfileStore = useProfileStore();

/** Titulo de la página*/
definePageMeta({
  title: 'Iniciar Session'
})

const handleLogin = async () => {
  loading.value = true
  const supabase = useSupabaseClient()
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })
    if (error) throw error

    const profile =  await useAuth().user.get();


    useAuth().setProfile(profile);

       
    await navigateTo('/home/products/')
  } catch (error) {

    useNotify().error('Credenciales incorrectas')
  } finally {
    loading.value = false
  }
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
      <UButton class="w-40 cursor-pointer flex flex-row justify-center items-center" @click="handleLogin"
        :loading="loading">
        Iniciar Session
      </UButton>
    </UForm>
  </div>
</template>

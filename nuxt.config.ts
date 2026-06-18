// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  
  pinia: {
     storesDirs: ['./stores/**']
  },
  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
   supabase: {
    redirect: false,
     types: '~~/shared/types/database.types.ts'
  },
  runtimeConfig:{
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    public:{
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_UR,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    }
  }
  
})
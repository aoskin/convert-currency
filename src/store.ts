import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCurrencyStore = defineStore('currency', () => {
  const current = ref('rub')
  const currency = ref([
    {
      name:  'rub',
      fullname: 'Рубль РФ',
      symbol:  '₽',
    },
    {
      name: 'usd',
      fullname: 'Доллар США',
      symbol: '$',
    },
    {
      name: 'eur',
      fullname: 'Евро',
      symbol: '€',
    },
    ])
  const currencyFilter = computed(() => currency.value.filter((item) => item.name !== current.value))

  return { current, currency, currencyFilter }
})
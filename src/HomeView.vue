<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCurrencyStore } from './store'

const currency = useCurrencyStore()

const urlCurrency = 'https://status.neuralgeneration.com/api/currency';
const data = ref({});

onMounted(async () => {
  const response = await fetch(urlCurrency);
  const result = await response.json();
  data.value = typeof result === 'string' ? JSON.parse(result) : result;
});
</script>

<template>
  <h1 class="mt-4 mb-12">Курс валюты</h1>
  <div class="m-auto max-w-[800px] mt-4">
    <!-- <div class="flex gap-12 mb-12">Валюта: {{ currency.current }}</div> -->
      <div class="grid grid-cols-3 gap-4 mb-4">
        <span>Код</span>
        <span>Валюта</span>
        <span>Стоимость</span>
      </div>
      <div
        class="order-first font-semibold tracking-tight text-gray-900 shadow-gray-300 shadow-sm"
        v-for="item of currency.currencyFilter"
      >
        <div class="grid grid-cols-3 gap-4 p-4">
          <span class="uppercase">{{ item.name }}</span>
          <span>{{ item.fullname }}</span>
          <div><span>{{ data?.[`${item.name}-${currency.current}`]}}</span> <span class="uppercase">{{ currency.current }}</span></div>
        </div>
      </div>

  </div>
</template>

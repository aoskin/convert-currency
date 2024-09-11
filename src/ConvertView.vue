<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useCurrencyStore } from './store';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import InputNumber from './components/InputNumber.vue'

const currency = useCurrencyStore();
const count = ref(1);
const convertSum = ref();
const convertSumCalc = computed(() => {
  return count.value * convertSum.value
})
const firstCurrencyName = ref('rub')
const lastCurrencyName = ref('usd')

const handleFirstNameCurrency = (name: string) => {
  firstCurrencyName.value = name
}

const handleLastNameCurrency = (name: string) => {
  lastCurrencyName.value = name
}


const urlCurrency = 'https://status.neuralgeneration.com/api/currency';
const data = ref({});

onMounted(async () => {
  const response = await fetch(urlCurrency);
  const result = await response.json();
  data.value = typeof result === 'string' ? JSON.parse(result) : result;
});
</script>

<template>
  <h1 class="mt-4">Конвертировать валюту</h1>
  <form action="" class="grid gap-6 grid-cols-6 max-w-[800px] m-auto mt-10 px-4">
    <div class="col-span-6 sm:col-span-3 flex items-end gap-1">
      <div class="block w-full">
        <label
          for="first-value"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Начальная валюта</label
        >
        <div class="mt-2">
          <InputNumber
            v-model="count"
           />
        </div>
      </div>

      <Menu as="div" class="relative inline-block text-left ml-auto">
        <div>
          <MenuButton
            class="uppercase inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {{ firstCurrencyName }}
            <ChevronDownIcon
              class="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-1">
              <MenuItem
                v-slot="{ active }"
                v-for="item of currency.currency"
                @click="handleFirstNameCurrency(item.name)"
              >
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm uppercase',
                  ]"
                  >{{ item.name }}</a
                >
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>

    <div class="col-span-6 sm:col-span-3 gap-1 flex items-end">
      <div class="block w-full">
        <label
          for="last-name"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Конечная валюта</label
        >
        <div class="mt-2">

          <input
            :value="(data?.[`${firstCurrencyName}-${lastCurrencyName}`] * count).toFixed(2)"
            min="1"
            type="number"
            name="last-value"
            id="last-value"
            autocomplete="numeric"
            class="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <Menu as="div" class="relative inline-block text-left ml-auto">
        <div>
          <MenuButton
            class="uppercase inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {{ lastCurrencyName }}
            <ChevronDownIcon
              class="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-1">
              <MenuItem
                v-slot="{ active }"
                v-for="item of currency.currency"
                @click="handleLastNameCurrency(item.name)"
              >
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm uppercase',
                  ]"
                  >{{ item.name }}</a
                >
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { useCurrencyStore } from '../store';

const navigation = [
  { name: 'Главная', href: '/', current: true },
  { name: 'Конвертация', href: '/convert', current: false },
];

const currency = useCurrencyStore();

const handleCurrentCurrency = (id: string) => {
  currency.current = id;
};
</script>

<template>
  <header class="bg-gray-800 p-4">
    <div class="flex justify-between m-auto max-w-[1280px]">
      <nav class="flex items-baseline space-x-4">
        <RouterLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          activeClass="bg-gray-900 text-white hover:bg-gray-700 hover:text-white"
          exactActiveClass="text-gray-300 hover:bg-gray-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
          class="text-white"
          >{{ item.name }}</RouterLink
        >
      </nav>
      <Menu as="div" class="relative inline-block text-left ml-auto">
        <div>
          <MenuButton
            class="uppercase inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {{ currency.current }}
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
                v-for="item of currency.currencyFilter"
                @click="handleCurrentCurrency(item.name)"
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
  </header>
</template>

<template>
  <div class="provider-select">
    <SelectRoot>
      <SelectTrigger class=" flex w-full items-center justify-between rounded-md py-1.5 px-3 shadow-sm border outline-none
          data-[placeholder]: text-gray-400">
        <SelectValue placeholder="Select a model..." />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectViewport>
           <div v-for="provider in items">
            <SelectLabel>
                <img :src="provider.avatar" :alt="provider.name">
                {{ provider.name }}
            </SelectLabel>
            <SelectGroup>
                <SelectItem v-for="(model,index) in provider.models" :key="index" :value="model">
                    <SelectItemText>{{ model }}</SelectItemText>
                </SelectItem>
            </SelectGroup>
           </div>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>
  
<script lang="ts" setup>
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'
import { ProviderProps } from 'src/type';
defineProps<{items:ProviderProps[]}>()
</script>
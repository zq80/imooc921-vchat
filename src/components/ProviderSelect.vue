<template>
  <div class="provider-select w-full">
    <SelectRoot v-model="currentModel">
      <SelectTrigger class=" flex w-full items-center justify-between rounded-md py-1.5 px-3 shadow-sm border outline-none
          data-[placeholder]: text-gray-400">
        <SelectValue placeholder="Select a model..." />
        <Icon
            icon="radix-icons:chevron-down"
            class="h-5 w-5"
        />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent class=" bg-white rounded-md shadow-md z-[100]  border">
          <SelectViewport class=" p-2">
           <div v-for="provider in items">
            <SelectLabel>
                {{ provider.name }}
            </SelectLabel>
            <SelectGroup>
                <SelectItem v-for="(model,index) in provider.models" :key="index" :value="`${provider.id}/${model}`" 
                    class=" cursor-pointer text-green-700 outline-none data-[highlighted]:bg-green-700 data-[highlighted]:text-white relative">
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
import { Icon } from '@iconify/vue';
defineProps<{items:ProviderProps[]}>()
const currentModel = defineModel<string>()
</script>
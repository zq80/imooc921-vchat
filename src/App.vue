<template>
  <div class=" flex items-center justify-between h-screen">
    <div class=" w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :items="items"/>
      </div>
      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <RouterLink to="/">
          <button
            class="shadow-sm inline-flex items-center justify-center
              bg-green-700 text-white hover:bg-green-700/90 border border-green-700
              h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
          >
            
            <Icon icon="radix-icons:chat-bubble" class="mr-2"></Icon>
            新建聊天
          </button>
        </RouterLink>
        <RouterLink to="/settings">
          <button
            class="shadow-sm inline-flex items-center justify-center
              bg-green-50 text-green-700 hover:bg-green-700 border border-green-700 hover:text-white
              h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
          >
            <Icon icon="radix-icons:gear" class="mr-2"></Icon>
            应用设置
          </button>
        </RouterLink>
        <Button icon-name="radix-icons:chat-bubble" class="w-full" @click="testAdd">
          ADD
        </Button>
        <Button icon-name="radix-icons:chat-bubble" class="w-full" @click="testReset">
          reset
        </Button>
      </div>
    </div>
    <div class="h-full flex-1 ">
         <RouterView/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Icon} from '@iconify/vue';
import ConversationList from './components/ConversationList.vue';
import { useConversationStore } from './stores/conversation';
import Button from './components/Button.vue';
import { computed, onMounted,ref } from 'vue';
import { db,initProviders } from './db';
import { ConversationProps } from './type';
import { conversations } from './testData';
// const items = conversations

let index=0
const conversationStore=useConversationStore()
const items=computed(()=>conversationStore.items)
onMounted(async()=>{
  // const insertedId=await db.providers.add(providers[0])
  // console.log('insertedId',insertedId)
  // const items=await db.providers.where({id:1}).toArray()
  // console.log('items',items)
  // const updateItem=await db.providers.update(1,{desc:'updated desc'})
  // console.log('updatedItem',updateItem)
  // const deletedItem=await db.providers.delete(1)
  // console.log('deletedItem',deletedItem)
  await initProviders()
  conversationStore.items=await db.conversations.toArray()
})
const testAdd=()=>{
  index++
  conversationStore.items.push(conversations[index])
}
const testReset=()=>{
  conversationStore.$reset()
}
</script>
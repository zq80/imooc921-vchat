<template>
  <div class=" h-[10%] flex bg-gray-200  justify-between items-center">
    <h3>{{ conversation?.title }}</h3>
    <span>{{ conversation?.updatedAt }}</span>
  </div>
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
    <MessageList :messages="filteredMessages"/>
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput  />
  </div>
</template>
<script lang="ts" setup>
import { ref,watch } from 'vue';
import { useRoute } from 'vue-router';
import MessageInput from '../components/MessageInput.vue'
import MessageList from '../components/MessageList.vue';
import { messages,conversations } from '../testData';
import { MessageProps,ConversationProps } from '../type';
const route=useRoute()
const filteredMessages=ref<MessageProps[]>([])
const conversation =ref<ConversationProps>()
let conversationId=parseInt(route.params.id as string)
// filteredMessages.value=messages.filter(message=>message.conversationId===conversationId)
// conversation.value=conversations.find(item=>item.id=conversationId)
watch(()=>route.params.id,(newId:string)=>{
  conversationId=parseInt(newId)
  filteredMessages.value=messages.filter(message=>message.conversationId===conversationId)
  conversation.value=conversations.find(item=>item.id===conversationId)
})
</script>
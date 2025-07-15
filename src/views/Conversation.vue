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
import { ref,watch,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MessageInput from '../components/MessageInput.vue'
import MessageList from '../components/MessageList.vue';
// import { messages,conversations } from '../testData';
import { MessageProps,ConversationProps } from '../type';
import { db } from '../db';
const route=useRoute()
const filteredMessages=ref<MessageProps[]>([])
const conversation =ref<ConversationProps>()
let conversationId=parseInt(route.params.id as string)
const initMessageId=parseInt(route.query.init as string)
const creatingInitialMessage=async()=>{
  const createdData:Omit<MessageProps,'id'>={
    content:'',
    conversationId,
    type:'answer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status:'loading'
  }
  const newMessageId= await db.messages.add(createdData)
  filteredMessages.value.push({id:newMessageId,...createdData})
}

watch(()=>route.params.id,async(newId:string)=>{
  conversationId=parseInt(newId)
  conversation.value = await db.conversations.where({id:conversationId}).first()
  filteredMessages.value=await db.messages.where({conversationId}).toArray()
})
onMounted(async ()=>{
  conversation.value = await db.conversations.where({id:conversationId}).first()
  filteredMessages.value=await db.messages.where({conversationId}).toArray()
  if(initMessageId){
    await creatingInitialMessage()
  }
})
</script>
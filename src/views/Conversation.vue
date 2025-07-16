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
import { ref,watch,onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import MessageInput from '../components/MessageInput.vue'
import MessageList from '../components/MessageList.vue';
// import { messages,conversations } from '../testData';
import { MessageProps,ConversationProps, MessageStatus } from '../type';
import { db } from '../db';
import { useConversationStore } from '../stores/conversation';
import { useMessageStore } from '../stores/message';

const messageStore=useMessageStore()
const route=useRoute()
const filteredMessages=computed(()=>messageStore.items)

let conversationId=ref(parseInt(route.params.id as string))
const conversation =computed(()=>useConversationStore().getConversationById(conversationId.value))

const initMessageId=parseInt(route.query.init as string)
const lastQuestion=computed(()=>messageStore.getLastQuestion(conversationId.value))
const creatingInitialMessage=async()=>{
  const createdData:Omit<MessageProps,'id'>={
    content:'',
    conversationId:conversationId.value,
    type:'answer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status:'loading'
  }
  const newMessageId= await messageStore.createMessage(createdData)
  
  if(conversation.value){
    const provider=await db.providers.where({id:conversation.value.providerId}).first()
    if(provider){
      await window.electronAPI.startChat({
        messageId:newMessageId,
        providerName:provider.name,
        selectedModel:conversation.value.selectedModel,
        content:lastQuestion.value?.content || ''
      })
    }
  }
}

watch(()=>route.params.id,async(newId:string)=>{
  conversationId.value=parseInt(newId)
  await messageStore.fetchMessagesByConversation(conversationId.value)
})
onMounted(async ()=>{
  await messageStore.fetchMessagesByConversation(conversationId.value)
  if(initMessageId){
   
    await creatingInitialMessage()
  }
  window.electronAPI.onUpdateMessage(async (streamData)=>{
    console.log('stream',streamData)
   messageStore.updateMessage(streamData)
  })
})
</script>
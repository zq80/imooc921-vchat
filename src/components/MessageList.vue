<template>
  <div class="message-list" >
    <div class="message-item mb-3" v-for="message in messages" :key="message.id">
      <div class="flex" :class="{'justify-end': message.type === 'question'}">
        <div>
          <div class="text-sm text-gray-500 mb-2" :class="{'text-right': message.type === 'question'}">
            {{message.createdAt}}
          </div>
          <div class="message-question bg-green-700 text-white p-2 rounded-md" v-if="message.type === 'question'">
            {{message.content}}
          </div>
          <div class="message-question bg-gray-200 text-gray-700 p-2 rounded-md" v-else>
            <template v-if="message.status === 'loading'">
              <Icon icon="eos-icons:three-dots-loading"></Icon>
            </template>
            <div v-else class="prose">
              <VueMarkdown :source="message.content"></VueMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>
  
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { MessageProps } from 'src/type';
import VueMarkdown from 'vue-markdown-render';
defineProps<{ messages: MessageProps[] }>()

</script>
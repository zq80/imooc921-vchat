<template>
    <div class="conversation-list">
        <div 
            class="item border-gray-300 border-t cursor-pointer p-2"
            :class="{
                'bg-gray-100 hover:bg-gray-300':store.selectedId===item.id,
                'bg-white hover:bg-gray-200':store.selectedId!==item.id
            }"
            v-for="item in items"
            :key="item.id"
        >
            <a @click.prevent="goToConversation(item.id)">
                <div class=" flex justify-between items-center text-sm leading-5 text-gray-500">
                    <span>{{ item.selectedModel }}</span>
                    <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD') }}</span>
                </div>
                <h2 class=" font-semibold leading-6 text-gray-900 truncate">{{ item.title }}</h2>
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { ConversationProps } from 'src/type';
import { RouterLink } from 'vue-router';
import { useConversationStore } from '../stores/conversation';
defineProps<{items:ConversationProps[]}>()
const router=useRouter()
const store=useConversationStore()
const goToConversation=(id:number) => {
    router.push({path:`/conversation/${id}`})
    store.selectedId=id
}
</script>
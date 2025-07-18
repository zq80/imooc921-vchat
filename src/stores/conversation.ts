import { defineStore } from "pinia";
import { ConversationProps } from '../type'
import { db } from "../db";

export interface ConversationStore {
    items: ConversationProps[];
    selectedId: number;
}

export const useConversationStore = defineStore('conversation', {
    state: (): ConversationStore => {
        return {
            items: [],
            selectedId: -1
        }
    },
    actions: {
        async fetchConversations() {
            const items = await db.conversations.toArray()
            this.items = items
        },
        async createConversation(createdData: Omit<ConversationProps, 'id'>) {
            const newCId = await db.conversations.add(createdData)
            this.items.push({
                id: newCId,
                ...createdData
            })
            return newCId
        }
    },
    getters: {
        totalNumber: (state) => state.items.length,
        getConversationById: (state) => (id: number) => {
            return state.items.find(item => item.id === id)
        }
    }
})
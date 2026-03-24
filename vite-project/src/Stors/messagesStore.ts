import {create} from "zustand";
import {persist} from 'zustand/middleware';



export type MessageType = {
    id: string,
    chatId: string,
    text: string,
    senderId: string,
}

interface MessageStore{
    messages:MessageType[]
    addMessage: (newMessages: MessageType) => void,
    clearAllMessage: () => void
}

export const useMessages = create(persist<MessageStore>((set) => ({
    messages: [],
    addMessage: (newMessages) => set((state) => 
        ({...state, messages: [...state.messages, newMessages]})),
     clearAllMessage: () =>set({messages: []}) 
         
     
}),
{name: 'chat-massage-storage'}
))



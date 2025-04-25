import { MessageDto } from '../types/messageDto';
import { MessageRequestDto } from '../types/messageRequestDto';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7226/api';

export const messageApi = {
  // Add a new message
  addMessage: async (message: MessageRequestDto): Promise<MessageDto> => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData || `Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  },
  
  // Get all messages (for admin use)
  getMessages: async (): Promise<MessageDto[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }
};
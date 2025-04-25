import { useState } from 'react';
import { messageApi } from '../api/messageApi';
import { MessageDto } from '../types/messageDto';
import { MessageRequestDto } from '../types/messageRequestDto';

export const useMessages = () => {
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Function to add a new message
  const addMessage = async (message: MessageRequestDto): Promise<MessageDto> => {
    try {
      const addedMessage = await messageApi.addMessage(message);
      return addedMessage;
    } catch (err) {
      // Let the component handle the error
      throw err;
    }
  };
  
  // Function to fetch all messages (for admin)
  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await messageApi.getMessages();
      setMessages(data);
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error('Error in fetchMessages:', err);
      } else {
        setError('Failed to fetch messages');
        console.error('Error in fetchMessages:', err);
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { messages, isLoading, error, addMessage, fetchMessages };
};
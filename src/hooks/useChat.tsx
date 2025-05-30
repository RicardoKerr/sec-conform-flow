
import { useState, useCallback } from 'react';
import { Message, QuickQuestion } from '@/types/chat';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

// N8N webhook URL 
const N8N_WEBHOOK_URL = 'https://n8n.rakewells.com/webhook-test/e9400452-abae-444f-9e6a-54b7e72dab05';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome to the ISO Guardian! I'm your AI assistant for ISO/IEC 27001 compliance. How can I help you today with your information security management system?",
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = useCallback(async (content: string, fileData?: { url: string, name: string }) => {
    try {
      // Add user message to chat
      const userMessageId = uuidv4();
      const userMessage: Message = {
        id: userMessageId,
        role: 'user',
        content,
        timestamp: new Date(),
        fileUrl: fileData?.url,
        fileName: fileData?.name,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Send message to N8N webhook
      const payload = {
        message: content,
        fileUrl: fileData?.url,
        fileName: fileData?.name,
        timestamp: new Date().toISOString(),
        messageId: userMessageId,
      };

      console.log("Sending to N8N:", payload);
      
      // Send actual request to N8N webhook
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log("N8N response status:", response.status);

      // Process the N8N response
      try {
        // Try to parse the response JSON
        const responseData = await response.json();
        console.log("N8N response data:", responseData);

        // Extract the message content from the response
        // Adjust this based on the actual structure of the N8N response
        const assistantContent = responseData.message || responseData.content || responseData.response;

        if (assistantContent) {
          // Create assistant message with content from N8N
          const assistantMessage: Message = {
            id: uuidv4(),
            role: 'assistant',
            content: assistantContent,
            timestamp: new Date(),
          };
          
          setMessages((prev) => [...prev, assistantMessage]);
          setIsLoading(false);
          return; // Exit early as we've already added the message
        } else {
          console.warn("N8N response doesn't contain expected message content:", responseData);
        }
      } catch (parseError) {
        console.error("Error parsing N8N response:", parseError);
        toast({
          title: 'Warning',
          description: 'Received an invalid response format from N8N. Using fallback response.',
        });
      }

      // Fallback mechanism if N8N response couldn't be processed correctly
      const fallbackResponses = [
        "Thank you for your question about ISO 27001 compliance. To provide you with the most accurate guidance, could you please specify which aspect of information security management you're interested in? I can help with risk assessment, required documentation, control implementation, audit preparation, or other compliance-related topics.",
        "Based on your query, I'd recommend starting with a comprehensive risk assessment as outlined in ISO 27001 section 6.1. This process involves identifying assets, threats, vulnerabilities, and implementing appropriate controls.",
        "When preparing for an ISO 27001 audit, ensure you have documented evidence of risk assessments, security policies, control implementations, and incident management procedures. Would you like me to provide a detailed checklist for audit preparation?",
        "For ISO 27001 certification, you'll need several mandatory documents including the scope of the ISMS, information security policy, risk assessment methodology, Statement of Applicability (SoA), and various security procedures. Can I provide more details on any specific document?"
      ];
      
      const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  }, [toast]);

  const sendQuickQuestion = useCallback((question: QuickQuestion) => {
    sendMessage(question.text);
  }, [sendMessage]);

  const sendAudioMessage = useCallback((audioBlob: Blob) => {
    // In a real application, we would upload this to Supabase
    // For now, we'll simulate sending the audio content
    toast({
      title: 'Audio received',
      description: 'Processing your audio message...',
    });
    
    // Simulate a message from audio
    setTimeout(() => {
      sendMessage("This is a transcribed message from audio input.");
    }, 1000);
  }, [sendMessage, toast]);

  const uploadFile = useCallback(async (file: File) => {
    try {
      // In a real application, we would upload this to Supabase
      // For now, we'll simulate the upload
      toast({
        title: 'File received',
        description: `Uploading ${file.name}...`,
      });
      
      // Simulate successful upload after delay
      setTimeout(() => {
        toast({
          title: 'Upload complete',
          description: `${file.name} has been uploaded.`,
        });
        
        // Send a message with file attachment
        sendMessage(
          `I've uploaded a file: ${file.name}`,
          { url: URL.createObjectURL(file), name: file.name }
        );
      }, 1500);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Upload failed',
        description: 'Failed to upload file. Please try again.',
        variant: 'destructive',
      });
    }
  }, [sendMessage, toast]);

  return {
    messages,
    isLoading,
    sendMessage,
    sendQuickQuestion,
    sendAudioMessage,
    uploadFile,
  };
}

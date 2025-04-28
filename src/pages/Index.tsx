
import { useRef } from 'react';
import ChatInterface from '@/components/ChatInterface';
import MessageInput from '@/components/MessageInput';
import AIVisualizer from '@/components/AIVisualizer';
import QuickQuestions from '@/components/QuickQuestions';
import { useChat } from '@/hooks/useChat';
import { QuickQuestion } from '@/types/chat';

const Index = () => {
  // Sample quick questions
  const quickQuestions: QuickQuestion[] = [
    {
      id: '1',
      text: 'What is ISO/IEC 27001?'
    },
    {
      id: '2',
      text: 'How do I prepare for an ISO 27001 audit?'
    },
    {
      id: '3',
      text: 'Required ISO 27001 documents?'
    }
  ];

  const { 
    messages, 
    isLoading, 
    sendMessage, 
    sendQuickQuestion, 
    sendAudioMessage,
    uploadFile
  } = useChat();

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Left side - Chat interface */}
        <div className="w-full md:w-2/3 flex flex-col glass-panel m-4">
          <ChatInterface 
            messages={messages} 
            isLoading={isLoading} 
          />
          <MessageInput 
            onSendMessage={sendMessage}
            onSendAudio={sendAudioMessage}
            onUploadFile={uploadFile}
            isLoading={isLoading}
          />
        </div>

        {/* Right side - AI Visualizer */}
        <div className="w-full md:w-1/3 glass-panel m-4 overflow-hidden flex flex-col">
          <div className="flex-1 flex items-center justify-center p-4">
            <AIVisualizer />
          </div>
          <div className="p-4">
            <QuickQuestions 
              questions={quickQuestions}
              onSelectQuestion={sendQuickQuestion}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

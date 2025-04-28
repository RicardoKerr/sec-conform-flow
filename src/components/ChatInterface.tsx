
import React from 'react';
import { Message } from '@/types/chat';
import { format } from 'date-fns';
import { Download } from 'lucide-react';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading }) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          } mb-4`}
        >
          {message.role === 'assistant' && (
            <div className="mr-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-iso-accent flex items-center justify-center">
                <span className="text-iso-dark font-bold text-xs">ISO</span>
              </div>
            </div>
          )}

          <div
            className={`max-w-[80%] md:max-w-[70%] glass-panel p-3 ${
              message.role === 'user'
                ? 'bg-iso-light bg-opacity-30'
                : 'bg-iso-medium bg-opacity-40'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium text-xs text-iso-accent">
                {message.role === 'user' ? 'You' : 'ISO Guardian'}
              </span>
              <span className="text-xs text-iso-text/50">
                {format(new Date(message.timestamp), 'HH:mm')}
              </span>
            </div>
            
            <p className="text-sm text-iso-text whitespace-pre-wrap">{message.content}</p>
            
            {message.fileUrl && (
              <div className="mt-2 p-2 rounded bg-iso-dark bg-opacity-30 flex items-center justify-between">
                <span className="text-xs truncate flex-1">{message.fileName}</span>
                <a 
                  href={message.fileUrl} 
                  download={message.fileName}
                  className="ml-2 p-1 hover:bg-iso-accent hover:bg-opacity-20 rounded"
                >
                  <Download className="h-4 w-4 text-iso-accent" />
                </a>
              </div>
            )}
          </div>

          {message.role === 'user' && (
            <div className="ml-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-iso-light flex items-center justify-center">
                <span className="text-iso-text text-xs font-medium">You</span>
              </div>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="mr-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-iso-accent flex items-center justify-center">
              <span className="text-iso-dark font-bold text-xs">ISO</span>
            </div>
          </div>
          <div className="glass-panel p-4 flex items-center space-x-2">
            <div className="w-2 h-2 bg-iso-accent rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-iso-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-iso-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatInterface;

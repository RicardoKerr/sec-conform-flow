
import React, { useState, useRef } from 'react';
import { Mic, MicOff, Upload, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onSendAudio: (audioBlob: Blob) => void;
  onUploadFile: (file: File) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onSendAudio,
  onUploadFile,
  isLoading
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadFile(file);
      // Reset the input
      e.target.value = '';
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        onSendAudio(audioBlob);
        
        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: 'Recording started',
        description: 'Speak now. Click the microphone button again to stop.',
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: 'Microphone access denied',
        description: 'Please allow microphone access to use this feature.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-4 border-t border-iso-light border-opacity-30">
      <div className="relative flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message or question about ISO 27001..."
          className="w-full p-3 pr-24 bg-iso-medium bg-opacity-50 border border-iso-light border-opacity-30 rounded-md focus:outline-none focus:ring-1 focus:ring-iso-accent text-iso-text"
          disabled={isLoading}
        />
        
        <div className="absolute right-2 flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="h-8 w-8 rounded-full bg-iso-light bg-opacity-30 hover:bg-iso-light hover:bg-opacity-50 text-iso-text"
          >
            <Upload className="h-4 w-4" />
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={toggleRecording}
            disabled={isLoading}
            className={`h-8 w-8 rounded-full ${
              isRecording 
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-iso-light bg-opacity-30 hover:bg-iso-light hover:bg-opacity-50 text-iso-text'
            }`}
          >
            {isRecording ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={handleSendMessage}
            disabled={isLoading || !message.trim()}
            className="h-8 w-8 rounded-full bg-iso-accent text-iso-dark hover:bg-opacity-80"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;


import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ContactMessage, StoredContactMessage } from '@/lib/types';

export default function Contacts() {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    message: ''
  });
  const [messages, setMessages] = useState<StoredContactMessage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Load messages from localStorage
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('contactMessages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error('Failed to load contact messages:', error);
    }
  }, []);

  // Save messages to localStorage
  const saveMessages = (updatedMessages: StoredContactMessage[]) => {
    try {
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Failed to save contact messages:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new message with timestamp
      const newMessage: StoredContactMessage = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage
      const updatedMessages = [...messages, newMessage];
      saveMessages(updatedMessages);
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('success');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Failed to submit message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <h2 className="text-lg font-bold mb-4">Contact Me</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              rows={4}
            />
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
          
          {submitStatus === 'success' && (
            <p className="text-green-600 text-sm">Message sent successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600 text-sm">Failed to send message. Please try again.</p>
          )}
        </form>

        {messages.length > 0 && (
          <div>
            <h3 className="text-md font-semibold mb-2">Previous Messages</h3>
            <div className="space-y-2 max-h-40 overflow-auto">
              {messages.map((msg) => (
                <div key={msg.id} className="p-2 bg-gray-100 rounded text-sm">
                  <div className="font-medium">{msg.name} ({msg.email})</div>
                  <div className="text-gray-600 text-xs">
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                  <div className="mt-1">{msg.message}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

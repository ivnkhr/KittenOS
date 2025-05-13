import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { insertContactMessageSchema } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

// Import contact-related icons
import mailIcon from '@/assets/icons/mail.svg';
import phoneIcon from '@/assets/icons/phone.svg';
import globeIcon from '@/assets/icons/globe.svg';
import worldIcon from '@/assets/icons/world.svg';
import networkIcon from '@/assets/icons/network.svg';
import codeIcon from '@/assets/icons/api.svg';
import messageIcon from '@/assets/icons/chat.svg';
import profileIcon from '@/assets/icons/profile.svg';

// Extend the contact message schema with validation
const contactFormSchema = insertContactMessageSchema.extend({
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contacts: React.FC = () => {
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully!",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to send message: ${(error as Error).message}`,
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="grid grid-cols-1 gap-4 font-['MS_Sans_Serif',sans-serif] text-xs">
      {/* Contact Info */}
      <div className="bg-white p-3 border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] mb-4">
        <div className="font-bold mb-2">Contact Information</div>
        <div className="grid grid-cols-1 gap-1">
          <div className="flex items-center">
            <img src={mailIcon} alt="Email" className="mr-2 h-4 w-4" />
            <span>john.doe@example.com</span>
          </div>
          <div className="flex items-center">
            <img src={phoneIcon} alt="Phone" className="mr-2 h-4 w-4" />
            <span>(123) 456-7890</span>
          </div>
          <div className="flex items-center">
            <img src={globeIcon} alt="Website" className="mr-2 h-4 w-4" />
            <span>www.johndoe-dev.example.com</span>
          </div>
          <div className="flex items-center">
            <img src={worldIcon} alt="Location" className="mr-2 h-4 w-4" />
            <span>San Francisco, CA</span>
          </div>
        </div>
      </div>
      
      {/* Contact Form */}
      <div className="bg-white p-3 border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080]">
        <div className="font-bold mb-2">Send Me a Message</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label className="block mb-1">Your Name:</label>
            <input 
              type="text" 
              className="w-full border-[2px] border-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF] bg-white p-1"
              {...register('name')} 
            />
            {errors.name && <span className="text-red-600 text-xs">{errors.name.message}</span>}
          </div>
          
          <div className="mb-2">
            <label className="block mb-1">Your Email:</label>
            <input 
              type="email" 
              className="w-full border-[2px] border-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF] bg-white p-1"
              {...register('email')} 
            />
            {errors.email && <span className="text-red-600 text-xs">{errors.email.message}</span>}
          </div>
          
          <div className="mb-2">
            <label className="block mb-1">Subject:</label>
            <input 
              type="text" 
              className="w-full border-[2px] border-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF] bg-white p-1"
              {...register('subject')} 
            />
            {errors.subject && <span className="text-red-600 text-xs">{errors.subject.message}</span>}
          </div>
          
          <div className="mb-3">
            <label className="block mb-1">Message:</label>
            <textarea 
              className="w-full border-[2px] border-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF] bg-white p-1 h-20 resize-none"
              {...register('message')} 
            ></textarea>
            {errors.message && <span className="text-red-600 text-xs">{errors.message.message}</span>}
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="px-3 py-1 border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] bg-[#C0C0C0]"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Social Media */}
      <div className="bg-white p-3 border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080]">
        <div className="font-bold mb-2">Connect With Me</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center cursor-pointer hover:bg-[#D4D0C8]">
            <img src={networkIcon} alt="LinkedIn" className="mr-2 h-4 w-4" />
            <span>LinkedIn</span>
          </div>
          <div className="flex items-center cursor-pointer hover:bg-[#D4D0C8]">
            <img src={codeIcon} alt="GitHub" className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </div>
          <div className="flex items-center cursor-pointer hover:bg-[#D4D0C8]">
            <img src={messageIcon} alt="Twitter" className="mr-2 h-4 w-4" />
            <span>Twitter</span>
          </div>
          <div className="flex items-center cursor-pointer hover:bg-[#D4D0C8]">
            <img src={profileIcon} alt="Portfolio" className="mr-2 h-4 w-4" />
            <span>Portfolio</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;

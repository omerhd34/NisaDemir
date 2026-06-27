'use client';
import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { pushDataLayerEvent } from '@/lib/analytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select';

const SUBJECT_OPTIONS = [
 'Bireysel Terapi',
 'Online Terapi',
 'Randevu Talebi',
 'Genel Bilgi',
 'Diğer',
];

const ContactForm = () => {
 const [errors, setErrors] = useState({});
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  subject: '',
  message: '',
 });
 const [submitted, setSubmitted] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);

 const validate = () => {
  const { name, email, subject, message } = formData;
  const newErrors = {};
  if (!name) newErrors.name = 'Lütfen adınızı girin.';
  if (!email) newErrors.email = 'Lütfen e-posta adresinizi girin.';
  if (!subject) newErrors.subject = 'Lütfen bir konu seçin.';
  if (!message) newErrors.message = 'Lütfen bir mesaj girin.';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
   newErrors.email = 'Lütfen geçerli bir e-posta adresi girin.';
  }
  if (message && message.trim().length < 15) {
   newErrors.message = 'Mesaj en az 15 karakter olmalıdır.';
  }
  return newErrors;
 };

 const handleSubmit = async (e) => {
  e?.preventDefault?.();
  const newErrors = validate();
  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  setIsSubmitting(true);
  try {
   const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
   });
   const result = await response.json();
   if (response.ok) {
    pushDataLayerEvent('contact_form_submit', {
     form_subject: formData.subject,
     event_category: 'lead',
    });
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setTimeout(() => setSubmitted(false), 4000);
   } else {
    setErrors({ general: result.error || 'Mesaj gönderilirken bir hata oluştu.' });
   }
  } catch (error) {
   console.error('Hata:', error);
   setErrors({ general: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.' });
  } finally {
   setIsSubmitting(false);
  }
 };

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  if (errors[name]) {
   setErrors((prev) => ({ ...prev, [name]: undefined }));
  }
 };

 const handleSubjectSelect = (value) => {
  setFormData((prev) => ({ ...prev, subject: value }));
  if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
 };

 return (
  <Card className="w-full h-full min-h-full flex-1 flex flex-col animate-slideUp">
   <CardHeader className="pb-2 shrink-0">
    <CardTitle className="font-serif text-2xl md:text-3xl text-heading">
     Benimle İletişime <span className="italic font-normal text-primary dark:text-primary-dark-light">Geçin</span>
    </CardTitle>
    <p className="text-sm text-body mt-1">
     Sorularınız veya randevu talepleriniz için formu doldurabilirsiniz.
    </p>
   </CardHeader>

   <CardContent className="flex-1 flex flex-col pt-4">
    {submitted && (
     <div className="mb-6 p-4 rounded-xl flex items-center gap-3 animate-fadeIn bg-primary/10 dark:bg-primary-dark/15 border border-primary/30 dark:border-primary-dark/30">
      <CheckCircle2 className="w-5 h-5 shrink-0 text-primary dark:text-primary-dark-light" />
      <span className="text-sm font-medium text-heading">
       Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapılacaktır.
      </span>
     </div>
    )}

    {errors.general && (
     <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-sm text-red-700 dark:text-red-300">
      {errors.general}
     </div>
    )}

    <form onSubmit={handleSubmit} className="flex flex-1 flex-col space-y-5">
     <div className="grid sm:grid-cols-2 gap-4">
      <div className="space-y-2">
       <Label htmlFor="name">
        Adınız ve Soyadınız <span className="text-primary">*</span>
       </Label>
       <Input
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Adınız Soyadınız"
        aria-invalid={!!errors.name}
       />
       {errors.name && (
        <p className="text-xs text-red-600 dark:text-red-400">{errors.name}</p>
       )}
      </div>

      <div className="space-y-2">
       <Label htmlFor="email">
        E-posta <span className="text-primary">*</span>
       </Label>
       <Input
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="ornek@email.com"
        aria-invalid={!!errors.email}
       />
       {errors.email && (
        <p className="text-xs text-red-600 dark:text-red-400">{errors.email}</p>
       )}
      </div>
     </div>

     <div className="space-y-2">
      <Label htmlFor="subject">
       Konu <span className="text-primary">*</span>
      </Label>
      <Select value={formData.subject} onValueChange={handleSubjectSelect}>
       <SelectTrigger id="subject" aria-invalid={!!errors.subject}>
        <SelectValue placeholder="Konu seçiniz" />
       </SelectTrigger>
       <SelectContent>
        {SUBJECT_OPTIONS.map((opt) => (
         <SelectItem key={opt} value={opt}>
          {opt}
         </SelectItem>
        ))}
       </SelectContent>
      </Select>
      {errors.subject && (
       <p className="text-xs text-red-600 dark:text-red-400">{errors.subject}</p>
      )}
     </div>

     <div className="space-y-2 flex-1 flex flex-col min-h-0">
      <Label htmlFor="message">
       Mesaj <span className="text-primary">*</span>
      </Label>
      <Textarea
       id="message"
       name="message"
       value={formData.message}
       onChange={handleChange}
       rows={6}
       placeholder="Mesajınızı buraya yazın..."
       aria-invalid={!!errors.message}
       className="flex-1 min-h-36 resize-none"
      />
      {errors.message && (
       <p className="text-xs text-red-600 dark:text-red-400">{errors.message}</p>
      )}
     </div>

     <Button type="submit" size="lg" className="w-full shrink-0 mt-auto" disabled={isSubmitting}>
      <Send className="w-4 h-4" />
      {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
     </Button>
    </form>
   </CardContent>
  </Card>
 );
};

export default ContactForm;

import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, CheckCircle } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Contactez-nous
        </h1>
        <p className="text-xl text-gray-600">
          Notre équipe est à votre disposition pour répondre à vos questions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Envoyez-nous un message
          </h2>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Message envoyé !
              </h3>
              <p className="text-gray-600">
                Nous vous répondrons dans les plus brefs délais.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Sujet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                  placeholder="Objet de votre message"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#156D3E] text-white px-6 py-3 rounded-md hover:bg-[#0f5630] transition-colors font-semibold"
              >
                Envoyer le message
              </button>
            </form>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Informations de contact
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#156D3E] bg-opacity-10 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-[#156D3E]" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Téléphone</h3>
                <p className="text-gray-600">+212 6XX XXX XXX</p>
                <p className="text-gray-600">Du lundi au vendredi, 9h-18h</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#156D3E] bg-opacity-10 p-3 rounded-lg">
                <MessageCircle className="h-6 w-6 text-[#156D3E]" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">WhatsApp</h3>
                <p className="text-gray-600">+212 6XX XXX XXX</p>
                <p className="text-gray-600">Disponible 24/7</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#156D3E] bg-opacity-10 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-[#156D3E]" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Email</h3>
                <p className="text-gray-600">contact@enginex.ma</p>
                <p className="text-gray-600">support@enginex.ma</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#156D3E] bg-opacity-10 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-[#156D3E]" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Adresse</h3>
                <p className="text-gray-600">Casablanca, Maroc</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-[#156D3E] bg-opacity-5 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-gray-900">Horaires d'ouverture</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span className="font-medium">9h00 - 18h00</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi</span>
                <span className="font-medium">9h00 - 13h00</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche</span>
                <span className="font-medium">Fermé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

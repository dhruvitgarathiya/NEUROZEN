import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Info } from 'lucide-react';

function EmergencyContactPage() {
  const [openSection, setOpenSection] = useState(null);

  const contacts = [
    {
      category: 'Government Helplines',
      items: [
        { name: 'NIMHANS Mental Health Helpline', phone: '080-4611-0007', details: '24/7 mental health support' },
        { name: 'Snehi Helpline', phone: '9582-200-500', details: 'Support for emotional distress' },
      ],
    },
    {
      category: 'National Helplines',
      items: [
        { name: 'KIRAN Mental Health Helpline', phone: '1800-599-0019', details: '24/7 support in 13 languages' },
        { name: 'Vandrevala Foundation', phone: '9999-666-555', details: '24/7 mental health support' },
        { name: 'Fortis National Helpline', phone: '8376-804-102', details: '24/7 multilingual support' },
      ],
    },
    {
      category: 'Regional Helplines',
      items: [
        { name: 'SNEHA (Chennai)', phone: '044-2464-0050', details: '8 AM - 10 PM daily' },
        { name: 'Sanjivini Society (Delhi)', phone: '011-4076-9002', details: '10 AM - 4 PM daily' },
        { name: 'Lifeline Foundation (Kolkata)', phone: '033-4044-7437', details: '10 AM - 10 PM daily' },
      ],
    },
  ];

  const guidelines = [
    "Stay connected with loved ones and talk about your feelings.",
    "Practice self-care activities like meditation, yoga, and exercise.",
    "Seek professional help if you feel overwhelmed or distressed.",
    "Limit social media consumption and take breaks from negativity.",
    "Maintain a healthy routine with proper sleep, diet, and relaxation.",
  ];

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800">Mental Health Helplines in India</h1>
        <p className="text-lg text-green-600 mt-2">Reach out anytime. Help is available.</p>
      </header>

      <main className="w-full max-w-2xl">
        {contacts.map((section, index) => (
          <motion.div
            key={index}
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <button
              className="w-full flex justify-between items-center p-4 bg-green-200 text-green-800 font-semibold rounded-lg"
              onClick={() => setOpenSection(openSection === index ? null : index)}
            >
              {section.category}
              <span>{openSection === index ? '-' : '+'}</span>
            </button>
            {openSection === index && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-2 p-4 bg-green-100 rounded-lg"
              >
                {section.items.map((contact, i) => (
                  <li key={i} className="mb-3 flex items-center text-green-900">
                    <Phone className="mr-2 text-green-600" size={20} />
                    <div>
                      <p className="font-bold">{contact.name}</p>
                      <p className="text-sm">{contact.details}</p>
                      <p className="text-md font-semibold">{contact.phone}</p>
                    </div>
                  </li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        ))}

        <section className="mt-8 w-full">
          <h2 className="text-2xl font-bold text-green-800 flex items-center">
            <Info className="mr-2 text-green-600" size={24} /> Mental Health Guidelines
          </h2>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 p-4 bg-green-100 rounded-lg"
          >
            {guidelines.map((tip, i) => (
              <li key={i} className="text-green-900 mb-2">• {tip}</li>
            ))}
          </motion.ul>
        </section>
      </main>
    </div>
  );
}

export default EmergencyContactPage;
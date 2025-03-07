import { Brain, HeartPulse, Smile, Clock } from "lucide-react";

const features = [
  { icon: <Brain size={40} className="text-green-600" />, title: "Mindfulness", desc: "Guided meditations & stress relief tools." },
  { icon: <HeartPulse size={40} className="text-green-600" />, title: "Health Insights", desc: "AI-driven wellness tracking & suggestions." },
  { icon: <Smile size={40} className="text-green-600" />, title: "Mood Tracker", desc: "Log emotions & receive motivation." },
  { icon: <Clock size={40} className="text-green-600" />, title: "Personalized Plan", desc: "Daily self-care goals tailored for you." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 px-4 sm:px-8 bg-green-100 text-center">
      <h2 className="text-3xl font-bold text-green-700">Why Choose NuroZen?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-white shadow-lg rounded-xl flex flex-col items-center hover:scale-105 transition">
            <div className="bg-green-200 p-4 rounded-full">{feature.icon}</div>
            <h3 className="text-lg font-semibold mt-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

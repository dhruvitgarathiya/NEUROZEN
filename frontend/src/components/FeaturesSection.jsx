import { Brain, HeartPulse, Smile, Clock } from "lucide-react";

const features = [
  { icon: <Brain size={48} className="text-green-600" />, title: "Mindfulness", desc: "Guided meditations & stress relief tools." },
  { icon: <HeartPulse size={48} className="text-green-600" />, title: "Health Insights", desc: "AI-driven wellness tracking & suggestions." },
  { icon: <Smile size={48} className="text-green-600" />, title: "Mood Tracker", desc: "Log emotions & receive motivation." },
  { icon: <Clock size={48} className="text-green-600" />, title: "Personalized Plan", desc: "Daily self-care goals tailored for you." },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-20 px-6 sm:px-12 bg-gradient-to-br from-green-50 via-green-100 to-green-50 text-center"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <h2 className="text-4xl font-extrabold text-green-800 tracking-tight mb-12">
        Why Choose <span className="text-green-600">NEUROZEN</span>?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-70 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center text-left shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-default"
          >
            <div
              className="bg-gradient-to-tr from-green-300 to-green-500 p-5 rounded-full mb-6 flex items-center justify-center
                text-white drop-shadow-md
                transform transition-transform duration-500 hover:scale-110"
            >
              {feature.icon}
            </div>

            <h3 className="text-xl font-semibold text-green-900 mb-3">{feature.title}</h3>
            <p className="text-green-800 text-base leading-relaxed text-center">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

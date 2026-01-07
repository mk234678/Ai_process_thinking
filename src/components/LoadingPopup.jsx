import { useEffect, useState } from 'react';
import { Brain, Sparkles } from 'lucide-react';

const LoadingPopup = ({ isVisible, message = "AI is thinking..." }) => {
  const [dots, setDots] = useState('');
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        delay: i * 0.15,
      }));
      setParticles(newParticles);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-scaleIn">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-50"></div>

        <div className="relative z-10">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse blur-xl opacity-50"></div>

              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-6 animate-float">
                <Brain className="w-12 h-12 text-white animate-pulse" />
              </div>

              {particles.map((particle) => (
                <div
                  key={particle.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: `orbit 3s linear infinite`,
                    animationDelay: `${particle.delay}s`,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </div>
              ))}
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {message}{dots}
              </h3>
              <p className="text-gray-600 text-sm">Please wait while I process your request</p>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-progress"></div>
            </div>

            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPopup;

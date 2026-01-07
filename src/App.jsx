import { useState } from 'react';
import LoadingPopup from './components/LoadingPopup.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState('');

  const handleAskQuestion = () => {
    if (!question.trim()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert(`AI Response: Here's an answer to "${question}"`);
      setQuestion('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Question Assistant
            </h1>
            <p className="text-gray-600">Ask me anything and see the loading animation</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here..."
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none resize-none transition-all duration-300"
                rows="4"
              />
            </div>

            <button
              onClick={handleAskQuestion}
              disabled={!question.trim() || isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Processing...' : 'Ask AI'}
            </button>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-700 mb-3">Try asking:</h3>
            <div className="space-y-2">
              {[
                'What is artificial intelligence?',
                'How does machine learning work?',
                'Explain quantum computing in simple terms',
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setQuestion(suggestion)}
                  className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 text-sm text-gray-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <LoadingPopup isVisible={isLoading} message="AI is thinking" />
    </div>
  );
}

export default App;

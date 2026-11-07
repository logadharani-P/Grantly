import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RotateCcw, 
  ExternalLink, 
  ShieldCheck, 
  User, 
  MessageSquarePlus, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { AIMessage } from '../../types';
import { aiService } from '../../services/ai/aiService';
import { useAuth } from '../../contexts/AuthContext';

export const AIAssistantPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'msg-init-page',
      role: 'assistant',
      content: `Welcome to GRANTLY AI Assistant! I am grounded in authentic government gazettes, university directives, and scholarship requirements.\n\nYou are currently signed in as **${user?.name || 'Scholar'}** (${user?.educationLevel.toUpperCase() || 'STUDENT'}). How can I assist you with eligibility, documentation, or application guidelines today?`,
      timestamp: 'Now',
      confidence: 'high'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (customPrompt?: string) => {
    const text = customPrompt || input;
    if (!text.trim() || isTyping) return;

    const userMessage: AIMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customPrompt) setInput('');
    setIsTyping(true);

    try {
      const response = await aiService.sendMessage(text, messages, user);
      setMessages(prev => [...prev, response]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          role: 'assistant',
          content: 'I apologize, an error occurred while accessing the verified scholarship catalog. Please try your question again.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewConversation = () => {
    setMessages([
      {
        id: 'msg-init-page-' + Date.now(),
        role: 'assistant',
        content: 'New session started. Ask any question regarding scholarships, eligibility cutoffs, or documentation rules.',
        timestamp: 'Now',
        confidence: 'high'
      }
    ]);
  };

  const sampleQuestions = [
    'Which scholarships match my academic background?',
    'What documents should I prepare for NSP?',
    'What does the income requirement mean?',
    'When does the application close for major schemes?',
    'Can you explain the scholarship application process?',
    'Which scholarships are available for postgraduate students?'
  ];

  return (
    <div className="ai-page-root">
      {/* Header */}
      <section className="ai-header-banner">
        <div className="container">
          <div className="header-meta-row">
            <span className="section-eyebrow">Cognitive Guidance Engine</span>
            <span className="provenance-tag">
              <ShieldCheck size={16} className="text-success" />
              Grounded in Gazette Data • Zero Fake Links
            </span>
          </div>
          <div className="ai-header-flex">
            <div>
              <h1 className="ai-title">AI Scholarship Assistant</h1>
              <p className="ai-subtitle">
                Ask questions about eligibility criteria, required paperwork, and deadlines verified against public authorities.
              </p>
            </div>
            <button onClick={handleNewConversation} className="btn btn-secondary btn-sm">
              <MessageSquarePlus size={16} /> New Chat Session
            </button>
          </div>
        </div>
      </section>

      {/* Main Chat Interface */}
      <section className="section-padding">
        <div className="container container-narrow">
          <div className="card ai-chat-card">
            {/* Top Disclaimer Pill */}
            <div className="ai-safety-banner">
              <ShieldCheck size={16} className="text-primary" />
              <span>
                <strong>Demonstration Mode:</strong> The assistant references retrieved scholarship records. It never guarantees sanctions or submits applications directly to external portals.
              </span>
            </div>

            {/* Chat Messages Log */}
            <div className="ai-messages-scroll-area">
              {messages.map((m) => (
                <div key={m.id} className={`chat-bubble-row ${m.role === 'user' ? 'user-aligned' : 'ai-aligned'}`}>
                  <div className="bubble-avatar">
                    {m.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                  </div>

                  <div className="bubble-content-card">
                    <div className="bubble-meta">
                      <span className="bubble-author">
                        {m.role === 'assistant' ? 'GRANTLY Assistant' : user?.name || 'You'}
                      </span>
                      <span className="bubble-timestamp">{m.timestamp}</span>
                    </div>

                    <div className="bubble-text">
                      <p style={{ whiteSpace: 'pre-line' }}>{m.content}</p>
                    </div>

                    {/* Official Source Citations */}
                    {m.sourceReferences && m.sourceReferences.length > 0 && (
                      <div className="bubble-sources-box">
                        <span className="sources-title">Verified Source Provenance:</span>
                        <div className="sources-chips">
                          {m.sourceReferences.map((src, i) => (
                            <a
                              key={i}
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="source-chip"
                            >
                              <ExternalLink size={12} />
                              <span>{src.title}</span>
                              {src.note && <span className="source-note">({src.note})</span>}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chat-bubble-row ai-aligned">
                  <div className="bubble-avatar"><Bot size={20} /></div>
                  <div className="bubble-content-card typing-bubble">
                    <div className="typing-dots">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Pills */}
            <div className="ai-suggested-pills-bar">
              <span className="pills-label">Suggested Inquiries:</span>
              <div className="pills-scroll-row">
                {sampleQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    disabled={isTyping}
                    className="sample-prompt-pill"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="ai-chat-input-form"
            >
              <input
                type="text"
                placeholder="Ask about marks cutoff, income rules, documents, or deadlines..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                className="ai-main-input"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="btn btn-primary btn-md chat-submit-btn"
              >
                <Send size={18} />
                <span className="desktop-only">Send</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};


import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Maximize2, ExternalLink, Bot, User, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AIMessage } from '../../types';
import { aiService } from '../../services/ai/aiService';
import { useAuth } from '../../contexts/AuthContext';

export const FloatingAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome-floating',
      role: 'assistant',
      content: 'Hello! I am your GRANTLY AI Assistant. Ask me anything about eligibility criteria, required documents, or application deadlines.',
      timestamp: 'Now',
      confidence: 'high'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isTyping) return;

    const userMsg: AIMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
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
          content: 'Sorry, I encountered an issue processing your request. Please try again.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestedPrompts = [
    'Which scholarships match my profile?',
    'What documents should I prepare?',
    'Explain income requirements',
    'Upcoming scholarship deadlines'
  ];

  return (
    <div className="floating-assistant-container">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          className="floating-assistant-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
          title="Ask GRANTLY AI Assistant"
        >
          <div className="assistant-btn-pulse"></div>
          <Sparkles size={24} className="sparkle-icon" />
          <span className="assistant-btn-label">Ask AI</span>
        </button>
      )}

      {/* Floating Assistant Panel */}
      {isOpen && (
        <div className="floating-assistant-panel card">
          {/* Header */}
          <div className="panel-header">
            <div className="panel-title-wrap">
              <div className="assistant-avatar">
                <Bot size={20} />
              </div>
              <div>
                <h4 className="panel-title">GRANTLY AI</h4>
                <span className="panel-badge">Grounded in verified data</span>
              </div>
            </div>
            <div className="panel-controls">
              <Link
                to="/app/assistant"
                className="control-icon-btn"
                title="Open full page assistant"
                onClick={() => setIsOpen(false)}
              >
                <Maximize2 size={16} />
              </Link>
              <button
                className="control-icon-btn"
                onClick={() => setIsOpen(false)}
                title="Close assistant"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="panel-messages">
            {messages.map((m) => (
              <div key={m.id} className={`chat-message ${m.role === 'user' ? 'user-msg' : 'ai-msg'}`}>
                <div className="msg-header">
                  {m.role === 'assistant' ? <Bot size={14} className="msg-icon" /> : <User size={14} className="msg-icon" />}
                  <span className="msg-sender">{m.role === 'assistant' ? 'GRANTLY Assistant' : 'You'}</span>
                  <span className="msg-time">{m.timestamp}</span>
                </div>
                <div className="msg-body">
                  <p style={{ whiteSpace: 'pre-line' }}>{m.content}</p>
                  {m.sourceReferences && m.sourceReferences.length > 0 && (
                    <div className="msg-sources">
                      <span className="sources-label">Official Sources:</span>
                      {m.sourceReferences.map((src, i) => (
                        <div key={i} className="source-item">
                          <ExternalLink size={12} />
                          <a href={src.url} target="_blank" rel="noopener noreferrer">
                            {src.title}
                          </a>
                          {src.note && <span className="source-note">({src.note})</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message ai-msg typing-msg">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="panel-suggestions">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                className="suggestion-chip"
                onClick={() => handleSend(prompt)}
                disabled={isTyping}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            className="panel-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Ask about eligibility, documents..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm chat-send-btn"
              disabled={!input.trim() || isTyping}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};


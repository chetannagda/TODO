import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker"
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis"
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt"
  }
];

const MotivationalQuote: React.FC = () => {
  const [quote, setQuote] = useState(quotes[0]);
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
      setKey(prev => prev + 1);
    }, 15000); // Change quote every 15 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 1 }}
      className="text-center mb-8 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
    >
      <p className="text-white text-lg italic">"{quote.text}"</p>
      <p className="text-white/70 mt-2">— {quote.author}</p>
    </motion.div>
  );
};

export default MotivationalQuote;
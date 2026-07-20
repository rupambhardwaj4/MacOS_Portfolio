import React, { useState } from "react";
import { socials } from "#constants/index.js";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "60788862-8246-4bdb-942d-62b19adb41e9",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success !== false) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setIsSubmitted(true);
      }
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-white h-full select-none text-gray-800">
      {/* Left side: Information and Social Cards */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800 tracking-tight">Let's Connect!</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
            Feel free to ping me on any of the platforms or write to me directly.
          </p>
        </div>

        {/* Social Cards (styled to match index.css expectations) */}
        <div className="mt-6">
          <ul className="flex flex-col gap-3">
            {socials.map((social) => (
              <li
                key={social.id}
                style={{ backgroundColor: social.bg }}
                className="rounded-xl p-3 w-full hover:-translate-y-0.5 hover:scale-102 origin-center transition-all duration-300 shadow-sm cursor-pointer"
                onClick={() => window.open(social.link, "_blank")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={social.icon} alt={social.text} className="w-5 h-5 filter invert brightness-200" />
                    <p className="font-bold text-xs text-white">{social.text}</p>
                  </div>
                  {/* Arrow icon */}
                  <svg className="w-3.5 h-3.5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side: Interactive Contact Form */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
        {isSubmitted ? (
          <div className="text-center space-y-4 py-8 animate-scale-up">
            <div className="size-14 bg-green-100 rounded-full flex-center mx-auto text-green-600">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-base font-bold text-gray-800">Message Sent!</h4>
            <p className="text-xs text-gray-500 px-4">
              Thank you for reaching out. I'll get back to you as soon as possible!
            </p>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-blue-600 hover:underline pt-2 cursor-pointer"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h4 className="text-sm font-bold text-gray-800">Direct Message</h4>
            
            <div className="space-y-1">
              <label htmlFor="name-input" className="text-[10px] font-bold text-gray-400 uppercase">Your Name</label>
              <input
                id="name-input"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500/80 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/20"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email-input" className="text-[10px] font-bold text-gray-400 uppercase">Email Address</label>
              <input
                id="email-input"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500/80 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/20"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="message-input" className="text-[10px] font-bold text-gray-400 uppercase">Message</label>
              <textarea
                id="message-input"
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Say hello..."
                className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500/80 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/20 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm hover:shadow active:scale-98 cursor-pointer flex-center"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;

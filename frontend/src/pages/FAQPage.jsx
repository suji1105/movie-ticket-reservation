import { useState } from 'react';
import './FAQPage.css';

const faqData = [
  {
    category: '🎫 Booking',
    items: [
      { q: 'How do I book a movie ticket?', a: 'Simply browse movies on the homepage, select a movie, choose your preferred showtime and seats, and proceed to payment. The entire process takes less than 30 seconds!' },
      { q: 'Can I cancel or modify my booking?', a: 'Yes! You can cancel your booking up to 2 hours before the show. A small cancellation fee may apply. Go to My Bookings to manage your tickets.' },
      { q: 'How many tickets can I book at once?', a: 'You can book up to 10 tickets in a single transaction. For group bookings of more than 10, please contact our support team.' },
    ],
  },
  {
    category: '💳 Payments',
    items: [
      { q: 'What payment methods are supported?', a: 'We support UPI (GPay, PhonePe, Paytm), credit/debit cards, net banking, and popular wallets. We also support EMI options for premium bookings.' },
      { q: 'Is my payment information secure?', a: 'Absolutely. We use 256-bit SSL encryption and are PCI DSS compliant. Your card details are never stored on our servers.' },
      { q: 'How do I get a refund?', a: 'Refunds are processed within 5-7 business days to your original payment method. For UPI payments, refunds are typically instant.' },
    ],
  },
  {
    category: '📺 Streaming',
    items: [
      { q: 'What is CineVault Stream?', a: 'CineVault Stream is our premium OTT platform where you can watch movies at home in 4K with Dolby Atmos. It is included with our Pro subscription.' },
      { q: 'Can I download movies for offline viewing?', a: 'Yes! Pro subscribers can download up to 25 movies for offline viewing on mobile devices.' },
      { q: 'What devices support CineVault Stream?', a: 'We support Android, iOS, Smart TVs (Samsung, LG, Sony), Fire TV Stick, Chromecast, and web browsers.' },
    ],
  },
  {
    category: '🏛️ Theatres',
    items: [
      { q: 'Which cities have CineVault theatres?', a: 'We are present in 25+ cities including Chennai, Mumbai, Delhi, Bengaluru, Hyderabad, Kolkata, Pune, and more. We are expanding rapidly!' },
      { q: 'Do you offer food & beverages?', a: 'Yes! Most of our partner theatres offer a full F&B menu. You can even pre-order snacks during the booking process for a skip-the-queue experience.' },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (key) => {
    setOpenIndex(prev => (prev === key ? null : key));
  };

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about CineVault</p>
      </div>

      <div className="faq-content container">
        {faqData.map((section, si) => (
          <div key={si} className="faq-section animate-fadeInUp" style={{ animationDelay: `${si * 0.1}s` }}>
            <h2 className="faq-category">{section.category}</h2>
            <div className="faq-items">
              {section.items.map((item, qi) => {
                const key = `${si}-${qi}`;
                const isOpen = openIndex === key;
                return (
                  <div key={key} className={`faq-item glass ${isOpen ? 'faq-open' : ''}`}>
                    <button className="faq-question" onClick={() => toggle(key)}>
                      <span>{item.q}</span>
                      <span className={`faq-arrow ${isOpen ? 'open' : ''}`}>▾</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import "./assets/faq.css";
import { useLang } from "./local/LanguageContext";

const faqs = [
  {
    question: {
      en: "How do I place an order?",
      az: "Necə sifariş edə bilərəm?",
    },
    answer: {
      en: "You can place an order through our website by selecting the products and adding them to your cart.",
      az: "Məhsulları seçib səbətə əlavə edərək vebsaytımız vasitəsilə sifariş edə bilərsiniz.",
    },
  },
  {
    question: {
      en: "What payment methods are available?",
      az: "Hansı ödəniş üsulları mövcuddur?",
    },
    answer: {
      en: "We accept Visa, MasterCard, PayPal, Apple Pay, and Google Pay.",
      az: "Visa, MasterCard, PayPal, Apple Pay və Google Pay qəbul edirik.",
    },
  },
  {
    question: {
      en: "How long does shipping take?",
      az: "Çatdırılma nə qədər vaxt aparır?",
    },
    answer: {
      en: "Shipping usually takes between 3 to 7 business days, depending on your location.",
      az: "Çatdırılma adətən yerləşdiyiniz yerə görə 3-7 iş günü çəkir.",
    },
  },
  {
    question: {
      en: "Can I return a product?",
      az: "Məhsulu qaytara bilərəmmi?",
    },
    answer: {
      en: "Yes, you can return a product within 14 days if it has not been used.",
      az: "Bəli, məhsul istifadə olunmayıbsa 14 gün ərzində qaytara bilərsiniz.",
    },
  },
  {
    question: {
      en: "Do you offer international shipping?",
      az: "Beynəlxalq çatdırılma təklif edirsiniz?",
    },
    answer: {
      en: "Yes, we ship worldwide. Shipping costs and delivery times vary by country.",
      az: "Bəli, dünya üzrə çatdırılma edirik. Çatdırılma qiymətləri və vaxtı ölkəyə görə dəyişir.",
    },
  },
  {
    question: {
      en: "How can I track my order?",
      az: "Sifarişimi necə izləyə bilərəm?",
    },
    answer: {
      en: "Once your order is shipped, you will receive a tracking number via email.",
      az: "Sifariş göndərildikdən sonra sizə izləmə nömrəsi e-poçt vasitəsilə göndəriləcək.",
    },
  },
  {
    question: {
      en: "What should I do if I receive a damaged product?",
      az: "Zədələnmiş məhsul alsam nə etməliyəm?",
    },
    answer: {
      en: "If your product arrives damaged, please contact our support team within 48 hours for assistance.",
      az: "Əgər məhsul zədəlidirsə, 48 saat ərzində dəstək komandamızla əlaqə saxlayın.",
    },
  },
  {
    question: {
      en: "How do I contact customer support?",
      az: "Müştəri dəstəyi ilə necə əlaqə saxlaya bilərəm?",
    },
    answer: {
      en: "You can reach our support team via email or live chat on our website.",
      az: "Dəstək komandamıza e-poçt və ya vebsaytımızdakı canlı çat vasitəsilə müraciət edə bilərsiniz.",
    },
  },
];

const FAQ = () => {
  const { language } = useLang();

  return (
    <div className="faq-container">
      <h2 className="faq-title">
        {language === "az" ? "Tez-tez Verilən Suallar" : "Frequently Asked Questions"}
      </h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">{faq.question[language]}</h3>
            <p className="faq-answer">{faq.answer[language]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

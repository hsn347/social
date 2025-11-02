import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext1';
import { useLanguage } from '../context/LanguageContext';
import Logo from '../assets/Logo.jpeg';

const WelcomePage = () => {
  const { signInWithGithub } = useAuth();
  const { language } = useLanguage();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // رسائل تحفيزية متعددة اللغات
  const motivationalMessages = {
    ar: [
      "كن عظيماً مع بوت IBRA! 🚀",
      "اجعل قلعتك الاقوى✨",
      "مع IBRA، كل شيء ممكن 💪",
      " اجعل البوت يحمي قلعتك 🌟",
    ],
    en: [
      "Be Great with IBRA Bot! 🚀",
      "Make your castle stronger✨",
      "With IBRA, Everything is Possible 💪",
      "Make the bot protect your castle 🌟",
    ],
    tr: [
      "IBRA Bot ile Harika Ol! 🚀",
      "Kalenizi güçlendirin✨",
      "IBRA ile Her Şey Mümkün 💪",
      "Botun kalenizi korumasını sağlayın 🌟",
    ]
  };

  const messages = motivationalMessages[language as keyof typeof motivationalMessages] || motivationalMessages.en;

  // تغيير الرسالة كل 3 ثوان
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [messages.length]);

  // تأثير الظهور التدريجي
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden">
        {/* دوائر متحركة */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-indigo-500/20 rounded-full animate-ping"></div>
        
        {/* نجوم متحركة */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
        <div className="absolute top-60 left-1/2 w-2 h-2 bg-purple-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-white rounded-full animate-ping"></div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* الشعار */}
        <div className="mb-8 animate-float">
          <img 
            src={Logo} 
            alt="IBRA.BOT" 
            className="w-24 h-24 mx-auto rounded-full shadow-2xl border-4 border-white/20 hover:scale-110 transition-transform duration-300 hover-glow" 
          />
        </div>

        {/* العنوان الرئيسي */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text text-shadow animate-scaleIn">
          IBRA<span className="text-yellow-400 animate-glow">.Store</span>
        </h1>

        {/* الرسالة التحفيزية */}
        <div className="mb-12 h-20 flex items-center justify-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-white/90 transition-all duration-500 transform hover:scale-105 text-glow animate-fadeInUp">
            {messages[currentMessageIndex]}
          </h2>
        </div>

        {/* الوصف */}
        <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto">
          {language === 'ar' 
            ? "بوت يعمل على مدار الساعة لكي يجعل قلعتك الاقوى" 
            : language === 'tr'
            ? "Kalenizi güçlendirmek için gece gündüz çalışan bir bot"
            : "A bot working around the clock to make your castle stronger"
          }
        </p>

        {/* الميزات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-effect rounded-xl p-6 hover-lift animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl mb-4 animate-bounce">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-2 text-glow">
              {language === 'ar' ? 'أداء سريع' : language === 'tr' ? 'Hızlı Performans' : 'Fast Performance'}
            </h3>
            <p className="text-white/70">
              {language === 'ar' ? 'تجربة سريعة وسلسة' : language === 'tr' ? 'Hızlı ve sorunsuz deneyim' : 'Fast and smooth experience'}
            </p>
          </div>
          
          <div className="glass-effect rounded-xl p-6 hover-lift animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="text-4xl mb-4 animate-bounce" style={{ animationDelay: '0.5s' }}>🔒</div>
            <h3 className="text-xl font-semibold text-white mb-2 text-glow">
              {language === 'ar' ? 'أمان عالي' : language === 'tr' ? 'Yüksek Güvenlik' : 'High Security'}
            </h3>
            <p className="text-white/70">
              {language === 'ar' ? 'حماية بياناتك بأعلى المعايير' : language === 'tr' ? 'Verilerinizi en yüksek standartlarla koruyun' : 'Protect your data with highest standards'}
            </p>
          </div>
          
          <div className="glass-effect rounded-xl p-6 hover-lift animate-slideInRight" style={{ animationDelay: '0.6s' }}>
            <div className="text-4xl mb-4 animate-bounce" style={{ animationDelay: '1s' }}>🌟</div>
            <h3 className="text-xl font-semibold text-white mb-2 text-glow">
              {language === 'ar' ? 'تجربة متميزة' : language === 'tr' ? 'Özel Deneyim' : 'Premium Experience'}
            </h3>
            <p className="text-white/70">
              {language === 'ar' ? 'واجهة جميلة وسهلة الاستخدام' : language === 'tr' ? 'Güzel ve kullanımı kolay arayüz' : 'Beautiful and user-friendly interface'}
            </p>
          </div>
        </div>

        {/* زر تسجيل الدخول */}
        <div className="space-y-6">
          <button
            onClick={signInWithGithub}
            className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xl font-bold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/25 border-2 border-white/20 hover:border-white/40 animate-gradient hover-glow neon-border"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>
                {language === 'ar' 
                  ? 'ابدأ رحلتك مع IBRA' 
                  : language === 'tr'
                  ? 'IBRA ile Yolculuğunuza Başlayın'
                  : 'Start Your Journey with IBRA'
                }
              </span>
            </span>
            
            {/* تأثير الإضاءة */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>

          {/* نص إضافي */}
          <p className="text-white/60 text-lg">
            {language === 'ar' 
              ? 'انضم إلى آلاف المستخدمين الذين يثقون في IBRA' 
              : language === 'tr'
              ? 'IBRA\'ya güvenen binlerce kullanıcıya katılın'
              : 'Join thousands of users who trust IBRA'
            }
          </p>
        </div>

        {/* إحصائيات وهمية */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="animate-pulse">
            <div className="text-3xl font-bold text-purple-400">500+</div>
            <div className="text-white/70">
              {language === 'ar' ? 'مستخدم نشط' : language === 'tr' ? 'Aktif Kullanıcı' : 'Active Users'}
            </div>
          </div>
          <div className="animate-pulse" style={{ animationDelay: '0.5s' }}>
            <div className="text-3xl font-bold text-blue-400">99.9%</div>
            <div className="text-white/70">
              {language === 'ar' ? 'وقت التشغيل' : language === 'tr' ? 'Çalışma Süresi' : 'Uptime'}
            </div>
          </div>
          <div className="animate-pulse" style={{ animationDelay: '1s' }}>
            <div className="text-3xl font-bold text-pink-400">24/7</div>
            <div className="text-white/70">
              {language === 'ar' ? 'دعم فني' : language === 'tr' ? 'Teknik Destek' : 'Support'}
            </div>
          </div>
        </div>
      </div>

      {/* تأثيرات إضافية */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent"></div>
    </div>
  );
};

export default WelcomePage;

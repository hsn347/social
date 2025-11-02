import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext1";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import Logo from "../assets/Logo.jpeg";
export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const { signInWithGithub, signOut, user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const displayName = user?.user_metadata.name || user?.email;

  return (
    <nav className="fixed top-0 w-full z-40 bg-[var(--bg-secondary)] backdrop-blur-lg border-b border-[var(--border-color)] shadow-[var(--shadow-md)] transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="font-mono text-xl font-bold text-[var(--text-primary)]">
            
          <img src={Logo} alt="IBRA.BOT" className="w-10 h-10 float-left rounded-4xl mr-2" />IBRA<span className="text-purple-500">.Store</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
        
            </Link>

          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="flex items-center space-x-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <span className="text-sm">
                  {resolvedTheme === 'dark' ? '🌙' : '☀️'}
                </span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {themeMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[var(--bg-card)] rounded-lg shadow-[var(--shadow-lg)] z-50 border border-[var(--border-color)]">
                  <button
                    onClick={() => {
                      setTheme('light');
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-[var(--bg-hover)] flex items-center space-x-3 text-[var(--text-primary)] transition-all duration-200 rounded-lg mx-1 my-1 ${
                      theme === 'light' ? 'bg-[var(--bg-hover)]' : ''
                    }`}
                  >
                    <span>☀️</span>
                    <span>{t.lightMode}</span>
                  </button>
                  <button
                    onClick={() => {
                      setTheme('dark');
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 flex items-center space-x-2 ${
                      theme === 'dark' ? 'bg-gray-700' : ''
                    }`}
                  >
                    <span>🌙</span>
                    <span>{t.darkMode}</span>
                  </button>
                  <button
                    onClick={() => {
                      setTheme('system');
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 flex items-center space-x-2 ${
                      theme === 'system' ? 'bg-gray-700' : ''
                    }`}
                  >
                    <span>⚙️</span>
                    <span>{t.systemMode}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center space-x-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <span className="text-sm">
                  {language === 'en' ? '🇺🇸' : language === 'ar' ? '🇸🇦' : '🇹🇷'}
                </span>
                <span className="text-xs uppercase">{language}</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-[var(--bg-card)] rounded-lg shadow-[var(--shadow-lg)] z-50 border border-[var(--border-color)]">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setLanguageMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-[var(--bg-hover)] flex items-center space-x-3 text-[var(--text-primary)] transition-all duration-200 rounded-lg mx-1 my-1 ${
                      language === 'en' ? 'bg-[var(--bg-hover)]' : ''
                    }`}
                  >
                    <span>🇺🇸</span>
                    <span>English</span>
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('ar');
                      setLanguageMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 flex items-center space-x-2 ${
                      language === 'ar' ? 'bg-gray-700' : ''
                    }`}
                  >
                    <span>🇸🇦</span>
                    <span>العربية</span>
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('tr');
                      setLanguageMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 flex items-center space-x-2 ${
                      language === 'tr' ? 'bg-gray-700' : ''
                    }`}
                  >
                    <span>🇹🇷</span>
                    <span>Türkçe</span>
                  </button>
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center space-x-4">
                <img
                  src={user.user_metadata.avatar_url}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />

                <span className="text-[var(--text-primary)]">{displayName}</span>
                <button
                  onClick={signOut}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all duration-200 text-white font-semibold shadow-lg hover:shadow-xl border border-red-500"
                >
                  {t.signOut}
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGithub}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all duration-200 text-white font-semibold shadow-lg hover:shadow-xl border border-blue-500"
              >
                {t.signInWithGitHub}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--bg-secondary)] backdrop-blur-lg border-b border-[var(--border-color)]">
          <div className="px-2 pt-2 pb-3 space-y-1">

            
            {/* Mobile Auth */}
            <div className="px-3 py-2">
              <div className="text-sm text-[var(--text-secondary)] mb-2">Account / الحساب</div>
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-[var(--text-primary)] text-sm">{displayName}</span>
                  </div>
                  <button
                    onClick={signOut}
                    className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all duration-200 text-white font-semibold shadow-lg hover:shadow-xl border border-red-500"
                  >
                    {t.signOut}
                  </button>
                </div>
              ) : (
                <button
                  onClick={signInWithGithub}
                  className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all duration-200 text-white font-semibold shadow-lg hover:shadow-xl border border-blue-500"
                >
                  {t.signInWithGitHub}
                </button>
              )}
            </div>

            {/* Mobile Theme Selector */}
            <div className="px-3 py-2">
              <div className="text-sm text-[var(--text-secondary)] mb-2">{t.lightMode} / {t.darkMode}</div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setTheme('light');
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 font-medium shadow-[var(--shadow-sm)] ${
                    theme === 'light' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-[var(--bg-hover)] text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  ☀️ {t.lightMode}
                </button>
                <button
                  onClick={() => {
                    setTheme('dark');
                    setMenuOpen(false);
                  }}
                  className={`px-3 py-1 text-xs rounded ${
                    theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  🌙 {t.darkMode}
                </button>
                <button
                  onClick={() => {
                    setTheme('system');
                    setMenuOpen(false);
                  }}
                  className={`px-3 py-1 text-xs rounded ${
                    theme === 'system' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  ⚙️ {t.systemMode}
                </button>
              </div>
            </div>

            {/* Mobile Language Selector */}
            <div className="px-3 py-2">
              <div className="text-sm text-[var(--text-secondary)] mb-2">Language / Dil / اللغة</div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setLanguage('en');
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 font-medium shadow-[var(--shadow-sm)] ${
                    language === 'en' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-[var(--bg-hover)] text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  🇺🇸 EN
                </button>
                <button
                  onClick={() => {
                    setLanguage('ar');
                    setMenuOpen(false);
                  }}
                  className={`px-3 py-1 text-xs rounded ${
                    language === 'ar' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  🇸🇦 عربي
                </button>
                <button
                  onClick={() => {
                    setLanguage('tr');
                    setMenuOpen(false);
                  }}
                  className={`px-3 py-1 text-xs rounded ${
                    language === 'tr' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  🇹🇷 TR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ProjectTriangle } from './components/ProjectTriangle';
import { ConceptExplanation } from './components/ConceptExplanation';
import { SettingsPanel } from './components/SettingsPanel';
import { AppProvider, useApp } from './components/contexts/AppContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Triangle, BookOpen, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { Seo } from './components/Seo';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { PrivacyInfo } from './components/PrivacyInfo';

function AppContent() {
  const { t, isDark } = useApp();
  const [route, setRoute] = useState<string>(() => window.location.hash || '#/');
  // light hash-based router

  useEffect(() => {
    const handler = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return (
    <>
      {/* Skip link for accessibility / SEO crawl clarity */}
      <a href="#hlavni-obsah" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 bg-blue-700 text-white px-4 py-2 rounded">
        Přeskočit na obsah
      </a>
      <Seo
        title={t('title')}
        description={t('subtitle')}
        keywords="trojimperativ, projektový trojúhelník, project management, scope, čas, rozpočet, kvalita"
      />
      <Toaster position="top-right" />
      <SettingsPanel />
      <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${isDark
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900'
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
        }`}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl transition-colors duration-300 ${isDark
            ? 'bg-gradient-to-br from-blue-600/30 to-purple-600/30'
            : 'bg-gradient-to-br from-blue-400/20 to-purple-400/20'
            }`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl transition-colors duration-300 ${isDark
            ? 'bg-gradient-to-tr from-pink-600/30 to-orange-600/30'
            : 'bg-gradient-to-tr from-pink-400/20 to-orange-400/20'
            }`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl transition-colors duration-300 ${isDark
            ? 'bg-gradient-to-br from-indigo-600/20 to-cyan-600/20'
            : 'bg-gradient-to-br from-indigo-400/10 to-cyan-400/10'
            }`}></div>
        </div>

        <div className="relative py-8 px-4" id="hlavni-obsah">
          <div className="max-w-7xl mx-auto">
            {route === '#/privacy' ? (
              <PrivacyInfo />
            ) : (
              <>
                {/* Modern Header */}
                <motion.header
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Triangle className={`w-12 h-12 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h1 className={`text-5xl bg-gradient-to-r bg-clip-text text-transparent ${isDark
                      ? 'from-blue-400 via-purple-400 to-indigo-400'
                      : 'from-blue-600 via-purple-600 to-indigo-600'
                      }`}>
                      {t('title')}
                    </h1>
                    <Sparkles className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-purple-500'}`} />
                  </div>

                  <motion.p
                    className={`text-xl max-w-4xl mx-auto mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {t('subtitle')}
                  </motion.p>

                  <motion.div
                    className="flex items-center justify-center gap-3 flex-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <Badge variant="secondary" className={`px-4 py-2 text-base transition-colors duration-300 ${isDark
                      ? 'bg-gradient-to-r from-blue-900/50 to-indigo-900/50 text-blue-300 border-blue-700/50'
                      : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700'
                      }`}>
                      <Zap className="w-4 h-4 mr-2" />
                      {t('interactive_simulator')}
                    </Badge>
                    <Badge variant="secondary" className={`px-4 py-2 text-base transition-colors duration-300 ${isDark
                      ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 text-purple-300 border-purple-700/50'
                      : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
                      }`}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      {t('practical_examples')}
                    </Badge>
                    <Badge variant="secondary" className={`px-4 py-2 text-base transition-colors duration-300 ${isDark
                      ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50 text-green-300 border-green-700/50'
                      : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
                      }`}>
                      <Triangle className="w-4 h-4 mr-2" />
                      {t('real_situations')}
                    </Badge>
                  </motion.div>
                </motion.header>

                {/* Enhanced Tabs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <Tabs defaultValue="simulator" className="space-y-8" aria-label="Simulátor a teorie">
                    <div className="flex justify-center">
                      <TabsList className={`grid w-full max-w-lg mx-auto grid-cols-2 h-14 p-1 shadow-lg transition-colors duration-300 ${isDark
                        ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/20'
                        : 'bg-white/50 backdrop-blur-sm border border-white/20'
                        }`}>
                        <TabsTrigger
                          value="simulator"
                          className="flex items-center gap-3 text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white transition-all duration-300"
                        >
                          <Triangle className="w-5 h-5" />
                          {t('simulator_tab')}
                        </TabsTrigger>
                        <TabsTrigger
                          value="theory"
                          className="flex items-center gap-3 text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300"
                        >
                          <BookOpen className="w-5 h-5" />
                          {t('theory_tab')}
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="simulator" className="space-y-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card className={`relative overflow-hidden backdrop-blur-sm shadow-2xl transition-colors duration-300 ${isDark
                          ? 'bg-gray-800/60 border-gray-700/30'
                          : 'bg-white/60 border-white/30'
                          }`}>
                          <div className={`absolute inset-0 transition-colors duration-300 ${isDark
                            ? 'bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10'
                            : 'bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5'
                            }`} />
                          <CardHeader className="relative text-center pb-4">
                            <CardTitle className={`text-2xl bg-gradient-to-r bg-clip-text text-transparent ${isDark
                              ? 'from-blue-400 to-purple-400'
                              : 'from-blue-600 to-purple-600'
                              }`}>
                              {t('simulator_title')}
                            </CardTitle>
                            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                              {t('simulator_description')}
                            </p>
                          </CardHeader>
                          <CardContent className="relative">
                            <ProjectTriangle />
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Card className={`backdrop-blur-sm shadow-lg transition-colors duration-300 ${isDark
                          ? 'bg-gray-800/60 border-gray-700/30'
                          : 'bg-white/60 border-white/30'
                          }`}>
                          <CardContent className="pt-8">
                            <div className="text-center mb-6">
                              <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'
                                }`}>{t('how_it_works')}</h2>
                              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                {t('how_it_works_description')}
                              </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                              <motion.div
                                className={`text-center p-6 rounded-xl border transition-all duration-300 ${isDark
                                  ? 'bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-700/50 hover:from-emerald-800/30 hover:to-green-800/30'
                                  : 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 hover:from-emerald-100 hover:to-green-100'
                                  }`}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${isDark ? 'bg-emerald-800/50' : 'bg-emerald-100'
                                  }`}>
                                  ⏱️
                                </div>
                                <h4 className={`mb-2 font-semibold ${isDark ? 'text-emerald-300' : 'text-emerald-700'
                                  }`}>{t('when_increase_time')}</h4>
                                <p className={`text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-600'
                                  }`}>
                                  {t('when_increase_time_desc')}
                                </p>
                              </motion.div>

                              <motion.div
                                className={`text-center p-6 rounded-xl border transition-all duration-300 ${isDark
                                  ? 'bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border-amber-700/50 hover:from-amber-800/30 hover:to-yellow-800/30'
                                  : 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 hover:from-amber-100 hover:to-yellow-100'
                                  }`}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${isDark ? 'bg-amber-800/50' : 'bg-amber-100'
                                  }`}>
                                  💰
                                </div>
                                <h4 className={`mb-2 font-semibold ${isDark ? 'text-amber-300' : 'text-amber-700'
                                  }`}>{t('when_increase_budget')}</h4>
                                <p className={`text-sm ${isDark ? 'text-amber-400' : 'text-amber-600'
                                  }`}>
                                  {t('when_increase_budget_desc')}
                                </p>
                              </motion.div>

                              <motion.div
                                className={`text-center p-6 rounded-xl border transition-all duration-300 ${isDark
                                  ? 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-700/50 hover:from-blue-800/30 hover:to-indigo-800/30'
                                  : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100'
                                  }`}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${isDark ? 'bg-blue-800/50' : 'bg-blue-100'
                                  }`}>
                                  🎯
                                </div>
                                <h4 className={`mb-2 font-semibold ${isDark ? 'text-blue-300' : 'text-blue-700'
                                  }`}>{t('when_increase_quality')}</h4>
                                <p className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'
                                  }`}>
                                  {t('when_increase_quality_desc')}
                                </p>
                              </motion.div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="theory">
                      <ConceptExplanation />
                    </TabsContent>
                  </Tabs>
                </motion.div>

                {/* Professional Footer */}
                <motion.footer
                  className="mt-24"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <div className="relative">
                    {/* Footer background */}
                    <div className={`absolute inset-0 rounded-2xl transition-colors duration-300 ${isDark
                      ? 'bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900'
                      : 'bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900'
                      }`}></div>
                    <div className={`absolute inset-0 rounded-2xl transition-colors duration-300 ${isDark
                      ? 'bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-pink-600/30'
                      : 'bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-pink-600/20'
                      }`}></div>

                    {/* Footer content */}
                    <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
                      <div className="grid gap-8 md:grid-cols-3 text-white">

                        {/* About section */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Triangle className="w-6 h-6 text-blue-400" />
                            <h3 className="text-xl font-semibold">{t('title')}</h3>
                          </div>
                          <p className="text-gray-300 leading-relaxed">
                            {t('educational_tool')}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-blue-300">
                            <Zap className="w-4 h-4" />
                            <span>{t('modern_web_tech')}</span>
                          </div>
                        </div>

                        {/* Key Features */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-white">{t('key_features')}</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                              {t('interactive_simulator_feature')}
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                              {t('practical_examples_feature')}
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                              {t('real_situations_feature')}
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                              {t('factor_visualization')}
                            </li>
                          </ul>
                        </div>

                        {/* Tips */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-white">{t('practical_tips')}</h4>
                          <div className="space-y-3">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                              <p className="text-sm text-gray-300">
                                💡 <strong className="text-white">{t('communicate_clearly')}</strong>
                              </p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                              <p className="text-sm text-gray-300">
                                ⚖️ <strong className="text-white">{t('find_balance')}</strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom section */}
                      <div className="mt-8 pt-6 border-t border-white/10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>© 2025 {t('title')}</span>
                            <span>•</span>
                            <span>{t('educational_tool')}</span>
                            <span>•</span>
                            <a href="https://josefbouse.cz" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-200 transition-colors">
                              Josef Bouše
                            </a>
                          </div>

                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                              <BookOpen className="w-3 h-3 mr-1" />
                              {t('project_management')}
                            </Badge>
                            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                              <Zap className="w-3 h-3 mr-1" />
                              {t('interactive')}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Call to action */}
                      <div className="mt-6 text-center">
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-white/20">
                          <Triangle className="w-4 h-4 text-blue-300" />
                          <span className="text-sm text-gray-200">
                            {t('start_experimenting')}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.footer>
              </>
            )}
          </div>
        </div>
      </div>
      <CookieConsentBanner />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
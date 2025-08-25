import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Lightbulb, ArrowRight, AlertCircle, Building2, Palette, Code, ShoppingCart, Users, Rocket, FileText } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { useApp } from './contexts/AppContext';

export function ConceptExplanation() {
  const { t, isDark } = useApp();
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={`relative overflow-hidden backdrop-blur-sm shadow-lg transition-colors duration-300 ${
          isDark 
            ? 'bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-700/50' 
            : 'bg-gradient-to-br from-yellow-50/80 to-orange-50/80 border-yellow-200/50'
        }`}>
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-br from-yellow-600/10 to-orange-600/10' 
              : 'bg-gradient-to-br from-yellow-500/5 to-orange-500/5'
          }`} />
          <CardHeader className="relative">
            <CardTitle className={`flex items-center gap-2 ${
              isDark ? 'text-yellow-400' : 'text-yellow-600'
            }`}>
              <Lightbulb className="w-6 h-6" />
              {t('what_is_triangle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-6">
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t('triangle_description')}
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <motion.div 
                className={`p-6 border-2 rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-700/50 hover:from-emerald-800/30 hover:to-green-800/30' 
                    : 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 hover:from-emerald-100 hover:to-green-100'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className={`mb-3 flex items-center gap-2 ${
                  isDark ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  🕒 <span className="font-semibold">{t('time')}</span>
                </h4>
                <p className={`text-sm ${
                  isDark ? 'text-emerald-300' : 'text-emerald-700'
                }`}>
                  {t('when_increase_time_desc')}
                </p>
              </motion.div>
              
              <motion.div 
                className={`p-6 border-2 rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border-amber-700/50 hover:from-amber-800/30 hover:to-yellow-800/30' 
                    : 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 hover:from-amber-100 hover:to-yellow-100'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className={`mb-3 flex items-center gap-2 ${
                  isDark ? 'text-amber-400' : 'text-amber-600'
                }`}>
                  💰 <span className="font-semibold">{t('budget')}</span>
                </h4>
                <p className={`text-sm ${
                  isDark ? 'text-amber-300' : 'text-amber-700'
                }`}>
                  {t('when_increase_budget_desc')}
                </p>
              </motion.div>
              
              <motion.div 
                className={`p-6 border-2 rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-700/50 hover:from-blue-800/30 hover:to-indigo-800/30' 
                    : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className={`mb-3 flex items-center gap-2 ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  🎯 <span className="font-semibold">{t('quality')}</span>
                </h4>
                <p className={`text-sm ${
                  isDark ? 'text-blue-300' : 'text-blue-700'
                }`}>
                  {t('when_increase_quality_desc')}
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className={`backdrop-blur-sm shadow-lg transition-colors duration-300 ${
          isDark 
            ? 'bg-gray-800/70 border-gray-700/20' 
            : 'bg-white/70 border-white/20'
        }`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${
              isDark ? 'text-red-400' : 'text-red-500'
            }`}>
              <AlertCircle className="w-6 h-6" />
              {t('triangle_rule')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className={`mb-6 ${
              isDark 
                ? 'border-red-700/50 bg-red-900/20' 
                : 'border-red-200 bg-red-50'
            }`}>
              <AlertCircle className={`w-4 h-4 ${
                isDark ? 'text-red-400' : 'text-red-600'
              }`} />
              <AlertDescription className={isDark ? 'text-red-300' : 'text-red-700'}>
                <strong>"{t('triangle_rule_text')}"</strong>
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              <h4 className={`font-semibold text-lg mb-4 ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>{t('possible_combinations')}</h4>
              
              <div className="grid gap-3 md:grid-cols-2">
                <motion.div 
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                    isDark 
                      ? 'bg-green-900/20 border-green-700/50 hover:bg-green-800/30' 
                      : 'bg-green-50 border-green-200 hover:bg-green-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className={isDark ? 'text-green-400' : 'text-green-600'}>✅</span>
                  <div className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    <strong className={isDark ? 'text-green-400' : 'text-green-700'}>{t('fast_cheap')}</strong>
                    <ArrowRight className={`w-4 h-4 inline mx-2 ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    }`} />
                    <span className={isDark ? 'text-red-400' : 'text-red-600'}>{t('lower_quality')}</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                    isDark 
                      ? 'bg-green-900/20 border-green-700/50 hover:bg-green-800/30' 
                      : 'bg-green-50 border-green-200 hover:bg-green-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className={isDark ? 'text-green-400' : 'text-green-600'}>✅</span>
                  <div className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    <strong className={isDark ? 'text-green-400' : 'text-green-700'}>{t('fast_quality')}</strong>
                    <ArrowRight className={`w-4 h-4 inline mx-2 ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    }`} />
                    <span className={isDark ? 'text-red-400' : 'text-red-600'}>{t('expensive')}</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                    isDark 
                      ? 'bg-green-900/20 border-green-700/50 hover:bg-green-800/30' 
                      : 'bg-green-50 border-green-200 hover:bg-green-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className={isDark ? 'text-green-400' : 'text-green-600'}>✅</span>
                  <div className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    <strong className={isDark ? 'text-green-400' : 'text-green-700'}>{t('cheap_quality')}</strong>
                    <ArrowRight className={`w-4 h-4 inline mx-2 ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    }`} />
                    <span className={isDark ? 'text-red-400' : 'text-red-600'}>{t('slowly')}</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                    isDark 
                      ? 'bg-red-900/20 border-red-700/50 hover:bg-red-800/30' 
                      : 'bg-red-50 border-red-200 hover:bg-red-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className={isDark ? 'text-red-400' : 'text-red-600'}>❌</span>
                  <div className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    <strong className={isDark ? 'text-red-400' : 'text-red-700'}>{t('all_three_impossible')}</strong>
                    <ArrowRight className={`w-4 h-4 inline mx-2 ${
                      isDark ? 'text-red-400' : 'text-red-600'
                    }`} />
                    <span className={isDark ? 'text-red-400' : 'text-red-600'}>{t('impossible')}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Practical examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className={`backdrop-blur-sm shadow-lg transition-colors duration-300 ${
          isDark 
            ? 'bg-gray-800/70 border-gray-700/20' 
            : 'bg-white/70 border-white/20'
        }`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${
              isDark ? 'text-purple-400' : 'text-purple-500'
            }`}>
              <Rocket className="w-6 h-6" />
              {t('practical_examples_title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-2">
              
              {/* IT & Software Development */}
              <motion.div 
                className={`space-y-4 p-5 rounded-lg border transition-colors duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-700/50' 
                    : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
                }`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Code className={`w-5 h-5 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <h4 className={`font-semibold ${
                    isDark ? 'text-blue-300' : 'text-blue-800'
                  }`}>{t('it_development')}</h4>
                  <Badge variant="secondary" className={`${
                    isDark 
                      ? 'bg-blue-800/50 text-blue-300 border-blue-600/50' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>{t('tech')}</Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className={`p-3 rounded border-l-4 border-green-400 ${
                    isDark ? 'bg-gray-700/50' : 'bg-white/50'
                  }`}>
                    <strong>{t('fast_cheap')}:</strong> <span className={
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }>{t('fast_cheap_it')}</span>
                  </div>
                  <div className={`p-3 rounded border-l-4 border-yellow-400 ${
                    isDark ? 'bg-gray-700/50' : 'bg-white/50'
                  }`}>
                    <strong>{t('fast_quality')}:</strong> <span className={
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }>{t('fast_quality_it')}</span>
                  </div>
                  <div className={`p-3 rounded border-l-4 border-blue-400 ${
                    isDark ? 'bg-gray-700/50' : 'bg-white/50'
                  }`}>
                    <strong>{t('cheap_quality')}:</strong> <span className={
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }>{t('cheap_quality_it')}</span>
                  </div>
                </div>
              </motion.div>

              {/* Marketing & Advertising */}
              <motion.div 
                className={`space-y-4 p-5 rounded-lg border transition-colors duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-pink-900/20 to-rose-900/20 border-pink-700/50' 
                    : 'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200'
                }`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Palette className={`w-5 h-5 ${
                    isDark ? 'text-pink-400' : 'text-pink-600'
                  }`} />
                  <h4 className={`font-semibold ${
                    isDark ? 'text-pink-300' : 'text-pink-800'
                  }`}>{t('marketing_advertising')}</h4>
                  <Badge variant="secondary" className={`${
                    isDark 
                      ? 'bg-pink-800/50 text-pink-300 border-pink-600/50' 
                      : 'bg-pink-100 text-pink-700'
                  }`}>{t('creative')}</Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className={`p-3 rounded border-l-4 border-green-400 ${
                    isDark ? 'bg-gray-700/50' : 'bg-white/50'
                  }`}>
                    <strong>{t('fast_cheap')}:</strong> <span className={
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }>{t('fast_cheap_marketing')}</span>
                  </div>
                  <div className={`p-3 rounded border-l-4 border-yellow-400 ${
                    isDark ? 'bg-gray-700/50' : 'bg-white/50'
                  }`}>
                    <strong>{t('fast_quality')}:</strong> <span className={
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }>{t('fast_quality_marketing')}</span>
                  </div>
                  <div className={`p-3 rounded border-l-4 border-blue-400 ${
                    isDark ? 'bg-gray-700/50' : 'bg-white/50'
                  }`}>
                    <strong>{t('cheap_quality')}:</strong> <span className={
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }>{t('cheap_quality_marketing')}</span>
                  </div>
                </div>
              </motion.div>

              {/* Construction */}
              <motion.div 
                className={`space-y-4 p-5 rounded-lg border transition-colors duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-700/50' 
                    : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'
                }`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className={`w-5 h-5 ${
                    isDark ? 'text-orange-400' : 'text-orange-600'
                  }`} />
                  <h4 className={`font-semibold ${
                    isDark ? 'text-orange-300' : 'text-orange-800'
                  }`}>{t('construction')}</h4>
                  <Badge variant="secondary" className={`${
                    isDark 
                      ? 'bg-orange-800/50 text-orange-300 border-orange-600/50' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>{t('construction')}</Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className={`p-3 rounded border-l-4 border-green-400 ${
                    isDark ? 'bg-gray-700/50' : 'bg-white/50'
                  }`}>
                    <strong>{t('fast_cheap')}:</strong> <span className={
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }>{t('fast_cheap_construction')}</span>
                  </div>
                  <div className={`p-3 rounded border-l-4 border-yellow-400 ${
                    isDark ? 'bg-gray-700/50' : 'bg-white/50'
                  }`}>
                    <strong>{t('fast_quality')}:</strong> <span className={
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }>{t('fast_quality_construction')}</span>
                  </div>
                  <div className={`p-3 rounded border-l-4 border-blue-400 ${
                    isDark ? 'bg-gray-700/50' : 'bg-white/50'
                  }`}>
                    <strong>{t('cheap_quality')}:</strong> <span className={
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }>{t('cheap_quality_construction')}</span>
                  </div>
                </div>
              </motion.div>

              {/* E-commerce */}
              <motion.div 
                className={`space-y-4 p-5 rounded-lg border transition-colors duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-700/50' 
                    : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                }`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingCart className={`w-5 h-5 ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`} />
                  <h4 className={`font-semibold ${
                    isDark ? 'text-green-300' : 'text-green-800'
                  }`}>{t('ecommerce_project')}</h4>
                  <Badge variant="secondary" className={`${
                    isDark 
                      ? 'bg-green-800/50 text-green-300 border-green-600/50' 
                      : 'bg-green-100 text-green-700'
                  }`}>{t('business')}</Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className={`p-3 rounded border-l-4 border-green-400 ${
                    isDark ? 'bg-gray-700/50' : 'bg-white/50'
                  }`}>
                    <strong>{t('fast_cheap')}:</strong> <span className={
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }>{t('fast_cheap_ecommerce')}</span>
                  </div>
                  <div className={`p-3 rounded border-l-4 border-yellow-400 ${
                    isDark ? 'bg-gray-700/50' : 'bg-white/50'
                  }`}>
                    <strong>{t('fast_quality')}:</strong> <span className={
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }>{t('fast_quality_ecommerce')}</span>
                  </div>
                  <div className={`p-3 rounded border-l-4 border-blue-400 ${
                    isDark ? 'bg-gray-700/50' : 'bg-white/50'
                  }`}>
                    <strong>{t('cheap_quality')}:</strong> <span className={
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }>{t('cheap_quality_ecommerce')}</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Common situations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className={`backdrop-blur-sm shadow-lg transition-colors duration-300 ${
          isDark 
            ? 'bg-gray-800/70 border-gray-700/20' 
            : 'bg-white/70 border-white/20'
        }`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${
              isDark ? 'text-indigo-400' : 'text-indigo-500'
            }`}>
              <Users className="w-6 h-6" />
              {t('common_situations')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              
              <div className={`p-5 rounded-lg border transition-colors duration-300 ${
                isDark 
                  ? 'bg-gradient-to-r from-red-900/20 to-pink-900/20 border-red-700/50' 
                  : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
              }`}>
                <h4 className={`font-semibold mb-3 ${
                  isDark ? 'text-red-400' : 'text-red-700'
                }`}>🚨 {t('crisis_situation')}</h4>
                <p className={`text-sm mb-3 ${
                  isDark ? 'text-red-300' : 'text-red-600'
                }`}>
                  {t('crisis_desc')}
                </p>
                <div className={`p-3 rounded border-l-4 border-red-400 ${
                  isDark ? 'bg-gray-700/50' : 'bg-white/50'
                }`}>
                  <strong>{t('crisis_solution')}</strong>
                </div>
              </div>

              <div className={`p-5 rounded-lg border transition-colors duration-300 ${
                isDark 
                  ? 'bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-700/50' 
                  : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
              }`}>
                <h4 className={`font-semibold mb-3 ${
                  isDark ? 'text-yellow-400' : 'text-yellow-700'
                }`}>⚡ {t('unlimited_budget')}</h4>
                <p className={`text-sm mb-3 ${
                  isDark ? 'text-yellow-300' : 'text-yellow-600'
                }`}>
                  {t('unlimited_budget_desc')}
                </p>
                <div className={`p-3 rounded border-l-4 border-yellow-400 ${
                  isDark ? 'bg-gray-700/50' : 'bg-white/50'
                }`}>
                  <strong>{t('unlimited_budget_solution')}</strong>
                </div>
              </div>

              <div className={`p-5 rounded-lg border transition-colors duration-300 ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border-blue-700/50' 
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
              }`}>
                <h4 className={`font-semibold mb-3 ${
                  isDark ? 'text-blue-400' : 'text-blue-700'
                }`}>🎯 {t('quality_focus')}</h4>
                <p className={`text-sm mb-3 ${
                  isDark ? 'text-blue-300' : 'text-blue-600'
                }`}>
                  {t('quality_focus_desc')}
                </p>
                <div className={`p-3 rounded border-l-4 border-blue-400 ${
                  isDark ? 'bg-gray-700/50' : 'bg-white/50'
                }`}>
                  <strong>{t('quality_focus_solution')}</strong>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Practical tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className={`backdrop-blur-sm shadow-lg transition-colors duration-300 ${
          isDark 
            ? 'bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-700/50' 
            : 'bg-gradient-to-br from-purple-50/80 to-indigo-50/80 border-purple-200/50'
        }`}>
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-br from-purple-600/10 to-indigo-600/10' 
              : 'bg-gradient-to-br from-purple-500/5 to-indigo-500/5'
          }`} />
          <CardHeader className="relative">
            <CardTitle className={`flex items-center gap-2 ${
              isDark ? 'text-purple-400' : 'text-purple-500'
            }`}>
              <FileText className="w-6 h-6" />
              {t('practical_tips')}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className={`font-semibold ${
                  isDark ? 'text-purple-300' : 'text-purple-700'
                }`}>{t('before_project')}</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className={`mt-1 ${
                      isDark ? 'text-green-400' : 'text-green-500'
                    }`}>✓</span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {t('tip_define_priorities')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={`mt-1 ${
                      isDark ? 'text-green-400' : 'text-green-500'
                    }`}>✓</span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {t('tip_communicate_triangle')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={`mt-1 ${
                      isDark ? 'text-green-400' : 'text-green-500'
                    }`}>✓</span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {t('tip_prepare_scenarios')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={`mt-1 ${
                      isDark ? 'text-green-400' : 'text-green-500'
                    }`}>✓</span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {t('tip_document_decisions')}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className={`font-semibold ${
                  isDark ? 'text-purple-300' : 'text-purple-700'
                }`}>{t('during_project')}</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className={`mt-1 ${
                      isDark ? 'text-blue-400' : 'text-blue-500'
                    }`}>⚡</span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {t('tip_evaluate_regularly')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={`mt-1 ${
                      isDark ? 'text-blue-400' : 'text-blue-500'
                    }`}>⚡</span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {t('tip_be_ready_changes')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={`mt-1 ${
                      isDark ? 'text-blue-400' : 'text-blue-500'
                    }`}>⚡</span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {t('tip_communicate_impacts')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={`mt-1 ${
                      isDark ? 'text-blue-400' : 'text-blue-500'
                    }`}>⚡</span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {t('tip_resist_pressure')}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={`mt-8 p-4 rounded-lg border ${
              isDark 
                ? 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-700/50' 
                : 'bg-gradient-to-r from-indigo-100 to-purple-100 border-indigo-200'
            }`}>
              <h5 className={`mb-2 font-semibold flex items-center gap-2 ${
                isDark ? 'text-indigo-400' : 'text-indigo-700'
              }`}>
                <Lightbulb className="w-4 h-4" />
                {t('golden_rule')}
              </h5>
              <p className={`text-sm ${
                isDark ? 'text-indigo-300' : 'text-indigo-700'
              }`}>
                <strong>{t('golden_rule_text')}</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
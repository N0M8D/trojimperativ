import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Languages, Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useApp } from './contexts/AppContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from './ui/dialog';
import { useMatomoConsent } from './CookieConsentBanner';

export function SettingsPanel() {
  const { language, setLanguage, theme, setTheme, isDark, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const themeIcons = {
    light: <Sun className="w-4 h-4" />,
    dark: <Moon className="w-4 h-4" />,
    system: <Monitor className="w-4 h-4" />
  };

  const languageFlags = {
    cs: '🇨🇿',
    en: '🇺🇸'
  };

  const { status, grant, deny } = useMatomoConsent();

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
            size="sm"
            className={`
              backdrop-blur-sm border-white/20 shadow-lg transition-all duration-300
              ${isDark
                ? 'bg-gray-800/80 text-white border-gray-600/50 hover:bg-gray-700/80'
                : 'bg-white/80 text-gray-700 hover:bg-white/90'
              }
            `}
          >
            <Settings className="w-4 h-4 mr-2" />
            {languageFlags[language]} {themeIcons[theme]}
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-12 right-0 w-64"
            >
              <Card className={`
                backdrop-blur-md shadow-xl border
                ${isDark
                  ? 'bg-gray-800/90 border-gray-600/50'
                  : 'bg-white/90 border-white/50'
                }
              `}>
                <CardContent className="p-4 space-y-4">

                  {/* Language Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Languages className="w-4 h-4" />
                      {t('language')}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => setLanguage('cs')}
                        variant={language === 'cs' ? 'default' : 'outline'}
                        size="sm"
                        className="justify-start"
                      >
                        🇨🇿 Čeština
                      </Button>
                      <Button
                        onClick={() => setLanguage('en')}
                        variant={language === 'en' ? 'default' : 'outline'}
                        size="sm"
                        className="justify-start"
                      >
                        🇺🇸 English
                      </Button>
                    </div>
                  </div>

                  {/* Theme Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      {themeIcons[theme]}
                      {t('theme')}
                    </label>
                    <div className="space-y-2">
                      <Button
                        onClick={() => setTheme('light')}
                        variant={theme === 'light' ? 'default' : 'outline'}
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Sun className="w-4 h-4 mr-2" />
                        {t('light')}
                      </Button>
                      <Button
                        onClick={() => setTheme('dark')}
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Moon className="w-4 h-4 mr-2" />
                        {t('dark')}
                      </Button>
                      <Button
                        onClick={() => setTheme('system')}
                        variant={theme === 'system' ? 'default' : 'outline'}
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Monitor className="w-4 h-4 mr-2" />
                        {t('system')}
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {isDark ? t('dark') : t('light')}
                        </Badge>
                      </Button>
                    </div>
                  </div>

                </CardContent>
                <div className="border-t border-white/10 dark:border-gray-700/40 px-4 py-3 flex flex-col gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                        📊 Analytika / Souhlas
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Analytické měření (Matomo)</DialogTitle>
                        <DialogDescription>
                          Pomáhá nám pochopit, jak aplikaci používáte. Nepoužíváme trackery třetích stran, data jsou anonymizována.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 text-sm">
                        <p>Aktuální stav: <strong>{status}</strong></p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                          <li>Žádné cross-site sledování</li>
                          <li>Anonymizovaná IP</li>
                          <li>Možnost odvolat kdykoli</li>
                        </ul>
                        <div className="flex gap-3 pt-2">
                          <Button size="sm" onClick={grant} disabled={status === 'granted'}>
                            Povolit
                          </Button>
                          <Button size="sm" variant="secondary" onClick={deny} disabled={status === 'denied'}>
                            Odmítnout
                          </Button>
                        </div>
                        <p className="text-xs opacity-70">Detailní informace najdete na stránce <a href="#/privacy" className="underline">Ochrana soukromí</a>.</p>
                      </div>
                      <DialogFooter />
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Backdrop pro zavření */}
      {isOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
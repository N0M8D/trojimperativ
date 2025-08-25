import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { useApp } from './contexts/AppContext';

const CONSENT_KEY = 'matomo_consent';
const CONSENT_AT_KEY = 'matomo_consent_at';
const CONSENT_TTL_DAYS = 180; // po 180 dnech znovu vyžádat

function giveConsent() {
    try {
        const now = Date.now().toString();
        localStorage.setItem(CONSENT_KEY, 'granted');
        localStorage.setItem(CONSENT_AT_KEY, now);
        if ((window as any)._paq) {
            (window as any)._paq.push(['setConsentGiven']);
            (window as any)._paq.push(['trackPageView']);
        }
    } catch { /* ignore */ }
}

function revokeConsent() {
    try {
        const now = Date.now().toString();
        localStorage.setItem(CONSENT_KEY, 'denied');
        localStorage.setItem(CONSENT_AT_KEY, now);
        if ((window as any)._paq) {
            (window as any)._paq.push(['forgetConsentGiven']);
        }
    } catch { /* ignore */ }
}

export function useMatomoConsent() {
    const [status, setStatus] = useState<'unknown' | 'granted' | 'denied'>(() => {
        try {
            const val = localStorage.getItem(CONSENT_KEY) as any;
            const at = parseInt(localStorage.getItem(CONSENT_AT_KEY) || '0', 10) || 0;
            if (val === 'granted' || val === 'denied') {
                if (at > 0) {
                    const ageDays = (Date.now() - at) / 86400000;
                    if (ageDays > CONSENT_TTL_DAYS) return 'unknown';
                }
                return val;
            }
            return 'unknown';
        } catch {
            return 'unknown';
        }
    });
    const grant = () => { giveConsent(); setStatus('granted'); };
    const deny = () => { revokeConsent(); setStatus('denied'); };
    const reset = () => { try { localStorage.removeItem(CONSENT_KEY); localStorage.removeItem(CONSENT_AT_KEY); } catch { }; setStatus('unknown'); };
    return { status, grant, deny, reset };
}

export const CookieConsentBanner = () => {
    const { isDark } = useApp();
    const { status, grant, deny } = useMatomoConsent();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const forceHash = typeof window !== 'undefined' && window.location.hash === '#/consent';
    const needsDecision = status === 'unknown';
    const show = needsDecision || forceHash;
    const blocking = needsDecision; // první návštěva = blokuje obsah

    return (
        <AnimatePresence>
            {show && (
                <>
                    {blocking && (
                        <motion.div
                            key="consent-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
                            aria-hidden="true"
                        />
                    )}
                    <motion.div
                        key="consent-banner"
                        initial={{ y: blocking ? 40 : 80, opacity: 0, scale: blocking ? 0.95 : 1 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 40, opacity: 0, scale: blocking ? 0.95 : 1 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                        className={`${blocking
                            ? 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-lg'
                            : 'fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl'
                            } z-[80] backdrop-blur-md rounded-xl border shadow-xl p-6 flex flex-col gap-4 text-sm ${isDark ? 'bg-gray-900/90 border-gray-700 text-gray-100' : 'bg-white/90 border-gray-200 text-gray-800'}`}
                        role="dialog"
                        aria-modal={blocking ? 'true' : 'false'}
                        aria-label="Souhlas s analytikou"
                    >
                        <div className="space-y-3">
                            <h2 className="text-base font-semibold flex items-center gap-2">📊 Analytické měření (Matomo)</h2>
                            <p className="leading-snug opacity-90">
                                Používáme samo-hostované Matomo pro anonymní statistiky. Pomáhá nám pochopit, co zlepšit. Můžete odmítnout – funkčnost aplikace zůstane stejná.
                            </p>
                            <ul className="list-disc pl-5 text-xs opacity-80 space-y-1">
                                <li>Žádné trackery třetích stran</li>
                                <li>Anonymizace IP</li>
                                <li>Můžete kdykoli změnit v Nastavení</li>
                            </ul>
                            <a href="#/privacy" className="underline text-blue-600 dark:text-blue-400 text-xs">Detailní informace & zásady</a>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-2">
                            <Button variant="secondary" onClick={deny} className="sm:min-w-[120px]">Odmítnout</Button>
                            <Button onClick={grant} className="sm:min-w-[120px]">Povolit</Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export const RevokeConsentButton = () => {
    const { status, deny, reset } = useMatomoConsent();
    if (status === 'unknown') return null;
    return (
        <div className="flex gap-3 items-center text-xs">
            {status === 'granted' && (
                <button onClick={deny} className="underline opacity-70 hover:opacity-100">
                    Odvolat souhlas
                </button>
            )}
            <button onClick={reset} className="underline opacity-50 hover:opacity-90">
                Vyžádat znovu
            </button>
        </div>
    );
};

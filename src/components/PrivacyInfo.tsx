import { RevokeConsentButton, useMatomoConsent } from './CookieConsentBanner';
import { useEffect, useState } from 'react';
import { useApp } from './contexts/AppContext';

export const PrivacyInfo = () => {
    const { isDark } = useApp();
    const { status, grant, deny } = useMatomoConsent();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <div className={`max-w-3xl mx-auto py-12 px-4 prose ${isDark ? 'prose-invert' : ''}`}>
            <h1>Ochrana soukromí & Matomo analytika</h1>
            <p>
                Tato aplikace používá samo-hostované <strong>Matomo</strong> pro anonymní statistická data. Nesdílíme je se
                třetími stranami. Matomo je spuštěno až po vašem souhlasu.
            </p>
            <h2>Jaká data zpracováváme</h2>
            <ul>
                <li>Anonymizovaná IP (zkrácená)</li>
                <li>Agregované statistiky o používání funkcí</li>
                <li>Typ zařízení a prohlížeče (zkrácený user-agent)</li>
            </ul>
            <h2>Co nezpracováváme</h2>
            <ul>
                <li>Žádné osobní identifikátory</li>
                <li>Žádné marketingové nebo cross-site trackery</li>
            </ul>
            <h2>Právní základ</h2>
            <p>Souhlas se zpracováním pro účely zlepšování produktu. Můžete jej kdykoli odvolat.</p>
            <h2>Aktuální stav souhlasu</h2>
            <p>Stav: <code>{status}</code></p>
            <div className="flex gap-3">
                <button onClick={grant} className="px-3 py-2 rounded bg-blue-600 text-white text-sm">Udělím souhlas</button>
                <button onClick={deny} className="px-3 py-2 rounded bg-gray-600 text-white text-sm">Odvolám / odmítnu</button>
            </div>
            <h2>Odvolání souhlasu</h2>
            <p>Kliknutím níže můžete odvolat již udělený souhlas:</p>
            <RevokeConsentButton />
            <hr />
            <p><a href="#/">Zpět na aplikaci</a></p>
        </div>
    );
};

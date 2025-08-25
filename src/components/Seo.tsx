import { useEffect } from 'react';

interface SeoProps {
    title?: string;
    description?: string;
    keywords?: string;
    noIndex?: boolean;
}

export function Seo({ title, description, keywords, noIndex }: SeoProps) {
    useEffect(() => {
        if (title) {
            document.title = title + ' | Trojimperativ';
        }
        const setMeta = (name: string, content: string) => {
            if (!content) return;
            let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.name = name;
                document.head.appendChild(el);
            }
            el.content = content;
        };
        if (description) setMeta('description', description);
        if (keywords) setMeta('keywords', keywords);
        if (noIndex) setMeta('robots', 'noindex,nofollow');
    }, [title, description, keywords, noIndex]);
    return null;
}

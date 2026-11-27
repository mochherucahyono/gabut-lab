export function isSafeExternalUrl(rawUrl) {
    if (typeof rawUrl !== 'string') return false;
    const trimmed = rawUrl.trim();
    if (!trimmed) return false;

    try {
        const base =
            typeof window !== 'undefined' && window.location?.href ?
            window.location.href :
            'https://localhost/';
        const parsed = new URL(trimmed, base);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
        return false;
    }
}

export function normalizeSafeExternalUrl(rawUrl) {
    if (!isSafeExternalUrl(rawUrl)) return '';
    const base =
        typeof window !== 'undefined' && window.location?.href ?
        window.location.href :
        'https://localhost/';
    return new URL(rawUrl.trim(), base).href;
}
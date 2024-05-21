

export function formatDate(d?: Date | string | null) {
    const date = d ? new Date(d) : new Date();
    return date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
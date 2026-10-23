export function prettyShortDate(date: Date): string {
    return Intl.DateTimeFormat('es-MX', {
        month: 'short',
        day: 'numeric'
    }).format(date)
}
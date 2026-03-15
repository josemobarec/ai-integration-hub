export function getStatusBadgeClass(status: string) {
  const normalized = status.toUpperCase();

  if (
    normalized.includes('CONNECTED') ||
    normalized.includes('COMPLETED') ||
    normalized.includes('APPROVED') ||
    normalized.includes('ACTIVE')
  ) {
    return 'badge badge-success';
  }

  if (
    normalized.includes('PENDING') ||
    normalized.includes('WAITING') ||
    normalized.includes('MEDIUM')
  ) {
    return 'badge badge-warning';
  }

  if (
    normalized.includes('FAILED') ||
    normalized.includes('REJECTED') ||
    normalized.includes('ERROR') ||
    normalized.includes('HIGH') ||
    normalized.includes('CANCELED')
  ) {
    return 'badge badge-danger';
  }

  return 'badge badge-info';
}
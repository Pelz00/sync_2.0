import type { EnrichedUser } from './UsersClient';

const BG = ['#dbeafe','#dcfce7','#ede9fe','#fef9c3','#fee2e2','#ffedd5'];
const FG = ['#1e40af','#166534','#5b21b6','#854d0e','#991b1b','#9a3412'];

export function avatarColors(name: string): [string, string] {
  const idx = (name.charCodeAt(0) || 0) % BG.length;
  return [BG[idx], FG[idx]];
}

export function initials(name: string | null): string {
  if (!name) return '?';
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

export function statusBadge(u: EnrichedUser) {
  if (u.archived_at) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-red-700">
        Archived
      </span>
    );
  }
  if (u.verification_status === 'active') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-green-700">
        Active
      </span>
    );
  }
  if (u.verification_status === 'pending') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-yellow-700">
        Pending
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-gray-600 capitalize">
      {u.verification_status}
    </span>
  );
}

export function formatRole(role: string): string {
  return role.replace('_', ' ');
}

export function formatCurrency(n: number | undefined | null): string {
  if (!n) return '₦0';
  return '₦' + n.toLocaleString('en-NG');
}

export function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
}
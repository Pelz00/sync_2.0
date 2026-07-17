'use client';

import { useState, useMemo, useTransition, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination } from '@/components/ui/pagination';
import { toast } from '@/components/ui/toast';
import { UserCard } from './Usercard';
import { UserTableRow } from './Usertablerow';
import { UserDetailModal } from './Userdetailmodal';
import { StatCard } from './Stats-card';
import { cn } from '@/lib/utils';
import type { ProfileRow } from '../page';
import {
  Search, Download, UserPlus, LayoutGrid, List,
  Users, UserCheck, Store, CalendarPlus,
} from 'lucide-react';

export type EnrichedUser = ProfileRow & { email: string };

type Props = {
  rows: EnrichedUser[];
  isSuperAdmin: boolean;
};

const PER_PAGE = 10;
const TABS = ['all', 'student', 'vendor', 'landlord', 'archived'] as const;
type Tab = typeof TABS[number];

export function UsersClient({ rows: initialRows, isSuperAdmin }: Props) {
  const router = useRouter();
  const [users, setUsers] = useState<EnrichedUser[]>(initialRows);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [tab, setTab] = useState<Tab>('all');
  const [view, setView] = useState<'card' | 'table'>('card');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<EnrichedUser | null>(null);
  const [, startTransition] = useTransition();

  // Live poll: re-fetch every 30 s
  useEffect(() => {
    const id = setInterval(() => {
      startTransition(() => router.refresh());
    }, 30_000);
    return () => clearInterval(id);
  }, [router]);

  // Keep local state in sync when SSR re-runs (router.refresh triggers prop change)
  useEffect(() => { setUsers(initialRows); }, [initialRows]);

  // ─── Stats ────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => !u.archived_at && u.verification_status === 'active').length;
    const vendors = users.filter((u) => u.role === 'vendor' || u.role === 'landlord').length;
    const now = new Date();
    const newThisMonth = users.filter((u) => {
      const d = new Date(u.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    return { total, active, vendors, newThisMonth };
  }, [users]);

  // ─── Filtering ────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = users;

    if (tab === 'archived') result = result.filter((u) => u.archived_at);
    else if (tab !== 'all') result = result.filter((u) => u.role === tab && !u.archived_at);

    if (statusFilter === 'active') result = result.filter((u) => !u.archived_at && u.verification_status === 'active');
    else if (statusFilter === 'pending') result = result.filter((u) => !u.archived_at && u.verification_status === 'pending');
    else if (statusFilter === 'archived') result = result.filter((u) => Boolean(u.archived_at));

    if (roleFilter) result = result.filter((u) => u.role === roleFilter);

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (u) =>
          (u.full_name ?? '').toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q) ||
          (u.vendor_category ?? '').toLowerCase().includes(q),
      );
    }

    return result;
  }, [users, tab, statusFilter, roleFilter, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageUsers = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const resetPage = () => setPage(1);

  // ─── Optimistic helpers ───────────────────────────────────────────────────
  const patchUser = useCallback((id: string, patch: Partial<EnrichedUser>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
    if (selectedUser?.id === id) setSelectedUser((s) => (s ? { ...s, ...patch } : s));
  }, [selectedUser]);

  const removeUser = useCallback((id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (selectedUser?.id === id) setSelectedUser(null);
  }, [selectedUser]);

  // ─── CSV export ───────────────────────────────────────────────────────────
  function exportCSV() {
    const header = ['Name', 'Email', 'Role', 'Category', 'Status', 'Joined'];
    const lines = filtered.map((u) => [
      u.full_name ?? '',
      u.email,
      u.role,
      u.vendor_category ?? '',
      u.archived_at ? 'archived' : u.verification_status,
      u.created_at,
    ]);
    const csv = [header, ...lines].map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `uniconnect-users-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    toast('CSV exported.');
  }

  return (
    <section className="flex flex-col gap-5">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-content-muted mt-1 flex items-center gap-2 text-sm">
            <span className="bg-lime inline-block h-1.5 w-1.5 animate-pulse rounded-full" />
            {stats.total.toLocaleString()} accounts · live updates every 30 s
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={Users} label="Total Users" value={stats.total.toLocaleString()} sub="+12%" subColour="green" />
        <StatCard icon={UserCheck} label="Active" value={stats.active.toLocaleString()} sub={stats.total ? `${Math.round((stats.active / stats.total) * 100)}% of total` : '—'} />
        <StatCard icon={Store} label="Vendors & Landlords" value={stats.vendors.toLocaleString()} sub={stats.total ? `${Math.round((stats.vendors / stats.total) * 100)}% of total` : '—'} valueColour="purple" />
        <StatCard icon={CalendarPlus} label="New This Month" value={stats.newThisMonth.toLocaleString()} sub="+5.4%" subColour="green" />
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        {/* Search — full width on mobile, capped on desktop */}
        <div className="relative w-full sm:min-w-[180px] sm:flex-1 ">
          <Search className="text-content-muted absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input
            className="pl-9"
            placeholder="Search name, email, role…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); resetPage(); }}
          />
        </div>

        {/* Selects row — side-by-side on mobile, inline on desktop */}
        <div className="flex gap-2 sm:contents">
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v === 'all' ? '' : v); resetPage(); }}>
            <SelectTrigger className="flex-1 sm:flex-none sm:w-auto sm:min-w-[130px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Select value={roleFilter} onValueChange={(v) => { setRoleFilter(v === 'all' ? '' : v); resetPage(); }}>
            <SelectTrigger className="flex-1 sm:flex-none sm:w-auto sm:min-w-[130px]">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="vendor">Vendor</SelectItem>
              <SelectItem value="landlord">Landlord</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="super_admin">Super Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View toggle — desktop only */}
        <div className="hidden sm:ml-auto sm:flex sm:gap-1">
          <Button
            variant="ghost" size="icon"
            className={cn(view === 'card' && 'bg-ink text-cream hover:bg-ink/85')}
            onClick={() => setView('card')} title="Card view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost" size="icon"
            className={cn(view === 'table' && 'bg-ink text-cream hover:bg-ink/85')}
            onClick={() => setView('table')} title="Table view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="border-line/10 -mb-1 flex overflow-scroll gap-2 md:gap-0 border-b">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); resetPage(); }}
            className={cn(
              'border-b-2 md:px-3 pb-2.5 pt-1 text-sm capitalize transition-colors',
              tab === t
                ? 'border-ink text-content font-semibold'
                : 'border-transparent text-content-muted hover:text-content',
            )}
          >
            {t === 'all' ? 'All Users' : t.charAt(0).toUpperCase() + t.slice(1) + 's'}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-display text-content text-lg font-bold">No users found</p>
          <p className="text-content-muted mt-1 text-sm">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          {/* Mobile: always cards, regardless of view toggle */}
          <div className="grid grid-cols-1 gap-4 sm:hidden">
            {pageUsers.map((u) => (
              <UserCard
                key={u.id}
                user={u}
                isSuperAdmin={isSuperAdmin}
                onView={() => setSelectedUser(u)}
                onPatch={patchUser}
                onRemove={removeUser}
              />
            ))}
          </div>

          {/* Desktop: respects the view toggle */}
          <div className="hidden sm:block">
            {view === 'table' ? (
              <div className="border-line/10 overflow-x-hidden rounded-2xl border bg-panel shadow-sm md:overflow-x-auto">
                <table className="block w-full text-left text-sm md:table">
                  <thead className="text-content-muted border-line/10 hidden border-b text-xs md:table-header-group">
                    <tr>
                      <th className="px-4 py-3 font-medium">User</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Role</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Joined</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-line/5 block divide-y md:table-row-group">
                    {pageUsers.map((u) => (
                      <UserTableRow
                        key={u.id}
                        user={u}
                        isSuperAdmin={isSuperAdmin}
                        onView={() => setSelectedUser(u)}
                        onPatch={patchUser}
                        onRemove={removeUser}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {pageUsers.map((u) => (
                  <UserCard
                    key={u.id}
                    user={u}
                    isSuperAdmin={isSuperAdmin}
                    onView={() => setSelectedUser(u)}
                    onPatch={patchUser}
                    onRemove={removeUser}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Pagination ── */}
      {filtered.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className="text-content-muted text-xs">
            Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–
            {Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} results
          </p>

          {/* Client-side pagination buttons */}
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  'h-9 min-w-9 rounded-lg px-2 text-sm transition-colors',
                  p === page ? 'bg-ink text-cream' : 'text-content hover:bg-ink/5',
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Detail Modal ── */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          isSuperAdmin={isSuperAdmin}
          onClose={() => setSelectedUser(null)}
          onPatch={patchUser}
          onRemove={removeUser}
        />
      )}
    </section>
  );
}
import { DocumentItem, TimelineEvent } from '@/modules/vendor/types';

export const INITIAL_DOCS: DocumentItem[] = [
  {
    id: 'gov_id',
    title: 'Government ID',
    description: "National ID card, Driver's licence, or International passport",
    status: 'approved',
    uploadedAt: '15 Jan 2026',
  },
  {
    id: 'biz_reg',
    title: 'Business Registration',
    description: 'CAC certificate or business name registration document',
    status: 'approved',
    uploadedAt: '15 Jan 2026',
  },
  {
    id: 'tax_docs',
    title: 'Tax Documents',
    description: 'TIN certificate or tax clearance letter',
    status: 'under_review',
    uploadedAt: '28 May 2026',
    actionMessage: 'Under review. Typically takes 2–3 business days.',
  },
  {
    id: 'bank_verify',
    title: 'Bank Verification',
    description: 'Bank statement (last 3 months) or voided cheque',
    status: 'needs_action',
    uploadedAt: '10 May 2026',
    actionMessage: 'The document you uploaded was unclear. Please resubmit a legible copy.',
  },
  {
    id: 'address',
    title: 'Address Verification',
    description: 'Utility bill, bank statement with address, or tenancy agreement',
    status: 'not_uploaded',
  },
];

export const INITIAL_TIMELINE: TimelineEvent[] = [
  { label: 'Application Submitted', date: '14 Jan 2026', done: true },
  { label: 'Government ID Verified', date: '16 Jan 2026', done: true },
  { label: 'Business Registration Verified', date: '18 Jan 2026', done: true },
  { label: 'Tax Documents Under Review', date: '28 May 2026', done: false, active: true },
  { label: 'Bank Verification Pending', done: false },
  { label: 'Address Verification Pending', done: false },
  { label: 'Full Verification Complete', done: false },
];

/** Map document id → icon-colour tokens */
export const DOC_ICON_COLOUR: Record<string, string> = {
  gov_id: 'bg-violet-50   text-violet-500',
  biz_reg: 'bg-blue-50     text-blue-500',
  tax_docs: 'bg-amber-50    text-amber-500',
  bank_verify: 'bg-rose-50     text-rose-500',
  address: 'bg-teal-50     text-teal-500',
};

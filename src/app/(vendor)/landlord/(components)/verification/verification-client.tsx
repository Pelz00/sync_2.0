'use client';

import { useState } from 'react';
import { toast, Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Stepper } from '@/components/ui';
import { ShieldCheck, RotateCcw } from 'lucide-react';
import { StatusBadge } from '../shared/status-badge';
import { DocumentFolderCard } from './document-folder-card';
import type { KycDocument, KycStatus } from '@/lib/landlord-data';

const steps = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'ownership', label: 'Ownership' },
  { id: 'id', label: 'Government ID' },
  { id: 'address', label: 'Proof of Address' },
];

export function VerificationClient({
  status,
  rejectionReason,
  documents,
}: {
  status: KycStatus;
  rejectionReason: string | null;
  documents: KycDocument[];
}) {
  const [step, setStep] = useState(0);

  const locked = status === 'submitted' || status === 'under_review' || status === 'verified';
  const editable = !locked;

  const docFor = (id: string) => documents.find((d) => d.id === id)!;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex-row items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <CardTitle>Verification status</CardTitle>
            <CardDescription>Complete KYC to unlock payouts and the verified landlord badge.</CardDescription>
          </div>
          <StatusBadge status={status} className='py-6' />
        </CardHeader>
      </Card>

      {status === 'rejected' && rejectionReason ? (
        <div className="bg-coral/10 border-coral/30 flex items-start gap-3 rounded-xl border p-4">
          <RotateCcw className="mt-0.5 size-5 shrink-0" />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Your submission was rejected</p>
            <p className="text-content-muted text-sm">{rejectionReason}</p>
            <Button size="sm" className="w-fit">
              Resubmit documents
            </Button>
          </div>
        </div>
      ) : null}

      {status === 'verified' ? (
        <div className="bg-lime/10 border-lime-deep/20 flex items-start gap-3 rounded-xl border p-4">
          <ShieldCheck className="text-lime-deep mt-0.5 size-5 shrink-0" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">You&apos;re a verified landlord</p>
            <p className="text-content-muted text-sm">
              Your identity and property ownership have been confirmed. The verified badge now appears on all your listings.
            </p>
          </div>
        </div>
      ) : null}

      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-col gap-1">
            <CardTitle>KYC application</CardTitle>
            <CardDescription>
              {locked
                ? 'Your submitted details are shown below and are locked while under review.'
                : 'Provide the following in four short steps.'}
            </CardDescription>
          </div>
          <Stepper steps={steps} current={step} className='flex flex-wrap border border-[.1px] border-gray-300 rounded-xl py-4 px-3' />
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {step === 0 ? (
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fullName" className="text-sm font-medium">
                    Full name
                  </label>
                  <Input id="fullName" defaultValue="Adaeze Okonkwo" disabled={!editable} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone number
                  </label>
                  <Input id="phone" defaultValue="+234 803 555 0142" disabled={!editable} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="dob" className="text-sm font-medium">
                    Date of birth
                  </label>
                  <Input id="dob" type="date" defaultValue="1990-06-12" disabled={!editable} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">ID type</span>
                  <Select defaultValue="nin" disabled={!editable}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nin">National ID (NIN)</SelectItem>
                      <SelectItem value="passport">International Passport</SelectItem>
                      <SelectItem value="license">Driver&apos;s Licence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="nin" className="text-sm font-medium">
                  NIN / ID number
                </label>
                <Input id="nin" defaultValue="1234 5678 901" disabled={!editable} />
                <span className="text-content-muted text-xs">This is verified against the national database.</span>
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <DocumentFolderCard doc={docFor('ownership')} disabled={!editable} />
              <DocumentFolderCard doc={docFor('business')} disabled={!editable} />
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <DocumentFolderCard doc={docFor('id')} disabled={!editable} />
            </div>
          ) : null}

          {step === 3 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <DocumentFolderCard doc={docFor('address')} disabled={!editable} />
            </div>
          ) : null}

          <div className="border-line/10 flex items-center justify-between border-t pt-4">
            <Button
              type="button"
              variant="outline"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button type="button" onClick={() => setStep((s) => Math.min(3, s + 1))}>
                Continue
              </Button>
            ) : (
              <Button
                type="button"
                disabled={!editable}
                onClick={() =>
                  toast.success('Application submitted', {
                    description: "We'll review your documents within 48 hours.",
                  })
                }
              >
                Submit for review
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

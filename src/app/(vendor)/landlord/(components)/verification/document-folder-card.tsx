'use client';

import { useRef, useState } from 'react';
import { Folder, FolderOpen, UploadCloud, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { KycDocument } from '@/lib/landlord-data';

export function DocumentFolderCard({ doc, disabled }: { doc: KycDocument; disabled?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | undefined>(doc.fileName);
  const [uploadedAt, setUploadedAt] = useState<string | undefined>(doc.uploadedAt);

  const hasFile = Boolean(fileName);

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setUploadedAt('Just now');
  };

  return (
    <div
      className={cn(
        'border-line/15 bg-panel flex flex-col gap-3 rounded-xl border p-4 transition-colors',
        hasFile ? 'border-lime-deep/40' : 'border-dashed hover:border-lime-deep/40',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            'flex size-11 items-center justify-center rounded-lg',
            hasFile ? 'bg-lime/15 text-lime-deep' : 'bg-surface-deep text-content-muted',
          )}
        >
          {hasFile ? <Folder className="size-5" /> : <FolderOpen className="size-5" />}
        </div>
        {hasFile ? <CheckCircle2 className="text-lime-deep size-5" /> : null}
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-semibold">{doc.label}</h3>
        <p className="text-content-muted text-xs leading-relaxed">{doc.description}</p>
      </div>

      {hasFile ? (
        <div className="bg-surface-deep flex items-center gap-2 rounded-lg px-3 py-2">
          <FileText className="text-content-muted size-4 shrink-0" />
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-xs font-medium">{fileName}</span>
            <span className="text-content-muted text-[11px]">Uploaded {uploadedAt}</span>
          </div>
        </div>
      ) : null}

      <input ref={inputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={onSelect} disabled={disabled} />
      <Button
        variant={hasFile ? 'outline' : 'dark'}
        size="sm"
        className="mt-auto w-full"
        disabled={disabled}
        type="button"
        onClick={() => inputRef.current?.click()}
      >
        <UploadCloud className="size-4" />
        {hasFile ? 'Replace file' : 'Upload document'}
      </Button>
    </div>
  );
}

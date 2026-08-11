import { PageHeader } from '../(components)/shared/page-header';
import { VerificationClient } from '../(components)/verification/verification-client';
import { kycStatus, kycRejectionReason, kycDocuments } from '@/lib/landlord-data';

export default function VerificationPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Verification (KYC)"
        description="Verify your identity and property ownership to start receiving payouts."
      />
      <VerificationClient status={kycStatus} rejectionReason={kycRejectionReason} documents={kycDocuments} />
    </div>
  );
}

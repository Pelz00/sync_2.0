import { PageHeader } from '../(components)/shared/page-header';
import { ReviewsClient } from '../(components)/reviews/reviews-client';

export default function ReviewsPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Reviews" description="See what students think of your properties and reply to their feedback." />
      <ReviewsClient />
    </div>
  );
}

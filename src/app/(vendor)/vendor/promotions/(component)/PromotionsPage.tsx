'use client';

/**
 * PromotionsPage
 * ──────────────
 * Owns the CreatePromotionModal state. Pass real API data via the `data` prop.
 *
 * Example (server component wrapper):
 *   const data = await fetchPromotions();
 *   return <PromotionsPage data={data} />;
 *
 * Example (client with React Query):
 *   const { data, isLoading } = useQuery({ queryKey: ['promotions'], queryFn: fetchPromotions });
 *   return <PromotionsPage data={data} isLoading={isLoading} onCreatePromotion={createPromotion} />;
 */

import * as React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PromotionStatsRow } from './PromotionStatsRow';
import { PromotionTypesGrid } from './PromotionTypesGrid';
import { CampaignsList } from './CampaignsList';
import { CreatePromotionModal } from './CreatePromotionModal';
import { mockPromotionsData } from './mock-data';
import type { Campaign, CampaignStatus, PromotionType, PromotionsPageData } from './types';
import type { CreatePromotionPayload } from './CreatePromotionModal';

// ── props ─────────────────────────────────────────────────────────────────────
export interface PromotionsPageProps {
  /** Pass real API data here; falls back to mock data if omitted. */
  data?: PromotionsPageData;
  isLoading?: boolean;
  /**
   * Called when the user submits the Create Promotion form.
   * Receives the validated form payload. Close the modal by resolving this promise.
   * If omitted the modal simply closes itself (useful during development).
   */
  onCreatePromotion?: (payload: CreatePromotionPayload) => void | Promise<void>;
  /** Whether the create-promotion API call is in flight */
  isCreating?: boolean;
  onViewCampaign?: (campaign: Campaign) => void;
  onEditCampaign?: (campaign: Campaign) => void;
  onDeleteCampaign?: (campaign: Campaign) => void;
}

// ── component ─────────────────────────────────────────────────────────────────
export function PromotionsPage({
  data = mockPromotionsData,
  isLoading = false,
  onCreatePromotion,
  isCreating = false,
  onViewCampaign,
  onEditCampaign,
  onDeleteCampaign,
}: PromotionsPageProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  // Track which promotion type pre-populates the modal
  const [modalDefaultType, setModalDefaultType] = React.useState<PromotionType | null>(null);
  // Visual selection highlight on the type grid
  const [selectedType, setSelectedType] = React.useState<PromotionType | null>(null);

  /** Open modal with no pre-selected type */
  function handleCreateClick() {
    setModalDefaultType(null);
    setModalOpen(true);
  }

  /** Clicking a type card highlights it AND pre-fills the modal */
  function handleSelectType(type: PromotionType) {
    const next = selectedType === type ? null : type;
    setSelectedType(next);
    if (next) {
      setModalDefaultType(next);
      setModalOpen(true);
    }
  }

  async function handleModalSubmit(payload: CreatePromotionPayload) {
    if (onCreatePromotion) {
      await onCreatePromotion(payload);
    }
    // If no handler provided (dev mode), just close
    setModalOpen(false);
    setSelectedType(null);
  }

  return (
    <>
      <div className="flex flex-col gap-6 p-4 sm:p-6">
        {/* ── Page header ── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-content text-2xl font-bold">Promotions</h1>
            <p className="text-content-muted mt-0.5 text-sm">
              {isLoading
                ? '…'
                : `${data.activeCampaignCount} active campaign${data.activeCampaignCount !== 1 ? 's' : ''}`}
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleCreateClick}
            className="bg-lime-600 text-white shadow-md hover:bg-lime-700"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Promotion</span>
            <span className="sm:hidden">Create</span>
          </Button>
        </div>

        {/* ── Stats row ── */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-surface-deep h-[100px] animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <PromotionStatsRow
            totalViews={data.stats.totalViews}
            totalClicks={data.stats.totalClicks}
            conversions={data.stats.conversions}
            revenueGenerated={data.stats.revenueGenerated}
          />
        )}

        {/* ── Promotion types ── */}
        <PromotionTypesGrid selectedType={selectedType} onSelect={handleSelectType} />

        {/* ── Campaigns list ── */}
        <CampaignsList
          campaigns={data.campaigns}
          isLoading={isLoading}
          onView={onViewCampaign}
          onEdit={onEditCampaign}
          onDelete={onDeleteCampaign}
        />
      </div>

      {/* ── Modal (rendered outside the scroll container) ── */}
      <CreatePromotionModal
        open={modalOpen}
        onOpenChange={(v) => {
          setModalOpen(v);
          if (!v) setSelectedType(null);
        }}
        defaultPromotionType={modalDefaultType}
        onSubmit={handleModalSubmit}
        isSubmitting={isCreating}
      />
    </>
  );
}

export default PromotionsPage;

import { create } from 'zustand';

import { Listing } from '@/modules/vendor/types';

export type PromotionType = 'Discount' | 'BOGO' | 'Flash Sale' | 'Free Shipping';

interface CreatePromotionModalState {
  open: boolean;
  defaultPromotionType: PromotionType | null;
}

interface AddListingModalState {
  open: boolean;
}

interface EditListingModalState {
  open: boolean;
  listing: Listing | null;
}

interface DeleteListingModalState {
  open: boolean;
  listing: Listing | null;
}

interface BulkDeleteModalState {
  open: boolean;
}

interface ArchiveListingModalState {
  open: boolean;
  listingIds: string[];
}

/* -------------------------------------------------------------------------- */
/*                               Initial States                               */
/* -------------------------------------------------------------------------- */

const initialCreatePromotionState: CreatePromotionModalState = {
  open: false,
  defaultPromotionType: null,
};

const initialAddListingState: AddListingModalState = {
  open: false,
};

const initialEditListingState: EditListingModalState = {
  open: false,
  listing: null,
};

const initialDeleteListingState: DeleteListingModalState = {
  open: false,
  listing: null,
};

const initialBulkDeleteState: BulkDeleteModalState = {
  open: false,
};

const initialArchiveListingState: ArchiveListingModalState = {
  open: false,
  listingIds: [],
};

interface ModalStore {
  // ======================================================
  // Promotion
  // ======================================================

  createPromotion: CreatePromotionModalState;

  openCreatePromotion: (type?: PromotionType) => void;
  closeCreatePromotion: () => void;

  // ======================================================
  // Add Listing
  // ======================================================

  addListing: AddListingModalState;

  openAddListing: () => void;
  closeAddListing: () => void;

  // ======================================================
  // Edit Listing
  // ======================================================

  editListing: EditListingModalState;

  openEditListing: (listing: Listing) => void;
  closeEditListing: () => void;

  // ======================================================
  // Delete Listing
  // ======================================================

  deleteListing: DeleteListingModalState;

  openDeleteListing: (listing: Listing) => void;
  closeDeleteListing: () => void;

  // ======================================================
  // Bulk Delete
  // ======================================================

  bulkDelete: BulkDeleteModalState;

  openBulkDelete: () => void;
  closeBulkDelete: () => void;

  // ======================================================
  // Archive Listings
  // ======================================================

  archiveListings: ArchiveListingModalState;

  openArchiveListings: (listingIds: string[]) => void;
  closeArchiveListings: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  /* -------------------------------------------------------------------------- */
  /*                                  Promotion                                 */
  /* -------------------------------------------------------------------------- */

  createPromotion: initialCreatePromotionState,

  openCreatePromotion: (type) =>
    set({
      createPromotion: {
        ...initialCreatePromotionState,
        open: true,
        defaultPromotionType: type ?? null,
      },
    }),

  closeCreatePromotion: () =>
    set({
      createPromotion: initialCreatePromotionState,
    }),

  /* -------------------------------------------------------------------------- */
  /*                                Add Listing                                 */
  /* -------------------------------------------------------------------------- */

  addListing: initialAddListingState,

  openAddListing: () =>
    set({
      addListing: {
        ...initialAddListingState,
        open: true,
      },
    }),

  closeAddListing: () =>
    set({
      addListing: initialAddListingState,
    }),

  /* -------------------------------------------------------------------------- */
  /*                               Edit Listing                                 */
  /* -------------------------------------------------------------------------- */

  editListing: initialEditListingState,

  openEditListing: (listing) =>
    set({
      editListing: {
        ...initialEditListingState,
        open: true,
        listing,
      },
    }),

  closeEditListing: () =>
    set({
      editListing: initialEditListingState,
    }),

  /* -------------------------------------------------------------------------- */
  /*                              Delete Listing                                */
  /* -------------------------------------------------------------------------- */

  deleteListing: initialDeleteListingState,

  openDeleteListing: (listing) =>
    set({
      deleteListing: {
        ...initialDeleteListingState,
        open: true,
        listing,
      },
    }),

  closeDeleteListing: () =>
    set({
      deleteListing: initialDeleteListingState,
    }),

  /* -------------------------------------------------------------------------- */
  /*                               Bulk Delete                                  */
  /* -------------------------------------------------------------------------- */

  bulkDelete: initialBulkDeleteState,

  openBulkDelete: () =>
    set({
      bulkDelete: {
        ...initialBulkDeleteState,
        open: true,
      },
    }),

  closeBulkDelete: () =>
    set({
      bulkDelete: initialBulkDeleteState,
    }),

  /* -------------------------------------------------------------------------- */
  /*                             Archive Listings                               */
  /* -------------------------------------------------------------------------- */

  archiveListings: initialArchiveListingState,

  openArchiveListings: (listingIds) =>
    set({
      archiveListings: {
        ...initialArchiveListingState,
        open: true,
        listingIds,
      },
    }),

  closeArchiveListings: () =>
    set({
      archiveListings: initialArchiveListingState,
    }),
}));

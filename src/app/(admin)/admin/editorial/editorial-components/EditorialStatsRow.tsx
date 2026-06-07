import type { EditorialStats } from "../admin-editorialTypes";

interface EditorialStatsProps {
  stats: EditorialStats;
}

export function EditorialStatsRow({ stats }: EditorialStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-md overflow-hidden mb-6">
      <div className="bg-white px-6 py-5">
        <p className="text-sm text-gray-500 mb-1">Total Articles</p>
        <p className="text-3xl font-bold text-gray-900">{stats.totalArticles}</p>
      </div>

      <div className="bg-white px-6 py-5">
        <p className="text-sm text-gray-500 mb-1">Published</p>
        <p className="text-3xl text-[#90d505] font-bold">{stats.published}</p>
      </div>

      <div className="bg-white px-6 py-5">
        <p className="text-sm text-gray-500 mb-1">Drafts</p>
        <p className="text-3xl font-bold text-gray-900">{stats.drafts}</p>
      </div>

      <div className="bg-white px-6 py-5">
        <p className="text-sm text-gray-500 mb-1">Total Views</p>
        <p className="text-3xl font-bold text-[#90d505]">{stats.totalViews}</p>
      </div>
    </div>
  );
}

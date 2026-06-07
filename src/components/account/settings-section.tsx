/**
 * SettingsSection - a titled block on a Settings page. Settings pages are
 * composed of these so different setting "classes" (verification documents,
 * danger zone, future: notifications, payouts, …) read as separate, divider-
 * separated sections. The first section drops its top border/padding.
 */
export function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-line/10 flex flex-col gap-4 border-t pt-8 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-card text-content">{title}</h2>
        {description && <p className="text-content-muted max-w-xl text-sm">{description}</p>}
      </div>
      {children}
    </section>
  );
}

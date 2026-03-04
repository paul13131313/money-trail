'use client';

type Props = {
  isRealData: boolean;
  dataSource?: string;
};

export default function DataBadge({ isRealData, dataSource }: Props) {
  if (isRealData) {
    return (
      <div className="inline-flex flex-col gap-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          REAL DATA
        </span>
        {dataSource && (
          <span className="text-[10px] text-gray-400 font-medium leading-tight">
            {dataSource}
          </span>
        )}
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
      <span className="w-2 h-2 rounded-full bg-amber-500" />
      AI ESTIMATED
    </span>
  );
}

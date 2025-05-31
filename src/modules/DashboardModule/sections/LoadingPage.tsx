'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 p-4 flex gap-4">
      <div className="mx-auto w-full">
        <div className="py-6 w-full flex flex-col gap-2">
          <h1 className="text-4xl font-bold primary-gradient-text">
            RS Daerah Jawa Tenggara
          </h1>
          {/* Progress bar placeholder */}
        </div>
        {/* Main loading card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 flex flex-col gap-6">
          {/* Chat/AI message placeholder */}
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Skeleton className="h-4 w-24" />
                <span className="text-xs text-gray-400">16 hr. ago</span>
              </div>
              <Skeleton className="h-4 w-64 mb-1" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          {/* Section placeholders */}
          <div className="space-y-6">
            <div>
              <Skeleton className="h-5 w-1/2 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div>
              <Skeleton className="h-5 w-1/3 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-4/6" />
            </div>
            <div>
              <Skeleton className="h-5 w-2/5 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <div className="w-full mt-2">
            <div className="h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#34A853] to-[#2A75F0]"
                style={{ width: '44%' }}
              />
            </div>
            <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
              <span>44%</span>
              <span className="ml-auto">Tampilkan Alur Berpikir</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

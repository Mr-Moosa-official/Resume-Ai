import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <div className="text-center">
        <p className="text-lg font-semibold">Analyzing your resume...</p>
        <p className="text-sm text-muted-foreground">
          This may take a moment. We're crafting your personalized analysis.
        </p>
      </div>
    </div>
  );
}

import type { PersonalizedFeedbackOutput } from '@/ai/flows/generate-personalized-feedback';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

type FeedbackCardProps = {
  data: PersonalizedFeedbackOutput;
};

export function FeedbackCard({ data }: FeedbackCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <CardTitle>Personalized Feedback</CardTitle>
        </div>
        <CardDescription>
          Actionable advice to make your resume stand out.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {data.feedback}
        </p>
      </CardContent>
    </Card>
  );
}

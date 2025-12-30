import type { IdentifySkillGapsOutput } from '@/ai/flows/identify-skill-gaps';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

type SkillGapsCardProps = {
  data: IdentifySkillGapsOutput;
};

export function SkillGapsCard({ data }: SkillGapsCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          <CardTitle>Skill Gap Analysis</CardTitle>
        </div>
        <CardDescription>
          Skills to add or improve to better match the job role.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.missingSkills && data.missingSkills.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Missing Skills to Add</h3>
            <div className="flex flex-wrap gap-2">
              {data.missingSkills.map((skill) => (
                <Badge key={skill} variant="destructive">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {data.suggestedSkillsToImprove && data.suggestedSkillsToImprove.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Skills to Emphasize or Improve</h3>
            <div className="flex flex-wrap gap-2">
              {data.suggestedSkillsToImprove.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/80">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
         {data.overallFeedback && (
          <div>
            <h3 className="font-semibold mb-2">Overall Suggestions</h3>
            <p className="text-sm text-muted-foreground">{data.overallFeedback}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

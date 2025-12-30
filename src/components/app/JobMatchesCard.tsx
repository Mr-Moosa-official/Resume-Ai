import type { MatchResumeWithJobRolesOutput } from '@/ai/flows/match-resume-with-job-roles';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

type JobMatchesCardProps = {
  data: MatchResumeWithJobRolesOutput;
};

export function JobMatchesCard({ data }: JobMatchesCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <CardTitle>Potential Job Roles</CardTitle>
        </div>
        <CardDescription>
          Based on your resume, you could be a great fit for these roles.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.matchedJobRoles && data.matchedJobRoles.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {data.matchedJobRoles.map((role) => (
              <li key={role} className="font-medium">
                {role}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No specific job roles were identified.</p>
        )}
        {data.reasoning && (
           <div>
            <h3 className="font-semibold mb-2">Reasoning</h3>
            <p className="text-sm text-muted-foreground">{data.reasoning}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

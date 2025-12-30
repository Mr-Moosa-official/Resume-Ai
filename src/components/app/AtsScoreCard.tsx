'use client';

import type { AnalyzeATSScoreOutput } from '@/ai/flows/analyze-ats-score';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Target } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

type AtsScoreCardProps = {
  data: AnalyzeATSScoreOutput;
};

export function AtsScoreCard({ data }: AtsScoreCardProps) {
  const chartData = [
    {
      name: 'score',
      value: data.atsScore,
      fill: 'hsl(var(--primary))',
    },
    {
      name: 'remaining',
      value: 100 - data.atsScore,
      fill: 'hsl(var(--muted))',
    },
  ];

  const chartConfig = {
    score: {
      label: 'Score',
    },
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          <CardTitle>ATS Score</CardTitle>
        </div>
        <CardDescription>
          Your resume's compatibility with Applicant Tracking Systems.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="h-[200px] w-full">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-full"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
                startAngle={90}
                endAngle={450}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {data.atsScore.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            out of 100
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
        <div className="text-sm text-center text-muted-foreground">
          <p>{data.feedback}</p>
        </div>
      </CardContent>
    </Card>
  );
}

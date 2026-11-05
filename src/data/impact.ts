export interface ImpactInterface {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  company: string;
}

// Results delivered at previous jobs (they match the achievements listed in
// the experiences).
export const impacts: ImpactInterface[] = [
  {
    value: 60,
    prefix: "Up to",
    suffix: "%",
    label: "less manual client work with generative AI",
    company: "Blip",
  },
  {
    value: 80,
    prefix: "Up to",
    suffix: "%",
    label: "less setup time with global filters",
    company: "Stilingue",
  },
  {
    value: 70,
    suffix: "+",
    label: "reusable components built in a single quarter",
    company: "Stilingue",
  },
  {
    value: 20,
    suffix: "+",
    label: "legacy feature flags removed",
    company: "Blip",
  },
];

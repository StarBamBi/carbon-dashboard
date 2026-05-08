export type BaseChartDatum = {
  label: string;
  value: number;
};

export type EmissionTrendDatum = BaseChartDatum & {
  month: string;
};

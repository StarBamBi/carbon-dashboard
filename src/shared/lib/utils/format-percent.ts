/**
 * 비율(0~1) 을 퍼센트 문자열로 표기한다.
 *
 * 룰: "감축률, 비중은 % 와 절대값을 같이 보여 준다(% 단독은 오해 소지)".
 * - formatPercent: "12.3%"
 * - formatPercentWithAbsolute: "12.3% (1.2 tCO₂e)" — 호출부에서 절대값 표기를 직접 넘겨 결합한다.
 *   (이 파일이 co2e 포맷터에 의존하지 않도록 일부러 분리)
 */

const formatPercent = (ratio: number, fractionDigits = 1): string => {
  if (!Number.isFinite(ratio)) return "0%";
  return `${(ratio * 100).toLocaleString("ko-KR", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}%`;
};

export const formatPercentWithAbsolute = (
  ratio: number,
  absoluteLabel: string,
  fractionDigits = 1,
): string => `${formatPercent(ratio, fractionDigits)} (${absoluteLabel})`;

export { formatPercent };

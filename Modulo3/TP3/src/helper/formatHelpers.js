const formatter = Intl.NumberFormat("pt-BR");

export default function formatNumber(value) {
  return formatter.format(value);
}

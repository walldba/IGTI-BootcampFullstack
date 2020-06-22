const formatter = Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 2,
});

const formatterPercent = Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 2,
});

function formatNumber(value) {
  return formatter.format(value);
}

function formatPercent(value) {
  return formatterPercent.format(value);
}

export { formatNumber, formatPercent };

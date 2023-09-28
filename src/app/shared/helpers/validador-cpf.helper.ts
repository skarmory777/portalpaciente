export const cpfInvalido = (cpfClean: string): boolean => {
  if (cpfClean.length !== 11) {
    return true;
  }

  if (/^([0-9])\1{10}$/.test(cpfClean)) {
    return true;
  }

  if (!validaDigitosVerificadores(cpfClean)) {
    return true;
  }

  return false;
};

const validaDigitosVerificadores = (cpfClean: string): boolean => {
  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpfClean.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpfClean.substring(9, 10))) {
    return false;
  }
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpfClean.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpfClean.substring(10, 11))) {
    return false;
  }
  return true;
};

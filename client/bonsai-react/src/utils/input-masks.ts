/**
 * Remove todos os caracteres não numéricos de uma string
 */
const removeNonNumeric = (value: string): string => {
  return value.replaceAll(/\D/g, '');
};

/**
 * Aplica máscara de CPF (999.999.999-99) ou CNPJ (99.999.999/9999-99)
 * Alterna automaticamente entre os formatos baseado no número de dígitos
 * @param value Valor a ser formatado
 * @returns Valor formatado com máscara de CPF ou CNPJ
 */
export const maskCPFCNPJ = (value: string): string => {
  const numericValue = removeNonNumeric(value);

  // CPF: até 11 dígitos (999.999.999-99)
  if (numericValue.length <= 11) {
    return numericValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  // CNPJ: mais de 11 dígitos (99.999.999/9999-99)
  return numericValue
    .slice(0, 14)
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
};

/**
 * Aplica máscara de telefone
 * 8 dígitos: (99) 9999-9999
 * 9 dígitos: (99) 99999-9999
 * @param value Valor a ser formatado
 * @returns Valor formatado com máscara de telefone
 */
export const maskPhone = (value: string): string => {
  const numericValue = removeNonNumeric(value);

  // Formato: (99) 9999-9999 ou (99) 99999-9999
  if (numericValue.length <= 10) {
    return numericValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d{1,4})$/, '$1-$2');
  }

  return numericValue
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
};

/**
 * Aplica máscara de CEP (99999-999)
 * @param value Valor a ser formatado
 * @returns Valor formatado com máscara de CEP
 */
export const maskCEP = (value: string): string => {
  const numericValue = removeNonNumeric(value);

  return numericValue.slice(0, 8).replace(/(\d{5})(\d{1,3})$/, '$1-$2');
};

/**
 * Aplica máscara de cartão de crédito (9999 9999 9999 9999)
 * @param value Valor a ser formatado
 * @returns Valor formatado com máscara de cartão
 */
export const maskCreditCard = (value: string): string => {
  const numericValue = removeNonNumeric(value);

  return numericValue
    .slice(0, 16)
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2');
};

/**
 * Aplica máscara de validade de cartão (MM/AA)
 * @param value Valor a ser formatado
 * @returns Valor formatado com máscara de validade
 */
export const maskCardExpiry = (value: string): string => {
  const numericValue = removeNonNumeric(value);

  return numericValue.slice(0, 4).replace(/(\d{2})(\d{1,2})$/, '$1/$2');
};

/**
 * Aplica máscara de CVV (999 ou 9999)
 * @param value Valor a ser formatado
 * @returns Valor formatado com máscara de CVV
 */
export const maskCVV = (value: string): string => {
  const numericValue = removeNonNumeric(value);

  return numericValue.slice(0, 4);
};

/**
 * Remove a máscara de um valor, deixando apenas números
 * @param value Valor com máscara
 * @returns Valor sem máscara (apenas números)
 */
export const unmask = (value: string): string => {
  return removeNonNumeric(value);
};

/**
 * Valida se um CPF é válido
 * @param cpf CPF a ser validado (com ou sem máscara)
 * @returns true se o CPF é válido, false caso contrário
 */
export const validateCPF = (cpf: string): boolean => {
  const numericCPF = removeNonNumeric(cpf);

  if (numericCPF.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(numericCPF)) return false;

  // Valida primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(numericCPF.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== Number.parseInt(numericCPF.charAt(9))) return false;

  // Valida segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(numericCPF.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== Number.parseInt(numericCPF.charAt(10))) return false;

  return true;
};

/**
 * Valida se um CNPJ é válido
 * @param cnpj CNPJ a ser validado (com ou sem máscara)
 * @returns true se o CNPJ é válido, false caso contrário
 */
export const validateCNPJ = (cnpj: string): boolean => {
  const numericCNPJ = removeNonNumeric(cnpj);

  if (numericCNPJ.length !== 14) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(numericCNPJ)) return false;

  // Valida primeiro dígito verificador
  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i++) {
    sum += Number.parseInt(numericCNPJ.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  let digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (digit !== Number.parseInt(numericCNPJ.charAt(12))) return false;

  // Valida segundo dígito verificador
  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += Number.parseInt(numericCNPJ.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (digit !== Number.parseInt(numericCNPJ.charAt(13))) return false;

  return true;
};

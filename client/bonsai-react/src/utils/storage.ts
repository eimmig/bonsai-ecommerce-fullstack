/**
 * Recupera um item do localStorage e faz parse do JSON
 * @param key - Chave do item no localStorage
 * @param defaultValue - Valor padrão caso o item não exista
 * @returns O valor parseado ou o valor padrão
 */
export const getFromStorage = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : (defaultValue ?? null);
  } catch {
    return defaultValue ?? null;
  }
};

/**
 * Armazena um item no localStorage convertendo para JSON
 * @param key - Chave do item no localStorage
 * @param value - Valor a ser armazenado
 * @returns true se sucesso, false se falhar
 */
export const setToStorage = <T>(key: string, value: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

/**
 * Remove um item do localStorage
 * @param key - Chave do item a ser removido
 * @returns true se sucesso, false se falhar
 */
export const removeFromStorage = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

export default function getPageTitle(newRegisters: number): string {
  const registersPrefix = newRegisters ? `(${newRegisters}) ` : '';

  return `${registersPrefix}Gerenciar Jogadores - GameTask`;
}

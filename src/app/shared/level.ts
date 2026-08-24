const MS_PER_DAY = 86_400_000;

/** EXP necesaria para subir de nivel (barra del badge). */
export const MAX_EXP = 200;

export function daysAlive(birthDate: string, now: Date): number {
  return Math.max(0, Math.floor((now.getTime() - new Date(birthDate).getTime()) / MS_PER_DAY));
}

/**
 * Nivel decorativo del michi: 1 nivel por día completo de vida.
 * Recién adoptado → LV.1; un día después → LV.2; etc.
 */
export function levelFor(birthDate: string, now: Date): number {
  return daysAlive(birthDate, now) + 1;
}

/** Avance dentro del día actual hacia el próximo nivel (0..MAX_EXP). */
export function expProgress(birthDate: string, now: Date): number {
  const elapsed = Math.max(0, now.getTime() - new Date(birthDate).getTime());
  return Math.round(((elapsed % MS_PER_DAY) / MS_PER_DAY) * MAX_EXP);
}

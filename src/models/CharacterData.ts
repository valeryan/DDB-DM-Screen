
export interface Ability {
  name: string;
  label: string;
  score: number;
  modifier: number;
  save: number;
}

export interface Class {
  name: string;
  level: number;
  subclassName: string;
}

export interface Race {
  name: string;
}

export interface Condition {
  name: string;
  level: number;
}

export interface DeathSaveInfo {
  failCount: number;
  successCount: number;
}

export interface DefenseAdjustment {
  name: string;
  type: number;
}

export interface HitPointInfo {
  current: number;
  maximum: number;
  temp: number;
}

export interface Sense {
  name: string;
  distance: string;
}

export interface Speed {
  name: string;
  distance: number;
}


export interface SpellCasterEntry {
  value: number;
  sources: Array<string>;
}

export interface SpellCasterInfo {
  modifiers: Array<SpellCasterEntry>;
  saveDcs: Array<SpellCasterEntry>;
  spellAttacks: Array<SpellCasterEntry>;
}

export interface ActiveCharacter {
  avatarUrl: string;
  id: number;
  userId: number;
  userName: string;
}

export interface CharacterData {
  abilities?: Array<Ability>;
  armorClass?: number;
  avatarUrl?: string;
  castingInfo?: SpellCasterInfo;
  characterId?: number;
  classes?: Array<Class>;
  conditions?: Array<Condition>;
  currentXp?: number;
  deathSaveInfo?: DeathSaveInfo;
  hitPointInfo?: HitPointInfo;
  immunities?: Array<DefenseAdjustment>;
  initiativeBonus?: number;
  inspiration?: boolean;
  isAssignedToPlayer?: boolean | undefined;
  level?: number;
  name?: string;
  passiveInsight?: number | null;
  passiveInvestigation?: number | null;
  passivePerception?: number | null;
  proficiencyBonus?: number;
  race?: Race | null;
  resistances?: Array<DefenseAdjustment>;
  speeds?: Array<Speed>;
  userId?: number;
  userName?: string;
  vulnerabilities?: Array<DefenseAdjustment>;
}

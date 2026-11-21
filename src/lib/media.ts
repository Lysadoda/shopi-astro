export interface VideoSource {
  src: string;
  type: string;
}

export type VideoLoadStrategy = 'immediate' | 'idle' | 'visible';

export function normalizeVideoSources(
  input: string | VideoSource[],
): VideoSource[] {
  if (Array.isArray(input)) return input;
  const clean = input.split('?')[0].toLowerCase();
  const type = clean.endsWith('.webm')
    ? 'video/webm'
    : clean.endsWith('.ogg') || clean.endsWith('.ogv')
      ? 'video/ogg'
      : 'video/mp4';
  return [{ src: input, type }];
}
import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('should merge basic class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should merge tailwind classes and resolve conflicts', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('should handle conditional classes using object syntax', () => {
    expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2');
  });

  it('should ignore falsy values', () => {
    expect(cn('class1', null, undefined, false, 0, '', 'class2')).toBe('class1 class2');
  });

  it('should handle arrays of classes', () => {
    expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
  });

  it('should handle deeply nested arrays', () => {
    expect(cn(['class1', ['class2', ['class3']]])).toBe('class1 class2 class3');
  });

  it('should merge tailwind classes within objects and arrays', () => {
    expect(cn('p-4', ['p-8', { 'bg-red-500': true }])).toBe('p-8 bg-red-500');
  });
});

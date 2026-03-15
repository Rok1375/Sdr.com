import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PressureText } from './PressureText';

describe('PressureText', () => {
  beforeEach(() => {
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 20,
      height: 20,
      top: 100,
      left: 100,
      bottom: 120,
      right: 120,
      x: 100,
      y: 100,
      toJSON: () => {},
    }));
  });

  it('renders the text correctly', () => {
    render(<PressureText text="Hello World" />);
    expect(screen.getByText('H')).toBeInTheDocument();
    expect(screen.getByText('e')).toBeInTheDocument();
    expect(screen.getAllByText('l')[0]).toBeInTheDocument();
    expect(screen.getAllByText('o')[0]).toBeInTheDocument();
    expect(screen.getByText('W')).toBeInTheDocument();
    expect(screen.getByText('r')).toBeInTheDocument();
    expect(screen.getByText('d')).toBeInTheDocument();
  });

  it('applies initial styles to characters', () => {
    render(<PressureText text="A" minWeight={200} minWidth={60} />);
    const charA = screen.getByText('A');
    expect(charA).toHaveStyle('font-variation-settings: "wght" 200, "wdth" 60');
  });

  it('updates styles on mousemove', () => {
    const { container } = render(
      <PressureText text="A" minWeight={100} maxWeight={900} minWidth={50} maxWidth={150} radius={100} />
    );

    const charA = screen.getByText('A');
    // char center is at 110, 110 (left 100 + width/2 10, top 100 + height/2 10)

    // Trigger mousemove exactly at the character center (distance 0)
    // Effect should be 1, so weight should be maxWeight (900), width maxWidth (150)
    fireEvent.mouseMove(container.firstChild as Element, { clientX: 110, clientY: 110 });

    expect(charA).toHaveStyle('font-variation-settings: "wght" 900, "wdth" 150');

    // Trigger mousemove 50px away from the center (distance 50, radius 100)
    // Effect should be 0.5 (1 - 50/100).
    // Weight = 100 + (900-100)*0.5 = 500
    // Width = 50 + (150-50)*0.5 = 100
    fireEvent.mouseMove(container.firstChild as Element, { clientX: 110, clientY: 160 });

    expect(charA).toHaveStyle('font-variation-settings: "wght" 500, "wdth" 100');

    // Trigger mousemove 100+px away from center (outside radius)
    // Should revert to minWeight and minWidth
    fireEvent.mouseMove(container.firstChild as Element, { clientX: 300, clientY: 300 });

    expect(charA).toHaveStyle('font-variation-settings: "wght" 100, "wdth" 50');
  });

  it('resets styles on mouseleave', () => {
    const { container } = render(
      <PressureText text="A" minWeight={100} maxWeight={900} minWidth={50} maxWidth={150} radius={100} />
    );

    const charA = screen.getByText('A');

    // Trigger mousemove to change style
    fireEvent.mouseMove(container.firstChild as Element, { clientX: 110, clientY: 110 });
    expect(charA).toHaveStyle('font-variation-settings: "wght" 900, "wdth" 150');

    // Trigger mouseleave
    fireEvent.mouseLeave(container.firstChild as Element);
    expect(charA).toHaveStyle('font-variation-settings: "wght" 100, "wdth" 50');
  });
});

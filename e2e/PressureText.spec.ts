import { test, expect } from '@playwright/test';

test.describe('PressureText Component', () => {
  test('renders correctly and responds to mouse hover', async ({ page }) => {
    // Navigate to the test page
    await page.goto('/test-pressure-text');

    // Wait for the component to render and find the first character span 'E'
    const charSpan = page.locator('span', { hasText: /^E$/ }).first();

    // Ensure the character exists
    await expect(charSpan).toBeVisible();

    // Verify initial style
    // wait for inline style to appear, component applies style inline to spans
    await expect(charSpan).toHaveAttribute('style', /"wght" 300/);
    await expect(charSpan).toHaveAttribute('style', /"wdth" 50/);

    // Get the bounding box of the character
    const box = await charSpan.boundingBox();
    if (!box) throw new Error('Bounding box not found');

    // Move mouse exactly to the center of the character
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;
    await page.mouse.move(centerX, centerY);

    // Give it a tiny moment for the JS to update styles
    await page.waitForTimeout(100);

    // Verify updated style (max weight/width)
    await expect(charSpan).toHaveAttribute('style', /"wght" 900/);
    await expect(charSpan).toHaveAttribute('style', /"wdth" 150/);

    // Move mouse slightly away (within radius).
    // Radius is 200 by default. Moving 100px away should trigger intermediate styles
    // Moving on X axis to make sure we stay inside the container
    await page.mouse.move(centerX + 100, centerY);
    await page.waitForTimeout(100);

    // Verify intermediate style
    let style = await charSpan.getAttribute('style');
    // We expect it to be > 300 and < 900.
    const wghtMatch = style?.match(/"wght"\s*(\d+)/);
    expect(wghtMatch).toBeTruthy();
    if (wghtMatch) {
      const weight = parseInt(wghtMatch[1], 10);
      expect(weight).toBeGreaterThan(300);
      expect(weight).toBeLessThan(900);
    }

    // Move mouse far away (outside radius) to test mouse leave/outside radius
    // Since the mouse event listeners are on the container, moving outside the container
    // should trigger mouseleave
    await page.mouse.move(10, 10);

    await page.waitForTimeout(100);

    // Verify style reset
    await expect(charSpan).toHaveAttribute('style', /"wght" 300/);
    await expect(charSpan).toHaveAttribute('style', /"wdth" 50/);
  });
});

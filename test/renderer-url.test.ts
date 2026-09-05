import { describe, expect, it } from 'vitest';
import { developmentRendererUrl } from '../src/main/renderer-url.js';

describe('developmentRendererUrl', () => {
  it('ignores the development override in a packaged application', () => {
    expect(developmentRendererUrl(true, { ELECTRON_RENDERER_URL: 'https://attacker.invalid/app' })).toBeNull();
  });

  it('accepts an HTTP development server only in an unpackaged application', () => {
    expect(developmentRendererUrl(false, { ELECTRON_RENDERER_URL: 'http://127.0.0.1:5173' }))
      .toBe('http://127.0.0.1:5173');
  });

  it('refuses non-web and malformed development URLs', () => {
    expect(developmentRendererUrl(false, { ELECTRON_RENDERER_URL: 'file:///tmp/untrusted.html' })).toBeNull();
    expect(developmentRendererUrl(false, { ELECTRON_RENDERER_URL: 'javascript:alert(1)' })).toBeNull();
    expect(developmentRendererUrl(false, { ELECTRON_RENDERER_URL: 'not a url' })).toBeNull();
  });
});

/**
 * electron-vite supplies a renderer URL while the development server is running.
 * A packaged app must never honor that ambient switch: doing so would attach the
 * application's preload bridge to content chosen outside the package.
 */
export function developmentRendererUrl(
  isPackaged: boolean,
  environment: NodeJS.ProcessEnv = process.env
): string | null {
  if (isPackaged) return null;
  const candidate = environment.ELECTRON_RENDERER_URL?.trim();
  if (!candidate) return null;
  try {
    const protocol = new URL(candidate).protocol;
    return protocol === 'http:' || protocol === 'https:' ? candidate : null;
  } catch {
    return null;
  }
}

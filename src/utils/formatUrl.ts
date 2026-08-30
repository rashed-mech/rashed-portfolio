export function formatImageUrl(url: string | undefined): string | undefined {
  if (!url) return url;
  
  // Convert Google Drive view/open links to direct uc links
  const driveRegex = /(?:https?:\/\/)?(?:drive|docs)\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  
  if (match && match[1]) {
    const fileId = match[1];
    // Google Drive no longer supports uc?export=view for images in <img> tags due to third-party cookie changes.
    // The most reliable workaround for embedding public drive images is the lh3 endpoint.
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  
  return url;
}

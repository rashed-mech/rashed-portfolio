import { useState, useEffect } from 'react';

export type ScholarSyncStatus = 'idle' | 'loading' | 'error';

export interface LiveScholarStats {
  citations: number;
  hIndex: number;
  status: ScholarSyncStatus;
}

/**
 * Fetches live citation / h-index numbers from Google Scholar (via our own
 * backend proxy at /api/scholar/stats, which does the actual scraping).
 *
 * This is the single shared implementation used everywhere these numbers
 * are shown — the public homepage, the admin dashboard overview card, and
 * the admin Researcher Profile tab — so there's one fetch behavior to
 * reason about instead of several independent copies that can drift out
 * of sync with each other.
 *
 * `fallback` (typically the last value saved in the database) is returned
 * whenever there's no Scholar URL configured, or the live fetch fails
 * (Scholar occasionally blocks/rate-limits automated requests) — so the
 * UI never shows "0" or breaks, it just quietly falls back.
 */
export function useLiveScholarStats(
  scholarUrl: string | undefined,
  fallback: { citations: number; hIndex: number }
): LiveScholarStats {
  const [live, setLive] = useState<{ citations: number; hIndex: number } | null>(null);
  const [status, setStatus] = useState<ScholarSyncStatus>('idle');

  useEffect(() => {
    if (!scholarUrl) {
      setStatus('idle');
      setLive(null);
      return;
    }

    let cancelled = false;
    setStatus('loading');

    fetch(`/api/scholar/stats?url=${encodeURIComponent(scholarUrl)}`)
      .then(res => res.json())
      .then(json => {
        if (cancelled) return;
        if (json.success && json.data) {
          setLive({ citations: json.data.citations, hIndex: json.data.hIndex });
          setStatus('idle');
        } else {
          setStatus('error');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => { cancelled = true; };
  }, [scholarUrl]);

  return {
    citations: live?.citations ?? fallback.citations ?? 0,
    hIndex: live?.hIndex ?? fallback.hIndex ?? 0,
    status
  };
}

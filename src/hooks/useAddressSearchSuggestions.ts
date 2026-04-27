import { useEffect, useRef, useState } from 'react';

const PHOTON_SEARCH = 'https://photon.komoot.io/api/';

type PhotonProps = {
  name?: string;
  street?: string;
  housenumber?: string;
  city?: string;
  town?: string;
  district?: string;
  state?: string;
  postcode?: string;
  country?: string;
};

export function formatPhotonAddress(p: PhotonProps): string {
  const streetLine = [p.housenumber, p.street].filter(Boolean).join(' ').trim();
  const locality = p.city || p.town || p.district || '';
  const region = [p.postcode, locality, p.state].filter(Boolean).join(' ').trim();
  const parts = [streetLine || p.name, region, p.country].filter(Boolean);
  return parts.join(', ');
}

const MIN_QUERY = 2;
const DEBOUNCE_MS = 280;

export function useAddressSearchSuggestions(query: string) {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const requestSeq = useRef(0);

  useEffect(() => {
    const q = query.trim();
    if (q.length < MIN_QUERY) {
      requestSeq.current += 1;
      queueMicrotask(() => {
        setOptions([]);
        setLoading(false);
      });
      return;
    }

    const seq = ++requestSeq.current;
    queueMicrotask(() => {
      if (requestSeq.current === seq) setLoading(true);
    });

    const timer = window.setTimeout(async () => {
      try {
        const url = `${PHOTON_SEARCH}?q=${encodeURIComponent(q)}&limit=10&lang=en`;
        const res = await fetch(url);
        if (requestSeq.current !== seq) return;
        if (!res.ok) throw new Error(String(res.status));
        const data: unknown = await res.json();
        const features = (data as { features?: { properties: PhotonProps }[] })?.features ?? [];
        const labels = features.map((f) => formatPhotonAddress(f.properties)).filter((s) => s.length > 0);
        const seen = new Set<string>();
        const unique = labels.filter((l) => {
          if (seen.has(l)) return false;
          seen.add(l);
          return true;
        });
        setOptions(unique);
      } catch {
        if (requestSeq.current === seq) setOptions([]);
      } finally {
        if (requestSeq.current === seq) setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [query]);

  return { options, loading };
}

import SearchOutlined from '@mui/icons-material/SearchOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { useEffect, useRef, useState } from 'react';
import { formatPhotonAddress, useAddressSearchSuggestions } from '../../hooks/useAddressSearchSuggestions';

const DEFAULT_CENTER = { lat: 41.234, lon: -96.174 };
const PHOTON_SEARCH = 'https://photon.komoot.io/api/';

type AddressMapPickerModalProps = {
  open: boolean;
  value: string;
  onClose: () => void;
  onConfirm: (address: string) => void;
};

async function geocodeAddress(query: string): Promise<{ lat: number; lon: number } | null> {
  const q = query.trim();
  if (q.length < 2) return null;
  try {
    const url = `${PHOTON_SEARCH}?q=${encodeURIComponent(q)}&limit=1&lang=en`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data: unknown = await res.json();
    const feature = (data as { features?: { geometry?: { coordinates?: [number, number] }; properties: Parameters<typeof formatPhotonAddress>[0] }[] })
      ?.features?.[0];
    const coords = feature?.geometry?.coordinates;
    if (!coords || coords.length < 2) return null;
    return { lon: coords[0], lat: coords[1] };
  } catch {
    return null;
  }
}

function osmEmbedUrl(lat: number, lon: number): string {
  const d = 0.03;
  const bbox = [lon - d, lat - d, lon + d, lat + d].join('%2C');
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
}

export function AddressMapPickerModal(props: AddressMapPickerModalProps) {
  const [draft, setDraft] = useState(props.value);
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [mapLoading, setMapLoading] = useState(false);
  const { options, loading } = useAddressSearchSuggestions(draft);
  const geocodeSeq = useRef(0);

  useEffect(() => {
    if (!props.open) return;
    setDraft(props.value);
  }, [props.open, props.value]);

  useEffect(() => {
    if (!props.open) return;
    const q = draft.trim();
    if (q.length < 2) {
      setCenter(DEFAULT_CENTER);
      return;
    }
    const seq = ++geocodeSeq.current;
    const timer = window.setTimeout(async () => {
      setMapLoading(true);
      const hit = await geocodeAddress(q);
      if (geocodeSeq.current !== seq) return;
      if (hit) setCenter(hit);
      setMapLoading(false);
    }, 400);
    return () => window.clearTimeout(timer);
  }, [draft, props.open]);

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        backdrop: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } },
        paper: {
          sx: {
            borderRadius: '12px',
            border: '1px solid #E6E6E7',
            boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.10), 0px 8px 8px -4px rgba(16, 24, 40, 0.04)',
            maxWidth: 720,
          },
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ px: 3, pt: 2.5, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, lineHeight: '24px', color: '#262527' }}>
            Select Address
          </Typography>
          <IconButton aria-label="Close" onClick={props.onClose} sx={{ color: '#5B5B5F' }}>
            <CloseOutlined sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        <Box sx={{ px: 3, pb: 3 }}>
          <Stack spacing={1.5}>
            <Stack spacing={0.75}>
              <Typography sx={{ color: '#86868B', fontSize: 12, fontWeight: 500, lineHeight: '18px' }}>
                Address
                <Box component="span" sx={{ color: '#B32318' }}>
                  {' '}
                  *
                </Box>
              </Typography>
              <Autocomplete
                freeSolo
                options={options}
                loading={loading}
                value={draft}
                inputValue={draft}
                onInputChange={(_, v, reason) => {
                  if (reason === 'input' || reason === 'clear') setDraft(v);
                }}
                onChange={(_, v) => {
                  const next = typeof v === 'string' ? v : '';
                  setDraft(next);
                }}
                filterOptions={(opts) => opts}
                slotProps={{
                  paper: { elevation: 3, sx: { borderRadius: '8px', mt: 0.5 } },
                  listbox: { sx: { maxHeight: 240, fontSize: 12, py: 0.5 } },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Type Address"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: '#FFFFFF',
                        '& fieldset': { borderColor: '#E6E6E7' },
                        '&:hover fieldset': { borderColor: '#D0CFD2' },
                        '&.Mui-focused fieldset': { borderColor: '#6A6A70' },
                      },
                      '& .MuiInputBase-input': { fontSize: 12, lineHeight: '18px' },
                      '& .MuiInputBase-input::placeholder': { color: '#CCCCCC', opacity: 1 },
                    }}
                    slotProps={{
                      ...params.slotProps,
                      input: {
                        ...params.slotProps.input,
                        startAdornment: (
                          <InputAdornment position="start" sx={{ ml: 0.5, mr: 0.5 }}>
                            {loading || mapLoading ? (
                              <CircularProgress color="inherit" size={16} />
                            ) : (
                              <SearchOutlined sx={{ fontSize: 18, color: '#86868B' }} />
                            )}
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />
            </Stack>

            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 280, sm: 360 },
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #E6E6E7',
                bgcolor: '#F5F5F6',
              }}
            >
              <Box
                component="iframe"
                title="Address map"
                src={osmEmbedUrl(center.lat, center.lon)}
                sx={{
                  border: 0,
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
              />
            </Box>

            <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'flex-end', pt: 0.5 }}>
              <Box
                component="button"
                type="button"
                onClick={props.onClose}
                sx={{
                  border: '1px solid #E6E6E7',
                  borderRadius: '8px',
                  bgcolor: '#FFFFFF',
                  color: '#262527',
                  fontSize: 14,
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  '&:hover': { bgcolor: '#F8F8F9' },
                }}
              >
                Cancel
              </Box>
              <Box
                component="button"
                type="button"
                onClick={() => {
                  props.onConfirm(draft.trim());
                  props.onClose();
                }}
                sx={{
                  border: 'none',
                  borderRadius: '8px',
                  bgcolor: '#146dff',
                  color: '#FFFFFF',
                  fontSize: 14,
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  '&:hover': { bgcolor: '#0f5ad6' },
                }}
              >
                Use Address
              </Box>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

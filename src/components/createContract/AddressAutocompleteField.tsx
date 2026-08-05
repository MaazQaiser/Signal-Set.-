import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAddressSearchSuggestions } from '../../hooks/useAddressSearchSuggestions';

const figmaTextFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: 'transparent',
    '& fieldset': { borderColor: '#E6E6E7' },
    '&:hover fieldset': { borderColor: '#D0CFD2' },
    '&.Mui-focused fieldset': { borderColor: '#6A6A70' },
  },
  '& .MuiInputBase-input': { fontSize: 12, lineHeight: '18px' },
  '& .MuiInputBase-input::placeholder': { color: '#CCCCCC', opacity: 1, fontSize: 12 },
} as const;

const figmaLabelSx = { color: '#86868B', fontSize: 12, fontWeight: 500, lineHeight: '18px' } as const;

type AddressAutocompleteFieldProps = {
  label: string;
  required?: boolean;
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  /** Fired when the user picks a suggestion from the dropdown (not while typing). */
  onSelect?: (v: string) => void;
  /** Fired when the clear (×) control empties the field. */
  onClear?: () => void;
  error?: boolean;
  helperText?: string;
  /** Extra suggestion labels always available (e.g. mock known addresses). */
  extraOptions?: string[];
};

export function AddressAutocompleteField(props: AddressAutocompleteFieldProps) {
  const { options, loading } = useAddressSearchSuggestions(props.value);
  const mergedOptions = (() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const o of [...(props.extraOptions ?? []), ...options]) {
      if (!o || seen.has(o)) continue;
      seen.add(o);
      out.push(o);
    }
    return out;
  })();

  return (
    <Stack spacing={0.75} sx={{ width: '100%' }}>
      <Typography sx={figmaLabelSx}>
        {props.label}
        {props.required ? <Box component="span" sx={{ color: '#B32318' }}> *</Box> : null}
      </Typography>
      <Autocomplete
        size="small"
        freeSolo
        openOnFocus
        options={mergedOptions}
        loading={loading}
        value={props.value}
        inputValue={props.value}
        onInputChange={(_, v, reason) => {
          if (reason === 'clear') {
            props.onChange('');
            props.onClear?.();
            return;
          }
          if (reason === 'input') props.onChange(v);
        }}
        onChange={(_, v) => {
          const next = typeof v === 'string' ? v : '';
          props.onChange(next);
          if (next) props.onSelect?.(next);
          else props.onClear?.();
        }}
        filterOptions={(opts, { inputValue }) => {
          const q = inputValue.trim().toLowerCase();
          // Always keep seeded mock addresses visible when the field is empty/focused
          if (!q) return opts;
          return opts.filter((o) => o.toLowerCase().includes(q));
        }}
        noOptionsText="No matches"
        loadingText="Searching…"
        slotProps={{
          paper: { elevation: 3, sx: { borderRadius: '8px', mt: 0.5 } },
          listbox: { sx: { maxHeight: 280, fontSize: 12, py: 0.5 } },
        }}
        renderInput={(params) => (
          <TextField
            id={params.id}
            disabled={params.disabled}
            fullWidth={params.fullWidth}
            size={params.size ?? 'small'}
            variant="outlined"
            name={props.name}
            placeholder={props.placeholder}
            error={props.error}
            helperText={props.helperText}
            sx={figmaTextFieldSx}
            slotProps={{
              ...params.slotProps,
              input: {
                ...params.slotProps.input,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={14} sx={{ mr: 0.5 }} /> : null}
                    {params.slotProps.input.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
      />
    </Stack>
  );
}

import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  IconButton,
  InputBase,
  Radio,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import PersonIcon from '@mui/icons-material/Person';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useCallback, useEffect, useLayoutEffect, useState, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

const C = {
  bg: '#F6F6F8',
  white: '#FFFFFF',
  black: '#000000',
  text: '#262527',
  green: '#2DA551',
  greenHover: '#248A44',
  grey700: '#4D4D51',
  grey400: '#86868B',
  grey100: '#E6E6E7',
  border: '#E6E6E7',
  placeholder: '#CCCCCC',
  disabledBg: '#F5F5F6',
  red: '#B32318',
  sectionLabel: '#86868B',
} as const;

/* ─── Reusable text field ─── */
function Field({
  label,
  placeholder,
  value,
  onChange,
  required,
  type = 'text',
  disabled = false,
  calendar = false,
  prefix,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  disabled?: boolean;
  calendar?: boolean;
  prefix?: string;
}) {
  return (
    <Stack sx={{ gap: 0.5 }}>
      {label ? (
        <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: C.grey400 }}>
          {label}
          {required && <Box component="span" sx={{ color: C.red }}> *</Box>}
        </Typography>
      ) : null}
      <Box
        sx={{
          bgcolor: disabled ? C.disabledBg : C.white,
          border: `1px solid ${C.border}`,
          borderRadius: '8px',
          px: 1.5,
          height: 37,
          minHeight: 37,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        {prefix ? (
          <Typography sx={{ fontSize: 12, lineHeight: '18px', color: disabled ? C.grey400 : C.black, flexShrink: 0 }}>{prefix}</Typography>
        ) : null}
        <InputBase
          fullWidth
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            fontSize: 12,
            color: disabled ? C.grey400 : C.black,
            '& input': {
              p: 0,
              fontSize: 12,
              color: disabled ? C.grey400 : C.black,
              WebkitTextFillColor: disabled ? C.grey400 : C.black,
            },
            '& input::placeholder': { color: C.placeholder, opacity: 1, WebkitTextFillColor: C.placeholder },
          }}
        />
        {calendar ? (
          <CalendarTodayOutlinedIcon sx={{ fontSize: 16, color: '#6A6A70', flexShrink: 0, ml: 1 }} />
        ) : null}
      </Box>
    </Stack>
  );
}

function OptionSheet({
  open,
  title,
  options,
  value,
  values,
  multiple = false,
  onClose,
  onChange,
}: {
  open: boolean;
  title: string;
  options: { label: string; value: string; description?: string }[];
  value: string;
  values?: string[];
  multiple?: boolean;
  onClose: () => void;
  onChange: (v: string) => void;
}) {
  const [present, setPresent] = useState(false);
  const [shown, setShown] = useState(false);
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const filtered = options.filter((option) => {
    if (!q) return true;
    return option.label.toLowerCase().includes(q) || (option.description ?? '').toLowerCase().includes(q);
  });

  useEffect(() => {
    if (open) {
      setPresent(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setShown(true));
      });
      return () => cancelAnimationFrame(frame);
    }
    setShown(false);
    setQuery('');
    const timer = window.setTimeout(() => setPresent(false), 280);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!present) return null;
  const shell = document.getElementById('mobile-contract-shell');
  if (!shell) return null;

  return createPortal(
    <>
      <Box
        onClick={onClose}
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.35)',
          zIndex: 30,
          borderRadius: '40px',
          opacity: shown ? 1 : 0,
          transition: 'opacity 280ms ease',
        }}
      />
      <Box
        role="dialog"
        aria-label={title}
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 31,
          bgcolor: C.white,
          borderRadius: '20px 20px 0 0',
          transform: shown ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 280ms cubic-bezier(0.32, 0.72, 0, 1)',
          maxHeight: '70%',
          display: 'flex',
          flexDirection: 'column',
          pb: 3,
        }}
      >
        <Box sx={{ width: 36, height: 4, bgcolor: C.border, borderRadius: '2px', mx: 'auto', mt: 1.25, mb: 1.5, flexShrink: 0 }} />
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: C.black, px: 2.5, mb: 1.5, flexShrink: 0 }}>
          {title}
        </Typography>
        <Box sx={{ px: 2.5, mb: 1, flexShrink: 0 }}>
          <Box
            sx={{
              height: 37,
              border: `1px solid ${C.border}`,
              borderRadius: '8px',
              px: 1.5,
              display: 'flex',
              alignItems: 'center',
              bgcolor: C.white,
            }}
          >
            <InputBase
              autoFocus
              fullWidth
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                fontSize: 12,
                color: C.black,
                '& input': { p: 0, fontSize: 12, color: C.black },
                '& input::placeholder': { color: C.placeholder, opacity: 1, WebkitTextFillColor: C.placeholder },
              }}
            />
          </Box>
        </Box>
        <Box role={multiple ? 'group' : 'radiogroup'} aria-label={title} sx={{ overflowY: 'auto', px: 1.5, pb: 1 }}>
          {filtered.length === 0 ? (
            <Typography sx={{ px: 1.5, py: 1.5, fontSize: 14, lineHeight: '20px', color: C.grey400 }}>
              No results
            </Typography>
          ) : filtered.map((option) => {
            const selected = multiple ? (values ?? []).includes(option.value) : option.value === value;
            return (
              <Box
                key={option.value}
                role={multiple ? 'checkbox' : 'radio'}
                aria-checked={selected}
                onClick={() => {
                  onChange(option.value);
                  if (!multiple) onClose();
                }}
                sx={{
                  px: 1,
                  py: 1,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'transparent',
                  '&:hover': { bgcolor: '#F5F5F6' },
                }}
              >
                {multiple ? (
                  <Checkbox
                    checked={selected}
                    tabIndex={-1}
                    size="small"
                    sx={{ p: 0, color: '#D0D5DD', pointerEvents: 'none', '&.Mui-checked': { color: C.green } }}
                  />
                ) : (
                  <Radio
                    checked={selected}
                    tabIndex={-1}
                    size="small"
                    sx={{ p: 0, color: '#D0D5DD', pointerEvents: 'none', '&.Mui-checked': { color: C.green } }}
                  />
                )}
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: selected ? 500 : 400, lineHeight: '20px', color: C.text }}>
                    {option.label}
                  </Typography>
                  {option.description ? (
                    <Typography sx={{ fontSize: 12, lineHeight: '16px', color: C.grey400 }}>
                      {option.description}
                    </Typography>
                  ) : null}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>,
    shell,
  );
}

function InfoSheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  const [present, setPresent] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (open) {
      setPresent(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setShown(true));
      });
      return () => cancelAnimationFrame(frame);
    }
    setShown(false);
    const timer = window.setTimeout(() => setPresent(false), 280);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!present) return null;
  const shell = document.getElementById('mobile-contract-shell');
  if (!shell) return null;

  return createPortal(
    <>
      <Box
        onClick={onClose}
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.35)',
          zIndex: 30,
          borderRadius: '40px',
          opacity: shown ? 1 : 0,
          transition: 'opacity 280ms ease',
        }}
      />
      <Box
        role="dialog"
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 31,
          bgcolor: C.white,
          borderRadius: '20px 20px 0 0',
          transform: shown ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 280ms cubic-bezier(0.32, 0.72, 0, 1)',
          px: 2.5,
          pt: 1.25,
          pb: 3,
        }}
      >
        <Box sx={{ width: 36, height: 4, bgcolor: C.border, borderRadius: '2px', mx: 'auto', mb: 2 }} />
        {children}
      </Box>
    </>,
    shell,
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required,
  disabled = false,
  placeholder = 'Select',
  labelEnd,
  hideLabel = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  labelEnd?: ReactNode;
  hideLabel?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const items = options.filter((o) => o.value !== '');
  const emptyLabel = options.find((o) => o.value === '')?.label ?? placeholder;
  const selected = items.find((o) => o.value === value);
  return (
    <Stack sx={{ gap: hideLabel ? 0 : 0.5 }}>
      {hideLabel ? null : (
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: C.grey400 }}>
            {label}
            {required && <Box component="span" sx={{ color: C.red }}> *</Box>}
          </Typography>
          {labelEnd}
        </Stack>
      )}
      <Box
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          if (!disabled) setOpen(true);
        }}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(true);
          }
        }}
        sx={{
          bgcolor: disabled ? C.disabledBg : C.white,
          border: `1px solid ${C.border}`,
          borderRadius: '8px',
          height: 37,
          minHeight: 37,
          px: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          cursor: disabled ? 'default' : 'pointer',
          '&:hover': disabled ? undefined : { borderColor: '#D0CFD2' },
          '&:focus-visible': { outline: 'none', borderColor: '#6A6A70' },
        }}
      >
        <Typography
          noWrap
          sx={{ fontSize: 12, lineHeight: '18px', color: !selected ? C.placeholder : disabled ? C.grey400 : C.black, minWidth: 0 }}
        >
          {selected?.label ?? emptyLabel}
        </Typography>
        <ExpandMoreIcon sx={{ fontSize: 21, color: '#6A6A70', flexShrink: 0 }} />
      </Box>
      <OptionSheet
        open={open}
        title={label}
        options={items}
        value={value}
        onClose={() => setOpen(false)}
        onChange={onChange}
      />
    </Stack>
  );
}

const CONTACT_PEOPLE = [
  { id: 'henry', name: 'Henry Micheal', email: 'henrymicheal23@signal.com' },
  { id: 'jeff', name: 'Jeff Zolos', email: 'jeff@teamfiltergo.com' },
  { id: 'aleena', name: 'Aleena Javed', email: 'aleena@teamfiltergo.com' },
  { id: 'matt', name: 'Matt Quinn', email: 'matt.quinn@signal.com' },
  { id: 'jodi', name: 'Jodi Wimer', email: 'jodi.wimer@signal.com' },
  { id: 'darin', name: 'Darin Smith', email: 'darin.smith@signal.com' },
  { id: 'don', name: 'Don Crowell', email: 'don.crowell@signal.com' },
  { id: 'derrick', name: 'Derrick Dancy', email: 'derrick.dancy@signal.com' },
];

function PeopleMultiField({
  label,
  placeholder,
  required,
  people,
  selectedIds,
  onChange,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
  people: { id: string; name: string; email: string }[];
  selectedIds: string[];
  onChange: (ids: string[] | ((current: string[]) => string[])) => void;
}) {
  const [open, setOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const selected = people.filter((person) => selectedIds.includes(person.id));
  const [visibleCount, setVisibleCount] = useState(selected.length);

  function toggle(id: string) {
    onChange((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  useLayoutEffect(() => {
    const row = rowRef.current;
    const measure = measureRef.current;
    if (!row || !measure) return;

    const fit = () => {
      const available = row.clientWidth;
      const nameNodes = [...measure.querySelectorAll<HTMLElement>('[data-person-chip]')];
      const moreNode = measure.querySelector<HTMLElement>('[data-more-probe]');
      const gap = 6;
      let used = 0;
      let fitAll = 0;
      for (const node of nameNodes) {
        const width = node.offsetWidth + (fitAll > 0 ? gap : 0);
        if (used + width > available) break;
        used += width;
        fitAll += 1;
      }
      if (fitAll >= selected.length) {
        setVisibleCount(selected.length);
        return;
      }
      const moreWidth = (moreNode?.offsetWidth ?? 72) + gap;
      used = 0;
      let count = 0;
      for (const node of nameNodes) {
        const width = node.offsetWidth + (count > 0 ? gap : 0);
        if (used + width + moreWidth > available) break;
        used += width;
        count += 1;
      }
      setVisibleCount(count);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(row);
    return () => observer.disconnect();
  }, [selected]);

  return (
    <Stack sx={{ gap: 0.5 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: C.grey400 }}>
        {label}
        {required && <Box component="span" sx={{ color: C.red }}> *</Box>}
      </Typography>
      <Box
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(true);
          }
        }}
        sx={{
          bgcolor: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: '8px',
          minHeight: 37,
          height: 37,
          px: 1.5,
          py: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          '&:hover': { borderColor: '#D0CFD2' },
          '&:focus-visible': { outline: 'none', borderColor: '#6A6A70' },
        }}
      >
        {selected.length === 0 ? (
          <Typography noWrap sx={{ flex: 1, fontSize: 12, lineHeight: '18px', color: C.placeholder }}>
            {placeholder}
          </Typography>
        ) : (
          <Box ref={rowRef} sx={{ flex: 1, minWidth: 0, position: 'relative', height: 26 }}>
            <Box
              ref={measureRef}
              aria-hidden
              sx={{ position: 'absolute', left: 0, top: 0, visibility: 'hidden', pointerEvents: 'none', display: 'flex', gap: 0.75, width: 'max-content' }}
            >
              {selected.map((person) => (
                <Box key={person.id} data-person-chip sx={{ display: 'inline-flex', alignItems: 'center', height: 26, pl: 1, pr: 0.25, gap: 0.25, flexShrink: 0 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', whiteSpace: 'nowrap' }}>{person.name}</Typography>
                  <CloseIcon sx={{ fontSize: 14 }} />
                </Box>
              ))}
              <Box data-more-probe sx={{ display: 'inline-flex', alignItems: 'center', height: 26, px: 1, flexShrink: 0 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', whiteSpace: 'nowrap' }}>
                  +{Math.max(selected.length - 1, 1)} more
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 0.75, overflow: 'hidden', alignItems: 'center' }}>
              {selected.slice(0, visibleCount).map((person) => (
                <Box
                  key={person.id}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.25,
                    height: 26,
                    pl: 1,
                    pr: 0.25,
                    borderRadius: '13px',
                    bgcolor: '#F5F5F6',
                    maxWidth: '100%',
                    minWidth: 0,
                    flexShrink: selected.length - visibleCount > 0 && visibleCount === 1 ? 1 : 0,
                    overflow: 'hidden',
                  }}
                >
                  <Typography noWrap sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: C.black }}>
                    {person.name}
                  </Typography>
                  <IconButton
                    size="small"
                    aria-label={`Remove ${person.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(person.id);
                    }}
                    sx={{ p: 0.25, color: C.grey400 }}
                  >
                    <CloseIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>
              ))}
              {selected.length - visibleCount > 0 ? (
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    height: 26,
                    px: 1,
                    borderRadius: '13px',
                    bgcolor: '#F5F5F6',
                    flexShrink: 0,
                  }}
                >
                  <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: C.black, whiteSpace: 'nowrap' }}>
                    +{selected.length - visibleCount} more
                  </Typography>
                </Box>
              ) : null}
            </Box>
          </Box>
        )}
        <ExpandMoreIcon sx={{ fontSize: 21, color: '#6A6A70', flexShrink: 0 }} />
      </Box>
      <OptionSheet
        open={open}
        title={label}
        multiple
        value=""
        values={selectedIds}
        onClose={() => setOpen(false)}
        onChange={toggle}
        options={people.map((person) => ({ label: person.name, value: person.id, description: person.email }))}
      />
    </Stack>
  );
}

/* ─── Section header ─── */
function SectionHeader({
  title,
  open,
  onToggle,
  action,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  action?: ReactNode;
}) {
  return (
    <Box>
      <Box
        onClick={onToggle}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', mb: 0.75, gap: 1 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: C.black, whiteSpace: 'nowrap' }}>
            {title}
          </Typography>
          {action}
        </Box>
        <ExpandMoreIcon
          sx={{
            fontSize: 18,
            color: C.grey700,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}
        />
      </Box>
      <Divider />
    </Box>
  );
}

const COUNTRY_CODES = [
  { label: '🇺🇸 +1', value: '+1' },
  { label: '🇬🇧 +44', value: '+44' },
  { label: '🇵🇰 +92', value: '+92' },
  { label: '🇮🇳 +91', value: '+91' },
];

function CreateContactScreen({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (person: { id: string; name: string; email: string }) => void;
}) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [codeOpen, setCodeOpen] = useState(false);
  const [error, setError] = useState('');

  function submit() {
    const first = firstName.trim();
    const last = lastName.trim();
    const mail = email.trim();
    if (!mail || !first || !last || !jobTitle.trim() || !phone.trim()) {
      setError('Fill in all required fields.');
      return;
    }
    onCreate({
      id: `contact_${Date.now()}`,
      name: `${first} ${last}`,
      email: mail,
    });
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 44,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 22,
        bgcolor: C.white,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ height: 54, px: 1, display: 'flex', alignItems: 'center', gap: 1, borderBottom: `0.5px solid ${C.border}`, flexShrink: 0 }}>
        <IconButton size="small" aria-label="Back" onClick={onClose} sx={{ color: 'rgba(41, 41, 41, 1)' }}>
          <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: C.black }}>Create a New Contact</Typography>
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto', px: 2, py: 2 }}>
        <Typography sx={{ fontSize: 14, lineHeight: '20px', color: '#5B5B5F', mb: 2 }}>
          Add the following information to create a new contact
        </Typography>
        <Stack sx={{ gap: 1.5 }}>
          <Field label="Email" placeholder="Add email" value={email} onChange={setEmail} required type="email" />
          <Field label="First Name" placeholder="First Name" value={firstName} onChange={setFirstName} required />
          <Field label="Last Name" placeholder="Last Name" value={lastName} onChange={setLastName} required />
          <Field label="Job Title" placeholder="Job Title" value={jobTitle} onChange={setJobTitle} required />
          <Stack sx={{ gap: 0.5 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: C.grey400 }}>
              Phone Number
              <Box component="span" sx={{ color: C.red }}> *</Box>
            </Typography>
            <Box sx={{ height: 37, border: `1px solid ${C.border}`, borderRadius: '8px', display: 'flex', alignItems: 'center', px: 1.5, gap: 1 }}>
              <Box
                role="button"
                tabIndex={0}
                onClick={() => setCodeOpen(true)}
                sx={{ display: 'flex', alignItems: 'center', gap: 0.25, cursor: 'pointer', flexShrink: 0 }}
              >
                <Typography sx={{ fontSize: 12, lineHeight: '18px', color: C.black, whiteSpace: 'nowrap' }}>
                  {COUNTRY_CODES.find((code) => code.value === countryCode)?.label ?? countryCode}
                </Typography>
                <ExpandMoreIcon sx={{ fontSize: 21, color: '#6A6A70' }} />
              </Box>
              <InputBase
                fullWidth
                placeholder="Contact#"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{
                  fontSize: 12,
                  color: C.black,
                  '& input': { p: 0, fontSize: 12, color: C.black, WebkitTextFillColor: C.black },
                  '& input::placeholder': { color: C.placeholder, opacity: 1, WebkitTextFillColor: C.placeholder },
                }}
              />
            </Box>
            <OptionSheet
              open={codeOpen}
              title="Country code"
              value={countryCode}
              onClose={() => setCodeOpen(false)}
              onChange={setCountryCode}
              options={COUNTRY_CODES}
            />
          </Stack>
          {error ? (
            <Typography sx={{ fontSize: 12, lineHeight: '18px', color: C.red }}>{error}</Typography>
          ) : null}
        </Stack>
      </Box>
      <Box sx={{ px: 2, py: 1.5, display: 'flex', gap: 1.5, borderTop: `0.5px solid ${C.border}`, flexShrink: 0 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={onClose}
          sx={{ height: 44, borderRadius: '10px', borderColor: C.border, color: C.grey700, textTransform: 'none', fontSize: 14, fontWeight: 500, '&:hover': { borderColor: C.border, bgcolor: C.bg } }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          onClick={submit}
          sx={{ height: 44, borderRadius: '10px', bgcolor: C.green, color: C.white, textTransform: 'none', fontSize: 14, fontWeight: 600, '&:hover': { bgcolor: C.greenHover } }}
        >
          Create Contact
        </Button>
      </Box>
    </Box>
  );
}

/* ─── Option constants ─── */
const DESCRIPTION_IMAGE_MAX_BYTES = 10 * 1024 * 1024;
const DESCRIPTION_IMAGE_ACCEPT =
  'image/jpeg,image/png,image/heic,image/heif,.jpg,.jpeg,.png,.heic';

function isDescriptionImageFile(file: File): boolean {
  const lower = file.name.toLowerCase();
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || lower.endsWith('.heic')) {
    return true;
  }
  return file.type.startsWith('image/');
}

type DescriptionImage = {
  id: string;
  file: File;
  previewUrl: string;
};

const PROPERTY_BILLING_ADDRESS = {
  address: '412 N Broadway St',
  country: 'USA',
  state: 'Nebraska',
  city: 'Bloomfield',
  zip: '68718',
} as const;

const AFFILIATION_OPTIONS = [
  { id: 'headquarters', label: 'Headquarters' },
  { id: 'regional_office', label: 'Regional Office' },
  { id: 'managed', label: 'Managed' },
  { id: 'owned', label: 'Owned' },
  { id: 'shared', label: 'Shared' },
  { id: 'tenant', label: 'Tenant' },
];
const INDUSTRY_OPTIONS = [
  { label: 'Select industry vertical', value: '' },
  { label: 'Commercial', value: 'Commercial' },
  { label: 'Distribution', value: 'Distribution' },
  { label: 'Housing', value: 'Housing' },
  { label: 'Industrial', value: 'Industrial' },
  { label: 'Manufacturing', value: 'Manufacturing' },
];
const COMPANY_OPTIONS = [
  { label: 'Select company', value: '' },
  { label: 'Tkxel One World', value: 'Tkxel One World' },
  { label: 'Signal Security Partners', value: 'Signal Security Partners' },
  { label: 'Midwest Distribution Co', value: 'Midwest Distribution Co' },
  { label: 'Prairie Housing Group', value: 'Prairie Housing Group' },
];
const PROPERTY_ADDRESS_OPTIONS = [
  { label: 'Select property address', value: '' },
  { label: '1 World Trade Center, New York, NY 10007', value: '1 World Trade Center, New York, NY 10007' },
  { label: '4 World Trade Center, New York, NY 10007', value: '4 World Trade Center, New York, NY 10007' },
  { label: '150 Warehouse Blvd, Lincoln, NE 68508', value: '150 Warehouse Blvd, Lincoln, NE 68508' },
  { label: '200 Logistics Way, Omaha, NE 68102', value: '200 Logistics Way, Omaha, NE 68102' },
  { label: '901 Maple Ave, Bloomfield, NE 68718', value: '901 Maple Ave, Bloomfield, NE 68718' },
  { label: '220 Oak Street, Norfolk, NE 68701', value: '220 Oak Street, Norfolk, NE 68701' },
];
const PROPERTY_SOURCE_OPTIONS = [
  { label: 'Select property source', value: '' },
  { label: 'ALN', value: 'ALN' },
  { label: 'Costar', value: 'Costar' },
  { label: 'Referral', value: 'Referral' },
];
const FRANCHISE_OPTIONS = [
  { label: 'Select associated franchise', value: '' },
  { label: '#402 Nebraska, NB', value: '#402 Nebraska, NB' },
  { label: 'None', value: 'None' },
  { label: 'IFA / Franchisee network', value: 'IFA / Franchisee network' },
  { label: 'Regional co-op', value: 'Regional co-op' },
];
const PRODUCT_DIM_OPTIONS = [
  { label: 'Select product size', value: '' },
  { label: '20*20*12', value: '20*20*12' },
  { label: '10*10*8', value: '10*10*8' },
];
const PAYMENT_TERMS_OPTIONS = [
  { label: 'Select Payment Terms', value: '' },
  { label: 'Due Upon Invoice', value: 'Due Upon Invoice' },
  { label: 'Net 10. Ten Days After Invoice Date', value: 'Net 10. Ten Days After Invoice Date' },
  { label: 'Net 15. Fifteen Days After Invoice Date', value: 'Net 15. Fifteen Days After Invoice Date' },
  { label: 'Net 30. Thirty Days After Invoice Date', value: 'Net 30. Thirty Days After Invoice Date' },
];
const COUNTRY_OPTIONS = [
  { label: 'Select country', value: '' },
  { label: 'USA', value: 'USA' },
  { label: 'United States of America', value: 'United States of America' },
  { label: 'Canada', value: 'Canada' },
];
const CITY_OPTIONS = [
  { label: 'Select city', value: '' },
  { label: 'Bloomfield', value: 'Bloomfield' },
  { label: 'New York', value: 'New York' },
  { label: 'Omaha', value: 'Omaha' },
];
const STATE_OPTIONS = [
  { label: 'Select state', value: '' },
  { label: 'Florida', value: 'Florida' },
  { label: 'Nebraska', value: 'Nebraska' },
];

type BillingPlan = 'annually' | 'semi_annually' | 'quarterly' | 'monthly';
const BILLING_MONTHLY_RATE = 120;

function billingPlanQuote(id: BillingPlan) {
  const months = { annually: 12, semi_annually: 6, quarterly: 3, monthly: 1 }[id];
  const discount = id === 'annually' ? 0.1 : id === 'quarterly' ? 0.05 : 0;
  const compareAt = BILLING_MONTHLY_RATE * months;
  const price = Math.round(compareAt * (1 - discount));
  return {
    price,
    ...(discount > 0 ? { compareAt, off: `${Math.round(discount * 100)}% off` } : {}),
  };
}

function money(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

type Product = { id: number; dimension: string; rate: string; quantity: string };
type Signee  = { id: number; name: string; title: string; email: string; signature?: string };

export function MobileContractPage() {
  const navigate = useNavigate();

  /* ── Company ── */
  const [companyName, setCompanyName]             = useState('');
  const [propertyAddress, setPropertyAddress]     = useState('');
  const [propertyName, setPropertyName]           = useState('');
  const [propertySource, setPropertySource]       = useState('');
  const [industryVertical, setIndustryVertical]   = useState('');
  const [franchise, setFranchise]                 = useState('');
  const [affiliations, setAffiliations]           = useState<string[]>([]);

  function toggleAffiliation(id: string) {
    setAffiliations((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  }

  /* ── Contact ── */
  const [contacts, setContacts] = useState(CONTACT_PEOPLE);
  const [createContactOpen, setCreateContactOpen] = useState(false);
  const [decisionMakerIds, setDecisionMakerIds] = useState<string[]>([]);
  const [billingContactIds, setBillingContactIds] = useState<string[]>([]);

  /* ── Contract & dates ── */
  const [contractStartDate, setContractStartDate]   = useState('');
  const [serviceStartDate, setServiceStartDate]     = useState('');
  const [sameAsContract, setSameAsContract]         = useState(false);
  const [firstInstallOnServiceDate, setFirstInstallOnServiceDate] = useState(false);
  const [firstInstallInfoOpen, setFirstInstallInfoOpen] = useState(false);
  const [occurrenceEvery, setOccurrenceEvery]       = useState('01');
  const [occurrenceUnit, setOccurrenceUnit]         = useState('Month');
  const [occurrenceUnitOpen, setOccurrenceUnitOpen] = useState(false);

  /* ── Products ── */
  const [products, setProducts] = useState<Product[]>([
    { id: 1, dimension: '20*20*12', rate: '35.00', quantity: '1' },
  ]);
  const [nextProductId, setNextProductId] = useState(2);

  function addProduct() {
    setProducts((p) => [...p, { id: nextProductId, dimension: '', rate: '', quantity: '' }]);
    setNextProductId((n) => n + 1);
  }
  function updateProduct(id: number, field: keyof Omit<Product, 'id'>, val: string) {
    setProducts((p) => p.map((pr) => (pr.id === id ? { ...pr, [field]: val } : pr)));
  }
  function removeProduct(id: number) {
    setProducts((p) => p.filter((pr) => pr.id !== id));
  }

  const subtotal = products.reduce((sum, p) => {
    const r = parseFloat(p.rate.replace(/[^0-9.]/g, '')) || 0;
    const q = parseInt(p.quantity, 10) || 0;
    return sum + r * q;
  }, 0);
  const [flatRateEnabled, setFlatRateEnabled] = useState(false);
  const [flatRateAmount, setFlatRateAmount] = useState('0.00');
  const flatRateFilterCount = products.reduce((sum, p) => sum + (parseInt(p.quantity, 10) || 0), 0);
  const flatRateTotal = flatRateFilterCount * (parseFloat(flatRateAmount.replace(/[^0-9.]/g, '')) || 0);

  /* ── Billing & payment ── */
  const [billingPlanMode, setBillingPlanMode] = useState<'recurring' | 'at_service'>('recurring');
  const [billingFrequencyPlan, setBillingFrequencyPlan] = useState<BillingPlan>('annually');
  const [billingDiscount, setBillingDiscount] = useState('');
  const [billingDiscountUnit, setBillingDiscountUnit] = useState('Percentage');
  const [discountUnitOpen, setDiscountUnitOpen] = useState(false);
  const [billingTaxRate, setBillingTaxRate] = useState('');
  const [exemptTax, setExemptTax] = useState(false);
  const [autoCharge, setAutoCharge] = useState(true);
  const [nextPaymentDate, setNextPaymentDate] = useState('');
  const [annualRateIncrease, setAnnualRateIncrease] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card / ACH');
  const [paymentTerms, setPaymentTerms] = useState('Due Upon Invoice');
  const [sameAsPropertyAddress, setSameAsPropertyAddress] = useState(true);
  const [billAddress, setBillAddress] = useState<string>(PROPERTY_BILLING_ADDRESS.address);
  const [billCountry, setBillCountry] = useState<string>(PROPERTY_BILLING_ADDRESS.country);
  const [billCity, setBillCity] = useState<string>(PROPERTY_BILLING_ADDRESS.city);
  const [billState, setBillState] = useState<string>(PROPERTY_BILLING_ADDRESS.state);
  const [billZip, setBillZip] = useState<string>(PROPERTY_BILLING_ADDRESS.zip);

  const [descriptionImages, setDescriptionImages] = useState<DescriptionImage[]>([]);
  const [descriptionImageError, setDescriptionImageError] = useState('');
  const descriptionImageInputRef = useRef<HTMLInputElement>(null);

  const appendDescriptionImages = useCallback((fileList: FileList | null | undefined) => {
    if (!fileList?.length) return;
    const toAdd: DescriptionImage[] = [];
    let error = '';
    for (const file of Array.from(fileList)) {
      if (!isDescriptionImageFile(file)) {
        error = 'Only jpg, png, and heic images are allowed.';
        continue;
      }
      if (file.size > DESCRIPTION_IMAGE_MAX_BYTES) {
        error = 'Each image must be 10MB or less.';
        continue;
      }
      toAdd.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }
    setDescriptionImageError(error);
    if (toAdd.length > 0) {
      setDescriptionImages((prev) => [...prev, ...toAdd]);
    }
  }, []);

  const removeDescriptionImage = useCallback((id: string) => {
    setDescriptionImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  /* ── Signees ── */
  const [signees, setSignees]     = useState<Signee[]>([]);
  const [nextSigneeId, setNextSigneeId] = useState(1);

  /* Signee bottom sheet */
  const [signeeSheetOpen, setSigneeSheetOpen]     = useState(false);
  const [editingSigneeId, setEditingSigneeId]     = useState<number | null>(null);
  const [signeeNewName, setSigneeNewName]         = useState('');
  const [signeeNewTitle, setSigneeNewTitle]       = useState('');
  const [signeeNewEmail, setSigneeNewEmail]       = useState('');

  /* Sign contract bottom sheet */
  const [signSheetOpen, setSignSheetOpen]         = useState(false);
  const [signeeIdForSign, setSigneeIdForSign]     = useState<number | null>(null);
  const canvasRef                                 = useRef<HTMLCanvasElement>(null);
  const isDrawingRef                              = useRef(false);

  /* ── Section accordion state ── */
  const [openCompany, setOpenCompany]           = useState(true);
  const [openContact, setOpenContact]           = useState(true);
  const [openContractDates, setOpenContractDates] = useState(true);
  const [openProducts, setOpenProducts]         = useState(true);
  const [openBilling, setOpenBilling]           = useState(true);
  const [openDescription, setOpenDescription]   = useState(true);
  const [openSignee, setOpenSignee]             = useState(true);

  useEffect(() => {
    if (!sameAsPropertyAddress) return;
    const preset = PROPERTY_BILLING_ADDRESS;
    setBillAddress(propertyAddress.trim() || preset.address);
    setBillCountry(preset.country);
    setBillState(preset.state);
    setBillCity(preset.city);
    setBillZip(preset.zip);
  }, [sameAsPropertyAddress, propertyAddress]);

  useEffect(() => {
    if (billingPlanMode !== 'recurring') return;
    setAutoCharge(true);
    setPaymentMethod('Credit Card / ACH');
    setPaymentTerms('Due Upon Invoice');
  }, [billingPlanMode]);

  const recurringPaymentCadence = {
    annually: 'annually',
    semi_annually: 'every 6 months',
    quarterly: 'quarterly',
    monthly: 'monthly',
  }[billingFrequencyPlan];

  function openAddSigneeSheet() {
    setEditingSigneeId(null);
    setSigneeNewName(''); setSigneeNewTitle(''); setSigneeNewEmail('');
    setSigneeSheetOpen(true);
  }
  function openEditSigneeSheet(s: Signee) {
    setEditingSigneeId(s.id);
    setSigneeNewName(s.name); setSigneeNewTitle(s.title); setSigneeNewEmail(s.email);
    setSigneeSheetOpen(true);
  }
  function handleSaveSignee() {
    if (editingSigneeId !== null) {
      setSignees((prev) => prev.map((sg) => sg.id === editingSigneeId ? { ...sg, name: signeeNewName, title: signeeNewTitle, email: signeeNewEmail } : sg));
    } else {
      setSignees((prev) => [...prev, { id: nextSigneeId, name: signeeNewName, title: signeeNewTitle, email: signeeNewEmail }]);
      setNextSigneeId((n) => n + 1);
    }
    setSigneeSheetOpen(false);
  }
  function removeSignee(id: number) {
    setSignees((s) => s.filter((sg) => sg.id !== id));
  }

  function openSignSheet(id: number) {
    setSigneeIdForSign(id);
    setSignSheetOpen(true);
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 50);
  }

  function getCanvasPos(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }

  function onCanvasStart(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    isDrawingRef.current = true;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pos = getCanvasPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function onCanvasDraw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    e.preventDefault();
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const pos = getCanvasPos(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function onCanvasEnd(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    e.preventDefault();
    isDrawingRef.current = false;
  }

  function clearSignatureCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function handleAddSignature() {
    const canvas = canvasRef.current;
    const dataUrl = canvas ? canvas.toDataURL() : '';
    setSignees((prev) => prev.map((sg) => sg.id === signeeIdForSign ? { ...sg, signature: dataUrl } : sg));
    setSignSheetOpen(false);
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#E5E5E5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Box
        id="mobile-contract-shell"
        sx={{
          position: 'relative',
          width: 375,
          height: 812,
          flexShrink: 0,
          bgcolor: C.bg,
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          borderRadius: '40px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Status bar */}
        <Box
          sx={{
            height: 44,
            px: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(7px)',
            borderBottom: `0.5px solid ${C.border}`,
            flexShrink: 0,
          }}
        >
          <Typography sx={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.165 }}>9:41</Typography>
          <Box sx={{ width: 17, height: 12, bgcolor: C.black, borderRadius: '2px', opacity: 0.8 }} />
        </Box>

        {/* Nav bar */}
        <Box
          sx={{
            height: 54,
            px: 1,
            display: 'flex',
            alignItems: 'center',
            bgcolor: C.white,
            borderBottom: `0.5px solid ${C.border}`,
            flexShrink: 0,
            gap: 1,
          }}
        >
          <IconButton size="small" onClick={() => navigate('/filtergo/mobile')} sx={{ color: 'rgba(41, 41, 41, 1)' }}>
            <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: C.black, flex: 1 }}>
            Smart Contract
          </Typography>
        </Box>

        {/* Scrollable form */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: '14px',
            pt: 1,
            pb: 3,
            bgcolor: C.white,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {/* ── Company ── */}
          <Box>
            <SectionHeader title="Company & Property Details" open={openCompany} onToggle={() => setOpenCompany((v) => !v)} />
            <Collapse in={openCompany}>
              <Stack sx={{ gap: 1.5, pt: 1.5 }}>
                <SelectField
                  label="Property Address"
                  value={propertyAddress}
                  onChange={setPropertyAddress}
                  options={PROPERTY_ADDRESS_OPTIONS}
                  placeholder="Select property address"
                  required
                  labelEnd={<MapOutlinedIcon sx={{ fontSize: 16, color: '#6A6A70' }} />}
                />
                <Field label="Property Name" placeholder="Enter property name" value={propertyName} onChange={setPropertyName} />
                <SelectField
                  label="Property Source"
                  value={propertySource}
                  onChange={setPropertySource}
                  options={PROPERTY_SOURCE_OPTIONS}
                  placeholder="Select property source"
                  required
                />
                <SelectField
                  label="Company"
                  value={companyName}
                  onChange={setCompanyName}
                  options={COMPANY_OPTIONS}
                  placeholder="Select company"
                  required
                />
                <SelectField
                  label="Associated Franchise"
                  value={franchise}
                  onChange={setFranchise}
                  options={FRANCHISE_OPTIONS}
                  placeholder="Select associated franchise"
                />
                <SelectField label="Industry Vertical" value={industryVertical} onChange={setIndustryVertical} options={INDUSTRY_OPTIONS} required />
                <Stack sx={{ gap: 0.5 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: C.grey400 }}>
                    Affiliation
                    <Box component="span" sx={{ color: C.red }}> *</Box>
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {AFFILIATION_OPTIONS.map((opt) => {
                      const selected = affiliations.includes(opt.id);
                      return (
                        <Button
                          key={opt.id}
                          variant="outlined"
                          disableElevation
                          onClick={() => toggleAffiliation(opt.id)}
                          sx={{
                            height: 32,
                            px: 1.5,
                            borderRadius: '40px',
                            textTransform: 'none',
                            fontSize: 12,
                            fontWeight: 400,
                            color: selected ? '#1A9E4A' : C.black,
                            bgcolor: selected ? '#EDFAF3' : C.white,
                            borderWidth: selected ? '1.5px' : '1px',
                            borderColor: selected ? '#1A9E4A' : C.border,
                            '&:hover': { bgcolor: selected ? '#EDFAF3' : C.white, borderColor: selected ? '#1A9E4A' : '#C0C0C5' },
                          }}
                        >
                          {opt.label}
                        </Button>
                      );
                    })}
                  </Box>
                </Stack>
              </Stack>
            </Collapse>
          </Box>

          {/* ── Contact details ── */}
          <Box>
            <SectionHeader
              title="Contact details"
              open={openContact}
              onToggle={() => setOpenContact((v) => !v)}
              action={
                <Button
                  variant="text"
                  disableRipple
                  startIcon={<AddIcon sx={{ fontSize: 18 }} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCreateContactOpen(true);
                  }}
                  sx={{
                    color: C.green,
                    textTransform: 'none',
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: '20px',
                    minWidth: 0,
                    px: 0.5,
                    py: 0,
                    '& .MuiButton-startIcon > *:nth-of-type(1)': { fontSize: 18 },
                    '&:hover': { bgcolor: 'rgba(45, 165, 81, 0.08)', color: C.greenHover },
                  }}
                >
                  Create New
                </Button>
              }
            />
            <Collapse in={openContact}>
              <Stack sx={{ gap: 1.5, pt: 1.5 }}>
                <PeopleMultiField
                  label="Decision Maker"
                  placeholder="Select decision maker"
                  required
                  people={contacts}
                  selectedIds={decisionMakerIds}
                  onChange={setDecisionMakerIds}
                />
                <PeopleMultiField
                  label="Billing"
                  placeholder="Select billing"
                  people={contacts}
                  selectedIds={billingContactIds}
                  onChange={setBillingContactIds}
                />
              </Stack>
            </Collapse>
          </Box>

          {/* ── Contract & dates ── */}
          <Box>
            <SectionHeader title="Contract Details" open={openContractDates} onToggle={() => setOpenContractDates((v) => !v)} />
            <Collapse in={openContractDates}>
              <Stack sx={{ gap: 1.5, pt: 1.5 }}>
                <Field label="Contract Start Date" placeholder="MM/DD/YY" value={contractStartDate} onChange={setContractStartDate} required calendar />
                <Field label="Service Start Date" placeholder="MM/DD/YY" value={serviceStartDate} onChange={setServiceStartDate} required calendar disabled={sameAsContract} />
                <Stack sx={{ gap: 1.5 }}>
                  <FormControlLabel
                    sx={{ m: 0, alignItems: 'center', gap: '6px', '& .MuiFormControlLabel-label': { ml: 0 } }}
                    control={
                      <Checkbox
                        size="small"
                        checked={sameAsContract}
                        onChange={(e) => {
                          setSameAsContract(e.target.checked);
                          if (e.target.checked) setServiceStartDate(contractStartDate);
                        }}
                        sx={{ p: 0, color: '#D0D5DD', '&.Mui-checked': { color: C.green } }}
                      />
                    }
                    label={<Typography sx={{ fontSize: 12, lineHeight: '18px', color: C.text }}>Service Start Same As Contract Start Date</Typography>}
                  />
                  <FormControlLabel
                    sx={{ m: 0, alignItems: 'center', gap: '6px', '& .MuiFormControlLabel-label': { ml: 0 } }}
                    control={
                      <Checkbox
                        size="small"
                        checked={firstInstallOnServiceDate}
                        onChange={(e) => setFirstInstallOnServiceDate(e.target.checked)}
                        sx={{ p: 0, color: '#D0D5DD', '&.Mui-checked': { color: C.green } }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography sx={{ fontSize: 12, lineHeight: '18px', color: C.text }}>First Install On Service Date</Typography>
                        <IconButton
                          size="small"
                          aria-label="About first install on service date"
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFirstInstallInfoOpen(true);
                          }}
                          sx={{ p: 0, color: '#17B26A' }}
                        >
                          <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    }
                  />
                </Stack>
                <InfoSheet open={firstInstallInfoOpen} onClose={() => setFirstInstallInfoOpen(false)}>
                  <Typography sx={{ fontSize: 14, lineHeight: '20px', color: C.text }}>
                    The first install will be performed on the service date and won't be grouped into a harmonized route. Later visits of contract are harmonized as usual.
                  </Typography>
                </InfoSheet>
                <Stack sx={{ gap: 0.75 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: C.grey400 }}>
                    Service Occurrence
                    <Box component="span" sx={{ color: C.red }}> *</Box>
                  </Typography>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: 12, lineHeight: '18px', color: C.text, whiteSpace: 'nowrap' }}>Repeat Every</Typography>
                    <Box
                      sx={{
                        width: 92,
                        flexShrink: 0,
                        bgcolor: C.white,
                        border: `1px solid ${C.border}`,
                        borderRadius: '8px',
                        px: 1,
                        height: 37,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <InputBase
                        fullWidth
                        type="number"
                        placeholder="01"
                        value={occurrenceEvery}
                        onChange={(e) => setOccurrenceEvery(e.target.value)}
                        inputProps={{ min: 1 }}
                        sx={{ fontSize: 12, color: C.black, '& input': { p: 0, color: C.black, WebkitTextFillColor: C.black }, '& input::placeholder': { color: C.placeholder, opacity: 1, WebkitTextFillColor: C.placeholder } }}
                      />
                    </Box>
                    <Box
                      role="button"
                      tabIndex={0}
                      aria-haspopup="dialog"
                      aria-expanded={occurrenceUnitOpen}
                      onClick={() => setOccurrenceUnitOpen(true)}
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        bgcolor: C.white,
                        border: `1px solid ${C.border}`,
                        borderRadius: '8px',
                        px: 1.5,
                        height: 37,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 0.5,
                        cursor: 'pointer',
                      }}
                    >
                      <Typography noWrap sx={{ fontSize: 12, lineHeight: '18px', color: C.black }}>{occurrenceUnit}</Typography>
                      <ExpandMoreIcon sx={{ fontSize: 21, color: '#6A6A70', flexShrink: 0 }} />
                    </Box>
                    <OptionSheet
                      open={occurrenceUnitOpen}
                      title="Repeat Every"
                      value={occurrenceUnit}
                      onClose={() => setOccurrenceUnitOpen(false)}
                      onChange={setOccurrenceUnit}
                      options={[
                        { label: 'Week', value: 'Week' },
                        { label: 'Month', value: 'Month' },
                      ]}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Collapse>
          </Box>

          {/* ── Products ── */}
          <Box>
            <SectionHeader title="Products" open={openProducts} onToggle={() => setOpenProducts((v) => !v)} />
            <Collapse in={openProducts}>
              <Stack sx={{ gap: 1.5, pt: 1.5 }}>
                <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, flexWrap: 'nowrap', height: 37, minHeight: 37, maxHeight: 37, overflow: 'hidden' }}>
                  <Checkbox
                    checked={flatRateEnabled}
                    onChange={(_, checked) => setFlatRateEnabled(checked)}
                    sx={{
                      p: 0,
                      color: '#D0D5DD',
                      '&.Mui-checked': { color: '#17B26A' },
                      '& .MuiSvgIcon-root': { fontSize: 20 },
                    }}
                  />
                  <Typography sx={{ fontSize: 13, fontWeight: 700, lineHeight: 1, color: C.black, whiteSpace: 'nowrap' }}>Flat Rate</Typography>
                  {flatRateEnabled ? (
                    <>
                      <Typography sx={{ fontSize: 14, fontWeight: 500, lineHeight: '24px', color: C.text }}>
                        {flatRateFilterCount} Filters
                      </Typography>
                      <Typography sx={{ fontSize: 14, lineHeight: '24px', color: C.text }}>×</Typography>
                      <Box
                        sx={{
                          width: 76,
                          height: 37,
                          bgcolor: C.white,
                          border: `1px solid ${C.border}`,
                          borderRadius: '6px',
                          px: 0.75,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.25,
                        }}
                      >
                        <Typography sx={{ fontSize: 12, lineHeight: '16px', color: C.text, flexShrink: 0 }}>$</Typography>
                        <InputBase
                          value={flatRateAmount}
                          onChange={(e) => setFlatRateAmount(e.target.value)}
                          inputProps={{ inputMode: 'decimal', 'aria-label': 'Flat rate' }}
                          sx={{
                            fontSize: 12,
                            color: C.black,
                            '& input': { p: 0, fontSize: 12, color: C.black, WebkitTextFillColor: C.black },
                          }}
                        />
                      </Box>
                      <Typography sx={{ fontSize: 14, lineHeight: '24px', color: C.text }}>=</Typography>
                      <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '24px', color: C.text }}>
                        ${flatRateTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Typography>
                    </>
                  ) : null}
                </Stack>
                {products.map((p, idx) => (
                  <Box
                    key={p.id}
                    sx={{ bgcolor: C.bg, border: `1px solid ${C.border}`, borderRadius: '10px', p: 1.5, display: 'flex', flexDirection: 'column', gap: 1.25 }}
                  >
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: C.grey400 }}>
                        Product {String(idx + 1).padStart(2, '0')}
                      </Typography>
                      {products.length > 1 && (
                        <IconButton size="small" onClick={() => removeProduct(p.id)} sx={{ color: C.red, p: 0.25 }} aria-label="Remove product">
                          <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      )}
                    </Stack>
                    <SelectField hideLabel label="Product" value={p.dimension} onChange={(v) => updateProduct(p.id, 'dimension', v)} options={PRODUCT_DIM_OPTIONS} />
                    <Stack direction="row" sx={{ gap: 1, alignItems: 'flex-end' }}>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Field label="Quantity" placeholder="1" value={p.quantity} onChange={(v) => updateProduct(p.id, 'quantity', v)} />
                      </Box>
                      {flatRateEnabled ? null : (
                        <>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Field label="Rate" prefix="$" placeholder="35.00" value={p.rate} onChange={(v) => updateProduct(p.id, 'rate', v)} />
                          </Box>
                          <Stack sx={{ flex: 1, minWidth: 0, gap: 0.5 }}>
                            <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: C.grey400 }}>Sub total</Typography>
                            <Box sx={{ height: 37, display: 'flex', alignItems: 'center' }}>
                              <Typography sx={{ fontSize: 12, lineHeight: '18px', fontWeight: 500, color: C.black }}>
                                ${((parseFloat(p.rate.replace(/[^0-9.]/g, '')) || 0) * (parseFloat(p.quantity.replace(/[^0-9.]/g, '')) || 0)).toFixed(2)}
                              </Typography>
                            </Box>
                          </Stack>
                        </>
                      )}
                    </Stack>
                  </Box>
                ))}
                <Button
                  onClick={addProduct}
                  variant="outlined"
                  sx={{
                    borderRadius: '8px',
                    border: '1px dashed #E6E6E7',
                    color: C.text,
                    textTransform: 'none',
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: '20px',
                    py: 1.25,
                    '&:hover': { borderColor: '#D0CFD2', bgcolor: 'rgba(0,0,0,0.03)' },
                  }}
                >
                  <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#E7F8EE', border: '1px solid #2DA551', display: 'grid', placeItems: 'center', mr: 1.5 }}>
                    <AddIcon sx={{ fontSize: 14, color: C.green }} />
                  </Box>
                  Add Product
                </Button>
              </Stack>
            </Collapse>
          </Box>

          {/* ── Billing & Payment Details ── */}
          <Box>
            <SectionHeader title="Billing & Payment Details" open={openBilling} onToggle={() => setOpenBilling((v) => !v)} />
            <Collapse in={openBilling}>
              <Stack sx={{ gap: 1.5, pt: 1.5 }}>
                <Box sx={{ bgcolor: C.disabledBg, borderRadius: '12px', p: 1.5 }}>
                  <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 1.5 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 600, lineHeight: '20px', color: C.text }}>Billing Frequency</Typography>
                    <Box sx={{ bgcolor: C.white, borderRadius: '16px', px: 1.25, py: 0.25, border: `1px solid ${C.border}` }}>
                      <Typography sx={{ fontSize: 10, lineHeight: '16px', color: '#667085', whiteSpace: 'nowrap' }}>
                        Contract Duration: 12/24/24 - 12/30/26
                      </Typography>
                    </Box>
                  </Stack>
                  <Box sx={{ display: 'flex', p: '3px', mb: 1.5, borderRadius: '8px', bgcolor: C.white, border: `1px solid ${C.border}` }}>
                    {([
                      ['recurring', 'Recurring Plan'],
                      ['at_service', 'At Service'],
                    ] as const).map(([id, label]) => {
                      const selected = billingPlanMode === id;
                      return (
                        <Button
                          key={id}
                          type="button"
                          disableRipple
                          onClick={() => {
                            setBillingPlanMode(id);
                            if (id !== 'at_service' && paymentMethod === 'Check') setPaymentMethod('Credit Card / ACH');
                          }}
                          sx={{
                            flex: 1,
                            minWidth: 0,
                            px: 1,
                            py: 0.5,
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontSize: 14,
                            fontWeight: 500,
                            lineHeight: '20px',
                            color: selected ? C.white : '#6A6A70',
                            bgcolor: selected ? C.green : 'transparent',
                            '&:hover': { bgcolor: selected ? C.greenHover : '#F8F8F9' },
                          }}
                        >
                          {label}
                        </Button>
                      );
                    })}
                  </Box>
                  {billingPlanMode === 'recurring' ? (
                    <Stack sx={{ gap: 1, mb: 1.5 }}>
                      {([
                        ['annually', 'Annually', 'year'],
                        ['semi_annually', 'Semi-Annually', '6 months'],
                        ['quarterly', 'Quarterly', 'quarter'],
                        ['monthly', 'Monthly', 'month'],
                      ] as const).map(([id, label]) => {
                        const quote = billingPlanQuote(id);
                        const selected = billingFrequencyPlan === id;
                        return (
                          <Box
                            key={id}
                            onClick={() => setBillingFrequencyPlan(id)}
                            sx={{
                              bgcolor: C.white,
                              border: '1px solid',
                              borderColor: selected ? C.green : C.border,
                              borderRadius: '10px',
                              px: 1.5,
                              py: 1.25,
                              display: 'flex',
                              gap: 1,
                            }}
                          >
                            <Box sx={{ width: 16, height: 16, mt: '2px', borderRadius: '50%', border: `1px solid ${selected ? C.green : '#D0D5DD'}`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                              {selected ? <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: C.green }} /> : null}
                            </Box>
                            <Box sx={{ minWidth: 0 }}>
                              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
                                <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: '20px', color: C.text }}>{label}</Typography>
                                {quote.off ? (
                                  <Box sx={{ px: 0.75, borderRadius: '10px', bgcolor: '#E7F8EE', color: C.green, fontSize: 11, fontWeight: 600, lineHeight: '16px' }}>{quote.off}</Box>
                                ) : null}
                              </Stack>
                              <Stack direction="row" sx={{ alignItems: 'baseline', gap: 0.75 }}>
                                {quote.compareAt ? (
                                  <Typography sx={{ fontSize: 11, lineHeight: '18px', color: '#98A2B3', textDecoration: 'line-through' }}>{money(quote.compareAt)}</Typography>
                                ) : null}
                                <Typography sx={{ fontSize: 12, fontWeight: 700, lineHeight: '20px', color: C.text }}>{money(quote.price)}</Typography>
                              </Stack>
                            </Box>
                          </Box>
                        );
                      })}
                    </Stack>
                  ) : null}
                  <Stack sx={{ gap: 0.5, mb: 1.5 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: C.grey400 }}>Discount</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'stretch', height: 37, border: `1px solid ${C.border}`, borderRadius: '8px', bgcolor: C.white, overflow: 'hidden' }}>
                      <InputBase
                        placeholder="E.g., 10"
                        value={billingDiscount}
                        onChange={(e) => setBillingDiscount(e.target.value)}
                        sx={{ flex: 1, px: 1.5, fontSize: 12, color: C.black, '& input::placeholder': { color: C.placeholder, opacity: 1, WebkitTextFillColor: C.placeholder } }}
                      />
                      <Box sx={{ width: '1px', bgcolor: C.border, my: 1 }} />
                      <Box
                        role="button"
                        tabIndex={0}
                        aria-haspopup="dialog"
                        aria-expanded={discountUnitOpen}
                        onClick={() => setDiscountUnitOpen(true)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setDiscountUnitOpen(true);
                          }
                        }}
                        sx={{ width: 140, px: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', flexShrink: 0 }}
                      >
                        <Typography noWrap sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: C.black }}>
                          {billingDiscountUnit === 'Amount' ? 'Amount ($)' : 'Percentage (%)'}
                        </Typography>
                        <ExpandMoreIcon sx={{ fontSize: 21, color: '#6A6A70', flexShrink: 0 }} />
                      </Box>
                      <OptionSheet
                        open={discountUnitOpen}
                        title="Discount"
                        value={billingDiscountUnit}
                        onClose={() => setDiscountUnitOpen(false)}
                        onChange={setBillingDiscountUnit}
                        options={[
                          { label: 'Percentage (%)', value: 'Percentage' },
                          { label: 'Amount ($)', value: 'Amount' },
                        ]}
                      />
                    </Box>
                  </Stack>
                  <Field label="Tax Rate (%)" placeholder="E.g., 10" value={billingTaxRate} onChange={setBillingTaxRate} disabled={exemptTax} />
                  <FormControlLabel
                    sx={{ m: 0, alignItems: 'center' }}
                    control={
                      <Checkbox
                        size="small"
                        checked={exemptTax}
                        onChange={(e) => setExemptTax(e.target.checked)}
                        sx={{ p: 0.5, color: '#D0D5DD', '&.Mui-checked': { color: C.green } }}
                      />
                    }
                    label={<Typography sx={{ fontSize: 12, lineHeight: '20px', color: C.text }}>Exempt Tax</Typography>}
                  />
                  {exemptTax ? (
                    <Typography sx={{ fontSize: 12, lineHeight: '20px', color: C.text }}>
                      Upload a valid legal document to verify your tax exemption eligibility
                    </Typography>
                  ) : null}
                </Box>

                <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: C.text }}>Payment Terms</Typography>
                <Stack sx={{ gap: 0.5 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: C.black }}>Auto Charge</Typography>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1, minHeight: 36 }}>
                    <Typography sx={{ fontSize: 12, lineHeight: '16px', color: '#667085', flex: 1 }}>
                      {billingPlanMode === 'recurring'
                        ? 'Payments are always automatically charged on the scheduled date.'
                        : 'Charge automatically after service completion'}
                    </Typography>
                    <Switch
                      checked={autoCharge}
                      disabled={billingPlanMode === 'recurring'}
                      onChange={(_, checked) => {
                        setAutoCharge(checked);
                        if (checked) {
                          setPaymentMethod('Credit Card / ACH');
                          setPaymentTerms('Due Upon Invoice');
                        }
                      }}
                      sx={{
                        width: 42,
                        height: 24,
                        p: 0,
                        flexShrink: 0,
                        '& .MuiSwitch-switchBase': {
                          p: 0,
                          m: '2px',
                          '&.Mui-checked': {
                            transform: 'translateX(18px)',
                            color: C.white,
                            '& + .MuiSwitch-track': { bgcolor: '#54A35A', opacity: 1 },
                          },
                          '&.Mui-disabled': {
                            opacity: 1,
                            '&.Mui-checked + .MuiSwitch-track': {
                              bgcolor: '#B8D9BA',
                              opacity: 1,
                            },
                            '&:not(.Mui-checked) + .MuiSwitch-track': {
                              bgcolor: '#F0F0F1',
                              opacity: 1,
                            },
                            '& .MuiSwitch-thumb': {
                              bgcolor: '#F5F5F5',
                              boxShadow: 'none',
                            },
                          },
                        },
                        '& .MuiSwitch-thumb': { width: 20, height: 20, bgcolor: C.white },
                        '& .MuiSwitch-track': { borderRadius: 12, bgcolor: C.border, opacity: 1 },
                        '&.Mui-disabled': { cursor: 'not-allowed' },
                      }}
                    />
                  </Stack>
                </Stack>
                {billingPlanMode === 'recurring' ? (
                  <Stack sx={{ gap: 0.5 }}>
                    <Field label="Next Payment Date" placeholder="MM/DD/YY" value={nextPaymentDate} onChange={setNextPaymentDate} required calendar />
                    <Stack direction="row" spacing={0.5} sx={{ alignItems: 'flex-start' }}>
                      <InfoOutlinedIcon sx={{ fontSize: 14, color: C.grey400, mt: '2px' }} />
                      <Typography sx={{ fontSize: 11, lineHeight: '16px', color: C.grey400 }}>
                        The first payment is charged when the contract is published. Recurring payments are charged from this date onward.
                      </Typography>
                    </Stack>
                  </Stack>
                ) : null}
                {billingPlanMode === 'at_service' ? (
                  <SelectField
                    label="Payment Terms"
                    required
                    placeholder="Select Payment Terms"
                    value={paymentTerms}
                    onChange={setPaymentTerms}
                    disabled={autoCharge}
                    options={PAYMENT_TERMS_OPTIONS}
                  />
                ) : null}
                <Field label="Annual Rate Increase (%)" placeholder="Enter %" value={annualRateIncrease} onChange={setAnnualRateIncrease} required />

                <Typography sx={{ fontSize: 12, fontWeight: 600, lineHeight: '20px', color: C.text }}>Billing Address</Typography>
                <FormControlLabel
                  sx={{ m: 0, alignItems: 'center' }}
                  control={
                    <Checkbox
                      size="small"
                      checked={sameAsPropertyAddress}
                      onChange={(e) => setSameAsPropertyAddress(e.target.checked)}
                      sx={{ p: 0.5, color: C.grey400, '&.Mui-checked': { color: C.green } }}
                    />
                  }
                  label={<Typography sx={{ fontSize: 12, lineHeight: '18px', color: C.text }}>Same As Property Address</Typography>}
                />
                <Field
                  label="Address"
                  placeholder="Enter Address"
                  value={billAddress}
                  onChange={setBillAddress}
                  required
                  disabled={sameAsPropertyAddress}
                />
                <SelectField
                  label="Country"
                  value={billCountry}
                  onChange={setBillCountry}
                  options={COUNTRY_OPTIONS}
                  required
                  placeholder="Select"
                  disabled={sameAsPropertyAddress}
                />
                <SelectField
                  label="State"
                  value={billState}
                  onChange={setBillState}
                  options={STATE_OPTIONS}
                  required
                  placeholder="Select"
                  disabled={sameAsPropertyAddress}
                />
                <SelectField
                  label="City"
                  value={billCity}
                  onChange={setBillCity}
                  options={CITY_OPTIONS}
                  required
                  placeholder="Select"
                  disabled={sameAsPropertyAddress}
                />
                <Field
                  label="Zip Code / Postal Code"
                  placeholder="Enter Zip Code"
                  value={billZip}
                  onChange={setBillZip}
                  required
                  disabled={sameAsPropertyAddress}
                />
                {paymentMethod === 'Credit Card / ACH' ? (
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: '8px',
                      border: '1px dashed #E6E6E7',
                      color: C.text,
                      textTransform: 'none',
                      fontSize: 14,
                      fontWeight: 500,
                      lineHeight: '20px',
                      py: 1.25,
                      '&:hover': { borderColor: '#D0CFD2', bgcolor: 'rgba(0,0,0,0.03)' },
                    }}
                  >
                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#E7F8EE', border: '1px solid #2DA551', display: 'grid', placeItems: 'center', mr: 1.5 }}>
                      <AddIcon sx={{ fontSize: 14, color: C.green }} />
                    </Box>
                    Add Payment Method
                  </Button>
                ) : null}
              </Stack>
            </Collapse>
          </Box>

          {/* ── Description ── */}
          <Box>
            <SectionHeader title="Description" open={openDescription} onToggle={() => setOpenDescription((v) => !v)} />
            <Collapse in={openDescription}>
              <Stack sx={{ gap: 1.5, pt: 1.5 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: C.text }}>
                  Images{' '}
                  <Box component="span" sx={{ color: C.grey400, fontWeight: 400 }}>
                    (Optional)
                  </Box>
                </Typography>
                <Box
                  role="button"
                  tabIndex={0}
                  onClick={() => descriptionImageInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      descriptionImageInputRef.current?.click();
                    }
                  }}
                  sx={{
                    width: '100%',
                    border: `1px dashed ${C.border}`,
                    borderRadius: '12px',
                    bgcolor: '#FAFAFA',
                    py: 3,
                    px: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    boxSizing: 'border-box',
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      bgcolor: '#E7F8EE',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <FileUploadOutlinedIcon sx={{ fontSize: 20, color: C.green }} />
                  </Box>
                  <Typography sx={{ fontSize: 13, lineHeight: '20px', color: C.text, textAlign: 'center' }}>
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      Tap to upload
                    </Box>
                  </Typography>
                  <Typography sx={{ fontSize: 11, lineHeight: '16px', color: C.grey400, textAlign: 'center' }}>
                    jpg, png, heic (Max 10MB)
                  </Typography>
                </Box>
                <Box
                  component="input"
                  ref={descriptionImageInputRef}
                  type="file"
                  accept={DESCRIPTION_IMAGE_ACCEPT}
                  multiple
                  aria-label="Upload description images"
                  onChange={(e) => {
                    appendDescriptionImages(e.target.files);
                    e.target.value = '';
                  }}
                  sx={{ display: 'none' }}
                />
                {descriptionImageError ? (
                  <Typography sx={{ fontSize: 11, lineHeight: '16px', color: C.red }}>{descriptionImageError}</Typography>
                ) : null}
                {descriptionImages.length > 0 ? (
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                    {descriptionImages.map((img) => (
                      <Box
                        key={img.id}
                        sx={{
                          position: 'relative',
                          width: 96,
                          height: 64,
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: `1px solid ${C.border}`,
                          flexShrink: 0,
                        }}
                      >
                        <Box
                          component="img"
                          src={img.previewUrl}
                          alt={img.file.name}
                          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                        <Button
                          type="button"
                          onClick={() => removeDescriptionImage(img.id)}
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            minWidth: 0,
                            px: 0.75,
                            py: 0.125,
                            borderRadius: '999px',
                            bgcolor: 'rgba(38, 37, 39, 0.88)',
                            color: C.white,
                            fontSize: 10,
                            fontWeight: 500,
                            lineHeight: '16px',
                            textTransform: 'none',
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}
                  </Stack>
                ) : null}
              </Stack>
            </Collapse>
          </Box>

          {/* ── Signees ── */}
          <Box>
            <SectionHeader title="Signee" open={openSignee} onToggle={() => setOpenSignee((v) => !v)} />
            <Collapse in={openSignee}>
              <Stack sx={{ gap: 1.5, pt: 1.5 }}>
                {signees.map((s, idx) => (
                  <Box
                    key={s.id}
                    sx={{ bgcolor: C.white, border: `1px solid ${C.border}`, borderRadius: '8px', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}
                  >
                    {/* Card header */}
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#262527' }}>Signee {idx + 1}</Typography>
                      <Stack direction="row" sx={{ gap: 1.5 }}>
                        <IconButton size="small" onClick={() => removeSignee(s.id)} sx={{ color: '#E43F32', p: 0.25 }}>
                          <DeleteOutlineOutlinedIcon sx={{ fontSize: 22 }} />
                        </IconButton>
                        <IconButton size="small" onClick={() => openEditSigneeSheet(s)} sx={{ color: '#146DFF', p: 0.25 }}>
                          <EditOutlinedIcon sx={{ fontSize: 22 }} />
                        </IconButton>
                      </Stack>
                    </Stack>
                    {/* Avatar + info + Add Sign */}
                    <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between' }}>
                      <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center' }}>
                        <Box sx={{ width: 42, height: 42, borderRadius: '50%', bgcolor: '#E5F6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <PersonIcon sx={{ fontSize: 24, color: '#146DFF' }} />
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#262527', lineHeight: '20px' }}>
                            {s.name || '—'}
                          </Typography>
                          <Typography sx={{ fontSize: 12, fontWeight: 400, color: '#262527', lineHeight: '20px' }}>
                            {s.title || '—'}
                          </Typography>
                        </Box>
                      </Stack>
                      {s.signature ? (
                        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
                          <CheckCircleIcon sx={{ fontSize: 16, color: '#1A9E4A' }} />
                          <Typography sx={{ fontSize: 12, color: '#1A9E4A', fontWeight: 500 }}>Signed</Typography>
                        </Stack>
                      ) : (
                        <Button
                          variant="text"
                          startIcon={<AddIcon sx={{ fontSize: '14px !important' }} />}
                          onClick={() => openSignSheet(s.id)}
                          sx={{ borderRadius: '8px', color: C.grey700, textTransform: 'none', fontSize: 12, fontWeight: 500, px: 1.25, py: 0.25, minHeight: 28, flexShrink: 0, '&:hover': { bgcolor: C.bg } }}
                        >
                          Add Sign
                        </Button>
                      )}
                    </Stack>
                  </Box>
                ))}
                <Button
                  onClick={openAddSigneeSheet}
                  variant="outlined"
                  sx={{
                    borderRadius: '8px',
                    border: '1px dashed #E6E6E7',
                    color: C.text,
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '20px',
                    py: 1.25,
                    '&:hover': { borderColor: '#D0CFD2', bgcolor: 'rgba(0,0,0,0.03)' },
                  }}
                >
                  <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#E7F8EE', border: '1px solid #2DA551', display: 'grid', placeItems: 'center', mr: 1.5 }}>
                    <AddIcon sx={{ fontSize: 14, color: C.green }} />
                  </Box>
                  Add Signee
                </Button>
              </Stack>
            </Collapse>
          </Box>
        </Box>

        {/* Submit bar */}
        <Box
          sx={{
            flexShrink: 0,
            bgcolor: C.white,
            borderTop: `0.5px solid ${C.border}`,
            px: '14px',
            pt: 1.5,
          }}
        >
          <Stack direction="column" sx={{ gap: 1 }}>
            {subtotal > 0 && billingPlanMode === 'recurring' ? (
              <Stack direction="row" spacing={0.75} sx={{ alignItems: 'flex-start', pb: 0.5 }}>
                <InfoOutlinedIcon sx={{ fontSize: 16, color: C.green, mt: '2px', flexShrink: 0 }} />
                <Typography sx={{ fontSize: 11, fontWeight: 400, lineHeight: '16px', color: C.grey400 }}>
                  First payment of{' '}
                  <Box component="span" sx={{ fontWeight: 700, color: C.text }}>
                    {money(billingPlanQuote(billingFrequencyPlan).price)}
                  </Box>
                  {' '}is charged on contract publish, then{' '}
                  <Box component="span" sx={{ fontWeight: 700, color: C.text }}>
                    {recurringPaymentCadence}
                  </Box>
                  . Next payment:{' '}
                  <Box component="span" sx={{ fontWeight: 700, color: C.text }}>
                    {nextPaymentDate || '10/21/2027'}
                  </Box>
                  . Last payment:{' '}
                  <Box component="span" sx={{ fontWeight: 700, color: C.text }}>10/21/2027</Box>
                  . Amounts exclude tax.
                </Typography>
              </Stack>
            ) : null}
            <Button
              variant="contained"
              disableElevation
              sx={{
                flex: 1,
                bgcolor: C.green,
                color: C.white,
                borderRadius: '12px',
                height: 48,
                minHeight: 48,
                fontSize: 15,
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': { bgcolor: C.greenHover },
              }}
            >
              Create Contract (${subtotal.toFixed(2)})
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/filtergo/mobile')}
              sx={{
                flex: 1,
                border: 'none',
                color: C.grey700,
                borderRadius: '12px',
                height: 48,
                minHeight: 48,
                fontSize: 15,
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': { bgcolor: C.bg, border: 'none' },
              }}
            >
              Cancel
            </Button>
          </Stack>
          <Box sx={{ height: 34, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', pb: 1, mt: 0.5 }}>
            <Box sx={{ width: 134, height: 5, bgcolor: C.black, borderRadius: '100px' }} />
          </Box>
        </Box>


        {/* ── Signee bottom sheet ── */}
        {signeeSheetOpen && (
          <>
            <Box
              onClick={() => setSigneeSheetOpen(false)}
              sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.35)', zIndex: 20, borderRadius: '40px' }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: C.white,
                borderRadius: '20px 20px 0 0',
                zIndex: 21,
                px: 2.5,
                pt: 2,
                pb: 4,
              }}
            >
              <Box sx={{ width: 36, height: 4, bgcolor: C.border, borderRadius: '2px', mx: 'auto', mb: 2 }} />
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: C.black, mb: 2 }}>
                {editingSigneeId !== null ? 'Edit signee' : 'New signee'}
              </Typography>
              <Stack sx={{ gap: 1.5 }}>
                <Field label="Name" placeholder="Full name" value={signeeNewName} onChange={setSigneeNewName} required />
                <Field label="Title" placeholder="Job title" value={signeeNewTitle} onChange={setSigneeNewTitle} />
                <Field label="Email" placeholder="name@example.com" value={signeeNewEmail} onChange={setSigneeNewEmail} />
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  onClick={handleSaveSignee}
                  sx={{ bgcolor: '#1A9E4A', color: C.white, borderRadius: '12px', height: 44, fontSize: 15, fontWeight: 600, textTransform: 'none', mt: 0.5, '&:hover': { bgcolor: '#158040' } }}
                >
                  {editingSigneeId !== null ? 'Save changes' : 'Add signee'}
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setSigneeSheetOpen(false)}
                  sx={{ borderColor: C.border, color: C.grey700, borderRadius: '12px', height: 44, fontSize: 15, fontWeight: 500, textTransform: 'none', '&:hover': { bgcolor: C.bg, borderColor: C.border } }}
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          </>
        )}

        {/* ── Sign contract bottom sheet ── */}
        {signSheetOpen && (() => {
          const signee = signees.find((sg) => sg.id === signeeIdForSign);
          return (
            <>
              <Box
                onClick={() => setSignSheetOpen(false)}
                sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.35)', zIndex: 20, borderRadius: '40px' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: C.white,
                  borderRadius: '20px 20px 0 0',
                  zIndex: 21,
                  px: 2.5,
                  pt: 2,
                  pb: 3,
                }}
              >
                {/* Handle */}
                <Box sx={{ width: 36, height: 4, bgcolor: C.border, borderRadius: '2px', mx: 'auto', mb: 2 }} />

                {/* Title */}
                <Typography sx={{ fontSize: 18, fontWeight: 700, color: C.black }}>Sign Contract</Typography>
                <Typography sx={{ fontSize: 13, color: C.grey700, mt: 0.5, mb: 2 }}>
                  Please add signature to sign contract
                </Typography>

                {/* Signee info row */}
                {signee && (
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box sx={{ width: 42, height: 42, borderRadius: '50%', bgcolor: '#EDFAF3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <PersonIcon sx={{ fontSize: 22, color: '#1A9E4A' }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: 12, fontWeight: 700, color: C.black, lineHeight: '20px' }}>
                        {signee.name || '—'}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: C.grey700, lineHeight: '18px' }}>
                        {[signee.title, signee.email].filter(Boolean).join(' · ') || '—'}
                      </Typography>
                    </Box>
                  </Stack>
                )}

                {/* Draw signature row */}
                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 500, color: C.grey700 }}>Draw Signature</Typography>
                  <IconButton size="small" onClick={clearSignatureCanvas} sx={{ color: C.grey400 }}>
                    <RefreshIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Stack>

                {/* Canvas */}
                <Box sx={{ borderRadius: '10px', overflow: 'hidden', bgcolor: C.bg, mb: 2 }}>
                  <canvas
                    ref={canvasRef}
                    width={310}
                    height={160}
                    style={{ display: 'block', width: '100%', height: 160, touchAction: 'none', cursor: 'crosshair' }}
                    onMouseDown={onCanvasStart}
                    onMouseMove={onCanvasDraw}
                    onMouseUp={onCanvasEnd}
                    onMouseLeave={onCanvasEnd}
                    onTouchStart={onCanvasStart}
                    onTouchMove={onCanvasDraw}
                    onTouchEnd={onCanvasEnd}
                  />
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* CTAs */}
                <Stack direction="row" sx={{ gap: 1.5, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => setSignSheetOpen(false)}
                    sx={{ borderRadius: '10px', borderColor: C.border, color: C.grey700, textTransform: 'none', fontSize: 14, fontWeight: 500, height: 44, flex: 1, '&:hover': { bgcolor: C.bg, borderColor: C.border } }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={handleAddSignature}
                    sx={{ borderRadius: '10px', bgcolor: '#1A9E4A', color: C.white, textTransform: 'none', fontSize: 14, fontWeight: 600, height: 44, flex: 1, '&:hover': { bgcolor: '#158040' } }}
                  >
                    Add Signature
                  </Button>
                </Stack>
              </Box>
            </>
          );
        })()}

        {createContactOpen ? (
          <CreateContactScreen
            onClose={() => setCreateContactOpen(false)}
            onCreate={(person) => {
              setContacts((current) => [...current, person]);
              setCreateContactOpen(false);
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
}

import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  IconButton,
  InputBase,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const C = {
  bg: '#F6F6F8',
  white: '#FFFFFF',
  black: '#000000',
  blue: '#004FE3',
  grey700: '#4D4D51',
  grey400: '#86868B',
  grey100: '#E6E6E7',
  border: '#E6E6E7',
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
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <Stack sx={{ gap: 0.5 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 500, color: C.grey700 }}>
        {label}
        {required && <Box component="span" sx={{ color: C.red }}> *</Box>}
      </Typography>
      <Box
        sx={{
          bgcolor: disabled ? C.bg : C.white,
          border: `1px solid ${C.border}`,
          borderRadius: '8px',
          px: 1.5,
          minHeight: 42,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <InputBase
          fullWidth
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          sx={{ fontSize: 14, color: C.black, '& input': { p: 0 } }}
        />
      </Box>
    </Stack>
  );
}

/* ─── Reusable select field ─── */
function SelectField({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  required?: boolean;
}) {
  return (
    <Stack sx={{ gap: 0.5 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 500, color: C.grey700 }}>
        {label}
        {required && <Box component="span" sx={{ color: C.red }}> *</Box>}
      </Typography>
      <Select
        size="small"
        displayEmpty
        value={value}
        onChange={(e) => onChange(e.target.value)}
        IconComponent={ExpandMoreIcon}
        MenuProps={{ disableScrollLock: true }}
        sx={{
          bgcolor: C.white,
          borderRadius: '8px',
          fontSize: 14,
          '& .MuiOutlinedInput-notchedOutline': { borderColor: C.border },
          height: 42,
          minHeight: 42,
          '& .MuiSelect-select': { py: 0, px: 1.5, display: 'flex', alignItems: 'center' },
        }}
      >
        {options.map((o) => (
          <MenuItem
            key={o.value}
            value={o.value}
            sx={{
              fontSize: 14,
              ...(o.value === 'new' && {
                color: '#1A9E4A',
                fontWeight: 600,
                justifyContent: 'center',
              }),
            }}
          >
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
}

/* ─── Section header ─── */
function SectionHeader({ title, open, onToggle }: { title: string; open: boolean; onToggle: () => void }) {
  return (
    <Box>
      <Box
        onClick={onToggle}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', mb: 0.75 }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: C.black }}>
          {title}
        </Typography>
        <ExpandMoreIcon
          sx={{
            fontSize: 18,
            color: C.grey700,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </Box>
      <Divider />
    </Box>
  );
}

/* ─── Option constants ─── */
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
  { label: 'QSR / Fast Food', value: 'QSR / Fast Food' },
  { label: 'Hyperstores', value: 'Hyperstores' },
  { label: 'Healthcare', value: 'Healthcare' },
  { label: 'Education', value: 'Education' },
  { label: 'Residential', value: 'Residential' },
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
const BILLING_TYPE_OPTIONS = [
  { label: 'Select billing type', value: '' },
  { label: 'Post Bill', value: 'Post Bill' },
  { label: 'Pre Bill', value: 'Pre Bill' },
];
const PAYMENT_METHOD_OPTIONS = [
  { label: 'Select payment method', value: '' },
  { label: 'Credit Card', value: 'Credit Card' },
  { label: 'ACH', value: 'ACH' },
];
const PAYMENT_TERMS_OPTIONS = [
  { label: 'Select payment terms', value: '' },
  { label: 'Due upon invoice', value: 'Due upon invoice' },
  { label: 'Net 30', value: 'Net 30' },
];
const COUNTRY_OPTIONS = [
  { label: 'Select country', value: '' },
  { label: 'United States of America', value: 'United States of America' },
  { label: 'Canada', value: 'Canada' },
];
const CITY_OPTIONS = [
  { label: 'Select city', value: '' },
  { label: 'New York', value: 'New York' },
  { label: 'Omaha', value: 'Omaha' },
];
const STATE_OPTIONS = [
  { label: 'Select state', value: '' },
  { label: 'Florida', value: 'Florida' },
  { label: 'Nebraska', value: 'Nebraska' },
];

type Product = { id: number; dimension: string; rate: string; quantity: string };
type Signee  = { id: number; name: string; title: string; email: string; signature?: string };

export function MobileContractPage() {
  const navigate = useNavigate();

  /* ── Company ── */
  const [companyName, setCompanyName]             = useState('');
  const [companyAddress, setCompanyAddress]       = useState('');
  const [propertyAddress, setPropertyAddress]     = useState('');
  const [industryVertical, setIndustryVertical]   = useState('');
  const [franchise, setFranchise]                 = useState('');
  const [affiliations, setAffiliations]           = useState<string[]>([]);

  function toggleAffiliation(id: string) {
    setAffiliations((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  }

  /* ── Contact ── */
  const [contactFirstName, setContactFirstName]     = useState('');
  const [contactLastName, setContactLastName]       = useState('');
  const [contactEmail, setContactEmail]             = useState('');
  const [contactPhone, setContactPhone]             = useState('');

  /* ── Contract & dates ── */
  const [contractStartDate, setContractStartDate]   = useState('');
  const [serviceStartDate, setServiceStartDate]     = useState('');
  const [sameAsContract, setSameAsContract]         = useState(false);
  const [occurrenceEvery, setOccurrenceEvery]       = useState('01');

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

  /* ── Billing info ── */
  const [sameAsContact, setSameAsContact]               = useState(false);
  const [billingAddressType, setBillingAddressType] = useState<'property' | 'company' | 'other'>('other');
  const [billFirstName, setBillFirstName]               = useState('');
  const [billLastName, setBillLastName]                 = useState('');
  const [billEmail, setBillEmail]                       = useState('');
  const [billPhone, setBillPhone]                       = useState('');
  const [billAddress, setBillAddress]                   = useState('');
  const [billCountry, setBillCountry]                   = useState('');
  const [billCity, setBillCity]                         = useState('');
  const [billState, setBillState]                       = useState('');
  const [billZip, setBillZip]                           = useState('');

  /* ── Payment ── */
  const [cycleRefDate, setCycleRefDate]       = useState('');
  const [billingType, setBillingType]         = useState('');
  const [paymentMethod, setPaymentMethod]     = useState('Credit Card');
  const [paymentTerms, setPaymentTerms]       = useState('');

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
  const [openSignee, setOpenSignee]             = useState(true);

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
          <IconButton size="small" onClick={() => navigate('/mobile')} sx={{ color: 'rgba(41, 41, 41, 1)' }}>
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
            px: 2,
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
            <SectionHeader title="Company" open={openCompany} onToggle={() => setOpenCompany((v) => !v)} />
            <Collapse in={openCompany}>
              <Stack sx={{ gap: 1.5, pt: 1.5 }}>
                <Field label="Company" placeholder="Add company name" value={companyName} onChange={setCompanyName} required />
                <Field label="Company address" placeholder="Enter company street, city, state, ZIP" value={companyAddress} onChange={setCompanyAddress} />
                <Field label="Property" placeholder="Enter property street, city, state, ZIP" value={propertyAddress} onChange={setPropertyAddress} required />
                <SelectField label="Industry vertical" value={industryVertical} onChange={setIndustryVertical} options={INDUSTRY_OPTIONS} required />
                <SelectField label="Associated Franchise" value={franchise} onChange={setFranchise} options={FRANCHISE_OPTIONS} />
                <Stack sx={{ gap: 0.5 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 500, color: C.grey700 }}>Affiliation</Typography>
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
            <SectionHeader title="Contact details" open={openContact} onToggle={() => setOpenContact((v) => !v)} />
            <Collapse in={openContact}>
              <Stack sx={{ gap: 1.5, pt: 1.5 }}>
                <Field label="First Name" placeholder="Enter first name" value={contactFirstName} onChange={setContactFirstName} />
                <Field label="Last Name" placeholder="Enter last name" value={contactLastName} onChange={setContactLastName} />
                <Field label="Email" placeholder="Enter email address" value={contactEmail} onChange={setContactEmail} type="email" />
                <Field label="Phone number" placeholder="Enter phone number" value={contactPhone} onChange={setContactPhone} type="tel" />
                <Field label="Title" value="Decision Maker" onChange={() => {}} disabled />
              </Stack>
            </Collapse>
          </Box>

          {/* ── Contract & dates ── */}
          <Box>
            <SectionHeader title="Contract & dates" open={openContractDates} onToggle={() => setOpenContractDates((v) => !v)} />
            <Collapse in={openContractDates}>
              <Stack sx={{ gap: 1.5, pt: 1.5 }}>
                <Field label="Contract start date" placeholder="MM/DD/YYYY" type="date" value={contractStartDate} onChange={setContractStartDate} required />
                <Stack sx={{ gap: 0.5 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 500, color: C.grey700 }}>Service starting date</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={sameAsContract}
                        onChange={(e) => {
                          setSameAsContract(e.target.checked);
                          if (e.target.checked) setServiceStartDate(contractStartDate);
                        }}
                        sx={{ color: '#1A9E4A', '&.Mui-checked': { color: '#1A9E4A' } }}
                      />
                    }
                    label={<Typography sx={{ fontSize: 13, color: C.grey700 }}>Same as contract start date</Typography>}
                  />
                  <Field label="" placeholder="MM/DD/YYYY" type="date" value={serviceStartDate} onChange={setServiceStartDate} />
                </Stack>
                <Stack sx={{ gap: 0.75 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 500, color: C.grey700 }}>Service Reoccurrence</Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 500, color: C.grey700 }}>Repeat after every</Typography>
                  <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                    <Box
                      sx={{
                        bgcolor: C.white,
                        border: `1px solid ${C.border}`,
                        borderRadius: '8px',
                        px: 1.5,
                        minHeight: 42,
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <InputBase
                        fullWidth
                        type="number"
                        placeholder="e.g. 1"
                        value={occurrenceEvery}
                        onChange={(e) => setOccurrenceEvery(e.target.value)}
                        inputProps={{ min: 1 }}
                        sx={{ fontSize: 14, color: C.black, '& input': { p: 0 } }}
                      />
                    </Box>
                    <Box
                      sx={{
                        bgcolor: C.white,
                        border: `1px solid ${C.border}`,
                        borderRadius: '8px',
                        px: 2,
                        minHeight: 42,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ fontSize: 14, color: C.grey700 }}>Month</Typography>
                    </Box>
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
                {products.map((p, idx) => (
                  <Box
                    key={p.id}
                    sx={{ bgcolor: C.bg, border: `1px solid ${C.border}`, borderRadius: '10px', p: 1.5, display: 'flex', flexDirection: 'column', gap: 1.25 }}
                  >
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: C.grey700 }}>Product {idx + 1}</Typography>
                      {products.length > 1 && (
                        <IconButton size="small" onClick={() => removeProduct(p.id)} sx={{ color: C.red, p: 0.25 }}>
                          <CancelOutlinedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      )}
                    </Stack>
                    <SelectField label="Dimension" value={p.dimension} onChange={(v) => updateProduct(p.id, 'dimension', v)} options={PRODUCT_DIM_OPTIONS} />
                    <Stack direction="row" sx={{ gap: 1 }}>
                      <Box sx={{ flex: 1 }}>
                        <Field label="Rate ($)" placeholder="35.00" value={p.rate} onChange={(v) => updateProduct(p.id, 'rate', v)} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Field label="Quantity" placeholder="1" value={p.quantity} onChange={(v) => updateProduct(p.id, 'quantity', v)} />
                      </Box>
                    </Stack>
                  </Box>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  onClick={addProduct}
                  variant="outlined"
                  sx={{ borderRadius: '8px', borderColor: '#1A9E4A', color: '#1A9E4A', textTransform: 'none', fontSize: 14, fontWeight: 500, py: 0.75, '&:hover': { borderColor: '#1A9E4A', bgcolor: '#EDFAF3' } }}
                >
                  Add product
                </Button>
                <Box
                  sx={{ bgcolor: C.bg, border: `1px solid ${C.border}`, borderRadius: '8px', px: 2, py: 1.25, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography sx={{ fontSize: 14, fontWeight: 500, color: C.grey700 }}>Subtotal</Typography>
                  <Typography sx={{ fontSize: 15, fontWeight: 700, color: C.black }}>
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Box>
              </Stack>
            </Collapse>
          </Box>

          {/* ── Billing & Payment Details ── */}
          <Box>
            <SectionHeader title="Billing & Payment Details" open={openBilling} onToggle={() => setOpenBilling((v) => !v)} />
            <Collapse in={openBilling}>
              <Stack sx={{ gap: 1.5, pt: 1.5 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={sameAsContact}
                      onChange={(e) => setSameAsContact(e.target.checked)}
                      sx={{ color: '#1A9E4A', '&.Mui-checked': { color: '#1A9E4A' } }}
                    />
                  }
                  label={<Typography sx={{ fontSize: 13, color: C.grey700 }}>Same as contact details</Typography>}
                />
                <>
                  <Stack direction="row" sx={{ gap: 1 }}>
                    <Box sx={{ flex: 1 }}><Field label="First name" placeholder="Add first name" value={billFirstName} onChange={setBillFirstName} required /></Box>
                    <Box sx={{ flex: 1 }}><Field label="Last name" placeholder="Add last name" value={billLastName} onChange={setBillLastName} required /></Box>
                  </Stack>
                  <Field label="Email" placeholder="name@company.com" value={billEmail} onChange={setBillEmail} required />
                  <Field label="Phone" placeholder="+1 (555) 000-0000" value={billPhone} onChange={setBillPhone} />
                  <Field label="Cycle reference date" placeholder="Enter cycle reference date" value={cycleRefDate} onChange={setCycleRefDate} />
                  <SelectField label="Billing type" value={billingType} onChange={setBillingType} options={BILLING_TYPE_OPTIONS} />
                  <SelectField label="Payment method" value={paymentMethod} onChange={setPaymentMethod} options={PAYMENT_METHOD_OPTIONS} />
                  <SelectField label="Payment terms" value={paymentTerms} onChange={setPaymentTerms} options={PAYMENT_TERMS_OPTIONS} />
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    sx={{
                      borderRadius: '8px',
                      borderColor: C.border,
                      color: C.grey700,
                      textTransform: 'none',
                      fontSize: 14,
                      fontWeight: 500,
                      height: 42,
                      minHeight: 42,
                    }}
                  >
                    Add payment method
                  </Button>
                  <Stack sx={{ gap: 0.5 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 500, color: C.grey700 }}>Billing Address</Typography>
                    <RadioGroup
                      value={billingAddressType}
                      onChange={(e) => setBillingAddressType(e.target.value as 'property' | 'company' | 'other')}
                    >
                      {[
                        { value: 'property', label: 'Same as Property Address' },
                        { value: 'company',  label: 'Same as Company Address' },
                        { value: 'other',    label: 'Other' },
                      ].map((opt) => (
                        <FormControlLabel
                          key={opt.value}
                          value={opt.value}
                          control={<Radio size="small" sx={{ color: '#1A9E4A', '&.Mui-checked': { color: '#1A9E4A' }, py: 0.5 }} />}
                          label={<Typography sx={{ fontSize: 13, color: C.grey700 }}>{opt.label}</Typography>}
                        />
                      ))}
                    </RadioGroup>
                  </Stack>
                  <Field label="Address" placeholder="Enter billing street, city, state, ZIP" value={billAddress} onChange={setBillAddress} />
                  <SelectField label="Country" value={billCountry} onChange={setBillCountry} options={COUNTRY_OPTIONS} required />
                  <Stack direction="row" sx={{ gap: 1 }}>
                    <Box sx={{ flex: 1 }}><SelectField label="City" value={billCity} onChange={setBillCity} options={CITY_OPTIONS} required /></Box>
                    <Box sx={{ flex: 1 }}><SelectField label="State" value={billState} onChange={setBillState} options={STATE_OPTIONS} required /></Box>
                  </Stack>
                  <Field label="Zipcode" placeholder="Enter ZIP or postal code" value={billZip} onChange={setBillZip} />
                </>
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
                  startIcon={<AddIcon />}
                  onClick={openAddSigneeSheet}
                  variant="outlined"
                  sx={{ borderRadius: '8px', borderColor: '#1A9E4A', color: '#1A9E4A', textTransform: 'none', fontSize: 14, fontWeight: 500, height: 48, minHeight: 48, '&:hover': { borderColor: '#1A9E4A', bgcolor: '#EDFAF3' } }}
                >
                  Add signee
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
            px: 2,
            pt: 1.5,
          }}
        >
          <Stack direction="column" sx={{ gap: 0 }}>
            <Button
              variant="contained"
              disableElevation
              sx={{
                flex: 1,
                bgcolor: '#1A9E4A',
                color: C.white,
                borderRadius: '12px',
                height: 48,
                minHeight: 48,
                fontSize: 15,
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': { bgcolor: '#158040' },
              }}
            >
              Submit Contract
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/mobile')}
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
      </Box>
    </Box>
  );
}

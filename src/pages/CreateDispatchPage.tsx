import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  Divider,
  Drawer,
  FormControlLabel,
  Radio,
  IconButton,
  InputAdornment,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddOutlined from '@mui/icons-material/AddOutlined';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined';
import NotificationsNoneOutlined from '@mui/icons-material/NotificationsNoneOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import Refresh from '@mui/icons-material/Refresh';
import { AddressAutocompleteField } from '../components/createContract/AddressAutocompleteField';
import { FormSection } from '../components/createContract/FormSection';
import { useTheme } from '@mui/material/styles';
import type { Dayjs } from 'dayjs';
import { forwardRef, useCallback, useEffect, useMemo, useState, type InputHTMLAttributes } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import { useLocation, useNavigate } from 'react-router-dom';

const sidebarAssets = {
  wordmark: 'https://www.figma.com/api/mcp/asset/e7c0691a-d380-4140-a650-1760e676249f',
  navCollapse: 'https://www.figma.com/api/mcp/asset/bae78b8b-e290-4421-a3e6-5dd454611f36',
  icons: [
    { src: 'https://www.figma.com/api/mcp/asset/b532a744-bcae-4c88-b26e-c6ec8f6d8b33', selected: false, alt: 'dashboard' },
    { src: 'https://www.figma.com/api/mcp/asset/e512386d-8409-41dd-930b-6c8133bab4f6', selected: false, alt: 'company' },
    { src: 'https://www.figma.com/api/mcp/asset/00675fae-8b13-4757-a5d9-bbee1c6cc186', selected: false, alt: 'map-pin' },
    { src: 'https://www.figma.com/api/mcp/asset/e8ff504a-83fd-4d63-b4f9-597e8e401e18', selected: false, alt: 'deal' },
    { src: 'https://www.figma.com/api/mcp/asset/faa15863-9511-4f6d-9852-193da13e2bb9', selected: true, alt: 'file-text' },
    { src: 'https://www.figma.com/api/mcp/asset/76426b60-92a2-42dc-ba1f-7f8e2faf70d1', selected: false, alt: 'contact' },
    { src: 'https://www.figma.com/api/mcp/asset/ef80e71b-e94d-4a11-95e2-742d03900860', selected: false, alt: 'public' },
    { src: 'https://www.figma.com/api/mcp/asset/322a696e-79c1-4ac3-a824-ac6bd624f89b', selected: false, alt: 'user' },
    { src: 'https://www.figma.com/api/mcp/asset/1f20b451-1f45-4e8d-ae3a-740ec01ba9e5', selected: false, alt: 'checklist' },
    { src: 'https://www.figma.com/api/mcp/asset/6768af15-b2db-49e0-b4f3-e72a594eb60a', selected: false, alt: 'trello' },
    { src: 'https://www.figma.com/api/mcp/asset/f1ee7e19-0a1f-49a0-bd01-39cb0dba392c', selected: false, alt: 'scouting' },
    { src: 'https://www.figma.com/api/mcp/asset/33ef4ecd-9fee-4064-bf65-8a4895978ba3', selected: false, alt: 'settings' },
  ],
};

/** Figma — header profile (node 1117:24765); match design until API provides avatars. */
const createContractHeaderAvatar =
  'https://www.figma.com/api/mcp/asset/d04e93bb-2dc0-49b8-ae13-41d1643ae56d';

type UiOption = { label: string; value: string };

/** 16px — select chevrons in form fields (MUI passes `ref` to `IconComponent`). */
const FieldSelectChevronIcon = forwardRef<SVGSVGElement, SvgIconProps>(function FieldSelectChevronIcon(props, ref) {
  const { sx, ...rest } = props;
  return (
    <KeyboardArrowDownOutlined
      ref={ref}
      {...rest}
      sx={[{ fontSize: 16, color: '#6A6A70' }, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
    />
  );
});

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
  '& .MuiSelect-icon .MuiSvgIcon-root': { fontSize: 16 },
} as const;

const figmaLabelSx = { color: '#86868B', fontSize: 12, fontWeight: 500, lineHeight: '18px' } as const;

/** Figma node 1132:17001 — Contact Title / Users table (Filter-Go). */
type ContactDirectoryUser = { id: string; name: string; email: string; phone: string };

const CONTACT_DIRECTORY_USERS: ContactDirectoryUser[] = [
  { id: 'henry', name: 'Henry Micheal', email: 'henrymicheal23@signal.com', phone: '+1-402-555-0199' },
  { id: 'jeff', name: 'Jeff Zolos', email: 'jeff@teamfiltergo.com', phone: '+1-402-555-0100' },
  { id: 'aleena', name: 'Aleena Javed', email: 'aleena@teamfiltergo.com', phone: '+1-402-444-5900' },
];

const CONTACT_ROLE_ROWS = [
  { id: 'decision_maker', label: 'Decision Maker', color: '#9747FF' },
  { id: 'billing', label: 'Billing', color: '#2E964B' },
] as const;

/** Figma 44329:162823 — Affiliation (multi-select pills). */
const COMPANY_AFFILIATION_OPTIONS = [
  { id: 'headquarters', label: 'Headquarters' },
  { id: 'regional_office', label: 'Regional Office' },
  { id: 'managed', label: 'Managed' },
  { id: 'owned', label: 'Owned' },
  { id: 'shared', label: 'Shared' },
  { id: 'tenant', label: 'Tenant' },
] as const;

/** Default product row — form starts empty except products stay prefilled. */
const DEFAULT_SERVICE_PRODUCTS: { id: string; dimension: string; rate: string; quantity: string }[] = [
  { id: 'p1', dimension: '20*20*12', rate: '35.00', quantity: '1' },
];

type SigneeCard = {
  id: string;
  name: string;
  role: 'Sales Person' | 'Client';
  email?: string;
  hasSignature?: boolean;
  signatureText?: string;
};

/** Placeholder names when adding a signee (replaces generic “New signee”). */
const DUMMY_SIGNEE_NAMES = [
  'Jordan Ellis',
  'Sam Parker',
  'Riley Chen',
  'Casey Brooks',
  'Morgan Lee',
] as const;

function parseMoneyInput(s: string) {
  const n = parseFloat(s.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function LabeledField(props: {
  label: string;
  required?: boolean;
  width?: number | string;
  placeholder?: string;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  value: string;
  onChange: (v: string) => void;
  select?: boolean;
  options?: UiOption[];
  error?: boolean;
  helperText?: string;
  name?: string;
  htmlInput?: InputHTMLAttributes<HTMLInputElement>;
}) {
  const nonSelectSlotProps =
    !props.select && (props.endIcon || props.htmlInput)
      ? {
          ...(props.endIcon
            ? { input: { endAdornment: <InputAdornment position="end">{props.endIcon}</InputAdornment> } }
            : {}),
          ...(props.htmlInput ? { htmlInput: props.htmlInput } : {}),
        }
      : undefined;
  return (
    <Stack spacing={0.75} sx={{ width: props.width ?? '100%' }}>
      <Typography sx={figmaLabelSx}>
        {props.label}
        {props.required ? <Box component="span" sx={{ color: '#B32318' }}> *</Box> : null}
      </Typography>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        name={props.name}
        disabled={props.disabled}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        select={Boolean(props.select)}
        error={props.error}
        helperText={props.helperText}
        sx={figmaTextFieldSx}
        slotProps={
          props.select
            ? {
                select: {
                  displayEmpty: true,
                  IconComponent: FieldSelectChevronIcon,
                  renderValue: (selected: unknown) => {
                    const v = typeof selected === 'string' ? selected : '';
                    const opts = props.options ?? [];
                    if (!v) {
                      const emptyOpt = opts.find((o) => o.value === '');
                      return (
                        <Typography component="span" sx={{ fontSize: 12, lineHeight: '18px', color: '#CCCCCC' }}>
                          {emptyOpt?.label ?? 'Select'}
                        </Typography>
                      );
                    }
                    const opt = opts.find((o) => o.value === v);
                    return (
                      <Typography component="span" sx={{ fontSize: 12, lineHeight: '18px', color: '#262527' }}>
                        {opt?.label ?? v}
                      </Typography>
                    );
                  },
                },
              }
            : nonSelectSlotProps
        }
      >
        {props.select
          ? (props.options ?? []).map((o) => (
              <MenuItem key={`${props.name ?? 'opt'}-${o.value || '_empty'}`} value={o.value}>
                {o.label}
              </MenuItem>
            ))
          : null}
      </TextField>
    </Stack>
  );
}

function LabeledDatePicker(props: {
  label: string;
  required?: boolean;
  value: Dayjs | null;
  onChange: (v: Dayjs | null) => void;
  error?: boolean;
  helperText?: string;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
}) {
  return (
    <Stack spacing={0.75} sx={{ width: '100%' }}>
      <Typography sx={figmaLabelSx}>
        {props.label}
        {props.required ? <Box component="span" sx={{ color: '#B32318' }}> *</Box> : null}
      </Typography>
      <DatePicker
        value={props.value}
        onChange={props.onChange}
        format="D MMM, YYYY"
        name={props.name}
        disabled={props.disabled}
        slots={{ openPickerIcon: CalendarTodayOutlined }}
        slotProps={{
          textField: {
            size: 'small',
            fullWidth: true,
            variant: 'outlined',
            error: props.error,
            helperText: props.helperText,
            sx: figmaTextFieldSx,
            ...(props.placeholder ? { placeholder: props.placeholder } : {}),
            // PickersTextField slot typings omit `placeholder`; underlying field supports it.
          } as Record<string, unknown>,
          openPickerIcon: { sx: { color: '#6A6A70', fontSize: 16 } },
        }}
      />
    </Stack>
  );
}

function SidebarContent(props: { showCollapseChevron?: boolean; activeIconAlt?: string }) {
  const { showCollapseChevron = true, activeIconAlt } = props;
  return (
    <Box
      sx={{
        width: { xs: 72, md: 76 },
        flex: { md: '1 1 auto' },
        minHeight: 0,
        bgcolor: '#262527',
        position: 'relative',
        px: { xs: 0.5, md: 1 },
        py: 2,
        h: { xs: '100%', md: '100%' },
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
    >
      <Stack spacing={0} sx={{ alignItems: 'center', gap: '12px' }}>
        <Box
          component="img"
          src={sidebarAssets.wordmark}
          alt="Filtergo"
          sx={{ width: { xs: 52, md: 58 }, height: 18, mt: 0.5 }}
        />
        <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
          {sidebarAssets.icons.map((i) => (
            <Box
              key={i.alt}
              sx={{
                width: { xs: 40, md: 44 },
                height: { xs: 40, md: 44 },
                borderRadius: 2,
                display: 'grid',
                placeItems: 'center',
                bgcolor: i.alt === activeIconAlt ? '#2DA551' : 'transparent',
              }}
            >
              <Box
                component="img"
                src={i.src}
                alt={i.alt}
                sx={{ width: { xs: 18, md: 20 }, height: { xs: 18, md: 20 } }}
              />
            </Box>
          ))}
        </Stack>
      </Stack>
      {showCollapseChevron ? (
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            left: 62,
            bottom: 16,
            width: 28,
            height: 28,
            transform: 'rotate(180deg)',
          }}
        >
          <Box
            component="img"
            src={sidebarAssets.navCollapse}
            alt="collapse"
            sx={{ width: 28, height: 28 }}
          />
        </Box>
      ) : null}
    </Box>
  );
}

export function CreateDispatchPage() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Sidebar icon highlight for this screen.
  const activeSidebarIconAlt = useMemo(() => {
    // This screen is in the "Deals/Contracts" workflow; highlight the 3rd icon.
    return 'deal';
  }, [location.pathname]);

  const industryVerticalOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Select industry vertical', value: '' },
      { label: 'QSR / Fast Food', value: 'QSR / Fast Food' },
      { label: 'Hyperstores', value: 'Hyperstores' },
      { label: 'Healthcare', value: 'Healthcare' },
      { label: 'Education', value: 'Education' },
      { label: 'Residential', value: 'Residential' },
    ],
    [],
  );

  const occurrenceUnitOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Select week or month', value: '' },
      { label: 'Week', value: 'Week' },
      { label: 'Month', value: 'Month' },
    ],
    [],
  );

  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [industryVertical, setIndustryVertical] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [franchiseAssociation, setFranchiseAssociation] = useState('');
  const [companyAffiliations, setCompanyAffiliations] = useState<string[]>([]);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactUserByRole, setContactUserByRole] = useState<Record<string, string>>(() => ({
    decision_maker: '',
    billing: '',
  }));

  const [contractStartDate, setContractStartDate] = useState<Dayjs | null>(null);
  const [cycleReferenceDate, setCycleReferenceDate] = useState<Dayjs | null>(null);
  const [serviceStartDate, setServiceStartDate] = useState<Dayjs | null>(null);
  const [sameAsContractDate, setSameAsContractDate] = useState(false);

  const [occurrenceEvery, setOccurrenceEvery] = useState('01');
  const [occurrenceUnit, setOccurrenceUnit] = useState('Month');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const [serviceLabel, setServiceLabel] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [invoiceLineItem, setInvoiceLineItem] = useState('');
  const [preferredStartTime, setPreferredStartTime] = useState<Dayjs | null>(null);
  const [preferredEndTime, setPreferredEndTime] = useState<Dayjs | null>(null);

  const productDimensionOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Select product size', value: '' },
      { label: '20*20*12', value: '20*20*12' },
      { label: '10*10*8', value: '10*10*8' },
    ],
    [],
  );
  const [serviceProducts, setServiceProducts] = useState<
    { id: string; dimension: string; rate: string; quantity: string }[]
  >(() => DEFAULT_SERVICE_PRODUCTS.map((p) => ({ ...p })));

  const serviceProductsSubtotal = useMemo(
    () =>
      serviceProducts.reduce((sum, p) => {
        const r = parseMoneyInput(p.rate);
        const q = parseInt(p.quantity, 10) || 0;
        return sum + r * q;
      }, 0),
    [serviceProducts],
  );

  const [billingType, setBillingType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const billingTypeOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Select billing type', value: '' },
      { label: 'Post Bill', value: 'Post Bill' },
      { label: 'Pre Bill', value: 'Pre Bill' },
    ],
    [],
  );
  const paymentMethodOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Select payment method', value: '' },
      { label: 'Credit Card', value: 'Credit Card' },
      { label: 'ACH', value: 'ACH' },
    ],
    [],
  );
  const paymentTermsOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Select payment terms', value: '' },
      { label: 'Due upon invoice', value: 'Due upon invoice' },
      { label: 'Net 30', value: 'Net 30' },
    ],
    [],
  );

  const [billFirstName, setBillFirstName] = useState('');
  const [billLastName, setBillLastName] = useState('');
  const [billEmail, setBillEmail] = useState('');
  const [billPhone, setBillPhone] = useState('');
  const [billCountry, setBillCountry] = useState('');
  const [billCity, setBillCity] = useState('');
  const [billState, setBillState] = useState('');
  const [billZip, setBillZip] = useState('');
  const [billAddress, setBillAddress] = useState('');
  const [billingSameAsContactDetails, setBillingSameAsContactDetails] = useState(false);
  const countryOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Select country', value: '' },
      { label: 'United States of America', value: 'United States of America' },
      { label: 'Canada', value: 'Canada' },
    ],
    [],
  );
  const cityOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Select city', value: '' },
      { label: 'New York', value: 'New York' },
      { label: 'Omaha', value: 'Omaha' },
    ],
    [],
  );
  const stateOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Select state', value: '' },
      { label: 'Florida', value: 'Florida' },
      { label: 'Nebraska', value: 'Nebraska' },
    ],
    [],
  );
  const franchiseAssociationOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Select associated franchise', value: '' },
      { label: '#402 Nebraska, NB', value: '#402 Nebraska, NB' },
      { label: 'None', value: 'None' },
      { label: 'IFA / Franchisee network', value: 'IFA / Franchisee network' },
      { label: 'Regional co-op', value: 'Regional co-op' },
    ],
    [],
  );

  const [signeeCards, setSigneeCards] = useState<SigneeCard[]>([]);
  const [signContractModalSigneeId, setSignContractModalSigneeId] = useState<string | null>(null);
  const [modalSignaturePreview, setModalSignaturePreview] = useState('');

  const signContractSignee = useMemo(
    () => (signContractModalSigneeId ? signeeCards.find((c) => c.id === signContractModalSigneeId) ?? null : null),
    [signContractModalSigneeId, signeeCards],
  );

  useEffect(() => {
    if (sameAsContractDate && contractStartDate) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- mirror contract date into service start when enabled
      setServiceStartDate(contractStartDate);
    }
  }, [sameAsContractDate, contractStartDate]);

  useEffect(() => {
    if (!billingSameAsContactDetails) return;
    const parts = contactName.trim().split(/\s+/);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- billing fields mirror contact when enabled
    setBillFirstName(parts[0] ?? '');
    setBillLastName(parts.slice(1).join(' ') || '');
    setBillEmail(contactEmail);
    setBillPhone(contactPhone);
  }, [billingSameAsContactDetails, contactName, contactEmail, contactPhone]);

  const clearFieldError = useCallback((key: string) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const toggleCompanyAffiliation = useCallback((id: string) => {
    setCompanyAffiliations((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const validate = useCallback((): boolean => {
    const e: Record<string, string> = {};
    if (!companyName.trim()) e.companyName = 'Company name is required.';
    if (!companyAddress.trim()) e.companyAddress = 'Company address is required.';
    if (!industryVertical) e.industryVertical = 'Industry vertical is required.';
    if (!propertyAddress.trim()) e.propertyAddress = 'Property address is required.';
    if (!contactName.trim()) e.contactName = 'Name is required.';
    if (!contactEmail.trim()) e.contactEmail = 'Email is required.';
    if (!contactPhone.trim()) e.contactPhone = 'Phone is required.';
    if (!contractStartDate) e.contractStartDate = 'Contract start date is required.';
    if (!cycleReferenceDate) e.cycleReferenceDate = 'Service starting date is required.';
    if (!serviceStartDate) e.serviceStartDate = 'Service start date is required.';
    const n = Number.parseInt(occurrenceEvery, 10);
    if (!occurrenceEvery.trim() || Number.isNaN(n) || n < 1) e.occurrenceEvery = 'Enter a valid number (1+).';
    if (!occurrenceUnit.trim()) e.occurrenceUnit = 'Select week or month.';
    if (!serviceLabel.trim()) e.serviceLabel = 'Service name is required.';
    if (serviceProducts.length === 0) e.serviceProducts = 'Add at least one product.';
    for (let i = 0; i < serviceProducts.length; i++) {
      const p = serviceProducts[i];
      if (!p.dimension.trim()) e[`product_${i}_dimension`] = 'Select a product size.';
      if (!p.rate.trim() || parseMoneyInput(p.rate) <= 0) e[`product_${i}_rate`] = 'Enter a valid rate.';
      const qn = parseInt(p.quantity, 10);
      if (!p.quantity.trim() || Number.isNaN(qn) || qn < 1) e[`product_${i}_quantity`] = 'Enter quantity (1+).';
    }

    if (paymentMethod === 'Credit Card') {
      if (!cardHolderName.trim()) e.cardHolderName = 'Card holder name is required.';
      const cardDigits = cardNumber.replace(/\D/g, '');
      if (!cardDigits) e.cardNumber = 'Credit card number is required.';
      else if (cardDigits.length < 13 || cardDigits.length > 19) e.cardNumber = 'Enter a valid card number (13–19 digits).';
      if (!cardCvv.trim()) e.cardCvv = 'CVV is required.';
      else if (!/^\d{3,4}$/.test(cardCvv.trim())) e.cardCvv = 'Enter 3 or 4 digits.';
      if (!cardExpiry.trim()) e.cardExpiry = 'Expiry is required.';
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry.trim())) e.cardExpiry = 'Use MM/YY format.';
    }

    setFieldErrors(e);
    return Object.keys(e).length === 0;
  }, [
    companyName,
    companyAddress,
    industryVertical,
    propertyAddress,
    contactName,
    contactEmail,
    contactPhone,
    contractStartDate,
    cycleReferenceDate,
    serviceStartDate,
    occurrenceEvery,
    occurrenceUnit,
    serviceLabel,
    serviceProducts,
    paymentMethod,
    cardHolderName,
    cardNumber,
    cardCvv,
    cardExpiry,
  ]);

  const resetForm = useCallback(() => {
    setCompanyName('');
    setCompanyAddress('');
    setIndustryVertical('');
    setPropertyAddress('');
    setFranchiseAssociation('');
    setCompanyAffiliations([]);
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactUserByRole({
      decision_maker: '',
      billing: '',
    });
    setContractStartDate(null);
    setCycleReferenceDate(null);
    setServiceStartDate(null);
    setSameAsContractDate(false);
    setOccurrenceEvery('01');
    setOccurrenceUnit('Month');
    setFieldErrors({});
    setServiceLabel('');
    setResourceType('');
    setInvoiceLineItem('');
    setPreferredStartTime(null);
    setPreferredEndTime(null);
    setServiceProducts(DEFAULT_SERVICE_PRODUCTS.map((p) => ({ ...p })));
    setBillingType('');
    setPaymentMethod('Credit Card');
    setPaymentTerms('');
    setCardHolderName('');
    setCardNumber('');
    setCardCvv('');
    setCardExpiry('');
    setBillFirstName('');
    setBillLastName('');
    setBillEmail('');
    setBillPhone('');
    setBillCountry('');
    setBillCity('');
    setBillState('');
    setBillZip('');
    setBillAddress('');
    setBillingSameAsContactDetails(false);
    setSigneeCards([]);
    setSignContractModalSigneeId(null);
    setModalSignaturePreview('');
  }, []);

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      setSnackbar({ open: true, message: 'Please fix the highlighted fields.', severity: 'error' });
      return;
    }
    const payload = {
      company: {
        name: companyName.trim(),
        address: companyAddress.trim(),
        industryVertical,
        propertyAddress: propertyAddress.trim(),
        franchiseAssociation: franchiseAssociation.trim(),
        affiliations: [...companyAffiliations],
      },
      contact: {
        name: contactName.trim(),
        email: contactEmail.trim(),
        phone: contactPhone.trim(),
        roleAssignments: CONTACT_ROLE_ROWS.reduce<Record<string, { name: string; email: string; phone: string } | null>>(
          (acc, { id }) => {
            const uid = contactUserByRole[id];
            const u = CONTACT_DIRECTORY_USERS.find((x) => x.id === uid);
            acc[id] = u ? { name: u.name, email: u.email, phone: u.phone } : null;
            return acc;
          },
          {},
        ),
      },
      contractStartDate: contractStartDate?.toISOString(),
      cycleReferenceDate: cycleReferenceDate?.toISOString(),
      serviceStartDate: serviceStartDate?.toISOString(),
      sameAsContractDate,
      serviceOccurrence: { every: Number.parseInt(occurrenceEvery, 10), unit: occurrenceUnit, jobDays: [] },
      service: {
        label: serviceLabel,
        priceSummary: `${serviceProductsSubtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${occurrenceUnit === 'Month' ? 'monthly' : occurrenceUnit === 'Week' ? 'weekly' : '—'}`,
        resourceType,
        invoiceLineItem,
        serviceStartingDate: serviceStartDate?.toISOString(),
        preferredStartTime: preferredStartTime?.toISOString(),
        preferredEndTime: preferredEndTime?.toISOString(),
        products: serviceProducts,
        productsTotal: serviceProductsSubtotal,
      },
      billingInfo: {
        sameAsContactDetails: billingSameAsContactDetails,
        firstName: billFirstName,
        lastName: billLastName,
        email: billEmail,
        phone: billPhone,
        country: billCountry,
        city: billCity,
        state: billState,
        zip: billZip,
        address: billAddress,
      },
      payment: {
        billingType,
        paymentMethod,
        paymentTerms,
        ...(paymentMethod === 'Credit Card'
          ? {
              card: {
                holderName: cardHolderName.trim(),
                number: cardNumber.replace(/\D/g, ''),
                cvv: cardCvv.trim(),
                expiry: cardExpiry.trim(),
              },
            }
          : {}),
      },
      signees: signeeCards,
    };
    // Replace with API call
    console.log('Create contract', payload);
    setSnackbar({ open: true, message: 'Contract created successfully.', severity: 'success' });
  };

  const handleCancel = () => {
    resetForm();
    navigate('/');
  };

  const applyContactUserToPrimaryFields = useCallback(
    (userId: string) => {
      const u = CONTACT_DIRECTORY_USERS.find((x) => x.id === userId);
      if (u) {
        setContactName(u.name);
        setContactEmail(u.email);
        setContactPhone(u.phone);
      } else {
        setContactName('');
        setContactEmail('');
        setContactPhone('');
      }
      clearFieldError('contactName');
      clearFieldError('contactEmail');
      clearFieldError('contactPhone');
    },
    [clearFieldError],
  );

  const handleContactRoleUserChange = useCallback(
    (roleId: string, userId: string) => {
      setContactUserByRole((prev) => ({ ...prev, [roleId]: userId }));
      if (roleId === 'decision_maker') {
        applyContactUserToPrimaryFields(userId);
      }
    },
    [applyContactUserToPrimaryFields],
  );

  const addServiceProduct = useCallback(() => {
    setServiceProducts((prev) => [
      ...prev,
      { id: `p${Date.now()}`, dimension: '20*20*12', rate: '0.00', quantity: '1' },
    ]);
    clearFieldError('serviceProducts');
  }, [clearFieldError]);

  const removeServiceProduct = useCallback((id: string) => {
    setServiceProducts((prev) => (prev.length <= 1 ? prev : prev.filter((p) => p.id !== id)));
  }, []);

  const updateServiceProduct = useCallback(
    (id: string, field: 'dimension' | 'rate' | 'quantity', v: string) => {
      setServiceProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: v } : p)));
    },
    [],
  );

  return (
    <Box
      sx={{
        h: '100dvh',
        maxHeight: '100dvh',
        minHeight: 0,
        width: '100%',
        maxWidth: '100%',
        bgcolor: '#F5F5F6',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {isDesktop ? (
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            alignSelf: 'flex-start',
            // Full viewport height — do not use % here; flex row height can be shorter than the window.
            h: { md: '100dvh' },
            minHeight: { md: '100dvh' },
            maxHeight: { md: '100dvh' },
            display: { md: 'flex' },
            flexDirection: { md: 'column' },
            flexShrink: 0,
            minWidth: 0,
          }}
        >
          <SidebarContent activeIconAlt={activeSidebarIconAlt} />
        </Box>
      ) : null}

      <Drawer
        anchor="left"
        open={!isDesktop && mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        slotProps={{
          paper: {
            sx: { width: 72, bgcolor: '#262527', boxSizing: 'border-box' },
          },
        }}
      >
        <SidebarContent showCollapseChevron={false} activeIconAlt={activeSidebarIconAlt} />
      </Drawer>

      <Box
        sx={{
          flex: { xs: '1 1 0%', md: '1 1 0%' },
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {isDesktop ? (
          <Box
            component="header"
            sx={{
              flexShrink: 0,
              bgcolor: '#FFFFFF',
              borderBottom: '1px solid #E6E6E7',
              px: 4,
              py: '9px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    flexShrink: 0,
                  }}
                >
                  <DescriptionOutlined sx={{ fontSize: 20, color: '#6A6A70' }} />
                </Box>
                <Typography
                  component="span"
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: '20px',
                    color: '#262527',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Smart Contract
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  minWidth: 0,
                }}
              >
                <Typography
                  component="span"
                  sx={{ fontSize: 16, fontWeight: 400, lineHeight: 1.4, color: '#AEAEB2' }}
                >
                  //
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: '#86868B',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Create Contract
                </Typography>
              </Box>
            </Box>
            <Button
              type="button"
              variant="outlined"
              endIcon={<KeyboardArrowDown sx={{ fontSize: 16, color: '#444446' }} />}
              sx={{
                height: 36,
                minHeight: 36,
                flexShrink: 0,
                px: '14px',
                py: 0,
                fontSize: 14,
                fontWeight: 500,
                lineHeight: '20px',
                color: '#444446',
                borderColor: '#E6E6E7',
                textTransform: 'none',
                borderRadius: '8px',
                gap: 1,
                '&:hover': { borderColor: '#D0CFD2' },
              }}
            >
              United States
            </Button>
            <Stack direction="row" spacing={2} sx={{ flexShrink: 0, alignItems: 'center' }}>
              <IconButton
                type="button"
                size="small"
                aria-label="Notifications"
                sx={{ p: 0.5, color: '#6A6A70' }}
              >
                <NotificationsNoneOutlined sx={{ fontSize: 20 }} />
              </IconButton>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Avatar
                  src={createContractHeaderAvatar}
                  alt=""
                  slotProps={{ img: { loading: 'lazy' } }}
                  sx={{ width: 32, height: 32 }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 0.5,
                    minWidth: 0,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        lineHeight: '20px',
                        color: '#444446',
                      }}
                    >
                      Jeff Zolos
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 400,
                        lineHeight: '18px',
                        color: '#86868B',
                        mt: '3px',
                      }}
                    >
                      BD Executive
                    </Typography>
                  </Box>
                  <Box sx={{ pt: '4px', flexShrink: 0, lineHeight: 0 }}>
                    <KeyboardArrowDown sx={{ fontSize: 16, color: '#6A6A70' }} />
                  </Box>
                </Box>
              </Stack>
            </Stack>
          </Box>
        ) : (
          <AppBar
            position="sticky"
            elevation={0}
            sx={{ bgcolor: '#FFFFFF', color: 'text.primary', borderBottom: '1px solid #E6E6E7' }}
          >
            <Toolbar variant="dense" sx={{ minHeight: 48, gap: 1, px: { xs: 1, sm: 2 } }}>
              <IconButton
                edge="start"
                aria-label="Open navigation"
                onClick={() => setMobileNavOpen(true)}
                size="small"
              >
                <MenuRoundedIcon />
              </IconButton>
              <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
                Create contract
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        <Box
          component="main"
          sx={{
            flex: '1 1 0%',
            minHeight: 0,
            minWidth: 0,
            bgcolor: '#FFFFFF',
            // Let main absorb remaining space between header and footer; height 0 + flex-1
            // forces a definite block so the form’s overflow can scroll in all engines.
            height: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            px: { xs: 1.5, sm: 3, md: 4 },
            py: { xs: 1.5, sm: 2, md: 2.5 },
          }}
        >
          <Box
            component="form"
            id="create-contract-form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              width: '100%',
              maxWidth: '100%',
              mx: 'auto',
              flex: '1 1 0%',
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <Stack
              spacing={4}
              sx={{
                pb: 0,
                maxWidth: '960px',
                width: '100%',
                mx: 'auto',
                flex: '0 0 auto',
              }}
            >
              <FormSection title="Company">
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <AddressAutocompleteField
                      name="companyAddress"
                      label="Company address"
                      required
                      placeholder="Enter company street, city, state, ZIP"
                      value={companyAddress}
                      onChange={(v) => {
                        setCompanyAddress(v);
                        clearFieldError('companyAddress');
                      }}
                      error={Boolean(fieldErrors.companyAddress)}
                      helperText={fieldErrors.companyAddress}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                      name="companyName"
                      label="Company"
                      required
                      placeholder="Add company name"
                      value={companyName}
                      onChange={(v) => {
                        setCompanyName(v);
                        clearFieldError('companyName');
                      }}
                      error={Boolean(fieldErrors.companyName)}
                      helperText={fieldErrors.companyName}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                      name="propertyAddress"
                      label="Property"
                      required
                      placeholder="Enter property street, city, state, ZIP"
                      value={propertyAddress}
                      onChange={(v) => {
                        setPropertyAddress(v);
                        clearFieldError('propertyAddress');
                      }}
                      error={Boolean(fieldErrors.propertyAddress)}
                      helperText={fieldErrors.propertyAddress}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                      name="industryVertical"
                      label="Industry vertical"
                      required
                      value={industryVertical}
                      onChange={(v) => {
                        setIndustryVertical(v);
                        clearFieldError('industryVertical');
                      }}
                      select
                      options={industryVerticalOptions}
                      error={Boolean(fieldErrors.industryVertical)}
                      helperText={fieldErrors.industryVertical}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                      name="franchiseAssociation"
                      label="Associated Franchise"
                      value={franchiseAssociation}
                      onChange={setFranchiseAssociation}
                      select
                      options={franchiseAssociationOptions}
                    />
                  </Grid>
                </Grid>
                <Stack
                  sx={{
                    width: '100%',
                    mt: 2,
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'flex-start', md: 'center' },
                    columnGap: 1.5,
                    rowGap: 1.5,
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: 14,
                      fontWeight: 700,
                      lineHeight: '24px',
                      color: '#262527',
                      width: { md: 135 },
                      flexShrink: 0,
                    }}
                  >
                    Affiliation
                  </Typography>
                  <Stack
                    sx={{
                      flex: '1 1 0%',
                      minWidth: 0,
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      gap: 1.5,
                    }}
                  >
                    {COMPANY_AFFILIATION_OPTIONS.map((opt) => {
                      const selected = companyAffiliations.includes(opt.id);
                      return (
                        <Button
                          key={opt.id}
                          type="button"
                          variant="outlined"
                          disableRipple
                          onClick={() => toggleCompanyAffiliation(opt.id)}
                          aria-pressed={selected}
                          aria-label={`${opt.label}${selected ? ', selected' : ''}`}
                          sx={{
                            height: 34,
                            minHeight: 34,
                            px: 1.5,
                            py: 0.75,
                            borderRadius: '40px',
                            textTransform: 'none',
                            fontSize: 12,
                            fontWeight: 400,
                            lineHeight: '20px',
                            color: '#262527',
                            bgcolor: '#FFFFFF',
                            boxShadow: 'none',
                            '&.MuiButton-outlined': {
                              borderWidth: selected ? '1.5px' : '1px',
                              borderStyle: 'solid',
                              borderColor: selected ? '#146DFF' : '#E6E6E7',
                            },
                            '&:hover': {
                              bgcolor: '#FFFFFF',
                              '&.MuiButton-outlined': {
                                borderColor: selected ? '#146DFF' : '#D0CFD2',
                                borderWidth: selected ? '1.5px' : '1px',
                              },
                            },
                          }}
                        >
                          {opt.label}
                        </Button>
                      );
                    })}
                  </Stack>
                </Stack>
              </FormSection>

              <FormSection title="Contact details">
                <Box
                  sx={{
                    width: '100%',
                    overflowX: 'auto',
                    borderTop: '1px solid #E6E6E7',
                    borderBottom: '1px solid #E6E6E7',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: 'stretch',
                      minWidth: { md: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: '100%', md: 172 },
                        flexShrink: 0,
                        borderRight: { md: '1px solid #E6E6E7' },
                        borderBottom: { xs: '1px solid #E6E6E7', md: 'none' },
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: '#F9F9F9',
                          height: 40,
                          px: 3,
                          display: 'flex',
                          alignItems: 'center',
                          boxSizing: 'border-box',
                        }}
                      >
                        <Typography sx={{ color: '#5B5B5F', fontSize: 12, fontWeight: 500, lineHeight: '18px' }}>
                          Contact Title
                        </Typography>
                      </Box>
                      {CONTACT_ROLE_ROWS.map((row) => (
                        <Box
                          key={row.id}
                          sx={{
                            borderBottom: '1px solid #E6E6E7',
                            minHeight: 54,
                            px: 3,
                            display: 'flex',
                            alignItems: 'center',
                            boxSizing: 'border-box',
                          }}
                        >
                          <Typography
                            sx={{
                              color: row.color,
                              fontSize: 12,
                              fontWeight: 500,
                              lineHeight: '18px',
                              borderRadius: '16px',
                              py: '2px',
                            }}
                          >
                            {row.label}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    <Box sx={{ flex: '1 1 0%', minWidth: { xs: 0, md: 200 } }}>
                      <Box
                        sx={{
                          bgcolor: '#F9F9F9',
                          height: 40,
                          px: 3,
                          display: 'flex',
                          alignItems: 'center',
                          boxSizing: 'border-box',
                        }}
                      >
                        <Typography sx={{ color: '#5B5B5F', fontSize: 12, fontWeight: 500, lineHeight: '18px' }}>
                          Users
                        </Typography>
                      </Box>
                      {CONTACT_ROLE_ROWS.map((row) => {
                        const value = contactUserByRole[row.id] ?? '';
                        const placeholder = `Select ${row.label}`;
                        const decisionMakerError =
                          row.id === 'decision_maker'
                            ? fieldErrors.contactName || fieldErrors.contactEmail || fieldErrors.contactPhone
                            : undefined;
                        return (
                          <Box
                            key={row.id}
                            sx={{
                              borderBottom: '1px solid #E6E6E7',
                              minHeight: 54,
                              px: 3,
                              py: 1,
                              display: 'flex',
                              alignItems: 'center',
                              boxSizing: 'border-box',
                            }}
                          >
                            <TextField
                              select
                              name={`contactRole_${row.id}`}
                              value={value}
                              onChange={(e) => handleContactRoleUserChange(row.id, e.target.value)}
                              size="small"
                              fullWidth
                              error={Boolean(decisionMakerError)}
                              helperText={decisionMakerError}
                              sx={[
                                figmaTextFieldSx,
                                {
                                  '& .MuiOutlinedInput-root': { minHeight: 36, height: 36 },
                                  '& .MuiSelect-select': {
                                    py: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                  },
                                },
                              ]}
                              slotProps={{
                                select: {
                                  displayEmpty: true,
                                  IconComponent: FieldSelectChevronIcon,
                                  renderValue: (selected) => {
                                    const id = typeof selected === 'string' ? selected : '';
                                    const u = CONTACT_DIRECTORY_USERS.find((x) => x.id === id);
                                    if (!u) {
                                      return (
                                        <Typography sx={{ fontSize: 14, lineHeight: '24px', color: '#CCCCCC' }}>
                                          {placeholder}
                                        </Typography>
                                      );
                                    }
                                    return (
                                      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 0.75, rowGap: 0 }}>
                                        <Typography component="span" sx={{ fontSize: 14, lineHeight: '24px', color: '#262527' }}>
                                          {u.name}
                                        </Typography>
                                        <Typography
                                          component="span"
                                          sx={{ fontSize: 12, fontWeight: 500, lineHeight: '20px', color: '#A1A1A1' }}
                                        >
                                          {u.email}
                                        </Typography>
                                      </Box>
                                    );
                                  },
                                },
                              }}
                            >
                              <MenuItem value="">
                                <Typography sx={{ fontSize: 14, color: '#CCCCCC', fontStyle: 'italic' }}>
                                  {placeholder}
                                </Typography>
                              </MenuItem>
                              {CONTACT_DIRECTORY_USERS.map((u) => (
                                <MenuItem key={u.id} value={u.id}>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 0.75 }}>
                                    <Typography component="span" sx={{ fontSize: 14, color: '#262527' }}>
                                      {u.name}
                                    </Typography>
                                    <Typography component="span" sx={{ fontSize: 12, fontWeight: 500, color: '#A1A1A1' }}>
                                      {u.email}
                                    </Typography>
                                  </Box>
                                </MenuItem>
                              ))}
                            </TextField>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              </FormSection>

              <FormSection title="Contract & dates">
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledDatePicker
                      name="contractStartDate"
                      label="Contract start date"
                      required
                      placeholder="Select contract start date"
                      value={contractStartDate}
                      onChange={(v) => {
                        setContractStartDate(v);
                        clearFieldError('contractStartDate');
                        if (sameAsContractDate && v) {
                          setServiceStartDate(v);
                        }
                      }}
                      error={Boolean(fieldErrors.contractStartDate)}
                      helperText={fieldErrors.contractStartDate}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledDatePicker
                      name="cycleReferenceDate"
                      label="Service starting date"
                      required
                      placeholder="Select service starting date"
                      value={cycleReferenceDate}
                      onChange={(v) => {
                        setCycleReferenceDate(v);
                        clearFieldError('cycleReferenceDate');
                      }}
                      error={Boolean(fieldErrors.cycleReferenceDate)}
                      helperText={fieldErrors.cycleReferenceDate}
                    />
                  </Grid>
                </Grid>
                <FormControlLabel
                  sx={{ mt: 1.5, alignItems: 'center' }}
                  control={
                    <Checkbox
                      size="small"
                      checked={sameAsContractDate}
                      onChange={(_, c) => {
                        setSameAsContractDate(c);
                        if (c && contractStartDate) {
                          setServiceStartDate(contractStartDate);
                        }
                        clearFieldError('serviceStartDate');
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: 14, lineHeight: '20px', color: '#262527' }}>
                      Service start same as contract start date
                    </Typography>
                  }
                />
                <Divider sx={{ borderColor: '#E6E6E7', mt: 2 }} />
                <Stack
                  direction="row"
                  spacing={1.5}
                  useFlexGap
                  sx={{ flexWrap: 'wrap', alignItems: 'center', rowGap: 1, columnGap: 1, mt: 1.5 }}
                >
                  <Typography sx={{ width: 160, flexShrink: 0, color: '#86868B', fontSize: 14, fontWeight: 500 }}>
                    Service Occurrence<Box component="span" sx={{ color: '#B32318' }}> *</Box>
                  </Typography>
                  <Stack direction="row" spacing={1} useFlexGap sx={{ flex: 1, minWidth: 0, flexWrap: 'wrap', alignItems: 'center' }}>
                    <FormControlLabel
                      control={
                        <Radio
                          size="small"
                          checked
                          onChange={() => undefined}
                          value="repeat"
                          name="serviceOccurrenceType"
                          sx={{ p: 0.5, color: 'primary.main' }}
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: 14, lineHeight: '20px', color: '#262527' }}>Repeat Every</Typography>
                      }
                      sx={{ m: 0, mr: 0, gap: 0.5, alignItems: 'center' }}
                    />
                    <TextField
                      size="small"
                      name="occurrenceEvery"
                      value={occurrenceEvery}
                      onChange={(ev) => {
                        setOccurrenceEvery(ev.target.value);
                        clearFieldError('occurrenceEvery');
                      }}
                      error={Boolean(fieldErrors.occurrenceEvery)}
                      helperText={fieldErrors.occurrenceEvery}
                      placeholder="e.g. 01"
                      sx={{ width: 64, minWidth: 64, ...figmaTextFieldSx }}
                      slotProps={{ htmlInput: { inputMode: 'numeric', 'aria-label': 'Occurrence interval' } }}
                    />
                    <TextField
                      size="small"
                      name="occurrenceUnit"
                      value={occurrenceUnit}
                      onChange={(ev) => {
                        setOccurrenceUnit(ev.target.value);
                        clearFieldError('occurrenceEvery');
                        clearFieldError('occurrenceUnit');
                      }}
                      select
                      error={Boolean(fieldErrors.occurrenceUnit)}
                      helperText={fieldErrors.occurrenceUnit}
                      sx={{ width: 128, ...figmaTextFieldSx }}
                      slotProps={{ select: { IconComponent: FieldSelectChevronIcon } }}
                    >
                      {occurrenceUnitOptions.map((o) => (
                        <MenuItem key={o.value || 'empty'} value={o.value}>
                          {o.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                </Stack>
              </FormSection>

              <FormSection title="Products">
                <Stack sx={{ width: '100%', maxWidth: 960, mx: 'auto', gap: 2 }}>
                    <Box>
                      <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#444446', pb: 0.75 }}>
                        Add Products
                      </Typography>
                      <Stack spacing={1.5} sx={{ mt: 0 }}>
                        <Stack direction="column" spacing={0} sx={{ width: '100%' }}>
                          {serviceProducts.map((p, pIdx) => {
                            const lineSub = parseMoneyInput(p.rate) * (parseInt(p.quantity, 10) || 0);
                            return (
                              <Box
                                key={p.id}
                                sx={{
                                  width: '100%',
                                  display: 'flex',
                                  flexDirection: { xs: 'column', sm: 'row' },
                                  flexWrap: 'wrap',
                                  alignItems: { xs: 'stretch', sm: 'flex-start' },
                                  gap: 1.5,
                                  py: 1.5,
                                  boxSizing: 'border-box',
                                  borderBottom: '1px solid #E6E6E7',
                                }}
                              >
                                <Stack
                                  direction="row"
                                  spacing={0.5}
                                  sx={{
                                    alignItems: 'flex-start',
                                    width: { xs: '100%', sm: 'auto' },
                                    minWidth: { sm: 88 },
                                    flexShrink: 0,
                                  }}
                                >
                                  <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#86868B', pt: 0.5 }}>
                                    Product {String(pIdx + 1).padStart(2, '0')}
                                  </Typography>
                                </Stack>
                                <Stack
                                  spacing={0.75}
                                  sx={{
                                    flex: { sm: '0 1 220px' },
                                    minWidth: { xs: '100%', sm: 160 },
                                    maxWidth: { sm: 280 },
                                    width: { xs: '100%', sm: 'auto' },
                                  }}
                                >
                                  <Typography sx={figmaLabelSx}>
                                    Select product
                                    <Box component="span" sx={{ color: '#B32318' }}> *</Box>
                                  </Typography>
                                  <TextField
                                    select
                                    name={`productDim_${p.id}`}
                                    value={p.dimension}
                                    onChange={(e) => {
                                      updateServiceProduct(p.id, 'dimension', e.target.value);
                                      clearFieldError('serviceProducts');
                                      clearFieldError(`product_${pIdx}_dimension`);
                                    }}
                                    size="small"
                                    fullWidth
                                    error={Boolean((fieldErrors as Record<string, string>)[`product_${pIdx}_dimension`])}
                                    helperText={(fieldErrors as Record<string, string>)[`product_${pIdx}_dimension`]}
                                    sx={figmaTextFieldSx}
                                    slotProps={{
                                      select: {
                                        displayEmpty: true,
                                        IconComponent: FieldSelectChevronIcon,
                                        renderValue: (selected) => {
                                          const v = typeof selected === 'string' ? selected : '';
                                          if (!v) {
                                            return (
                                              <Typography sx={{ fontSize: 12, lineHeight: '18px', color: '#CCCCCC' }}>
                                                Select product size
                                              </Typography>
                                            );
                                          }
                                          const o = productDimensionOptions.find((x) => x.value === v);
                                          return o?.label ?? v;
                                        },
                                      },
                                    }}
                                  >
                                    {productDimensionOptions.map((o) => (
                                      <MenuItem key={o.value || 'dim-empty'} value={o.value}>
                                        {o.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Stack>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  useFlexGap
                                  sx={{
                                    flex: { sm: '1 1 0%' },
                                    minWidth: { xs: '100%', sm: 0 },
                                    width: '100%',
                                    flexWrap: 'wrap',
                                    alignItems: 'flex-start',
                                  }}
                                >
                                  <Stack spacing={0.75} sx={{ flex: { sm: '1 1 0%' }, minWidth: { sm: 0 }, width: { xs: '100%', sm: 'auto' } }}>
                                    <Typography sx={figmaLabelSx}>
                                      Rate
                                      <Box component="span" sx={{ color: '#B32318' }}> *</Box>
                                    </Typography>
                                    <TextField
                                      name={`productRate_${p.id}`}
                                      value={p.rate}
                                      onChange={(e) => {
                                        updateServiceProduct(p.id, 'rate', e.target.value);
                                        clearFieldError('serviceProducts');
                                        clearFieldError(`product_${pIdx}_rate`);
                                      }}
                                      size="small"
                                      fullWidth
                                      placeholder="Enter rate (e.g. 35.00)"
                                      error={Boolean((fieldErrors as Record<string, string>)[`product_${pIdx}_rate`])}
                                      helperText={(fieldErrors as Record<string, string>)[`product_${pIdx}_rate`]}
                                      sx={[
                                        figmaTextFieldSx,
                                        {
                                          '& .MuiInputAdornment-root': {
                                            fontSize: 12,
                                            lineHeight: '18px',
                                            fontWeight: 400,
                                            color: '#262527',
                                            maxHeight: 'none',
                                            mt: 0,
                                            alignSelf: 'center',
                                          },
                                        },
                                      ]}
                                      slotProps={{
                                        htmlInput: { 'aria-label': 'Rate' },
                                        input: {
                                          startAdornment: (
                                            <InputAdornment position="start" sx={{ mr: 0.5, maxHeight: 'none' }}>
                                              <Box
                                                component="span"
                                                sx={{
                                                  fontSize: 12,
                                                  lineHeight: '18px',
                                                  fontWeight: 400,
                                                  color: '#262527',
                                                }}
                                              >
                                                $
                                              </Box>
                                            </InputAdornment>
                                          ),
                                        },
                                      }}
                                    />
                                  </Stack>
                                  <Stack spacing={0.75} sx={{ flex: { sm: '1 1 0%' }, minWidth: { sm: 0 }, width: { xs: '100%', sm: 'auto' } }}>
                                    <Typography sx={figmaLabelSx}>
                                      Quantity
                                      <Box component="span" sx={{ color: '#B32318' }}> *</Box>
                                    </Typography>
                                    <TextField
                                      name={`productQty_${p.id}`}
                                      value={p.quantity}
                                      onChange={(e) => {
                                        updateServiceProduct(p.id, 'quantity', e.target.value);
                                        clearFieldError('serviceProducts');
                                        clearFieldError(`product_${pIdx}_quantity`);
                                      }}
                                      size="small"
                                      fullWidth
                                      placeholder="Enter quantity (e.g. 1)"
                                      error={Boolean((fieldErrors as Record<string, string>)[`product_${pIdx}_quantity`])}
                                      helperText={(fieldErrors as Record<string, string>)[`product_${pIdx}_quantity`]}
                                      sx={figmaTextFieldSx}
                                      slotProps={{ htmlInput: { inputMode: 'numeric', 'aria-label': 'Quantity' } }}
                                    />
                                  </Stack>
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    sx={{
                                      flex: { sm: '1 1 0%' },
                                      minWidth: { xs: '100%', sm: 0 },
                                      width: { xs: '100%', sm: 'auto' },
                                      alignItems: 'flex-end',
                                    }}
                                  >
                                    <Stack spacing={0.75} sx={{ flex: { sm: '1 1 0%' }, minWidth: 0, flexGrow: 1 }}>
                                      <Typography sx={figmaLabelSx}>Sub total</Typography>
                                      <Box sx={{ minHeight: 40, display: 'flex', alignItems: 'center' }}>
                                        <Typography
                                          sx={{
                                            fontSize: 14,
                                            lineHeight: '20px',
                                            color: '#262527',
                                            fontVariantNumeric: 'tabular-nums',
                                          }}
                                        >
                                          {lineSub.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </Typography>
                                      </Box>
                                    </Stack>
                                    {serviceProducts.length > 1 ? (
                                      <Stack spacing={0.75} sx={{ flex: '0 0 auto' }}>
                                        <Box sx={{ minHeight: '18px' }} aria-hidden />
                                        <Box sx={{ minHeight: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                          <IconButton
                                            type="button"
                                            size="small"
                                            aria-label="Remove product"
                                            onClick={() => removeServiceProduct(p.id)}
                                            sx={{ p: 0, color: '#D9534F' }}
                                          >
                                            <DeleteOutlineOutlined sx={{ fontSize: 16 }} />
                                          </IconButton>
                                        </Box>
                                      </Stack>
                                    ) : null}
                                  </Stack>
                                </Stack>
                              </Box>
                            );
                          })}
                        </Stack>
                        <Button
                          type="button"
                          variant="outlined"
                          onClick={addServiceProduct}
                          sx={{
                            width: '100%',
                            minHeight: 0,
                            border: '1px solid #E6E6E7',
                            borderStyle: 'dashed',
                            borderRadius: '8px',
                            textTransform: 'none',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1.5,
                            px: 2,
                            py: 1.5,
                            bgcolor: 'transparent',
                            color: 'inherit',
                            alignSelf: 'stretch',
                            boxSizing: 'border-box',
                            '&:hover': { borderColor: '#D0CFD2', bgcolor: 'rgba(0,0,0,0.03)' },
                          }}
                        >
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              flexShrink: 0,
                              borderRadius: '50%',
                              bgcolor: '#E5F6FF',
                              border: '1px solid #146DFF',
                              display: 'grid',
                              placeItems: 'center',
                            }}
                          >
                            <AddOutlined sx={{ fontSize: 14, color: '#146DFF' }} />
                          </Box>
                          <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#262527', textAlign: 'center' }}>
                            Add another product
                          </Typography>
                        </Button>
                      </Stack>
                    </Box>
                    <Box sx={{ borderTop: '1px solid #E6E6E7', pt: 0.5, mt: 0.5, display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography sx={{ fontSize: 18, fontWeight: 600, lineHeight: '26px', color: '#262527', textAlign: 'right' }}>
                        Total value:{' '}
                        {serviceProductsSubtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        {' '}/{' '}
                        {occurrenceUnit === 'Month'
                          ? 'monthly'
                          : occurrenceUnit === 'Week'
                            ? 'weekly'
                            : '—'}
                      </Typography>
                    </Box>
                    {fieldErrors.serviceProducts ? (
                      <Typography variant="caption" color="error">
                        {fieldErrors.serviceProducts}
                      </Typography>
                    ) : null}
                </Stack>
              </FormSection>

              <FormSection
                title="Billing info"
                titleEnd={
                  <FormControlLabel
                    sx={{ m: 0, alignItems: 'center', flexShrink: 0 }}
                    control={
                      <Checkbox
                        size="small"
                        checked={billingSameAsContactDetails}
                        onChange={(_, checked) => {
                          setBillingSameAsContactDetails(checked);
                          if (checked) {
                            const parts = contactName.trim().split(/\s+/);
                            setBillFirstName(parts[0] ?? '');
                            setBillLastName(parts.slice(1).join(' ') || '');
                            setBillEmail(contactEmail);
                            setBillPhone(contactPhone);
                          }
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: 14, lineHeight: '20px', color: '#262527' }}>
                        Same as contact details
                      </Typography>
                    }
                  />
                }
              >
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                      name="billFirstName"
                      label="First Name"
                      required
                      placeholder="Add first name"
                      value={billFirstName}
                      onChange={setBillFirstName}
                      disabled={billingSameAsContactDetails}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                      name="billLastName"
                      label="Last Name"
                      required
                      placeholder="Add last name"
                      value={billLastName}
                      onChange={setBillLastName}
                      disabled={billingSameAsContactDetails}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                      name="billEmail"
                      label="Email"
                      required
                      placeholder="Add email (e.g. name@company.com)"
                      value={billEmail}
                      onChange={setBillEmail}
                      disabled={billingSameAsContactDetails}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                      name="billPhone"
                      label="Phone"
                      required
                      placeholder="Add phone (e.g. +1-555-0100)"
                      value={billPhone}
                      onChange={setBillPhone}
                      disabled={billingSameAsContactDetails}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField name="billCountry" label="Country" required value={billCountry} onChange={setBillCountry} select options={countryOptions} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField name="billCity" label="City" required value={billCity} onChange={setBillCity} select options={cityOptions} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField name="billState" label="State" required value={billState} onChange={setBillState} select options={stateOptions} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                      name="billZip"
                      label="Zipcode"
                      required
                      placeholder="Enter ZIP or postal code"
                      value={billZip}
                      onChange={setBillZip}
                    />
                  </Grid>
                  <Grid size={12}>
                    <LabeledField
                      name="billAddress"
                      label="Address"
                      required
                      placeholder="Enter billing street, city, state, ZIP"
                      value={billAddress}
                      onChange={setBillAddress}
                    />
                  </Grid>
                </Grid>
              </FormSection>

              <FormSection title="Payment">
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                      name="billingType"
                      label="Billing type"
                      required
                      value={billingType}
                      onChange={setBillingType}
                      select
                      options={billingTypeOptions}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                      name="paymentMethod"
                      label="Payment method"
                      required
                      value={paymentMethod}
                      onChange={(v) => {
                        setPaymentMethod(v);
                        clearFieldError('cardHolderName');
                        clearFieldError('cardNumber');
                        clearFieldError('cardCvv');
                        clearFieldError('cardExpiry');
                      }}
                      select
                      options={paymentMethodOptions}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                      name="paymentTerms"
                      label="Payment terms"
                      required
                      value={paymentTerms}
                      onChange={setPaymentTerms}
                      select
                      options={paymentTermsOptions}
                    />
                  </Grid>
                  {paymentMethod === 'Credit Card' ? (
                    <>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <LabeledField
                          name="cardHolderName"
                          label="Card holder name"
                          required
                          placeholder="Add name as shown on card"
                          value={cardHolderName}
                          onChange={(v) => {
                            setCardHolderName(v);
                            clearFieldError('cardHolderName');
                          }}
                          error={Boolean(fieldErrors.cardHolderName)}
                          helperText={fieldErrors.cardHolderName}
                          htmlInput={{ autoComplete: 'cc-name' }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <LabeledField
                          name="cardNumber"
                          label="Credit card number"
                          required
                          placeholder="Enter card number"
                          value={cardNumber}
                          onChange={(v) => {
                            setCardNumber(v);
                            clearFieldError('cardNumber');
                          }}
                          error={Boolean(fieldErrors.cardNumber)}
                          helperText={fieldErrors.cardNumber}
                          htmlInput={{ inputMode: 'numeric', autoComplete: 'cc-number', maxLength: 23 }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <LabeledField
                          name="cardExpiry"
                          label="Expiry"
                          required
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(v) => {
                            setCardExpiry(v);
                            clearFieldError('cardExpiry');
                          }}
                          error={Boolean(fieldErrors.cardExpiry)}
                          helperText={fieldErrors.cardExpiry}
                          htmlInput={{ inputMode: 'numeric', autoComplete: 'cc-exp', maxLength: 5 }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <LabeledField
                          name="cardCvv"
                          label="CVV"
                          required
                          placeholder="123"
                          value={cardCvv}
                          onChange={(v) => {
                            setCardCvv(v);
                            clearFieldError('cardCvv');
                          }}
                          error={Boolean(fieldErrors.cardCvv)}
                          helperText={fieldErrors.cardCvv}
                          htmlInput={{ inputMode: 'numeric', autoComplete: 'cc-csc', maxLength: 4 }}
                        />
                      </Grid>
                    </>
                  ) : null}
                </Grid>
              </FormSection>

              <FormSection title="Signee">
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Stack sx={{ minWidth: { xs: 560, sm: 640 }, gap: 2, alignItems: 'stretch' }}>
                    {signeeCards.length > 0 ? (
                    <Stack sx={{ gap: 1, width: '100%' }}>
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '302px 247px auto 1fr',
                          columnGap: 2,
                          alignItems: 'start',
                          width: '100%',
                        }}
                      >
                        <Typography sx={{ color: '#86868B', fontSize: 12, fontWeight: 400, lineHeight: '20px' }}>Name</Typography>
                        <Typography sx={{ color: '#86868B', fontSize: 12, fontWeight: 400, lineHeight: '20px' }}>Title</Typography>
                        <Typography sx={{ color: '#86868B', fontSize: 12, fontWeight: 400, lineHeight: '20px' }}>Signee</Typography>
                        <Box />
                      </Box>
                      <Stack sx={{ gap: 1.5, width: '100%' }}>
                        {signeeCards.map((s, sIdx) => (
                          <Stack key={s.id} sx={{ gap: 0 }}>
                            <Box
                              sx={{
                                display: 'grid',
                                gridTemplateColumns: '302px 247px auto 1fr',
                                columnGap: 2,
                                alignItems: 'center',
                                width: '100%',
                              }}
                            >
                              <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 2, minWidth: 0 }}>
                                <Avatar
                                  sx={{
                                    width: 40,
                                    height: 40,
                                    flexShrink: 0,
                                    bgcolor: '#EFF8EF',
                                  }}
                                >
                                  <PersonOutlineOutlined sx={{ fontSize: 22, color: '#2DA551' }} />
                                </Avatar>
                                <Typography
                                  sx={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    lineHeight: '20px',
                                    color: '#262527',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}
                                >
                                  {s.name}
                                </Typography>
                              </Stack>
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  fontWeight: 400,
                                  lineHeight: '20px',
                                  color: '#6A6A70',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {s.role}
                              </Typography>
                              <Box
                                sx={{
                                  bgcolor: '#EFF8EF',
                                  px: '6px',
                                  py: '2px',
                                  borderRadius: '4px',
                                  width: 'fit-content',
                                  justifySelf: 'start',
                                }}
                              >
                                <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#2DA551' }}>
                                  Signee {sIdx + 1}
                                </Typography>
                              </Box>
                              <Stack
                                sx={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'flex-end',
                                  gap: 1.75,
                                  minWidth: 0,
                                }}
                              >
                                <IconButton type="button" size="small" aria-label={`Edit ${s.name}`} sx={{ p: 0.5, color: '#6A6A70' }}>
                                  <EditOutlined sx={{ fontSize: 16 }} />
                                </IconButton>
                                <Button
                                  type="button"
                                  variant="outlined"
                                  size="small"
                                  disableRipple
                                  startIcon={<AddOutlined sx={{ fontSize: 16, color: '#6A6A70' }} />}
                                  onClick={() => {
                                    setSignContractModalSigneeId(s.id);
                                    setModalSignaturePreview(s.name);
                                  }}
                                  sx={{
                                    height: 32,
                                    minHeight: 32,
                                    px: 1,
                                    py: 1,
                                    borderRadius: '8px',
                                    borderColor: '#F5F5F6',
                                    bgcolor: '#F5F5F6',
                                    color: '#6A6A70',
                                    textTransform: 'none',
                                    fontSize: 14,
                                    fontWeight: 500,
                                    lineHeight: '20px',
                                    boxShadow: 'none',
                                    '&:hover': { bgcolor: '#EBEBED', borderColor: '#EBEBED' },
                                  }}
                                >
                                  Add Sign
                                </Button>
                              </Stack>
                            </Box>
                            {sIdx < signeeCards.length - 1 ? (
                              <Divider sx={{ borderColor: '#E6E6E7', mt: 1.5 }} />
                            ) : null}
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                    ) : (
                      <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#86868B' }}>
                        No signees yet. Use Add Signee to add one.
                      </Typography>
                    )}
                    <Button
                      type="button"
                      onClick={() =>
                        setSigneeCards((prev) => {
                          const name = DUMMY_SIGNEE_NAMES[prev.length % DUMMY_SIGNEE_NAMES.length];
                          return [...prev, { id: `s${Date.now()}`, name, role: 'Client' as const }];
                        })
                      }
                      variant="text"
                      disableRipple
                      startIcon={<AddOutlined sx={{ fontSize: 16, color: '#146DFF' }} />}
                      sx={{
                        alignSelf: 'flex-start',
                        py: 0.75,
                        px: 0,
                        minWidth: 0,
                        textTransform: 'none',
                        fontSize: 14,
                        fontWeight: 500,
                        lineHeight: '20px',
                        color: '#146DFF',
                        '&:hover': { bgcolor: 'transparent', color: '#0d5cd4' },
                      }}
                    >
                      Add Signee
                    </Button>
                  </Stack>
                </Box>
              </FormSection>
            </Stack>
          </Box>
        </Box>

        <Box
          component="footer"
          sx={{
            flexShrink: 0,
            borderTop: '1px solid #E6E6E7',
            bgcolor: '#FFFFFF',
            px: { xs: 1.5, sm: 3, md: 4 },
            py: 1.5,
            zIndex: (t) => t.zIndex.appBar,
            boxShadow: { xs: '0 -4px 12px rgba(0,0,0,0.06)', sm: 'none' },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '100%', mx: 'auto' }}>
            <Stack
              direction={{ xs: 'column-reverse', sm: 'row' }}
              spacing={1.5}
              sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: { sm: 'flex-end' } }}
            >
              <Button
                type="button"
                fullWidth={!isSmUp}
                variant="outlined"
                size="medium"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                fullWidth={!isSmUp}
                type="submit"
                form="create-contract-form"
                variant="contained"
                color="primary"
                size="medium"
              >
                Create Contract
              </Button>
            </Stack>
          </Box>
        </Box>

            <Dialog
              open={signContractModalSigneeId !== null && signContractSignee !== null}
              onClose={() => {
                setSignContractModalSigneeId(null);
                setModalSignaturePreview('');
              }}
              maxWidth="sm"
              fullWidth
              slotProps={{
                paper: {
                  sx: {
                    borderRadius: '12px',
                    border: '1px solid #E6E6E7',
                    boxShadow:
                      '0px 20px 24px -4px rgba(16, 24, 40, 0.10), 0px 8px 8px -4px rgba(16, 24, 40, 0.04)',
                    maxWidth: 560,
                  },
                },
              }}
            >
              {signContractSignee ? (
                <DialogContent sx={{ p: 3 }}>
                  <Stack sx={{ gap: 3, width: '100%' }}>
                    <Stack sx={{ gap: 2.5, width: '100%' }}>
                      <Stack sx={{ gap: 0.5, width: '100%' }}>
                        <Typography sx={{ fontSize: 16, fontWeight: 700, lineHeight: '24px', color: '#262527' }}>
                          Sign Contract
                        </Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#5B5B5F' }}>
                          Please add signature to sign contract
                        </Typography>
                      </Stack>
                      <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1, width: '100%' }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            flexShrink: 0,
                            bgcolor: '#EFF8EF',
                          }}
                        >
                          <PersonOutlineOutlined sx={{ fontSize: 22, color: '#2DA551' }} />
                        </Avatar>
                        <Stack sx={{ gap: 0.25, minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 500,
                              lineHeight: '20px',
                              color: '#262527',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {signContractSignee.name}
                          </Typography>
                          <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#86868B' }}>
                              {signContractSignee.role}
                            </Typography>
                            {signContractSignee.email?.trim() ? (
                              <>
                                <Box
                                  sx={{
                                    width: 2,
                                    height: 2,
                                    borderRadius: '50%',
                                    bgcolor: '#AEAEB2',
                                    flexShrink: 0,
                                  }}
                                />
                                <Typography
                                  sx={{
                                    fontSize: 14,
                                    fontWeight: 400,
                                    color: '#86868B',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}
                                >
                                  {signContractSignee.email.trim()}
                                </Typography>
                              </>
                            ) : null}
                          </Stack>
                        </Stack>
                      </Stack>
                      <Stack sx={{ gap: 1.5, width: '100%' }}>
                        <Stack
                          sx={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                          }}
                        >
                          <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#5B5B5F' }}>
                            Draw Signature
                          </Typography>
                          <IconButton
                            type="button"
                            size="small"
                            aria-label="Clear signature"
                            onClick={() => setModalSignaturePreview('')}
                            sx={{ p: 0.25, color: '#6A6A70' }}
                          >
                            <Refresh sx={{ fontSize: 20 }} />
                          </IconButton>
                        </Stack>
                        <Box
                          sx={{
                            bgcolor: '#F5F5F6',
                            borderRadius: '8px',
                            px: 2,
                            py: 1,
                            minHeight: 176,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxSizing: 'border-box',
                          }}
                        >
                          {modalSignaturePreview.trim() ? (
                            <Typography
                              sx={{
                                fontFamily:
                                  '"Segoe Script", "Brush Script MT", "Snell Roundhand", "Apple Chancery", cursive',
                                fontSize: 46,
                                fontWeight: 400,
                                lineHeight: 1.15,
                                color: '#000000',
                                textAlign: 'center',
                                width: '100%',
                                wordBreak: 'break-word',
                              }}
                            >
                              {modalSignaturePreview}
                            </Typography>
                          ) : (
                            <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#AEAEB2' }}>
                              Draw your signature
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    </Stack>
                    <Divider sx={{ borderColor: '#E6E6E7' }} />
                    <Stack
                      sx={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        gap: 1.5,
                        flexWrap: 'wrap',
                        width: '100%',
                      }}
                    >
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={() => {
                          setSignContractModalSigneeId(null);
                          setModalSignaturePreview('');
                        }}
                        sx={{
                          borderColor: '#D0DDDC',
                          color: '#444446',
                          bgcolor: '#FFFFFF',
                          textTransform: 'none',
                          fontSize: 14,
                          fontWeight: 400,
                          lineHeight: '20px',
                          px: 1.75,
                          py: 1,
                          borderRadius: '8px',
                          boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                          '&:hover': { borderColor: '#D0DDDC', bgcolor: '#FAFAFA' },
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        disableElevation
                        onClick={() => {
                          const id = signContractModalSigneeId;
                          if (!id) return;
                          const text = modalSignaturePreview.trim() || signContractSignee.name;
                          setSigneeCards((prev) =>
                            prev.map((c) =>
                              c.id === id ? { ...c, hasSignature: true, signatureText: text } : c,
                            ),
                          );
                          setSignContractModalSigneeId(null);
                          setModalSignaturePreview('');
                        }}
                        sx={{
                          bgcolor: '#146DFF',
                          border: '1px solid #146DFF',
                          color: '#FFFFFF',
                          textTransform: 'none',
                          fontSize: 14,
                          fontWeight: 400,
                          lineHeight: '20px',
                          px: 1.75,
                          py: 1,
                          borderRadius: '8px',
                          boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                          '&:hover': { bgcolor: '#0d5cd4', borderColor: '#0d5cd4' },
                        }}
                      >
                        Add Signature
                      </Button>
                    </Stack>
                  </Stack>
                </DialogContent>
              ) : null}
            </Dialog>

            <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert
                onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                severity={snackbar.severity}
                variant="filled"
                sx={{ width: '100%' }}
              >
                {snackbar.message}
              </Alert>
            </Snackbar>
      </Box>
    </Box>
  );
}


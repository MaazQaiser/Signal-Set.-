import {
  Alert,
  AppBar,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  Drawer,
  FormControlLabel,
  Paper,
  Radio,
  IconButton,
  InputAdornment,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  Switch,
  useMediaQuery,
  type PaperProps,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddOutlined from '@mui/icons-material/AddOutlined';
import ApartmentOutlined from '@mui/icons-material/ApartmentOutlined';
import CheckCircle from '@mui/icons-material/CheckCircle';
import CheckOutlined from '@mui/icons-material/CheckOutlined';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import ExploreOutlined from '@mui/icons-material/ExploreOutlined';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import GroupsOutlined from '@mui/icons-material/GroupsOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined';
import NotificationsNoneOutlined from '@mui/icons-material/NotificationsNoneOutlined';
import MapOutlined from '@mui/icons-material/MapOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import PublicOutlined from '@mui/icons-material/PublicOutlined';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import Refresh from '@mui/icons-material/Refresh';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import TaskAltOutlined from '@mui/icons-material/TaskAltOutlined';
import ViewKanbanOutlined from '@mui/icons-material/ViewKanbanOutlined';
import { AddressMapPickerModal } from '../components/createContract/AddressMapPickerModal';
import { FormSection } from '../components/createContract/FormSection';
import { useTheme } from '@mui/material/styles';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState, type InputHTMLAttributes } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import { useLocation, useNavigate } from 'react-router-dom';

const sidebarImgAssets = {
  wordmark: 'https://www.figma.com/api/mcp/asset/b383f08a-2ee2-4182-8425-9d9c2c1775ca',
  lastPage: 'https://www.figma.com/api/mcp/asset/350aceba-ddd0-42ea-a4c6-9071ac4fc152',
  icons: [
    { src: 'https://www.figma.com/api/mcp/asset/8d98c452-eb87-413a-8088-8735ff92ff06', alt: 'dashboard' },
    { src: 'https://www.figma.com/api/mcp/asset/9fb49f27-8478-478b-9fad-3fbf8d61f34b', alt: 'company' },
    { src: 'https://www.figma.com/api/mcp/asset/fbb49c00-3a70-448a-84f7-a76d678f670f', alt: 'map-pin' },
    { src: 'https://www.figma.com/api/mcp/asset/8e6dd3ea-f0b5-4d7a-91a4-e31d899e8858', alt: 'deal' },
    { src: 'https://www.figma.com/api/mcp/asset/664ebf81-1d0a-48a0-a5b7-b0f8645a6fca', alt: 'contact' },
    { src: 'https://www.figma.com/api/mcp/asset/46a2a309-bba3-4168-939e-15389ebe6dea', alt: 'public' },
    { src: 'https://www.figma.com/api/mcp/asset/9fd54eac-22ae-4f6a-b6e4-ab3a7b6478d9', alt: 'users' },
    { src: 'https://www.figma.com/api/mcp/asset/1a43c57f-6efa-4c55-850f-7f1a88120021', alt: 'checklist' },
    { src: 'https://www.figma.com/api/mcp/asset/432ea8f0-71ef-44fc-80be-3fe8df0c8c2b', alt: 'trello' },
    {
      src: 'https://www.figma.com/api/mcp/asset/4a3e4ce6-44dc-4439-8e69-294ae4d87804',
      alt: 'scouting',
      dual: 'https://www.figma.com/api/mcp/asset/c15febca-3db7-48ab-9b9b-9f24bafe6826',
    },
    { src: 'https://www.figma.com/api/mcp/asset/bcd1fc9a-003e-4681-8213-df0ce04179b6', alt: 'settings' },
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
    '&:hover:not(.Mui-disabled) fieldset': { borderColor: '#D0CFD2' },
    '&.Mui-focused fieldset': { borderColor: '#6A6A70' },
    '&.Mui-disabled, &.Mui-disabled:hover': { backgroundColor: '#F5F5F6' },
  },
  '& .MuiPickersOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: 'transparent',
    '& .MuiPickersOutlinedInput-notchedOutline': { borderColor: '#E6E6E7', borderWidth: 1 },
    '&:hover:not(.Mui-disabled) .MuiPickersOutlinedInput-notchedOutline': { borderColor: '#D0CFD2' },
    '&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': { borderColor: '#6A6A70', borderWidth: 2 },
  },
  '& .MuiInputBase-input': { fontSize: 12, lineHeight: '18px', color: '#262527' },
  '& .MuiInputBase-input::placeholder': { color: '#CCCCCC', opacity: 1, fontSize: 12, WebkitTextFillColor: '#CCCCCC' },
  '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#86868B', color: '#86868B' },
  '& .MuiInputBase-input.Mui-disabled::placeholder': { color: '#CCCCCC', opacity: 1, WebkitTextFillColor: '#CCCCCC' },
  '& .MuiPickersInputBase-sectionContent, & .MuiPickersSectionList-sectionContent': {
    fontSize: 12,
    lineHeight: '18px',
    color: '#262527',
  },
  '& .MuiPickersSectionList-sectionContent[aria-valuetext="Empty"]': {
    color: '#CCCCCC',
  },
  '& .MuiSelect-icon .MuiSvgIcon-root': { fontSize: 16 },
} as const;

const figmaLabelSx = { color: '#86868B', fontSize: 12, fontWeight: 500, lineHeight: '18px' } as const;

/** Figma node 1132:17001 — Contact Title / Users table (Filter-Go). */
type ContactDirectoryUser = { id: string; name: string; email: string; phone: string; avatar: string };

const CONTACT_DIRECTORY_USERS: ContactDirectoryUser[] = [
  { id: 'henry', name: 'Henry Micheal', email: 'henrymicheal23@signal.com', phone: '+1-402-555-0199', avatar: 'https://www.figma.com/api/mcp/asset/07f4b5c4-1dc8-49b9-8fc5-2a024cd336e9' },
  { id: 'jeff', name: 'Jeff Zolos', email: 'jeff@teamfiltergo.com', phone: '+1-402-555-0100', avatar: 'https://www.figma.com/api/mcp/asset/0bef3b1e-19dc-4c42-8fae-76f8058bb0ce' },
  { id: 'aleena', name: 'Aleena Javed', email: 'aleena@teamfiltergo.com', phone: '+1-402-444-5900', avatar: 'https://www.figma.com/api/mcp/asset/0139ac94-a956-4149-84df-c0751acca97d' },
  { id: 'matt', name: 'Matt Quinn', email: 'matt.quinn@signal.com', phone: '+1-402-555-0112', avatar: 'https://www.figma.com/api/mcp/asset/0bef3b1e-19dc-4c42-8fae-76f8058bb0ce' },
  { id: 'jodi', name: 'Jodi Wimer', email: 'jodi.wimer@signal.com', phone: '+1-402-555-0144', avatar: 'https://www.figma.com/api/mcp/asset/0139ac94-a956-4149-84df-c0751acca97d' },
  { id: 'darin', name: 'Darin Smith', email: 'darin.smith@signal.com', phone: '+1-402-555-0155', avatar: 'https://www.figma.com/api/mcp/asset/f2e29d6a-3ca4-46cd-a041-a46829bd08b4' },
  { id: 'don', name: 'Don Crowell', email: 'don.crowell@signal.com', phone: '+1-402-555-0166', avatar: 'https://www.figma.com/api/mcp/asset/9b865407-4730-4bbf-b832-b3b184922f4d' },
  { id: 'derrick', name: 'Derrick Dancy', email: 'derrick.dancy@signal.com', phone: '+1-402-555-0177', avatar: 'https://www.figma.com/api/mcp/asset/e44286c7-801e-4591-b759-428f2c4b259f' },
];

const FORM_PROGRESS_SECTIONS = [
  { id: 'section-company-property', label: 'Company & Property Details' },
  { id: 'section-property-occupancy', label: 'Property Occupancy' },
  { id: 'section-contacts', label: 'Contact Details' },
  { id: 'section-contract', label: 'Contract Details' },
  { id: 'section-products', label: 'Add Products' },
  { id: 'section-billing', label: 'Billing And Payment Details' },
  { id: 'section-signee', label: 'Signee' },
] as const;

const CONTACT_ROLE_ROWS = [
  { id: 'decision_maker', label: 'Decision Maker', color: '#9747FF', bg: '#F5EDFF' },
  { id: 'billing', label: 'Billing', color: '#2E964B', bg: '#EFF8EF' },
] as const;

const EMPTY_CONTACT_ROLE_SELECTIONS: Record<string, string[]> = {
  decision_maker: [],
  billing: [],
};

/** Figma 44329:162823 — Affiliation (multi-select pills). */
const COMPANY_AFFILIATION_OPTIONS = [
  { id: 'headquarters', label: 'Headquarters' },
  { id: 'regional_office', label: 'Regional Office' },
  { id: 'managed', label: 'Managed' },
  { id: 'owned', label: 'Owned' },
  { id: 'shared', label: 'Shared' },
  { id: 'tenant', label: 'Tenant' },
] as const;

function RequiredAsterisk() {
  return (
    <Box component="span" sx={{ color: '#B32318' }}>
      {' '}
      *
    </Box>
  );
}

type MockCompany = {
  name: string;
  address: string;
  industryVertical: string;
};

type MockProperty = {
  address: string;
  propertyName: string;
  franchiseAssociation: string;
  propertySource: string;
  affiliations: string[];
  companyName: string;
};

/** Existing companies for Company autocomplete (mock). */
const MOCK_EXISTING_COMPANIES: MockCompany[] = [
  {
    name: 'Tkxel One World',
    address: 'Fulton Street, 10048 New York New York, United States',
    industryVertical: 'Commercial',
  },
  {
    name: 'Signal Security Partners',
    address: '',
    industryVertical: '',
  },
  {
    name: 'Midwest Distribution Co',
    address: '2200 Cornhusker Hwy, Lincoln, NE 68521',
    industryVertical: 'Distribution',
  },
  {
    name: 'Prairie Housing Group',
    address: '310 S 15th St, Omaha, NE 68102',
    industryVertical: 'Housing',
  },
];

/** Address applied when user confirms a new location from the map picker. */
const MOCK_MAP_NEW_PROPERTY_ADDRESS = '412 N Broadway St, Bloomfield, NE 68718';

const MOCK_EXISTING_PROPERTIES: MockProperty[] = [
  {
    companyName: 'Tkxel One World',
    address: '1 World Trade Center, New York, NY 10007',
    propertyName: 'One World Trade Center',
    franchiseAssociation: '#402 Nebraska, NB',
    propertySource: 'ALN',
    affiliations: ['headquarters', 'owned'],
  },
  {
    companyName: 'Tkxel One World',
    address: '4 World Trade Center, New York, NY 10007',
    propertyName: 'Four World Trade Center',
    franchiseAssociation: '#402 Nebraska, NB',
    propertySource: 'Costar',
    affiliations: ['managed'],
  },
  {
    companyName: 'Midwest Distribution Co',
    address: '150 Warehouse Blvd, Lincoln, NE 68508',
    propertyName: 'Lincoln Warehouse',
    franchiseAssociation: 'Regional co-op',
    propertySource: 'Referral',
    affiliations: ['shared', 'tenant'],
  },
  {
    companyName: 'Midwest Distribution Co',
    address: '200 Logistics Way, Omaha, NE 68102',
    propertyName: 'Omaha Distribution Hub',
    franchiseAssociation: 'Regional co-op',
    propertySource: 'ALN',
    affiliations: ['owned'],
  },
  {
    companyName: 'Prairie Housing Group',
    address: '901 Maple Ave, Bloomfield, NE 68718',
    propertyName: 'Maple Avenue Residences',
    franchiseAssociation: 'None',
    propertySource: 'Costar',
    affiliations: ['managed'],
  },
  {
    companyName: 'Prairie Housing Group',
    address: '220 Oak Street, Norfolk, NE 68701',
    propertyName: 'Oak Street Apartments',
    franchiseAssociation: 'None',
    propertySource: 'Referral',
    affiliations: ['tenant'],
  },
];

type CompanyNamePaperProps = PaperProps & {
  onCreateCompany?: () => void;
};

const CompanyNameDropdownPaper = forwardRef<HTMLDivElement, CompanyNamePaperProps>(
  function CompanyNameDropdownPaper(props, ref) {
    const { children, onCreateCompany, sx, ...other } = props;
    return (
      <Paper
        ref={ref}
        {...other}
        sx={[
          {
            borderRadius: '8px',
            mt: 0.5,
            boxShadow: '0px 8px 24px rgba(15, 23, 42, 0.12)',
            overflow: 'hidden',
          },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
      >
        {children}
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            zIndex: 1,
            borderTop: '1px solid #E6E6E7',
            bgcolor: '#FFFFFF',
            px: 1,
            py: 0.75,
          }}
        >
          <Button
            type="button"
            fullWidth
            disableRipple
            startIcon={<AddOutlined sx={{ fontSize: 16, color: '#146dff' }} />}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCreateCompany?.();
            }}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              fontSize: 13,
              fontWeight: 500,
              lineHeight: '20px',
              color: '#146dff',
              px: 1,
              py: 0.75,
              minHeight: 36,
              '&:hover': { bgcolor: '#F5F8FF' },
            }}
          >
            Create new company
          </Button>
        </Box>
      </Paper>
    );
  },
);

const PROPERTY_BILLING_ADDRESS = {
  address: '412 N Broadway St',
  country: 'USA',
  state: 'Nebraska',
  city: 'Bloomfield',
  zip: '68718',
} as const;

/** Default product row — form starts empty except products stay prefilled. */
const DEFAULT_SERVICE_PRODUCTS: { id: string; dimension: string; rate: string; quantity: string }[] = [
  { id: 'p1', dimension: '20*20*12', rate: '35.00', quantity: '1' },
];

type BillingFrequencyPlan = 'annually' | 'semi_annually' | 'quarterly' | 'monthly';

/** Monthly rate is the base. Longer plans are that rate times the months in the period. */
const BILLING_MONTHLY_RATE = 120;

function billingPlanQuote(id: BillingFrequencyPlan) {
  const months = { annually: 12, semi_annually: 6, quarterly: 3, monthly: 1 }[id];
  const discount = id === 'annually' ? 0.1 : id === 'quarterly' ? 0.05 : 0;
  const compareAt = BILLING_MONTHLY_RATE * months;
  const price = Math.round(compareAt * (1 - discount));
  return {
    price,
    ...(discount > 0
      ? { compareAt, off: `${Math.round(discount * 100)}% off` }
      : {}),
  };
}

type SigneeCard = {
  id: string;
  name: string;
  role: 'Sales Person' | 'Client';
  title?: string;
  email?: string;
  hasSignature?: boolean;
  signatureText?: string;
};

function parseMoneyInput(s: string) {
  const n = parseFloat(s.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function LabeledField(props: {
  label?: string;
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
      {props.label ? (
        <Typography sx={figmaLabelSx}>
          {props.label}
          {props.required ? <Box component="span" sx={{ color: '#B32318' }}> *</Box> : null}
        </Typography>
      ) : null}
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
                          {props.placeholder || emptyOpt?.label || 'Select'}
                        </Typography>
                      );
                    }
                    const opt = opts.find((o) => o.value === v);
                    return (
                      <Typography component="span" sx={{ fontSize: 12, lineHeight: '18px', color: props.disabled ? '#86868B' : '#262527' }}>
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
          ? (props.options ?? [])
              .filter((o) => o.value !== '')
              .map((o) => (
              <MenuItem key={`${props.name ?? 'opt'}-${o.value}`} value={o.value}>
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
        format="MM/DD/YY"
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
          openPickerIcon: { sx: { color: '#6A6A70', fontSize: 14 } },
        }}
      />
    </Stack>
  );
}

function SidebarContent(props: { showCollapseChevron?: boolean; activeIconAlt?: string }) {
  const { showCollapseChevron = true, activeIconAlt } = props;
  const renderSidebarIcon = (alt: string) => {
    const iconSx = { fontSize: 20, color: '#FFFFFF' };
    switch (alt) {
      case 'dashboard': return <DashboardOutlined sx={iconSx} />;
      case 'company': return <ApartmentOutlined sx={iconSx} />;
      case 'map-pin': return <PlaceOutlined sx={iconSx} />;
      case 'deal': return <DescriptionOutlined sx={iconSx} />;
      case 'contact': return <PersonOutlineOutlined sx={iconSx} />;
      case 'public': return <PublicOutlined sx={iconSx} />;
      case 'users': return <GroupsOutlined sx={iconSx} />;
      case 'checklist': return <TaskAltOutlined sx={iconSx} />;
      case 'trello': return <ViewKanbanOutlined sx={iconSx} />;
      case 'scouting': return <ExploreOutlined sx={iconSx} />;
      case 'settings': return <SettingsOutlined sx={iconSx} />;
      default: return <DescriptionOutlined sx={iconSx} />;
    }
  };

  return (
    <Box sx={{ width: { xs: 72, md: 76 }, height: '100vh', bgcolor: '#262527', position: 'relative', flexShrink: 0 }}>
      <Box sx={{ px: 1, py: 2, display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ color: '#2DA551', fontSize: 16, fontWeight: 800, lineHeight: 1 }}>Filtergo</Typography>
      </Box>

      <Stack spacing={0} sx={{ px: 1, pt: 2 }}>
        {sidebarImgAssets.icons.map((ic) => (
          <Box
            key={ic.alt}
            sx={{
              width: { xs: 40, md: 44 },
              height: { xs: 40, md: 44 },
              mx: 'auto',
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              bgcolor: ic.alt === activeIconAlt ? '#2DA551' : 'transparent',
            }}
          >
            {renderSidebarIcon(ic.alt)}
          </Box>
        ))}
      </Stack>

      {showCollapseChevron ? (
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            right: -14,
            top: 436,
            width: 28,
            height: 28,
            zIndex: 1,
          }}
        >
          <Box sx={{ width: 28, height: 28, transform: 'rotate(180deg)' }}>
            <Box
              sx={{ width: 28, height: 28, display: 'grid', placeItems: 'center', color: '#6A6A70' }}
            >
              <KeyboardArrowDownOutlined sx={{ fontSize: 18, transform: 'rotate(90deg)' }} />
            </Box>
          </Box>
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
      { label: 'Commercial', value: 'Commercial' },
      { label: 'Distribution', value: 'Distribution' },
      { label: 'Housing', value: 'Housing' },
      { label: 'Industrial', value: 'Industrial' },
      { label: 'Manufacturing', value: 'Manufacturing' },
    ],
    [],
  );
  const partnershipStatusOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Owner', value: 'Owner' },
      { label: 'Strategic Partner', value: 'Strategic Partner' },
      { label: 'Prospect', value: 'Prospect' },
      { label: 'Customer', value: 'Customer' },
    ],
    [],
  );

  const [companyDirectory, setCompanyDirectory] = useState<MockCompany[]>(() =>
    MOCK_EXISTING_COMPANIES.map((c) => ({ ...c })),
  );
  const [propertyDirectory, setPropertyDirectory] = useState<MockProperty[]>(() =>
    MOCK_EXISTING_PROPERTIES.map((p) => ({ ...p, affiliations: [...p.affiliations] })),
  );
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [industryVertical, setIndustryVertical] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [propertySource, setPropertySource] = useState('');
  const [addressMapModalOpen, setAddressMapModalOpen] = useState(false);
  const [franchiseAssociation, setFranchiseAssociation] = useState('');
  const [companyAffiliations, setCompanyAffiliations] = useState<string[]>([]);
  const [createCompanyModalOpen, setCreateCompanyModalOpen] = useState(false);
  const [createCompanyDomain, setCreateCompanyDomain] = useState('');
  const [createCompanyName, setCreateCompanyName] = useState('');
  const [createCompanyMarketVertical, setCreateCompanyMarketVertical] = useState('');
  const [createCompanyPartnershipStatus, setCreateCompanyPartnershipStatus] = useState('');
  const [createCompanyEmployees, setCreateCompanyEmployees] = useState('');
  const [createCompanyRevenue, setCreateCompanyRevenue] = useState('');
  const [createCompanyTillDate, setCreateCompanyTillDate] = useState<Dayjs | null>(null);
  const [createCompanyFloor, setCreateCompanyFloor] = useState('');
  const [createCompanySpaceType, setCreateCompanySpaceType] = useState('Suite');
  const [createCompanySpaceId, setCreateCompanySpaceId] = useState('');

  const propertyOptionsForCompany = useMemo(() => {
    const selected = companyName.trim();
    if (!selected) return propertyDirectory;
    return propertyDirectory.filter((p) => p.companyName === selected);
  }, [propertyDirectory, companyName]);

  const resetCreateCompanyForm = useCallback(() => {
    setCreateCompanyDomain('');
    setCreateCompanyName('');
    setCreateCompanyMarketVertical('');
    setCreateCompanyPartnershipStatus('');
    setCreateCompanyEmployees('');
    setCreateCompanyRevenue('');
  }, []);

  const [contactFirstName, setContactFirstName] = useState('');
  const [contactLastName, setContactLastName] = useState('');
  const contactName = `${contactFirstName} ${contactLastName}`.trim();
  const setContactName = (v: string) => {
    const parts = v.trim().split(/\s+/);
    setContactFirstName(parts[0] ?? '');
    setContactLastName(parts.slice(1).join(' ') || '');
  };
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactUserByRole, setContactUserByRole] = useState<Record<string, string[]>>(
    () => ({ ...EMPTY_CONTACT_ROLE_SELECTIONS }),
  );
  const [contactDirectory, setContactDirectory] = useState<ContactDirectoryUser[]>(() => [
    ...CONTACT_DIRECTORY_USERS,
  ]);

  const [contractStartDate, setContractStartDate] = useState<Dayjs | null>(null);
  const [cycleReferenceDate, setCycleReferenceDate] = useState<Dayjs | null>(null);
  const [serviceStartDate, setServiceStartDate] = useState<Dayjs | null>(null);
  const [sameAsContractDate, setSameAsContractDate] = useState(false);
  const [firstInstallOnServiceDate, setFirstInstallOnServiceDate] = useState(false);

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
      { label: '20*20*12', value: '20*20*12' },
      { label: '10*10*8', value: '10*10*8' },
    ],
    [],
  );
  const [serviceProducts, setServiceProducts] = useState<
    { id: string; dimension: string; rate: string; quantity: string }[]
  >(() => DEFAULT_SERVICE_PRODUCTS.map((p) => ({ ...p })));
  const [flatRateEnabled, setFlatRateEnabled] = useState(false);
  const [flatRateAmount, setFlatRateAmount] = useState('0.00');

  const flatRateFilterCount = useMemo(
    () => serviceProducts.reduce((sum, p) => sum + (parseInt(p.quantity, 10) || 0), 0),
    [serviceProducts],
  );
  const flatRateTotal = flatRateFilterCount * parseMoneyInput(flatRateAmount);

  const serviceProductsSubtotal = useMemo(
    () =>
      serviceProducts.reduce((sum, p) => {
        const r = parseMoneyInput(p.rate);
        const q = parseInt(p.quantity, 10) || 0;
        return sum + r * q;
      }, 0),
    [serviceProducts],
  );

  const [billingPlanMode, setBillingPlanMode] = useState<'recurring' | 'at_service'>('recurring');
  const [billingFrequencyPlan, setBillingFrequencyPlan] = useState<BillingFrequencyPlan>('annually');
  const [billingDiscount, setBillingDiscount] = useState('');
  const [billingDiscountUnit, setBillingDiscountUnit] = useState('Percentage');
  const [discountFieldEl, setDiscountFieldEl] = useState<HTMLDivElement | null>(null);
  const [billingTaxRate, setBillingTaxRate] = useState('');
  const [exemptTax, setExemptTax] = useState(false);
  const [taxExemptionDocumentName, setTaxExemptionDocumentName] = useState('');
  const taxExemptionInputRef = useRef<HTMLInputElement>(null);
  const [autoCharge, setAutoCharge] = useState(false);
  const [nextPaymentDate, setNextPaymentDate] = useState<Dayjs | null>(null);
  const [annualRateIncrease, setAnnualRateIncrease] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card / ACH');
  const [paymentTerms, setPaymentTerms] = useState('');
  const paymentMethodOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Credit Card / ACH', value: 'Credit Card / ACH' },
      ...(billingPlanMode === 'at_service' ? [{ label: 'Check', value: 'Check' }] : []),
    ],
    [billingPlanMode],
  );
  const paymentTermsOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Due Upon Invoice', value: 'Due Upon Invoice' },
      { label: 'Net 10. Ten Days After Invoice Date', value: 'Net 10. Ten Days After Invoice Date' },
      { label: 'Net 15. Fifteen Days After Invoice Date', value: 'Net 15. Fifteen Days After Invoice Date' },
      { label: 'Net 30. Thirty Days After Invoice Date', value: 'Net 30. Thirty Days After Invoice Date' },
    ],
    [],
  );

  const [billFirstName, setBillFirstName] = useState('');
  const [billLastName, setBillLastName] = useState('');
  const [billEmail, setBillEmail] = useState('');
  const [billPhoneCountryCode, setBillPhoneCountryCode] = useState('+1');
  const [billPhoneNumber, setBillPhoneNumber] = useState('');
  const [billCountry, setBillCountry] = useState<string>(PROPERTY_BILLING_ADDRESS.country);
  const [billCity, setBillCity] = useState<string>(PROPERTY_BILLING_ADDRESS.city);
  const [billState, setBillState] = useState<string>(PROPERTY_BILLING_ADDRESS.state);
  const [billZip, setBillZip] = useState<string>(PROPERTY_BILLING_ADDRESS.zip);
  const [billAddress, setBillAddress] = useState<string>(PROPERTY_BILLING_ADDRESS.address);
  const [billingContactId, setBillingContactId] = useState<string | null>(null);
  const [sameAsPropertyAddress, setSameAsPropertyAddress] = useState(true);
  const countryOptions = useMemo<UiOption[]>(
    () => [
      { label: 'USA', value: 'USA' },
      { label: 'United States of America', value: 'United States of America' },
      { label: 'Canada', value: 'Canada' },
    ],
    [],
  );
  const cityOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Bloomfield', value: 'Bloomfield' },
      { label: 'New York', value: 'New York' },
      { label: 'Omaha', value: 'Omaha' },
    ],
    [],
  );
  const stateOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Florida', value: 'Florida' },
      { label: 'Nebraska', value: 'Nebraska' },
    ],
    [],
  );
  const franchiseAssociationOptions = useMemo<UiOption[]>(
    () => [
      { label: '#402 Nebraska, NB', value: '#402 Nebraska, NB' },
      { label: 'None', value: 'None' },
      { label: 'IFA / Franchisee network', value: 'IFA / Franchisee network' },
      { label: 'Regional co-op', value: 'Regional co-op' },
    ],
    [],
  );
  const propertySourceOptions = useMemo<UiOption[]>(
    () => [
      { label: 'ALN', value: 'ALN' },
      { label: 'Costar', value: 'Costar' },
      { label: 'Referral', value: 'Referral' },
    ],
    [],
  );

  const [signeeCards, setSigneeCards] = useState<SigneeCard[]>([]);
  const [signContractModalSigneeId, setSignContractModalSigneeId] = useState<string | null>(null);
  const [modalSignaturePreview, setModalSignaturePreview] = useState('');

  const [addSigneeRowOpen, setAddSigneeRowOpen] = useState(false);
  const [newSigneeName, setNewSigneeName] = useState('');
  const [newSigneeEmail, setNewSigneeEmail] = useState('');
  const [newSigneeTitle, setNewSigneeTitle] = useState('');

  const [editingSigneeId, setEditingSigneeId] = useState<string | null>(null);
  const [editingSigneeName, setEditingSigneeName] = useState('');
  const [editingSigneeEmail, setEditingSigneeEmail] = useState('');
  const [editingSigneeTitle, setEditingSigneeTitle] = useState('');

  const [createContactModalOpen, setCreateContactModalOpen] = useState(false);
  const [createContactEmail, setCreateContactEmail] = useState('');
  const [createContactFirstName, setCreateContactFirstName] = useState('');
  const [createContactLastName, setCreateContactLastName] = useState('');
  const [createContactJobTitle, setCreateContactJobTitle] = useState('');
  const [createContactCountryCode, setCreateContactCountryCode] = useState('+1');
  const [createContactPhoneNumber, setCreateContactPhoneNumber] = useState('');

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
    if (!billingContactId) return;
    const contact = contactDirectory.find((c) => c.id === billingContactId);
    if (!contact) return;
    const parts = contact.name.trim().split(/\s+/);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- billing fields mirror selected contact
    setBillFirstName(parts[0] ?? '');
    setBillLastName(parts.slice(1).join(' ') || '');
    setBillEmail(contact.email);
    setBillPhoneCountryCode('+1');
    setBillPhoneNumber(contact.phone);
  }, [billingContactId, contactDirectory]);

  useEffect(() => {
    if (!sameAsPropertyAddress) return;
    const preset = PROPERTY_BILLING_ADDRESS;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- billing address mirrors property when checked
    setBillAddress(propertyAddress.trim() || preset.address);
    setBillCountry(preset.country);
    setBillState(preset.state);
    setBillCity(preset.city);
    setBillZip(preset.zip);
  }, [sameAsPropertyAddress, propertyAddress]);

  const clearFieldError = useCallback((key: string) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const clearPropertyLinkedDetails = useCallback(() => {
    setPropertyName('');
    setFranchiseAssociation('');
    setPropertySource('');
    setCompanyAffiliations([]);
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.propertyName;
      return next;
    });
  }, []);

  const applyMockProperty = useCallback((property: MockProperty) => {
    setPropertyAddress(property.address);
    setPropertyName(property.propertyName);
    setFranchiseAssociation(property.franchiseAssociation);
    setPropertySource(property.propertySource);
    setCompanyAffiliations([...property.affiliations]);
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.propertyAddress;
      delete next.propertyName;
      return next;
    });
  }, []);

  const clearCompanyDetails = useCallback(() => {
    setCompanyName('');
    setCompanyAddress('');
    setIndustryVertical('');
    setPropertyAddress('');
    setPropertyName('');
    setFranchiseAssociation('');
    setPropertySource('');
    setCompanyAffiliations([]);
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.industryVertical;
      delete next.companyName;
      delete next.propertyAddress;
      delete next.propertyName;
      return next;
    });
  }, []);

  const applyMockCompany = useCallback((company: MockCompany) => {
    setCompanyName(company.name);
    setCompanyAddress(company.address);
    setIndustryVertical(company.industryVertical);
    // One company can have many properties — user picks property separately.
    setPropertyAddress('');
    setPropertyName('');
    setFranchiseAssociation('');
    setPropertySource('');
    setCompanyAffiliations([]);
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (company.industryVertical) delete next.industryVertical;
      delete next.companyName;
      delete next.propertyAddress;
      delete next.propertyName;
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
    if (!industryVertical) e.industryVertical = 'Industry vertical is required.';
    if (!propertyAddress.trim()) e.propertyAddress = 'Property address is required.';
    if (!propertyName.trim()) e.propertyName = 'Property name is required.';
    if (!propertySource.trim()) e.propertySource = 'Property source is required.';
    if ((contactUserByRole.decision_maker ?? []).length === 0) {
      e.decisionMakerContacts = 'Select at least one Decision Maker contact.';
    }
    if (!contactName.trim()) e.contactName = 'Name is required.';
    if (!contactEmail.trim()) e.contactEmail = 'Email is required.';
    if (!contactPhone.trim()) e.contactPhone = 'Phone is required.';
    if (!contractStartDate) e.contractStartDate = 'Contract start date is required.';
    if (!cycleReferenceDate) e.cycleReferenceDate = 'Service start date is required.';
    if (!serviceStartDate) e.serviceStartDate = 'Service start date is required.';
    const n = Number.parseInt(occurrenceEvery, 10);
    if (!occurrenceEvery.trim() || Number.isNaN(n) || n < 1) e.occurrenceEvery = 'Enter a valid number (1+).';
    if (!occurrenceUnit.trim()) e.occurrenceUnit = 'Select week or month.';
    if (!serviceLabel.trim()) e.serviceLabel = 'Service name is required.';
    if (serviceProducts.length === 0) e.serviceProducts = 'Add at least one product.';
    for (let i = 0; i < serviceProducts.length; i++) {
      const p = serviceProducts[i];
      if (!p.dimension.trim()) e[`product_${i}_dimension`] = 'Select a product size.';
      if (!flatRateEnabled && (!p.rate.trim() || parseMoneyInput(p.rate) <= 0)) e[`product_${i}_rate`] = 'Enter a valid rate.';
      const qn = parseInt(p.quantity, 10);
      if (!p.quantity.trim() || Number.isNaN(qn) || qn < 1) e[`product_${i}_quantity`] = 'Enter quantity (1+).';
    }

    setFieldErrors(e);
    return Object.keys(e).length === 0;
  }, [
    companyName,
    industryVertical,
    propertyAddress,
    propertyName,
    propertySource,
    contactUserByRole,
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
    flatRateEnabled,
    paymentMethod,
  ]);

  const resetForm = useCallback(() => {
    setCompanyName('');
    setCompanyAddress('');
    setIndustryVertical('');
    setPropertyAddress('');
    setPropertyName('');
    setPropertySource('');
    setFranchiseAssociation('');
    setCompanyAffiliations([]);
    setCreateCompanyTillDate(null);
    setCreateCompanyFloor('');
    setCreateCompanySpaceType('Suite');
    setCreateCompanySpaceId('');
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactUserByRole({ ...EMPTY_CONTACT_ROLE_SELECTIONS });
    setContactDirectory([...CONTACT_DIRECTORY_USERS]);
    setContractStartDate(null);
    setCycleReferenceDate(null);
    setServiceStartDate(null);
    setSameAsContractDate(false);
    setFirstInstallOnServiceDate(false);
    setOccurrenceEvery('01');
    setOccurrenceUnit('Month');
    setFieldErrors({});
    setServiceLabel('');
    setResourceType('');
    setInvoiceLineItem('');
    setPreferredStartTime(null);
    setPreferredEndTime(null);
    setServiceProducts(DEFAULT_SERVICE_PRODUCTS.map((p) => ({ ...p })));
    setFlatRateEnabled(false);
    setFlatRateAmount('0.00');
    setBillingPlanMode('recurring');
    setBillingFrequencyPlan('annually');
    setBillingDiscount('');
    setBillingDiscountUnit('Percentage');
    setBillingTaxRate('');
    setExemptTax(false);
    setTaxExemptionDocumentName('');
    setAutoCharge(false);
    setNextPaymentDate(null);
    setAnnualRateIncrease('');
    setPaymentMethod('Credit Card / ACH');
    setPaymentTerms('');
    setBillFirstName('');
    setBillLastName('');
    setBillEmail('');
    setBillPhoneCountryCode('+1');
    setBillPhoneNumber('');
    setBillCountry(PROPERTY_BILLING_ADDRESS.country);
    setBillCity(PROPERTY_BILLING_ADDRESS.city);
    setBillState(PROPERTY_BILLING_ADDRESS.state);
    setBillZip(PROPERTY_BILLING_ADDRESS.zip);
    setBillAddress(PROPERTY_BILLING_ADDRESS.address);
    setBillingContactId(null);
    setSameAsPropertyAddress(true);
    setSigneeCards([]);
    setSignContractModalSigneeId(null);
    setModalSignaturePreview('');
    setAddSigneeRowOpen(false);
    setNewSigneeName('');
    setNewSigneeEmail('');
    setNewSigneeTitle('');
    setEditingSigneeId(null);
    setEditingSigneeName('');
    setEditingSigneeEmail('');
    setEditingSigneeTitle('');
    setCreateContactModalOpen(false);
    setCreateContactEmail('');
    setCreateContactFirstName('');
    setCreateContactLastName('');
    setCreateContactJobTitle('');
    setCreateContactCountryCode('+1');
    setCreateContactPhoneNumber('');
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
        propertyName: propertyName.trim(),
        franchiseAssociation: franchiseAssociation.trim(),
        propertySource: propertySource.trim(),
        affiliations: [...companyAffiliations],
        companyAtPropertyTillDate: createCompanyTillDate?.format('YYYY-MM-DD'),
        propertyOccupancy: {
          floor: createCompanyFloor.trim(),
          spaceType: createCompanySpaceType,
          spaceId: createCompanySpaceId.trim(),
        },
      },
      contact: {
        name: contactName.trim(),
        email: contactEmail.trim(),
        phone: contactPhone.trim(),
        roleAssignments: CONTACT_ROLE_ROWS.reduce<Record<string, { name: string; email: string; phone: string }[]>>(
          (acc, { id }) => {
            const ids = contactUserByRole[id] ?? [];
            acc[id] = ids
              .map((uid) => contactDirectory.find((x) => x.id === uid))
              .filter((u): u is ContactDirectoryUser => Boolean(u))
              .map((u) => ({ name: u.name, email: u.email, phone: u.phone }));
            return acc;
          },
          {},
        ),
      },
      contractStartDate: contractStartDate?.toISOString(),
      cycleReferenceDate: cycleReferenceDate?.toISOString(),
      serviceStartDate: serviceStartDate?.toISOString(),
      sameAsContractDate,
      firstInstallOnServiceDate,
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
        flatRate: flatRateEnabled
          ? { filters: flatRateFilterCount, rate: parseMoneyInput(flatRateAmount), total: flatRateTotal }
          : null,
      },
      billingInfo: {
        contactId: billingContactId,
        sameAsPropertyAddress,
        firstName: billFirstName,
        lastName: billLastName,
        email: billEmail,
        phone: billPhoneNumber.trim()
          ? `${billPhoneCountryCode} ${billPhoneNumber.trim()}`
          : '',
        country: billCountry,
        city: billCity,
        state: billState,
        zip: billZip,
        address: billAddress,
      },
      payment: {
        cycleReferenceDate: (nextPaymentDate ?? contractStartDate)?.format('YYYY-MM-DD') ?? '',
        billingPlanMode,
        billingFrequency: billingFrequencyPlan,
        discount: billingDiscount,
        discountUnit: billingDiscountUnit,
        taxRate: exemptTax ? 'exempt' : billingTaxRate,
        taxExemptionDocument: exemptTax ? taxExemptionDocumentName : '',
        autoCharge,
        annualRateIncrease,
        paymentMethod,
        paymentTerms,
      },
      signees: signeeCards,
    };
    // Replace with API call
    console.log('Create contract', payload);
    setSnackbar({ open: true, message: 'Contract created successfully.', severity: 'success' });
  };

  const handleCancel = () => {
    resetForm();
    navigate('/filtergo/deals');
  };

  const applyContactUserToPrimaryFields = useCallback(
    (userId: string) => {
      const u = contactDirectory.find((x) => x.id === userId);
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
    [clearFieldError, contactDirectory],
  );

  const handleContactRoleUsersChange = useCallback(
    (roleId: string, userIds: string[]) => {
      setContactUserByRole((prev) => ({ ...prev, [roleId]: userIds }));
      if (roleId === 'decision_maker') {
        applyContactUserToPrimaryFields(userIds[0] ?? '');
        clearFieldError('decisionMakerContacts');
      }
    },
    [applyContactUserToPrimaryFields, clearFieldError],
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

  const sectionCompletion = useMemo(() => {
    const occurrenceCount = Number.parseInt(occurrenceEvery, 10);
    const billingAddressComplete = sameAsPropertyAddress
      ? true
      : Boolean(billAddress.trim() && billCountry && billState && billCity.trim() && billZip.trim());
    return {
      'section-company-property':
        Boolean(propertyAddress.trim()) &&
        Boolean(propertyName.trim()) &&
        Boolean(propertySource.trim()) &&
        Boolean(companyName.trim()) &&
        Boolean(industryVertical) &&
        companyAffiliations.length > 0,
      'section-property-occupancy':
        createCompanyTillDate != null || Boolean(createCompanyFloor.trim()) || Boolean(createCompanySpaceId.trim()),
      'section-contacts': (contactUserByRole.decision_maker ?? []).length > 0,
      'section-contract':
        contractStartDate != null &&
        cycleReferenceDate != null &&
        Boolean(occurrenceEvery.trim()) &&
        !Number.isNaN(occurrenceCount) &&
        occurrenceCount >= 1 &&
        Boolean(occurrenceUnit.trim()),
      'section-products':
        serviceProducts.length > 0 &&
        serviceProducts.every((p) => {
          const quantity = parseInt(p.quantity, 10);
          return Boolean(p.dimension.trim()) && (flatRateEnabled || parseMoneyInput(p.rate) > 0) && !Number.isNaN(quantity) && quantity >= 1;
        }),
      'section-billing':
        Boolean(paymentMethod) &&
        Boolean(paymentTerms) &&
        Boolean(annualRateIncrease.trim()) &&
        Boolean(billingContactId) &&
        (billingPlanMode !== 'recurring' || nextPaymentDate != null) &&
        billingAddressComplete,
      'section-signee': signeeCards.length > 0 && signeeCards.every((card) => Boolean(card.name.trim())),
    } as Record<(typeof FORM_PROGRESS_SECTIONS)[number]['id'], boolean>;
  }, [
    propertyAddress,
    propertyName,
    propertySource,
    companyName,
    industryVertical,
    companyAffiliations,
    createCompanyTillDate,
    createCompanyFloor,
    createCompanySpaceId,
    contactUserByRole,
    contractStartDate,
    cycleReferenceDate,
    occurrenceEvery,
    occurrenceUnit,
    serviceProducts,
    flatRateEnabled,
    paymentMethod,
    paymentTerms,
    annualRateIncrease,
    billingContactId,
    billingPlanMode,
    nextPaymentDate,
    sameAsPropertyAddress,
    billAddress,
    billCountry,
    billState,
    billCity,
    billZip,
    signeeCards,
  ]);

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

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
            sx={{
              flex: '1 1 0%',
              minHeight: 0,
              minWidth: 0,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'stretch',
              gap: { xs: 1.5, md: 3 },
              overflow: 'hidden',
            }}
          >
            <Box
              component="nav"
              aria-label="Form progress"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                width: { xs: '100%', md: 220 },
                maxHeight: { xs: 'none', md: '100%' },
                overflowX: { xs: 'auto', md: 'hidden' },
                overflowY: { xs: 'hidden', md: 'auto' },
                pr: { md: 1 },
                pb: { xs: 0.5, md: 0 },
                borderBottom: { xs: '1px solid #E6E6E7', md: 'none' },
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#6A6A70',
                  mb: { xs: 1.25, md: 2 },
                  display: { xs: 'none', md: 'block' },
                }}
              >
                {FORM_PROGRESS_SECTIONS.filter((s) => sectionCompletion[s.id]).length}/{FORM_PROGRESS_SECTIONS.length} sections complete
              </Typography>
              <Stack
                spacing={0}
                sx={{
                  position: 'relative',
                  flexDirection: { xs: 'row', md: 'column' },
                  gap: { xs: 1, md: 0 },
                  minWidth: { xs: 'max-content', md: 0 },
                }}
              >
                {FORM_PROGRESS_SECTIONS.map((section, index) => {
                  const complete = sectionCompletion[section.id];
                  const isLast = index === FORM_PROGRESS_SECTIONS.length - 1;
                  return (
                    <Box
                      key={section.id}
                      sx={{
                        position: 'relative',
                        display: 'flex',
                        gap: 1.25,
                        pb: { xs: 0, md: isLast ? 0 : 2.25 },
                        pr: { xs: isLast ? 0 : 1.5, md: 0 },
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 1,
                          bgcolor: '#FFFFFF',
                        }}
                      >
                        {complete ? (
                          <CheckCircle sx={{ fontSize: 18, color: '#2DA551' }} />
                        ) : (
                          <RadioButtonUnchecked sx={{ fontSize: 18, color: '#C8C8CB' }} />
                        )}
                      </Box>
                      <Box
                        component="button"
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        sx={{
                          all: 'unset',
                          cursor: 'pointer',
                          flex: 1,
                          minWidth: 0,
                          pt: '1px',
                          '&:hover .progress-section-label': { color: '#2DA551' },
                        }}
                      >
                        <Typography
                          className="progress-section-label"
                          sx={{
                            fontSize: { xs: 12, md: 13 },
                            fontWeight: complete ? 600 : 500,
                            lineHeight: '18px',
                            color: complete ? '#262527' : '#6A6A70',
                            transition: 'color 120ms ease',
                            whiteSpace: { xs: 'nowrap', md: 'normal' },
                          }}
                        >
                          {section.label}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
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
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
              '& .MuiOutlinedInput-root:not(.Mui-error) .MuiOutlinedInput-notchedOutline, & .MuiPickersOutlinedInput-root:not(.Mui-error) .MuiPickersOutlinedInput-notchedOutline': {
                borderColor: '#E6E6E7',
                borderWidth: '1px',
              },
              '& .MuiOutlinedInput-root:not(.Mui-error):not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline, & .MuiPickersOutlinedInput-root:not(.Mui-error):not(.Mui-disabled):hover .MuiPickersOutlinedInput-notchedOutline': {
                borderColor: '#D0CFD2',
              },
              '& .MuiOutlinedInput-root.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline, & .MuiPickersOutlinedInput-root.Mui-focused:not(.Mui-error) .MuiPickersOutlinedInput-notchedOutline': {
                borderColor: '#6A6A70',
                borderWidth: '2px',
              },
              '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root.Mui-disabled:hover .MuiOutlinedInput-notchedOutline, & .MuiPickersOutlinedInput-root.Mui-disabled .MuiPickersOutlinedInput-notchedOutline, & .MuiPickersOutlinedInput-root.Mui-disabled:hover .MuiPickersOutlinedInput-notchedOutline': {
                borderColor: '#E6E6E7',
              },
              '& .MuiOutlinedInput-root:not(.MuiInputBase-multiline):not(.MuiAutocomplete-inputRoot)': {
                height: 37,
                minHeight: 37,
                boxSizing: 'border-box',
              },
              '& .flat-rate-field .MuiOutlinedInput-root': {
                height: 27,
                minHeight: 27,
              },
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
                minHeight: '0 !important',
                paddingTop: '0 !important',
                paddingBottom: '0 !important',
                fontSize: 12,
                lineHeight: '18px',
                color: '#262527',
              },
              '& .Mui-disabled .MuiSelect-select': {
                color: '#86868B',
                WebkitTextFillColor: '#86868B',
              },
              '& .MuiInputBase-input': {
                color: '#262527',
              },
              '& .MuiInputBase-input.Mui-disabled': {
                color: '#86868B',
                WebkitTextFillColor: '#86868B',
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#CCCCCC',
                opacity: 1,
                WebkitTextFillColor: '#CCCCCC',
              },
              '& .MuiPickersSectionList-sectionContent[aria-valuetext="Empty"]': {
                color: '#CCCCCC',
              },
              '& .MuiAutocomplete-root:not(.contact-role-field) .MuiAutocomplete-inputRoot': {
                height: 37,
                minHeight: 37,
                boxSizing: 'border-box',
                alignItems: 'center',
                paddingTop: '0 !important',
                paddingBottom: '0 !important',
              },
              '& .MuiAutocomplete-root .MuiAutocomplete-input': {
                paddingTop: '0 !important',
                paddingBottom: '0 !important',
              },
              '& .contact-role-field .MuiAutocomplete-inputRoot': {
                height: 'auto',
                minHeight: 37,
                boxSizing: 'border-box',
                alignItems: 'center',
              },
              '& .MuiPickersOutlinedInput-root': {
                height: 37,
                minHeight: 37,
                boxSizing: 'border-box',
              },
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
              <FormSection id="section-company-property" title="Company & Property Details" showDivider={false}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={0.75} sx={{ width: '100%' }}>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
                      >
                        <Typography sx={figmaLabelSx}>
                          Property Address
                          <RequiredAsterisk />
                        </Typography>
                        <IconButton
                          type="button"
                          size="small"
                          aria-label="Open address map to add a new property"
                          onClick={() => setAddressMapModalOpen(true)}
                          sx={{ color: '#6A6A70', p: 0.25, mr: -0.5 }}
                        >
                          <MapOutlined sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Stack>
                      <Autocomplete
                        options={propertyOptionsForCompany}
                        getOptionLabel={(o) => (typeof o === 'string' ? o : o.address)}
                        isOptionEqualToValue={(a, b) => {
                          const addrA = typeof a === 'string' ? a : a.address;
                          const addrB = typeof b === 'string' ? b : b.address;
                          return addrA === addrB;
                        }}
                        openOnFocus
                        freeSolo
                        forcePopupIcon
                        filterOptions={(options, { inputValue }) => {
                          const q = inputValue.trim().toLowerCase();
                          if (!q) return options;
                          return options.filter(
                            (o) =>
                              o.address.toLowerCase().includes(q) ||
                              o.propertyName.toLowerCase().includes(q),
                          );
                        }}
                        value={
                          propertyOptionsForCompany.find((p) => p.address === propertyAddress) ??
                          (propertyAddress.trim()
                            ? {
                                address: propertyAddress,
                                propertyName: '',
                                franchiseAssociation: '',
                                propertySource: '',
                                affiliations: [],
                                companyName: companyName.trim(),
                              }
                            : null)
                        }
                        onChange={(_, next) => {
                          if (typeof next === 'string') {
                            setPropertyAddress(next);
                            clearPropertyLinkedDetails();
                            clearFieldError('propertyAddress');
                            return;
                          }
                          if (next) {
                            applyMockProperty(next);
                            return;
                          }
                          setPropertyAddress('');
                          clearPropertyLinkedDetails();
                          clearFieldError('propertyAddress');
                        }}
                        onInputChange={(_, value, reason) => {
                          if (reason === 'input') {
                            setPropertyAddress(value);
                            clearFieldError('propertyAddress');
                          }
                        }}
                        popupIcon={<KeyboardArrowDownOutlined sx={{ fontSize: 16, color: '#6A6A70' }} />}
                        slotProps={{
                          paper: {
                            sx: {
                              borderRadius: '8px',
                              mt: 0.5,
                              boxShadow: '0px 8px 24px rgba(15, 23, 42, 0.12)',
                            },
                          },
                          listbox: {
                            sx: {
                              py: 0.5,
                              maxHeight: 220,
                              '& .MuiAutocomplete-option': {
                                fontSize: 12,
                                lineHeight: '18px',
                                minHeight: 40,
                                py: 1,
                                px: 1.5,
                              },
                            },
                          },
                        }}
                        renderOption={(props, option) => {
                          const { key, ...optionProps } = props;
                          return (
                            <Box component="li" key={key} {...optionProps}>
                              <Stack spacing={0.25} sx={{ minWidth: 0 }}>
                                <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#262527' }}>
                                  {option.address}
                                </Typography>
                                {option.propertyName ? (
                                  <Typography sx={{ fontSize: 11, lineHeight: '16px', color: '#86868B' }}>
                                    {option.propertyName}
                                  </Typography>
                                ) : null}
                              </Stack>
                            </Box>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="propertyAddress"
                            size="small"
                            placeholder="Select property address"
                            error={Boolean(fieldErrors.propertyAddress)}
                            helperText={fieldErrors.propertyAddress}
                            sx={figmaTextFieldSx}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                      name="propertyName"
                      label="Property Name"
                      required={false}
                      placeholder="Enter property name"
                      value={propertyName}
                      onChange={(v) => {
                        setPropertyName(v);
                        clearFieldError('propertyName');
                      }}
                      error={Boolean(fieldErrors.propertyName)}
                      helperText={fieldErrors.propertyName}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={0.75} sx={{ width: '100%' }}>
                      <Typography sx={figmaLabelSx}>
                        Property Source
                        <RequiredAsterisk />
                      </Typography>
                      <Autocomplete
                        options={propertySourceOptions}
                        value={propertySourceOptions.find((o) => o.value === propertySource) ?? null}
                        onChange={(_, next) => {
                          setPropertySource(next?.value ?? '');
                          clearFieldError('propertySource');
                        }}
                        getOptionLabel={(o) => o.label}
                        isOptionEqualToValue={(a, b) => a.value === b.value}
                        filterOptions={(options, { inputValue }) => {
                          const q = inputValue.trim().toLowerCase();
                          if (!q) return options;
                          return options.filter(
                            (o) =>
                              o.label.toLowerCase().includes(q) ||
                              o.value.toLowerCase().includes(q),
                          );
                        }}
                        popupIcon={<KeyboardArrowDownOutlined sx={{ fontSize: 16, color: '#6A6A70' }} />}
                        slotProps={{
                          paper: {
                            sx: {
                              borderRadius: '8px',
                              mt: 0.5,
                              boxShadow: '0px 8px 24px rgba(15, 23, 42, 0.12)',
                            },
                          },
                          listbox: {
                            sx: {
                              py: 0.5,
                              '& .MuiAutocomplete-option': {
                                fontSize: 12,
                                lineHeight: '18px',
                                minHeight: 36,
                                py: 1,
                                px: 1.5,
                              },
                            },
                          },
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="propertySource"
                            size="small"
                            placeholder="Select property source"
                            error={Boolean(fieldErrors.propertySource)}
                            helperText={fieldErrors.propertySource}
                            sx={figmaTextFieldSx}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={0.75} sx={{ width: '100%' }}>
                      <Typography sx={figmaLabelSx}>
                        Company
                        <RequiredAsterisk />
                      </Typography>
                      <Autocomplete
                        options={companyDirectory}
                        getOptionLabel={(o) => o.name}
                        isOptionEqualToValue={(a, b) => a.name === b.name}
                        openOnFocus
                        filterOptions={(options, { inputValue }) => {
                          const q = inputValue.trim().toLowerCase();
                          if (!q) return options;
                          return options.filter((o) => o.name.toLowerCase().includes(q));
                        }}
                        value={companyDirectory.find((c) => c.name === companyName) ?? null}
                        onChange={(_, next) => {
                          if (next) {
                            applyMockCompany(next);
                            return;
                          }
                          clearCompanyDetails();
                        }}
                        popupIcon={<KeyboardArrowDownOutlined sx={{ fontSize: 16, color: '#6A6A70' }} />}
                        slots={{ paper: CompanyNameDropdownPaper }}
                        slotProps={{
                          paper: {
                            onCreateCompany: () => setCreateCompanyModalOpen(true),
                          } as CompanyNamePaperProps,
                          listbox: {
                            sx: {
                              py: 0.5,
                              maxHeight: 220,
                              '& .MuiAutocomplete-option': {
                                fontSize: 12,
                                lineHeight: '18px',
                                minHeight: 36,
                                py: 1,
                                px: 1.5,
                              },
                            },
                          },
                        }}
                        renderOption={(props, option) => {
                          const { key, ...optionProps } = props;
                          return (
                            <Box
                              component="li"
                              key={key}
                              {...optionProps}
                              sx={{
                                px: 1.5,
                                py: 1,
                                fontSize: 12,
                                lineHeight: '18px',
                                color: '#262527',
                              }}
                            >
                              {option.name}
                            </Box>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="companyName"
                            size="small"
                            placeholder="Select company"
                      error={Boolean(fieldErrors.companyName)}
                      helperText={fieldErrors.companyName}
                            sx={figmaTextFieldSx}
                    />
                        )}
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={0.75} sx={{ width: '100%' }}>
                      <Typography sx={figmaLabelSx}>Associated Franchise</Typography>
                      <Autocomplete
                        options={franchiseAssociationOptions}
                        value={franchiseAssociationOptions.find((o) => o.value === franchiseAssociation) ?? null}
                        onChange={(_, next) => setFranchiseAssociation(next?.value ?? '')}
                        getOptionLabel={(o) => o.label}
                        isOptionEqualToValue={(a, b) => a.value === b.value}
                        filterOptions={(options, { inputValue }) => {
                          const q = inputValue.trim().toLowerCase();
                          if (!q) return options;
                          return options.filter(
                            (o) =>
                              o.label.toLowerCase().includes(q) ||
                              o.value.toLowerCase().includes(q),
                          );
                        }}
                        popupIcon={<KeyboardArrowDownOutlined sx={{ fontSize: 16, color: '#6A6A70' }} />}
                        slotProps={{
                          paper: {
                            sx: {
                              borderRadius: '8px',
                              mt: 0.5,
                              boxShadow: '0px 8px 24px rgba(15, 23, 42, 0.12)',
                            },
                          },
                          listbox: {
                            sx: {
                              py: 0.5,
                              '& .MuiAutocomplete-option': {
                                fontSize: 12,
                                lineHeight: '18px',
                                minHeight: 36,
                                py: 1,
                                px: 1.5,
                              },
                            },
                          },
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="franchiseAssociation"
                            size="small"
                            placeholder="Select associated franchise"
                            sx={figmaTextFieldSx}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={0.75} sx={{ width: '100%' }}>
                      <Typography sx={figmaLabelSx}>
                        Industry Vertical
                        <RequiredAsterisk />
                      </Typography>
                      <Autocomplete
                        options={industryVerticalOptions}
                        value={
                          industryVerticalOptions.find((o) => o.value === industryVertical) ?? null
                        }
                        onChange={(_, next) => {
                          setIndustryVertical(next?.value ?? '');
                        clearFieldError('industryVertical');
                      }}
                        getOptionLabel={(o) => o.label}
                        isOptionEqualToValue={(a, b) => a.value === b.value}
                        openOnFocus
                        filterOptions={(options, { inputValue }) => {
                          const q = inputValue.trim().toLowerCase();
                          if (!q) return options;
                          return options.filter((o) => o.label.toLowerCase().includes(q));
                        }}
                        popupIcon={<KeyboardArrowDownOutlined sx={{ fontSize: 16, color: '#6A6A70' }} />}
                        slotProps={{
                          paper: {
                            sx: {
                              borderRadius: '8px',
                              mt: 0.5,
                              boxShadow: '0px 8px 24px rgba(15, 23, 42, 0.12)',
                            },
                          },
                          listbox: {
                            sx: {
                              py: 0.5,
                              '& .MuiAutocomplete-option': {
                                fontSize: 12,
                                lineHeight: '18px',
                                minHeight: 36,
                                py: 1,
                                px: 1.5,
                              },
                            },
                          },
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="industryVertical"
                            size="small"
                            placeholder="Select industry vertical"
                      error={Boolean(fieldErrors.industryVertical)}
                      helperText={fieldErrors.industryVertical}
                            sx={figmaTextFieldSx}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                </Grid>
                <Stack spacing={0.75} sx={{ width: '100%', mt: 2 }}>
                  <Typography sx={figmaLabelSx}>
                    Affiliation
                    <RequiredAsterisk />
                  </Typography>
                  <Stack
                    direction="row"
                    sx={{
                      flexWrap: 'wrap',
                      alignItems: 'center',
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
                            '&&.MuiButton-outlined': {
                              border: selected ? '1.5px solid #2DA551' : '1px solid #E6E6E7',
                            },
                            '&&.MuiButton-outlined:hover': {
                              bgcolor: '#FFFFFF',
                              border: selected ? '1.5px solid #2DA551' : '1px solid #D0CFD2',
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

              <FormSection id="section-property-occupancy" title="Property Occupancy">
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={0.75} sx={{ width: '100%' }}>
                      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                        <Typography sx={figmaLabelSx}>Company at Property - Till Date</Typography>
                        <Tooltip
                          title="On the Company at Property - Till Date, the selected company is dissociated from this property. A company with active contracts cannot be dissociated; close or complete them first"
                          arrow
                          placement="bottom"
                        slotProps={{
                            tooltip: {
                              sx: {
                                bgcolor: '#000000',
                                color: '#FFFFFF',
                                fontSize: 13,
                                fontWeight: 500,
                                lineHeight: '18px',
                                maxWidth: 320,
                                px: 1.5,
                                py: 1.25,
                                borderRadius: '8px',
                              },
                            },
                            arrow: { sx: { color: '#000000' } },
                          }}
                        >
                          <InfoOutlined sx={{ fontSize: 16, color: '#86868B', cursor: 'help' }} />
                        </Tooltip>
                      </Stack>
                      <DatePicker
                        value={createCompanyTillDate}
                        onChange={setCreateCompanyTillDate}
                        format="MM/DD/YYYY"
                        slots={{ openPickerIcon: CalendarTodayOutlined }}
                        slotProps={{
                          textField: { size: 'small', fullWidth: true, sx: figmaTextFieldSx },
                          openPickerIcon: { sx: { color: '#6A6A70', fontSize: 14 } },
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={0.75} sx={{ width: '100%' }}>
                      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                        <Typography sx={figmaLabelSx}>Floor</Typography>
                        <Tooltip
                          title="The floor, suite, unit or apartment for this company. Cannot occupy the same space as another company"
                          arrow
                          placement="bottom"
                          slotProps={{
                            tooltip: {
                              sx: {
                                bgcolor: '#000000',
                                color: '#FFFFFF',
                                fontSize: 13,
                                fontWeight: 500,
                                lineHeight: '18px',
                                maxWidth: 280,
                                px: 1.5,
                                py: 1.25,
                                borderRadius: '8px',
                              },
                            },
                            arrow: { sx: { color: '#000000' } },
                          }}
                        >
                          <InfoOutlined sx={{ fontSize: 16, color: '#86868B', cursor: 'help' }} />
                        </Tooltip>
                      </Stack>
                      <TextField
                        name="propertyOccupancyFloor"
                        size="small"
                        fullWidth
                        placeholder="5 or 1,3-5"
                        value={createCompanyFloor}
                        onChange={(e) => setCreateCompanyFloor(e.target.value)}
                        sx={figmaTextFieldSx}
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={0.75} sx={{ width: '100%' }}>
                      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                        <Typography sx={figmaLabelSx}>Suite / Unit / Apartment</Typography>
                        <Tooltip
                          title="The floor, suite, unit or apartment for this company. Cannot occupy the same space as another company"
                          arrow
                          placement="bottom"
                          slotProps={{
                            tooltip: {
                              sx: {
                                bgcolor: '#000000',
                                color: '#FFFFFF',
                                fontSize: 13,
                                fontWeight: 500,
                                lineHeight: '18px',
                                maxWidth: 280,
                                px: 1.5,
                                py: 1.25,
                                borderRadius: '8px',
                              },
                            },
                            arrow: { sx: { color: '#000000' } },
                          }}
                        >
                          <InfoOutlined sx={{ fontSize: 16, color: '#86868B', cursor: 'help' }} />
                        </Tooltip>
                      </Stack>
                  <Box
                    sx={{
                      display: 'flex',
                          alignItems: 'center',
                          height: 37,
                          border: '1px solid #E6E6E7',
                          borderRadius: '8px',
                          bgcolor: '#FFFFFF',
                          overflow: 'hidden',
                          '& .MuiOutlinedInput-notchedOutline': { border: 'none !important' },
                        }}
                      >
                        <TextField
                          select
                          name="propertyOccupancySpaceType"
                          value={createCompanySpaceType}
                          onChange={(e) => setCreateCompanySpaceType(e.target.value)}
                          size="small"
                      sx={{
                            width: 108,
                        flexShrink: 0,
                            '& .MuiInputBase-input': { fontSize: 12, lineHeight: '18px', py: 0 },
                          }}
                          slotProps={{
                            select: { IconComponent: FieldSelectChevronIcon },
                          }}
                        >
                          {['Suite', 'Unit', 'Apartment'].map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                          ))}
                        </TextField>
                        <Box sx={{ width: '1px', height: 20, bgcolor: '#E6E6E7', flexShrink: 0 }} />
                        <TextField
                          name="propertyOccupancySpaceId"
                          size="small"
                          fullWidth
                          placeholder="210B or 210B,212B"
                          value={createCompanySpaceId}
                          onChange={(e) => setCreateCompanySpaceId(e.target.value)}
                        sx={{
                            '& .MuiInputBase-input': { fontSize: 12, lineHeight: '18px', py: 0, px: 1.25 },
                            '& .MuiInputBase-input::placeholder': { color: '#CCCCCC', opacity: 1, WebkitTextFillColor: '#CCCCCC' },
                          }}
                        />
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </FormSection>

              <FormSection
                id="section-contacts"
                title="Contact Details"
                titleEnd={
                  <Button
                    type="button"
                    variant="text"
                    startIcon={<AddOutlined sx={{ fontSize: 16 }} />}
                    onClick={() => setCreateContactModalOpen(true)}
                          sx={{
                      color: '#2DA551',
                      textTransform: 'none',
                      fontSize: 14,
                              fontWeight: 500,
                      lineHeight: '20px',
                      px: 1,
                      py: 0.5,
                      minWidth: 0,
                      bgcolor: 'transparent',
                      '&:hover': { bgcolor: 'rgba(45, 165, 81, 0.08)', color: '#248A44' },
                    }}
                  >
                    Create New
                  </Button>
                }
              >
                <Stack spacing={1.5}>
                      {CONTACT_ROLE_ROWS.map((row) => {
                    const selectedIds = contactUserByRole[row.id] ?? [];
                    const selectedUsers = contactDirectory.filter((u) => selectedIds.includes(u.id));
                    const showError = row.id === 'decision_maker' && Boolean(fieldErrors.decisionMakerContacts);
                        return (
                      <Stack
                            key={row.id}
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1.5}
                        sx={{ alignItems: { xs: 'stretch', sm: 'flex-start' } }}
                      >
                        <Chip
                          label={row.label}
                            sx={{
                            alignSelf: { xs: 'flex-start', sm: 'center' },
                            minWidth: { sm: 140 },
                            height: 28,
                            borderRadius: '16px',
                            bgcolor: row.bg,
                            color: row.color,
                            fontSize: 12,
                            fontWeight: 600,
                            '& .MuiChip-label': { px: 1.5 },
                          }}
                        />
                        <Autocomplete
                          className="contact-role-field"
                          multiple
                          disableCloseOnSelect
                          options={contactDirectory}
                          value={selectedUsers}
                          onChange={(_, next) =>
                            handleContactRoleUsersChange(
                              row.id,
                              next.map((u) => u.id),
                            )
                          }
                          getOptionLabel={(o) => o.name}
                          isOptionEqualToValue={(a, b) => a.id === b.id}
                          filterOptions={(options, { inputValue }) => {
                            const q = inputValue.trim().toLowerCase();
                            if (!q) return options;
                            return options.filter(
                              (o) =>
                                o.name.toLowerCase().includes(q) ||
                                o.email.toLowerCase().includes(q),
                            );
                          }}
                          popupIcon={<KeyboardArrowDownOutlined sx={{ fontSize: 16, color: '#6A6A70' }} />}
                          sx={{ flex: 1, minWidth: 0 }}
                          slotProps={{
                            paper: {
                              sx: {
                                borderRadius: '8px',
                                mt: 0.5,
                                boxShadow: '0px 8px 24px rgba(15, 23, 42, 0.12)',
                              },
                            },
                          }}
                          renderValue={(value, getItemProps) =>
                            (value as ContactDirectoryUser[]).map((option, index) => {
                              const { key, ...tagProps } = getItemProps({ index });
                                      return (
                                <Chip
                                  key={key}
                                  {...tagProps}
                                  size="small"
                                  avatar={<Avatar src={option.avatar} alt={option.name} />}
                                  label={option.name}
                                  sx={{
                                    height: 26,
                                    bgcolor: '#F5F5F6',
                                    '& .MuiChip-label': { fontSize: 12, fontWeight: 500 },
                                    '& .MuiChip-avatar': { width: 18, height: 18 },
                                  }}
                                />
                              );
                            })
                          }
                          renderOption={(props, option) => {
                            const { key, ...optionProps } = props;
                                    return (
                              <Box
                                component="li"
                                key={key}
                                {...optionProps}
                                  sx={{
                                  display: 'flex !important',
                                  alignItems: 'center',
                                  gap: 1.25,
                                  px: 1.5,
                                  py: 1,
                                }}
                              >
                                <Avatar src={option.avatar} alt={option.name} sx={{ width: 28, height: 28 }} />
                                <Box sx={{ minWidth: 0 }}>
                                  <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#262527', lineHeight: '18px' }}>
                                    {option.name}
                                  </Typography>
                                  <Typography sx={{ fontSize: 11, color: '#86868B', lineHeight: '16px' }}>
                                    {option.email}
                                    </Typography>
                                  </Box>
                          </Box>
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name={`contactRole_${row.id}`}
                              placeholder={selectedUsers.length ? 'Add contact' : `Select ${row.label.toLowerCase()} contacts`}
                              size="small"
                              variant="outlined"
                              error={showError}
                              helperText={showError ? fieldErrors.decisionMakerContacts : undefined}
                              sx={[
                                figmaTextFieldSx,
                                {
                                  '& .MuiOutlinedInput-root': {
                                    minHeight: 37,
                                    py: 0,
                                    alignItems: 'center',
                                  },
                                },
                              ]}
                            />
                          )}
                        />
                      </Stack>
                        );
                      })}
                </Stack>
              </FormSection>

              <FormSection id="section-contract" title="Contract Details">
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledDatePicker
                      name="contractStartDate"
                      label="Contract Start Date"
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
                      label="Service Start Date"
                      required
                      placeholder="Select service start date"
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
                <Stack spacing={0.5} sx={{ mt: 1.5, alignItems: 'flex-start' }}>
                <FormControlLabel
                  sx={{ m: 0, alignItems: 'center' }}
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
                      sx={{ px: 0, mr: 0.5 }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: 14, lineHeight: '20px', color: '#262527' }}>
                      Service Start Same As Contract Start Date
                    </Typography>
                  }
                />
                <FormControlLabel
                  sx={{ m: 0, alignItems: 'center' }}
                  control={
                    <Checkbox
                      size="small"
                      checked={firstInstallOnServiceDate}
                      onChange={(_, checked) => setFirstInstallOnServiceDate(checked)}
                      sx={{ px: 0, mr: 0.5 }}
                    />
                  }
                  label={
                    <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                      <Typography sx={{ fontSize: 14, lineHeight: '20px', color: '#262527' }}>
                        First Install On Service Date
                      </Typography>
                      <Tooltip
                        title="The first install will be performed on the service date and won't be grouped into a harmonized route. Later visits of contract are harmonized as usual."
                        arrow
                        placement="bottom"
                        slotProps={{
                          tooltip: {
                            sx: {
                              bgcolor: '#000000',
                              color: '#FFFFFF',
                              fontSize: 13,
                              fontWeight: 500,
                              lineHeight: '18px',
                              maxWidth: 280,
                              px: 1.5,
                              py: 1.25,
                              borderRadius: '8px',
                            },
                          },
                          arrow: { sx: { color: '#000000' } },
                        }}
                      >
                        <InfoOutlined sx={{ fontSize: 18, color: '#17B26A', cursor: 'help' }} />
                      </Tooltip>
                    </Stack>
                  }
                />
                </Stack>
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
                    <Typography sx={{ fontSize: 14, lineHeight: '20px', color: '#262527' }}>Repeat Every</Typography>
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
                    <Typography sx={{ fontSize: 14, lineHeight: '20px', color: '#262527' }}>Month</Typography>
                  </Stack>
                </Stack>
              </FormSection>

              <FormSection id="section-products" title="Add Products">
                <Stack sx={{ width: '100%', maxWidth: 960, mx: 'auto', gap: 2 }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
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
                    <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '24px', color: '#262527' }}>
                      Flat Rate
                      </Typography>
                    {flatRateEnabled ? (
                      <>
                        <Typography sx={{ fontSize: 14, fontWeight: 500, lineHeight: '24px', color: '#262527', pl: 0.5 }}>
                          {flatRateFilterCount} Filters
                        </Typography>
                        <Typography sx={{ fontSize: 14, lineHeight: '24px', color: '#262527' }}>×</Typography>
                        <TextField
                          className="flat-rate-field"
                          size="small"
                          value={flatRateAmount}
                          onChange={(e) => setFlatRateAmount(e.target.value)}
                          sx={{
                            width: 88,
                            '& .MuiOutlinedInput-root': {
                              height: 27,
                              minHeight: 27,
                              borderRadius: '6px',
                              bgcolor: '#FFFFFF',
                              '& fieldset': { borderColor: '#E6E6E7' },
                            },
                            '& .MuiInputBase-input': { fontSize: 12, lineHeight: '16px', py: 0, px: 0.5 },
                            '& .MuiInputAdornment-root': { height: 27, maxHeight: 27 },
                          }}
                          slotProps={{
                            htmlInput: { inputMode: 'decimal', 'aria-label': 'Flat rate' },
                            input: {
                              startAdornment: (
                                <InputAdornment position="start" sx={{ mr: 0.25, height: 27, maxHeight: 27 }}>
                                  <Box component="span" sx={{ fontSize: 12, lineHeight: '16px', color: '#262527' }}>
                                    $
                                  </Box>
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                        <Typography sx={{ fontSize: 14, lineHeight: '24px', color: '#262527' }}>=</Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '24px', color: '#262527' }}>
                          {flatRateTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </Typography>
                      </>
                    ) : null}
                  </Stack>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'stretch' }}>
                          {serviceProducts.map((p, pIdx) => {
                            const lineSub = parseMoneyInput(p.rate) * (parseInt(p.quantity, 10) || 0);
                            return (
                              <Box
                                key={p.id}
                                sx={{
                                  flex: '0 0 calc((100% - 24px) / 3)',
                                  maxWidth: 'calc((100% - 24px) / 3)',
                                  minWidth: 0,
                                  bgcolor: '#F6F6F8',
                                  border: '1px solid #E6E6E7',
                                  borderRadius: '12px',
                                  p: 1.5,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 1.25,
                                  boxSizing: 'border-box',
                                }}
                              >
                                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                  <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#86868B' }}>
                                    Product {String(pIdx + 1).padStart(2, '0')}
                                  </Typography>
                                  {serviceProducts.length > 1 ? (
                                    <IconButton
                                      type="button"
                                      size="small"
                                      aria-label="Remove product"
                                      onClick={() => removeServiceProduct(p.id)}
                                      sx={{ p: 0, color: '#E43F32' }}
                                    >
                                      <DeleteOutlineOutlined sx={{ fontSize: 18 }} />
                                    </IconButton>
                                  ) : null}
                                </Stack>
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
                                    sx={[figmaTextFieldSx, { '& .MuiOutlinedInput-root': { backgroundColor: '#FFFFFF' } }]}
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
                                          return (
                                            <Typography component="span" sx={{ fontSize: 12, lineHeight: '18px', color: '#262527' }}>
                                              {o?.label ?? v}
                                            </Typography>
                                          );
                                        },
                                      },
                                    }}
                                  >
                                    {productDimensionOptions.filter((o) => o.value !== '').map((o) => (
                                      <MenuItem key={o.value} value={o.value}>
                                        {o.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'flex-end' }}>
                                  <Stack spacing={0.75} sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography sx={figmaLabelSx}>Quantity</Typography>
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
                                      placeholder="1"
                                      error={Boolean((fieldErrors as Record<string, string>)[`product_${pIdx}_quantity`])}
                                      helperText={(fieldErrors as Record<string, string>)[`product_${pIdx}_quantity`]}
                                      sx={[figmaTextFieldSx, { '& .MuiOutlinedInput-root': { backgroundColor: '#FFFFFF' } }]}
                                      slotProps={{ htmlInput: { inputMode: 'numeric', 'aria-label': 'Quantity' } }}
                                    />
                                  </Stack>
                                  {flatRateEnabled ? null : (
                                  <Stack spacing={0.75} sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography sx={figmaLabelSx}>Rate</Typography>
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
                                      placeholder="0.00"
                                      error={Boolean((fieldErrors as Record<string, string>)[`product_${pIdx}_rate`])}
                                      helperText={(fieldErrors as Record<string, string>)[`product_${pIdx}_rate`]}
                                      sx={[
                                        figmaTextFieldSx,
                                        {
                                          '& .MuiOutlinedInput-root': { backgroundColor: '#FFFFFF' },
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
                                              <Box component="span" sx={{ fontSize: 12, lineHeight: '18px', fontWeight: 400, color: '#262527' }}>$</Box>
                                            </InputAdornment>
                                          ),
                                        },
                                      }}
                                    />
                                  </Stack>
                                  )}
                                  {flatRateEnabled ? null : (
                                  <Stack spacing={0.75} sx={{ flex: 1, minWidth: 0 }}>
                                      <Typography sx={figmaLabelSx}>Sub total</Typography>
                                      <Box sx={{ minHeight: 40, display: 'flex', alignItems: 'center' }}>
                                      <Typography sx={{ fontSize: 14, lineHeight: '20px', color: '#262527', fontVariantNumeric: 'tabular-nums' }}>
                                          {lineSub.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </Typography>
                                      </Box>
                                    </Stack>
                                  )}
                                </Stack>
                              </Box>
                            );
                          })}
                        <Button
                          type="button"
                          variant="outlined"
                          onClick={addServiceProduct}
                          sx={{
                            flex: '0 0 calc((100% - 24px) / 3)',
                            maxWidth: 'calc((100% - 24px) / 3)',
                            minWidth: 0,
                            minHeight: 180,
                            border: '1px solid #E6E6E7',
                            borderRadius: '12px',
                            textTransform: 'none',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                            px: 2,
                            py: 2,
                            bgcolor: '#FFFFFF',
                            color: 'inherit',
                            boxSizing: 'border-box',
                            '&:hover': { borderColor: '#D0CFD2', bgcolor: '#FAFAFA' },
                          }}
                        >
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              flexShrink: 0,
                              borderRadius: '50%',
                              bgcolor: '#E7F8EE',
                              display: 'grid',
                              placeItems: 'center',
                            }}
                          >
                            <AddOutlined sx={{ fontSize: 18, color: '#2DA551' }} />
                          </Box>
                          <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#262527', textAlign: 'center' }}>
                            Add Product
                          </Typography>
                          <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#86868B', textAlign: 'center', maxWidth: 160 }}>
                            Add more products in this service
                          </Typography>
                        </Button>
                    </Box>
                    {fieldErrors.serviceProducts ? (
                      <Typography variant="caption" color="error">
                        {fieldErrors.serviceProducts}
                      </Typography>
                    ) : null}
                </Stack>
              </FormSection>

              <FormSection id="section-billing" title="Billing And Payment Details">
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                      {(() => {
                        const plans = (
                          [
                            ['annually', 'Annually', 'year'],
                            ['semi_annually', 'Semi-Annually', '6 months'],
                            ['quarterly', 'Quarterly', 'quarter'],
                            ['monthly', 'Monthly', 'month'],
                          ] as const
                        ).map(([id, label, every]) => ({ id, label, every, ...billingPlanQuote(id) }));
                        const selectedPlan = plans.find((plan) => plan.id === billingFrequencyPlan) ?? plans[0];
                        const billingStart = nextPaymentDate ?? contractStartDate ?? dayjs('2026-04-01');
                        const startLabel = billingStart.format('MM/DD/YY');
                        const scheduleDates = [0, 1, 2, 3]
                          .map((step) => billingStart.add(step * 3, 'month').format('MM/DD/YY'))
                          .join(', ')
                          .replace(/, ([^,]+)$/, ', and $1');
                        const durationStart = contractStartDate ?? dayjs('2024-12-24');
                        const durationLabel = `${durationStart.format('MM/DD/YY')} - ${durationStart.add(2, 'year').add(6, 'day').format('MM/DD/YY')}`;
                        const money = (n: number) =>
                          n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
                        return (
                          <Box sx={{ bgcolor: '#F5F5F6', borderRadius: '12px', p: 2 }}>
                            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 1.5 }}>
                              <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#262527' }}>
                                Billing Frequency
                              </Typography>
                              <Box
                                sx={{
                                  bgcolor: '#FFFFFF',
                                  borderRadius: '16px',
                                  px: 1.25,
                                  py: 0.25,
                                  border: '1px solid #E6E6E7',
                                }}
                              >
                                <Typography sx={{ fontSize: 12, lineHeight: '18px', color: '#667085' }}>
                                  Contract Duration: {durationLabel}
                                </Typography>
                              </Box>
                            </Stack>
                            <Box
                              sx={{
                                display: 'inline-flex',
                                p: '3px',
                                mb: 1.5,
                                borderRadius: '8px',
                                bgcolor: '#FFFFFF',
                                border: '1px solid #E6E6E7',
                              }}
                            >
                              {(
                                [
                                  ['recurring', 'Recurring Plan'],
                                  ['at_service', 'At Service'],
                                ] as const
                              ).map(([id, label]) => {
                                const selected = billingPlanMode === id;
                                return (
                                  <Button
                                    key={id}
                                    type="button"
                                    disableRipple
                                    onClick={() => {
                                      setBillingPlanMode(id);
                                      if (id !== 'at_service' && paymentMethod === 'Check') {
                                        setPaymentMethod('Credit Card / ACH');
                                      }
                                    }}
                                    sx={{
                                      minWidth: 0,
                                      px: 1.75,
                                      py: 0.5,
                                      borderRadius: '8px',
                                      textTransform: 'none',
                                      fontSize: 14,
                                      fontWeight: 500,
                                      lineHeight: '20px',
                                      color: selected ? '#FFFFFF' : '#6A6A70',
                                      bgcolor: selected ? '#2DA551' : 'transparent',
                                      '&:hover': { bgcolor: selected ? '#248A44' : '#F8F8F9' },
                                    }}
                                  >
                                    {label}
                                  </Button>
                                );
                              })}
                            </Box>
                            {billingPlanMode === 'recurring' ? (
                              <>
                                <Box
                                  sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                                    gap: 2,
                                  }}
                                >
                                  {plans.map((plan) => {
                                    const selected = billingFrequencyPlan === plan.id;
                                    return (
                                      <Box
                                        key={plan.id}
                                        onClick={() => setBillingFrequencyPlan(plan.id)}
                                        sx={{
                                          textAlign: 'left',
                                          cursor: 'pointer',
                                          bgcolor: '#FFFFFF',
                                          border: '1px solid',
                                          borderColor: selected ? '#2DA551' : '#E6E6E7',
                                          borderRadius: '10px',
                                          px: 1.5,
                                          py: 1.25,
                                          display: 'flex',
                                          alignItems: 'flex-start',
                                          gap: 1,
                                        }}
                                      >
                                        <Radio
                                          checked={selected}
                                          size="small"
                                          tabIndex={-1}
                                          disableRipple
                                          sx={{
                                            p: 0,
                                            mt: '1px',
                                            pointerEvents: 'none',
                                            color: '#D0D5DD',
                                            '&.Mui-checked': { color: '#2DA551' },
                                          }}
                                        />
                                        <Stack spacing={0.25} sx={{ minWidth: 0 }}>
                                          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                                            <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: '20px', color: '#262527' }}>
                                              {plan.label}
                                            </Typography>
                                            {plan.off ? (
                                              <Box
                                                sx={{
                                                  px: 0.75,
                                                  py: 0.125,
                                                  borderRadius: '10px',
                                                  bgcolor: '#E7F8EE',
                                                  color: '#2DA551',
                                                  fontSize: 11,
                                                  fontWeight: 600,
                                                  lineHeight: '16px',
                                                }}
                                              >
                                                {plan.off}
                                              </Box>
                                            ) : null}
                                          </Stack>
                                          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'baseline' }}>
                                            {plan.compareAt ? (
                                              <Typography sx={{ fontSize: 11, lineHeight: '18px', color: '#98A2B3', textDecoration: 'line-through' }}>
                                                {money(plan.compareAt)}
                                              </Typography>
                                            ) : null}
                                            <Typography sx={{ fontSize: 12, fontWeight: 700, lineHeight: '20px', color: '#262527' }}>
                                              {money(plan.price)}
                                            </Typography>
                                          </Stack>
                                        </Stack>
                                      </Box>
                                    );
                                  })}
                                </Box>
                              </>
                            ) : null}
                            <Box
                              sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', md: 'calc((100% - 48px) / 4) calc((100% - 48px) / 4) auto' },
                                gap: 2,
                                alignItems: 'end',
                                mt: billingPlanMode === 'recurring' ? 2 : 0,
                              }}
                            >
                                  <Stack spacing={0.75}>
                                    <Typography sx={figmaLabelSx}>Discount</Typography>
                                    <Box
                                      ref={setDiscountFieldEl}
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'stretch',
                                        height: 37,
                                        border: '1px solid #E6E6E7',
                                        borderRadius: '8px',
                                        bgcolor: '#FFFFFF',
                                        overflow: 'hidden',
                                        '&:hover': { borderColor: '#D0CFD2' },
                                        '&:focus-within': { borderColor: '#6A6A70' },
                                      }}
                                    >
                                      <TextField
                                        variant="standard"
                                        placeholder="E.g., 10"
                                        value={billingDiscount}
                                        onChange={(e) => setBillingDiscount(e.target.value)}
                                        sx={{
                                          flex: 1,
                                          justifyContent: 'center',
                                          '& .MuiInputBase-root': { height: '100%', px: 1.5 },
                                          '& .MuiInputBase-input': { fontSize: 12, lineHeight: '18px', p: 0, color: '#262527' },
                                          '& .MuiInputBase-input::placeholder': { color: '#CCCCCC', opacity: 1, fontSize: 12, WebkitTextFillColor: '#CCCCCC' },
                                        }}
                                        slotProps={{ input: { disableUnderline: true } }}
                                      />
                                      <Divider orientation="vertical" flexItem sx={{ borderColor: '#E6E6E7', my: 1 }} />
                                      <TextField
                                        select
                                        variant="standard"
                                        value={billingDiscountUnit}
                                        onChange={(e) => setBillingDiscountUnit(e.target.value)}
                                        sx={{
                                          width: 140,
                                          justifyContent: 'center',
                                          '& .MuiInputBase-root': { height: '100%' },
                                          '& .MuiSelect-icon': { right: 7 },
                                          '& .MuiSelect-select': {
                                            fontSize: 12,
                                            fontWeight: 500,
                                            lineHeight: '18px',
                                            color: '#262527',
                                            py: 0,
                                            pl: 1.5,
                                            pr: '32px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            minHeight: '0 !important',
                                          },
                                        }}
                                        slotProps={{
                                          input: { disableUnderline: true },
                                          select: {
                                            IconComponent: FieldSelectChevronIcon,
                                            renderValue: (selected: unknown) => (selected === 'Amount' ? 'Amount' : 'Percentage'),
                                            MenuProps: {
                                              variant: 'menu',
                                              anchorEl: discountFieldEl ?? undefined,
                                              anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                                              transformOrigin: { vertical: 'top', horizontal: 'left' },
                                              slotProps: {
                                                paper: {
                                                  sx: {
                                                    mt: 0.5,
                                                    width: discountFieldEl ? `${discountFieldEl.offsetWidth}px !important` : undefined,
                                                    minWidth: discountFieldEl ? `${discountFieldEl.offsetWidth}px !important` : undefined,
                                                    borderRadius: '8px',
                                                    boxShadow: '0px 8px 24px rgba(16, 24, 40, 0.12)',
                                                    '& .MuiMenuItem-root': {
                                                      fontSize: 14,
                                                      fontWeight: 500,
                                                      lineHeight: '20px',
                                                      color: '#262527',
                                                      px: 2,
                                                      py: 1.25,
                                                    },
                                                    '& .MuiMenuItem-root.Mui-selected': {
                                                      bgcolor: '#EDF5EE',
                                                    },
                                                    '& .MuiMenuItem-root.Mui-selected:hover': {
                                                      bgcolor: '#EDF5EE',
                                                    },
                                                    '& .MuiMenuItem-root:hover': {
                                                      bgcolor: '#F5F5F6',
                                                    },
                                                    '& .MuiMenuItem-root.Mui-selected:hover, & .MuiMenuItem-root.Mui-selected.Mui-focusVisible': {
                                                      bgcolor: '#EDF5EE',
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        }}
                                      >
                                        <MenuItem value="Percentage">Percentage (%)</MenuItem>
                                        <MenuItem value="Amount">Amount ($)</MenuItem>
                                      </TextField>
                                    </Box>
                                  </Stack>
                                  <Stack spacing={0.75}>
                                    <Typography sx={figmaLabelSx}>Tax Rate (%)</Typography>
                                    <TextField
                                      size="small"
                                      placeholder="E.g., 10"
                                      value={billingTaxRate}
                                      onChange={(e) => setBillingTaxRate(e.target.value)}
                                      disabled={exemptTax}
                                      sx={[
                                        figmaTextFieldSx,
                                        {
                                          '& .MuiOutlinedInput-root:not(.Mui-disabled)': {
                                            backgroundColor: '#FFFFFF',
                                          },
                                          '& .MuiOutlinedInput-root.Mui-disabled': {
                                            backgroundColor: '#F5F5F6',
                                          },
                                        },
                                      ]}
                                    />
                                  </Stack>
                  <FormControlLabel
                                    sx={{ m: 0, mb: 0.5, alignItems: 'center' }}
                    control={
                      <Checkbox
                        size="small"
                                        checked={exemptTax}
                                        onChange={(_, checked) => setExemptTax(checked)}
                                        sx={{
                                          p: 0.5,
                                          color: '#D0D5DD',
                                          '&.Mui-checked': { color: '#2DA551' },
                        }}
                      />
                    }
                    label={
                                      <Typography sx={{ fontSize: 12, lineHeight: '20px', color: '#262527' }}>
                                        Exempt Tax
                      </Typography>
                    }
                  />
                                </Box>
                                {exemptTax ? (
                                  <Stack spacing={1.25} sx={{ mt: 1.5, alignItems: 'flex-start' }}>
                                    <Typography sx={{ fontSize: 12, lineHeight: '20px', color: '#262527' }}>
                                      Upload a valid legal document to verify your tax exemption eligibility
                                    </Typography>
                                    <Button
                                      type="button"
                                      variant="outlined"
                                      startIcon={<FileUploadOutlined sx={{ fontSize: 18 }} />}
                                      onClick={() => taxExemptionInputRef.current?.click()}
                                      sx={{
                                        borderColor: '#E6E6E7',
                                        color: '#262527',
                                        bgcolor: '#FFFFFF',
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontSize: 14,
                                        fontWeight: 500,
                                        lineHeight: '20px',
                                        px: 1.5,
                                        py: 0.75,
                                        '&:hover': { borderColor: '#D0D5DD', bgcolor: '#FFFFFF' },
                                      }}
                                    >
                                      Upload document
                                    </Button>
                                    <Box
                                      component="input"
                                      ref={taxExemptionInputRef}
                                      type="file"
                                      accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                                      aria-label="Upload tax exemption document"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        setTaxExemptionDocumentName(file?.name ?? '');
                                      }}
                                      sx={{ display: 'none' }}
                                    />
                                    {taxExemptionDocumentName ? (
                                      <Typography sx={{ fontSize: 12, lineHeight: '18px', color: '#667085' }}>
                                        {taxExemptionDocumentName}
                                      </Typography>
                                    ) : null}
                                  </Stack>
                                ) : null}
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{
                                    alignItems: 'flex-start',
                                    mt: 2,
                                    px: 1.5,
                                    py: 1.25,
                                    borderRadius: '8px',
                                    bgcolor: 'rgba(45, 165, 81, 0.1)',
                                  }}
                                >
                                  <InfoOutlined sx={{ fontSize: 18, color: '#2DA551', mt: '1px' }} />
                                  <Typography sx={{ fontSize: 13, lineHeight: '20px', color: '#344054' }}>
                                    {billingPlanMode === 'recurring' ? (
                                      <>
                                        Billing starts on <Box component="span" sx={{ fontWeight: 700, color: '#262527' }}>{startLabel}</Box>.
                                        {' '}You'll pay <Box component="span" sx={{ fontWeight: 700, color: '#262527' }}>{money(selectedPlan.price)}</Box> every {selectedPlan.every} in advance on {scheduleDates}. Billing ends after <Box component="span" sx={{ fontWeight: 700, color: '#262527' }}>4 payments</Box>
                                      </>
                                    ) : (
                                      <>
                                        Each job is billed at <Box component="span" sx={{ fontWeight: 700, color: '#262527' }}>$100</Box> after completion.
                                        {' '}You'll receive an invoice after every visit, and billing ends once all <Box component="span" sx={{ fontWeight: 700, color: '#262527' }}>12 visits</Box> are done.
                                      </>
                                    )}
                                  </Typography>
                                </Stack>
                          </Box>
                        );
                      })()}

                    <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#262527' }}>
                        Payment Terms
                    </Typography>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                          <Stack spacing={0.5}>
                            <Typography sx={{ ...figmaLabelSx, color: '#000000' }}>Auto Charge</Typography>
                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', minHeight: 36 }}>
                              <Typography sx={{ fontSize: 12, lineHeight: '16px', color: '#667085', flex: '1 1 auto' }}>
                                {billingPlanMode === 'recurring'
                                  ? 'Charge automatically on payment date'
                                  : 'Charge automatically after service completion'}
                              </Typography>
                              <Switch
                                checked={autoCharge}
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
                                    transitionDuration: '200ms',
                                    '&.Mui-checked': {
                                      transform: 'translateX(18px)',
                                      color: '#FFFFFF',
                                      '& + .MuiSwitch-track': {
                                        bgcolor: '#54A35A',
                                        opacity: 1,
                                      },
                                    },
                                  },
                                  '& .MuiSwitch-thumb': {
                                    width: 20,
                                    height: 20,
                                    bgcolor: '#FFFFFF',
                                    boxShadow: '0 1px 2px rgba(16, 24, 40, 0.15)',
                                  },
                                  '& .MuiSwitch-track': {
                                    borderRadius: 12,
                                    bgcolor: '#E6E6E7',
                                    opacity: 1,
                                  },
                                }}
                              />
                            </Stack>
                          </Stack>
                  </Grid>
                        {billingPlanMode === 'recurring' ? (
                  <Grid size={{ xs: 12, md: 4 }}>
                            <LabeledDatePicker
                              name="nextPaymentDate"
                              label="Next Payment Date"
                      required
                              placeholder="Select date"
                              value={nextPaymentDate}
                              onChange={setNextPaymentDate}
                    />
                  </Grid>
                        ) : null}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                            name="paymentMethod"
                            label="Payment Method"
                      required
                            placeholder="Select Payment Method"
                            value={paymentMethod}
                            onChange={setPaymentMethod}
                            select
                            disabled={autoCharge}
                            options={paymentMethodOptions}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                            name="paymentTerms"
                            label="Payment Terms"
                      required
                            placeholder="Select Payment Terms"
                            value={paymentTerms}
                            onChange={setPaymentTerms}
                            select
                            disabled={autoCharge}
                            options={paymentTermsOptions}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                          <LabeledField
                            name="annualRateIncrease"
                            label="Annual Rate Increase (%)"
                            required
                            placeholder="Enter %"
                            value={annualRateIncrease}
                            onChange={setAnnualRateIncrease}
                          />
                        </Grid>
                      </Grid>
                    </Stack>
                  </Grid>
                  <Grid size={12}>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#262527' }}>
                        Billing Address
                      </Typography>
                    <Stack spacing={0.75} sx={{ width: '100%' }}>
                      <Typography sx={figmaLabelSx}>
                          Contact
                          <RequiredAsterisk />
                      </Typography>
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          spacing={1.5}
                          sx={{ alignItems: { xs: 'stretch', sm: 'center' }, width: '100%', maxWidth: '100%' }}
                        >
                          <Autocomplete
                            options={contactDirectory}
                            value={contactDirectory.find((c) => c.id === billingContactId) ?? null}
                            onChange={(_, next) => setBillingContactId(next?.id ?? null)}
                            getOptionLabel={(o) => o.name}
                            isOptionEqualToValue={(a, b) => a.id === b.id}
                            popupIcon={<KeyboardArrowDownOutlined sx={{ fontSize: 16, color: '#6A6A70' }} />}
                            sx={{ width: { xs: '100%', sm: 'calc((100% - 32px) / 3)' }, flexShrink: 0 }}
                            renderOption={(props, option) => {
                              const { key, ...optionProps } = props;
                              return (
                                <Box
                                  component="li"
                                  key={key}
                                  {...optionProps}
                                  sx={{ display: 'flex !important', alignItems: 'center', gap: 1.25, px: 1.5, py: 1 }}
                                >
                                  <Avatar src={option.avatar} alt={option.name} sx={{ width: 28, height: 28 }} />
                                  <Box sx={{ minWidth: 0 }}>
                                    <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#262527', lineHeight: '18px' }}>
                                      {option.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: 11, color: '#86868B', lineHeight: '16px' }}>
                                      {option.email}
                                    </Typography>
                                  </Box>
                                </Box>
                              );
                            }}
                            renderInput={(params) => (
                      <TextField
                                {...params}
                        size="small"
                                placeholder="Select contact"
                                sx={figmaTextFieldSx}
                              />
                            )}
                          />
                          {billingContactId ? (
                            (() => {
                              const contact = contactDirectory.find((c) => c.id === billingContactId);
                              if (!contact) return null;
                              return (
                                <Box
                                  sx={{
                                    flex: 1,
                                    minWidth: 0,
                                      display: 'flex',
                                      alignItems: 'center',
                                    gap: 1,
                                    px: 1.5,
                                    py: 0.75,
                                    minHeight: 36,
                                    borderRadius: '8px',
                                    border: '1px solid #E6E6E7',
                                    bgcolor: '#F8F8F9',
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      flex: 1,
                                      minWidth: 0,
                                      fontSize: 12,
                                      lineHeight: '18px',
                                      color: '#444446',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                    }}
                                  >
                                    {contact.email}
                                    <Box component="span" sx={{ mx: 0.75, color: '#86868B' }}>
                                      ·
                                    </Box>
                                    {contact.phone}
                                  </Typography>
                                  <IconButton
                                    type="button"
                                    size="small"
                                    aria-label="Clear billing contact"
                                    onClick={() => setBillingContactId(null)}
                                    sx={{ color: '#6A6A70', p: 0.25 }}
                                  >
                                    <CloseOutlined sx={{ fontSize: 16 }} />
                                  </IconButton>
                                </Box>
                              );
                            })()
                          ) : null}
                    </Stack>
                      </Stack>

                        <FormControlLabel
                        sx={{
                          m: 0,
                          ml: 0,
                          alignItems: 'center',
                          gap: 1,
                          width: 'fit-content',
                          '& .MuiFormControlLabel-label': { pl: 0 },
                        }}
                          control={
                          <Checkbox
                              size="small"
                            checked={sameAsPropertyAddress}
                            onChange={(_, checked) => {
                              setSameAsPropertyAddress(checked);
                              if (!checked) {
                                setBillAddress('');
                                setBillCountry('');
                                setBillState('');
                                setBillCity('');
                                setBillZip('');
                              }
                            }}
                            sx={{
                              p: 0,
                              color: '#86868B',
                              '&.Mui-checked': { color: '#2DA551' },
                            }}
                            />
                          }
                          label={
                          <Typography sx={{ fontSize: 12, lineHeight: '18px', color: '#262527' }}>
                            Same As Property Address
                            </Typography>
                          }
                        />

                      {!sameAsPropertyAddress ? (
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                    <LabeledField
                      name="billAddress"
                      label="Address"
                      required
                            placeholder="Enter Address"
                      value={billAddress}
                      onChange={setBillAddress}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                            name="billCountry"
                            label="Country"
                      required
                            value={billCountry}
                            onChange={setBillCountry}
                            select
                            options={countryOptions}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                            name="billState"
                            label="State"
                      required
                            value={billState}
                            onChange={setBillState}
                      select
                            options={stateOptions}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                            name="billCity"
                            label="City"
                      required
                            value={billCity}
                            onChange={setBillCity}
                      select
                            options={cityOptions}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                            name="billZip"
                            label="Zip Code / Postal Code"
                      required
                            placeholder="Enter Zip Code"
                            value={billZip}
                            onChange={setBillZip}
                    />
                  </Grid>
                      </Grid>
                      ) : null}
                    </Stack>
                  </Grid>
                  {paymentMethod === 'Credit Card' || paymentMethod === 'Credit Card / ACH' ? (
                    <Grid size={12}>
                      <Button
                        type="button"
                        variant="outlined"
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
                            bgcolor: '#E7F8EE',
                            border: '1px solid #2DA551',
                            display: 'grid',
                            placeItems: 'center',
                          }}
                        >
                          <AddOutlined sx={{ fontSize: 14, color: '#2DA551' }} />
                        </Box>
                        <Typography sx={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#262527', textAlign: 'center' }}>
                        Add Payment Method
                        </Typography>
                      </Button>
                    </Grid>
                  ) : null}
                </Grid>
              </FormSection>

              <FormSection id="section-signee" title="Signee">
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Stack sx={{ minWidth: { xs: 560, sm: 640 }, gap: 2, alignItems: 'stretch' }}>
                    {signeeCards.length > 0 ? (
                    <Stack sx={{ gap: 1, width: '100%' }}>
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '260px 200px 220px auto 1fr',
                          columnGap: 2,
                          alignItems: 'start',
                          width: '100%',
                        }}
                      >
                        <Typography sx={{ color: '#86868B', fontSize: 12, fontWeight: 400, lineHeight: '20px' }}>Name</Typography>
                        <Typography sx={{ color: '#86868B', fontSize: 12, fontWeight: 400, lineHeight: '20px' }}>Title</Typography>
                        <Typography sx={{ color: '#86868B', fontSize: 12, fontWeight: 400, lineHeight: '20px' }}>Email</Typography>
                        <Typography sx={{ color: '#86868B', fontSize: 12, fontWeight: 400, lineHeight: '20px' }}>Signee</Typography>
                        <Box />
                      </Box>
                      <Stack sx={{ gap: 1.5, width: '100%' }}>
                        {signeeCards.map((s, sIdx) => (
                          <Stack key={s.id} sx={{ gap: 0 }}>
                            <Box
                              sx={{
                                display: 'grid',
                                gridTemplateColumns: '260px 200px 220px auto 1fr',
                                columnGap: 2,
                                alignItems: editingSigneeId === s.id ? 'end' : 'center',
                                width: '100%',
                              }}
                            >
                              {editingSigneeId === s.id ? (
                                <>
                                  <LabeledField
                                    name="editSigneeName"
                                    label={undefined}
                                    value={editingSigneeName}
                                    onChange={setEditingSigneeName}
                                    placeholder="Name"
                                  />
                                  <LabeledField
                                    name="editSigneeTitle"
                                    label={undefined}
                                    value={editingSigneeTitle}
                                    onChange={setEditingSigneeTitle}
                                    placeholder="Title"
                                  />
                                  <LabeledField
                                    name="editSigneeEmail"
                                    label={undefined}
                                    value={editingSigneeEmail}
                                    onChange={setEditingSigneeEmail}
                                    placeholder="Email"
                                  />
                                </>
                              ) : (
                                <>
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
                                    {s.title?.trim() ? s.title.trim() : s.role}
                                  </Typography>
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
                                    {s.email?.trim() ? s.email.trim() : 'dummy@signal.com'}
                                  </Typography>
                                </>
                              )}
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
                                  alignItems: editingSigneeId === s.id ? 'flex-start' : 'center',
                                  justifyContent: 'center',
                                  gap: 1.75,
                                  minWidth: 0,
                                }}
                              >
                                {editingSigneeId === s.id ? (
                                  <>
                                    <Tooltip title="Cancel" arrow>
                                      <IconButton
                                        type="button"
                                        size="small"
                                        aria-label="Cancel"
                                        onClick={() => {
                                          setEditingSigneeId(null);
                                          setEditingSigneeName('');
                                          setEditingSigneeEmail('');
                                          setEditingSigneeTitle('');
                                        }}
                                        sx={{ p: 0.5, color: '#6A6A70' }}
                                      >
                                        <CloseOutlined sx={{ fontSize: 18 }} />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Remove" arrow>
                                      <IconButton
                                        type="button"
                                        size="small"
                                        aria-label={`Remove ${s.name}`}
                                        onClick={() => {
                                          setSigneeCards((prev) => prev.filter((c) => c.id !== s.id));
                                          setEditingSigneeId(null);
                                          setEditingSigneeName('');
                                          setEditingSigneeEmail('');
                                          setEditingSigneeTitle('');
                                        }}
                                        sx={{ p: 0.5, color: '#B42318' }}
                                      >
                                        <DeleteOutlineOutlined sx={{ fontSize: 18 }} />
                                      </IconButton>
                                    </Tooltip>
                                    <Button
                                      type="button"
                                      variant="contained"
                                      size="small"
                                      onClick={() => {
                                        const name = editingSigneeName.trim();
                                        if (!name) {
                                          setSnackbar({ open: true, message: 'Please enter a name.', severity: 'error' });
                                          return;
                                        }
                                        const email = editingSigneeEmail.trim();
                                        const title = editingSigneeTitle.trim();
                                        setSigneeCards((prev) =>
                                          prev.map((c) =>
                                            c.id === s.id
                                              ? {
                                                  ...c,
                                                  name,
                                                  email: email || undefined,
                                                  title: title || undefined,
                                                }
                                              : c,
                                          ),
                                        );
                                        setEditingSigneeId(null);
                                        setEditingSigneeName('');
                                        setEditingSigneeEmail('');
                                        setEditingSigneeTitle('');
                                      }}
                                      sx={{
                                        textTransform: 'none',
                                        height: 36,
                                        minHeight: 36,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      Save
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <IconButton
                                      type="button"
                                      size="small"
                                      aria-label={`Edit ${s.name}`}
                                      sx={{ p: 0.5, color: '#6A6A70' }}
                                      onClick={() => {
                                        setEditingSigneeId(s.id);
                                        setEditingSigneeName(s.name);
                                        setEditingSigneeEmail(s.email ?? '');
                                        setEditingSigneeTitle(s.title ?? '');
                                      }}
                                    >
                                      <EditOutlined sx={{ fontSize: 16 }} />
                                    </IconButton>
                                    <Button
                                      type="button"
                                      variant="outlined"
                                      size="small"
                                      disableRipple
                                      startIcon={
                                        s.hasSignature
                                          ? <CheckOutlined sx={{ fontSize: 16, color: '#1A9E4A' }} />
                                          : <AddOutlined sx={{ fontSize: 16, color: '#6A6A70' }} />
                                      }
                                      onClick={() => {
                                        if (!s.hasSignature) {
                                          setSignContractModalSigneeId(s.id);
                                          setModalSignaturePreview(s.name);
                                        }
                                      }}
                                      sx={{
                                        height: 32,
                                        minHeight: 32,
                                        px: 1,
                                        py: 1,
                                        borderRadius: '8px',
                                        borderColor: s.hasSignature ? '#EDFAF3' : '#F5F5F6',
                                        bgcolor: s.hasSignature ? '#EDFAF3' : '#F5F5F6',
                                        color: s.hasSignature ? '#1A9E4A' : '#6A6A70',
                                        textTransform: 'none',
                                        fontSize: 14,
                                        fontWeight: 500,
                                        lineHeight: '20px',
                                        boxShadow: 'none',
                                        cursor: s.hasSignature ? 'default' : 'pointer',
                                        '&:hover': {
                                          bgcolor: s.hasSignature ? '#EDFAF3' : '#EBEBED',
                                          borderColor: s.hasSignature ? '#EDFAF3' : '#EBEBED',
                                        },
                                      }}
                                    >
                                      {s.hasSignature ? 'Signed' : 'Add Sign'}
                                    </Button>
                                  </>
                                )}
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
                    {addSigneeRowOpen ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 2,
                          alignItems: 'flex-end',
                          width: '100%',
                        }}
                      >
                        <Box sx={{ width: 260, flexShrink: 0 }}>
                          <LabeledField
                            name="newSigneeName"
                            label="Name"
                            value={newSigneeName}
                            onChange={setNewSigneeName}
                            placeholder="Name"
                          />
                        </Box>
                        <Box sx={{ width: 200, flexShrink: 0 }}>
                          <LabeledField
                            name="newSigneeTitle"
                            label="Title"
                            value={newSigneeTitle}
                            onChange={setNewSigneeTitle}
                            placeholder="Title"
                          />
                        </Box>
                        <Box sx={{ width: 220, flexShrink: 0 }}>
                          <LabeledField
                            name="newSigneeEmail"
                            label="Email"
                            value={newSigneeEmail}
                            onChange={setNewSigneeEmail}
                            placeholder="Email"
                          />
                        </Box>
                        <Box sx={{ flex: '1 1 auto', display: 'flex', justifyContent: 'flex-end' }}>
                          <Button
                            type="button"
                            size="medium"
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              const name = newSigneeName.trim();
                              const email = newSigneeEmail.trim();
                              const title = newSigneeTitle.trim();
                              if (!name) {
                                setSnackbar({ open: true, message: 'Please enter a name.', severity: 'error' });
                                return;
                              }
                              setSigneeCards((prev) => [
                                ...prev,
                                {
                                  id: `s${Date.now()}`,
                                  name,
                                  role: 'Client',
                                  title: title || undefined,
                                  email: email || undefined,
                                },
                              ]);
                              setAddSigneeRowOpen(false);
                              setNewSigneeName('');
                              setNewSigneeEmail('');
                              setNewSigneeTitle('');
                            }}
                            sx={{ textTransform: 'none' }}
                          >
                            Add contact
                          </Button>
                        </Box>
                      </Box>
                    ) : null}
                    <Button
                      type="button"
                      onClick={() => setAddSigneeRowOpen(true)}
                      variant="text"
                      disableRipple
                      startIcon={<AddOutlined sx={{ fontSize: 16, color: '#1A9E4A' }} />}
                      sx={{
                        alignSelf: 'flex-start',
                        py: 0.75,
                        px: 0,
                        minWidth: 0,
                        textTransform: 'none',
                        fontSize: 14,
                        fontWeight: 500,
                        lineHeight: '20px',
                        color: '#1A9E4A',
                        '&:hover': { bgcolor: 'transparent', color: '#158040' },
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
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'space-between' }}
            >
              {serviceProductsSubtotal > 0 && billingPlanMode === 'recurring' ? (
                <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start', minWidth: 0 }}>
                  <InfoOutlined sx={{ fontSize: 18, color: '#2DA551', mt: '1px' }} />
                  <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#262527' }}>
                    Billing starts on{' '}
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      {(nextPaymentDate ?? contractStartDate ?? dayjs('2026-04-01')).format('MM/DD/YY')}
                    </Box>
                    {' '}and you'll pay{' '}
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      ~
                      {billingPlanQuote(billingFrequencyPlan).price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </Box>
                    {' '}every{' '}
                    {{
                      annually: 'year',
                      semi_annually: '6 months',
                      quarterly: 'quarter',
                      monthly: 'month',
                    }[billingFrequencyPlan] ?? 'year'}
                    . Billing ends after <Box component="span" sx={{ fontWeight: 700 }}>4 payments</Box>
                  </Typography>
                </Stack>
              ) : (
                <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#262527' }}>
                  Total value: USD{' '}
                  {serviceProductsSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
              )}
            <Stack
              direction={{ xs: 'column-reverse', sm: 'row' }}
              spacing={1.5}
                sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'flex-end' }}
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
                          bgcolor: '#1A9E4A',
                          border: '1px solid #1A9E4A',
                          color: '#FFFFFF',
                          textTransform: 'none',
                          fontSize: 14,
                          fontWeight: 400,
                          lineHeight: '20px',
                          px: 1.75,
                          py: 1,
                          borderRadius: '8px',
                          boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                          '&:hover': { bgcolor: '#158040', borderColor: '#158040' },
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

            <Dialog
              open={createContactModalOpen}
              onClose={() => setCreateContactModalOpen(false)}
              maxWidth="md"
              fullWidth
              slotProps={{
                paper: {
                  sx: {
                    borderRadius: '12px',
                    border: '1px solid #E6E6E7',
                    boxShadow:
                      '0px 20px 24px -4px rgba(16, 24, 40, 0.10), 0px 8px 8px -4px rgba(16, 24, 40, 0.04)',
                    maxWidth: 780,
                  },
                },
              }}
            >
              <DialogContent sx={{ p: 0 }}>
                <Box sx={{ px: 4, pt: 3, pb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
                    <Stack sx={{ gap: 0.5, minWidth: 0 }}>
                      <Typography sx={{ fontSize: 20, fontWeight: 700, lineHeight: '28px', color: '#262527' }}>
                        Create a New Contact
                      </Typography>
                      <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#5B5B5F' }}>
                        Add the following information to create a new contact
                      </Typography>
                    </Stack>
                    <IconButton
                      aria-label="Close"
                      onClick={() => setCreateContactModalOpen(false)}
                      sx={{ color: '#5B5B5F' }}
                    >
                      <CloseOutlined sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Box>
                </Box>

                <Divider />

                <Box sx={{ px: 4, py: 3 }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <LabeledField
                        name="newContactEmail"
                        label="Email"
                        required
                        placeholder="Add email"
                        value={createContactEmail}
                        onChange={setCreateContactEmail}
                        htmlInput={{ autoComplete: 'email' }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <LabeledField
                        name="newContactFirstName"
                        label="First Name"
                        required
                        placeholder="First Name"
                        value={createContactFirstName}
                        onChange={setCreateContactFirstName}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <LabeledField
                        name="newContactLastName"
                        label="Last Name"
                        required
                        placeholder="Last Name"
                        value={createContactLastName}
                        onChange={setCreateContactLastName}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <LabeledField
                        name="newContactJobTitle"
                        label="Job Title"
                        required
                        placeholder="Job Title"
                        value={createContactJobTitle}
                        onChange={setCreateContactJobTitle}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={0.75} sx={{ width: '100%' }}>
                        <Typography sx={figmaLabelSx}>
                          Phone Number
                          <Box component="span" sx={{ color: '#B32318' }}>
                            {' '}
                            *
                          </Box>
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          placeholder="Contact#"
                          value={createContactPhoneNumber}
                          onChange={(e) => setCreateContactPhoneNumber(e.target.value)}
                          sx={[
                            figmaTextFieldSx,
                            {
                              '& .MuiOutlinedInput-root': { minHeight: 37, height: 37 },
                              '& .MuiInputAdornment-root': { mr: 0.75 },
                            },
                          ]}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start" sx={{ mr: 0.75 }}>
                                  <TextField
                                    select
                                    variant="standard"
                                    value={createContactCountryCode}
                                    onChange={(e) => setCreateContactCountryCode(e.target.value)}
                                    sx={{
                                      minWidth: 54,
                                      '& .MuiInputBase-root': {
                                        fontSize: 14,
                                        lineHeight: '24px',
                                      },
                                      '& .MuiInput-underline:before': { borderBottom: 'none' },
                                      '& .MuiInput-underline:after': { borderBottom: 'none' },
                                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                                      '& .MuiSelect-nativeInput': { width: 54 },
                                      '& .MuiSelect-select': {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.75,
                                        pr: '20px',
                                      },
                                      '& .MuiSelect-icon': {
                                        right: 4,
                                      },
                                    }}
                                    slotProps={{
                                      select: { IconComponent: FieldSelectChevronIcon },
                                    }}
                                  >
                                    <MenuItem value="+1">🇺🇸 +1</MenuItem>
                                    <MenuItem value="+44">🇬🇧 +44</MenuItem>
                                    <MenuItem value="+92">🇵🇰 +92</MenuItem>
                                    <MenuItem value="+91">🇮🇳 +91</MenuItem>
                                  </TextField>
                                </InputAdornment>
                              ),
                            },
                            htmlInput: { inputMode: 'tel', autoComplete: 'tel' },
                          }}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                <Box sx={{ px: 4, py: 2.5, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    type="button"
                    variant="outlined"
                    size="medium"
                    onClick={() => setCreateContactModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={() => {
                      const first = createContactFirstName.trim();
                      const last = createContactLastName.trim();
                      const email = createContactEmail.trim();
                      const phone = `${createContactCountryCode} ${createContactPhoneNumber.trim()}`.trim();
                      if (!first || !email || !createContactPhoneNumber.trim() || !createContactJobTitle.trim()) {
                        setSnackbar({ open: true, message: 'Please fill all required fields.', severity: 'error' });
                        return;
                      }
                      setContactDirectory((prev) => [
                        ...prev,
                        {
                          id: `contact_${Date.now()}`,
                          name: `${first}${last ? ` ${last}` : ''}`,
                          email,
                          phone,
                          avatar: createContractHeaderAvatar,
                        },
                      ]);
                      setCreateContactModalOpen(false);
                      setCreateContactEmail('');
                      setCreateContactFirstName('');
                      setCreateContactLastName('');
                      setCreateContactJobTitle('');
                      setCreateContactCountryCode('+1');
                      setCreateContactPhoneNumber('');
                      setSnackbar({ open: true, message: 'Contact created.', severity: 'success' });
                    }}
                  >
                    Create Contact
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>

            <Dialog
              open={createCompanyModalOpen}
              onClose={() => {
                setCreateCompanyModalOpen(false);
                resetCreateCompanyForm();
              }}
              maxWidth="md"
              fullWidth
              slotProps={{
                backdrop: {
                  sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                },
                paper: {
                  sx: {
                    borderRadius: '12px',
                    border: '1px solid #E6E6E7',
                    boxShadow:
                      '0px 20px 24px -4px rgba(16, 24, 40, 0.10), 0px 8px 8px -4px rgba(16, 24, 40, 0.04)',
                    maxWidth: 780,
                  },
                },
              }}
            >
              <DialogContent sx={{ p: 0 }}>
                <Box sx={{ px: 4, pt: 3, pb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
                    <Stack sx={{ gap: 0.5, minWidth: 0 }}>
                      <Typography sx={{ fontSize: 16, fontWeight: 700, lineHeight: '24px', color: '#262527' }}>
                        Create a New Company
                      </Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#5B5B5F' }}>
                        Add the following information to create a new company
                      </Typography>
                    </Stack>
                    <IconButton
                      aria-label="Close"
                      onClick={() => {
                        setCreateCompanyModalOpen(false);
                        resetCreateCompanyForm();
                      }}
                      sx={{ color: '#5B5B5F' }}
                    >
                      <CloseOutlined sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Box>
                </Box>

                <Divider />

                <Box sx={{ px: 4, py: 3 }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <LabeledField
                        name="newCompanyDomain"
                        label="Company Domain"
                        required={false}
                        placeholder="e.g., www.teamfiltergo.com"
                        value={createCompanyDomain}
                        onChange={setCreateCompanyDomain}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <LabeledField
                        name="newCompanyName"
                        label="Company Name"
                        required
                        placeholder="Add company name"
                        value={createCompanyName}
                        onChange={setCreateCompanyName}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <LabeledField
                        name="newCompanyMarketVertical"
                        label="Market Vertical"
                        required
                        select
                        options={industryVerticalOptions}
                        placeholder="Select market vertical"
                        value={createCompanyMarketVertical}
                        onChange={setCreateCompanyMarketVertical}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <LabeledField
                        name="newCompanyPartnershipStatus"
                        label="Strategic Partnership Status"
                        required={false}
                        select
                        options={partnershipStatusOptions}
                        placeholder="Select owner"
                        value={createCompanyPartnershipStatus}
                        onChange={setCreateCompanyPartnershipStatus}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <LabeledField
                        name="newCompanyEmployees"
                        label="No. Of Employees"
                        required={false}
                        placeholder="No. of employees"
                        value={createCompanyEmployees}
                        onChange={setCreateCompanyEmployees}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <LabeledField
                        name="newCompanyRevenue"
                        label="Revenue"
                        required={false}
                        placeholder="Add revenue"
                        value={createCompanyRevenue}
                        onChange={setCreateCompanyRevenue}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                <Box sx={{ px: 4, py: 2.5, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    type="button"
                    variant="outlined"
                    size="medium"
                    onClick={() => {
                      setCreateCompanyModalOpen(false);
                      resetCreateCompanyForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={() => {
                      const name = createCompanyName.trim();
                      const market = createCompanyMarketVertical.trim();
                      if (!name || !market) {
                        setSnackbar({ open: true, message: 'Please fill all required fields.', severity: 'error' });
                        return;
                      }
                      const company: MockCompany = {
                        name,
                        address: createCompanyDomain.trim() || 'Address pending',
                        industryVertical: market,
                      };
                      setCompanyDirectory((prev) => [...prev, company]);
                      applyMockCompany(company);
                      setCreateCompanyModalOpen(false);
                      resetCreateCompanyForm();
                      setSnackbar({ open: true, message: 'Company created.', severity: 'success' });
                    }}
                  >
                    Create Company
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>

            <AddressMapPickerModal
              open={addressMapModalOpen}
              value={propertyAddress}
              onClose={() => setAddressMapModalOpen(false)}
              onConfirm={() => {
                const mockAddress = MOCK_MAP_NEW_PROPERTY_ADDRESS;
                // New map property: fill Property Address only; clear all linked autofill.
                setPropertyAddress(mockAddress);
                setPropertyName('');
                setFranchiseAssociation('');
                setPropertySource('');
                setCompanyAffiliations([]);
                clearFieldError('propertyAddress');
                clearFieldError('propertyName');
                setPropertyDirectory((prev) => {
                  const entry: MockProperty = {
                    address: mockAddress,
                    propertyName: '',
                    franchiseAssociation: '',
                    propertySource: '',
                    affiliations: [],
                    companyName: companyName.trim(),
                  };
                  if (prev.some((p) => p.address === mockAddress)) {
                    return prev.map((p) => (p.address === mockAddress ? entry : p));
                  }
                  return [...prev, entry];
                });
              }}
            />
      </Box>
    </Box>
  );
}


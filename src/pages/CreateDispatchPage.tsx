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
  IconButton,
  InputAdornment,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  type PaperProps,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddOutlined from '@mui/icons-material/AddOutlined';
import ApartmentOutlined from '@mui/icons-material/ApartmentOutlined';
import CheckOutlined from '@mui/icons-material/CheckOutlined';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import ExploreOutlined from '@mui/icons-material/ExploreOutlined';
import GroupsOutlined from '@mui/icons-material/GroupsOutlined';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined';
import NotificationsNoneOutlined from '@mui/icons-material/NotificationsNoneOutlined';
import MapOutlined from '@mui/icons-material/MapOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import PublicOutlined from '@mui/icons-material/PublicOutlined';
import Refresh from '@mui/icons-material/Refresh';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import TaskAltOutlined from '@mui/icons-material/TaskAltOutlined';
import ViewKanbanOutlined from '@mui/icons-material/ViewKanbanOutlined';
import { AddressMapPickerModal } from '../components/createContract/AddressMapPickerModal';
import { FormSection } from '../components/createContract/FormSection';
import { useTheme } from '@mui/material/styles';
import type { Dayjs } from 'dayjs';
import { forwardRef, useCallback, useEffect, useMemo, useState, type InputHTMLAttributes } from 'react';
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
    '&:hover fieldset': { borderColor: '#D0CFD2' },
    '&.Mui-focused fieldset': { borderColor: '#6A6A70' },
  },
  '& .MuiInputBase-input': { fontSize: 12, lineHeight: '18px' },
  '& .MuiInputBase-input::placeholder': { color: '#CCCCCC', opacity: 1, fontSize: 12 },
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

const CONTACT_ROLE_ROWS = [
  { id: 'decision_maker', label: 'Decision Maker', color: '#9747FF', bg: '#F5EDFF' },
] as const;

const EMPTY_CONTACT_ROLE_SELECTIONS: Record<string, string[]> = {
  decision_maker: [],
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
  const [cycleReferenceDateInput, setCycleReferenceDateInput] = useState<Dayjs | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [paymentTerms, setPaymentTerms] = useState('');
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
    if ((contactUserByRole.decision_maker ?? []).length === 0) {
      e.decisionMakerContacts = 'Select at least one Decision Maker.';
    }
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

    setFieldErrors(e);
    return Object.keys(e).length === 0;
  }, [
    companyName,
    industryVertical,
    propertyAddress,
    propertyName,
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
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactUserByRole({ ...EMPTY_CONTACT_ROLE_SELECTIONS });
    setContactDirectory([...CONTACT_DIRECTORY_USERS]);
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
    setCycleReferenceDateInput(null);
    setPaymentMethod('Credit Card');
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
        cycleReferenceDate: cycleReferenceDateInput?.format('YYYY-MM-DD') ?? '',
        billingType,
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
              <FormSection title="Company & Property Details" showDivider={false}>
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

              <FormSection
                title="Contact Details"
                titleEnd={
                  <Button
                    type="button"
                    variant="text"
                    startIcon={<AddOutlined sx={{ fontSize: 16 }} />}
                    onClick={() => setCreateContactModalOpen(true)}
                    sx={{
                      color: '#146dff',
                      textTransform: 'none',
                      fontSize: 14,
                      fontWeight: 500,
                      lineHeight: '20px',
                      px: 1,
                      py: 0.5,
                      minWidth: 0,
                      bgcolor: 'transparent',
                      '&:hover': { bgcolor: 'rgba(20, 109, 255, 0.06)', color: '#0059FF' },
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
                                    minHeight: 40,
                                    py: 0.25,
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

              <FormSection title="Billing and Payment details">
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#262527' }}>
                        Payment details
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                          <LabeledDatePicker
                            name="cycleReferenceDate"
                            label="Cycle Reference Date"
                            required
                            placeholder="Select cycle reference date"
                            value={cycleReferenceDateInput}
                            onChange={setCycleReferenceDateInput}
                          />
                        </Grid>
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
                            onChange={(v) => { setPaymentMethod(v); }}
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
                          <Grid size={12}>
                            <Button
                              type="button"
                              variant="outlined"
                              fullWidth
                              startIcon={<AddOutlined />}
                              sx={{
                                height: 36,
                                minHeight: 36,
                                px: '14px',
                                py: 0,
                                fontSize: 14,
                                fontWeight: 500,
                                lineHeight: '20px',
                                color: '#444446',
                                textTransform: 'none',
                                borderRadius: '8px',
                                borderColor: '#E6E6E7',
                                gap: 1,
                                '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)', borderColor: '#E6E6E7' },
                              }}
                            >
                              Add Payment Method
                            </Button>
                          </Grid>
                        ) : null}
                      </Grid>
                    </Stack>
                  </Grid>
                  <Grid size={12}>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#262527' }}>
                        Billing Information
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
                              '&.Mui-checked': { color: '#146dff' },
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: 12, lineHeight: '18px', color: '#262527' }}>
                            Same as Property Address
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
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
                          Phone number
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
                              '& .MuiOutlinedInput-root': { minHeight: 36, height: 36 },
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
                        label="No. of Employees"
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


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
  Radio,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  type PaperProps,
  Snackbar,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddOutlined from '@mui/icons-material/AddOutlined';
import ApartmentOutlined from '@mui/icons-material/ApartmentOutlined';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import ExploreOutlined from '@mui/icons-material/ExploreOutlined';
import GroupsOutlined from '@mui/icons-material/GroupsOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined';
import EastOutlined from '@mui/icons-material/EastOutlined';
import NotificationsNoneOutlined from '@mui/icons-material/NotificationsNoneOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import MapOutlined from '@mui/icons-material/MapOutlined';
import DirectionsCarOutlined from '@mui/icons-material/DirectionsCarOutlined';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import PublicOutlined from '@mui/icons-material/PublicOutlined';
import Security from '@mui/icons-material/Security';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import CheckCircle from '@mui/icons-material/CheckCircle';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import TaskAltOutlined from '@mui/icons-material/TaskAltOutlined';
import ViewKanbanOutlined from '@mui/icons-material/ViewKanbanOutlined';
import { FormSection } from '../../components/createContract/FormSection';
import { AddressMapPickerModal } from '../../components/createContract/AddressMapPickerModal';
import { useTheme } from '@mui/material/styles';
import type { Dayjs } from 'dayjs';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type InputHTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
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

const FIELD_STROKE = '#E6E6E7';

const figmaTextFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: 'transparent',
    '& fieldset': { borderColor: FIELD_STROKE },
    '&:hover fieldset': { borderColor: FIELD_STROKE },
    '&.Mui-focused fieldset': { borderColor: FIELD_STROKE },
    '&.Mui-disabled fieldset': { borderColor: FIELD_STROKE },
    '&.Mui-disabled': { backgroundColor: '#F5F5F6' },
  },
  '& .MuiPickersOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: 'transparent',
    '& .MuiPickersOutlinedInput-notchedOutline': { borderColor: FIELD_STROKE, borderWidth: 1 },
    '&:hover .MuiPickersOutlinedInput-notchedOutline': { borderColor: FIELD_STROKE },
    '&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': { borderColor: FIELD_STROKE, borderWidth: 1 },
    '&.Mui-disabled .MuiPickersOutlinedInput-notchedOutline': { borderColor: FIELD_STROKE },
    '&.Mui-disabled': { backgroundColor: '#F5F5F6' },
  },
  '& .MuiInputBase-input': { fontSize: 12, lineHeight: '18px', fontWeight: 400 },
  '& .MuiPickersInputBase-sectionsContainer': { fontSize: 12, lineHeight: '18px', fontWeight: 400 },
  '& .MuiPickersInputBase-sectionContent': {
    fontSize: 12,
    lineHeight: '18px',
    fontWeight: 400,
  },
  '& .MuiPickersInputBase-sectionContent[aria-valuetext="Empty"]': {
    color: '#CCCCCC',
  },
  '& .MuiInputBase-input::placeholder': { color: '#CCCCCC', opacity: 1, fontSize: 12 },
  '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#86868B', color: '#86868B' },
  '& .MuiSelect-icon .MuiSvgIcon-root': { fontSize: 16 },
} as const;

const figmaLabelSx = { color: '#86868B', fontSize: 12, fontWeight: 500, lineHeight: '18px' } as const;

/** Default proposal time zone — Central Time (US & Canada). */
const DEFAULT_TIME_ZONE = 'America/Chicago';

const TIME_ZONE_LABELS: Record<string, string> = {
  UTC: '(UTC+00:00) Coordinated Universal Time',
  'America/New_York': '(UTC-05:00) Eastern Time (US & Canada)',
  'America/Chicago': '(UTC-06:00) Central Time (US & Canada)',
  'America/Denver': '(UTC-07:00) Mountain Time (US & Canada)',
  'America/Los_Angeles': '(UTC-08:00) Pacific Time (US & Canada)',
  'America/Phoenix': '(UTC-07:00) Arizona',
  'America/Anchorage': '(UTC-09:00) Alaska',
  'Pacific/Honolulu': '(UTC-10:00) Hawaii',
  'America/Toronto': '(UTC-05:00) Eastern Time - Toronto',
  'America/Mexico_City': '(UTC-06:00) Central Time - Mexico City',
  'America/Sao_Paulo': '(UTC-03:00) Brasilia',
  'Europe/London': '(UTC+00:00) Dublin, Edinburgh, Lisbon, London',
  'Europe/Paris': '(UTC+01:00) Brussels, Copenhagen, Madrid, Paris',
  'Europe/Berlin': '(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',
  'Europe/Madrid': '(UTC+01:00) Madrid',
  'Asia/Dubai': '(UTC+04:00) Abu Dhabi, Muscat',
  'Asia/Karachi': '(UTC+05:00) Islamabad, Karachi',
  'Asia/Kolkata': '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi',
  'Asia/Singapore': '(UTC+08:00) Kuala Lumpur, Singapore',
  'Asia/Tokyo': '(UTC+09:00) Osaka, Sapporo, Tokyo',
  'Asia/Shanghai': '(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi',
  'Australia/Sydney': '(UTC+10:00) Canberra, Melbourne, Sydney',
  'Pacific/Auckland': '(UTC+12:00) Auckland, Wellington',
};

function formatTimeZoneLabel(zone: string): string {
  return TIME_ZONE_LABELS[zone] ?? zone.replace(/_/g, ' ');
}

function RequiredAsterisk() {
  return (
    <Box component="span" sx={{ color: '#B32318' }}>
      {' '}
      *
    </Box>
  );
}

/** Contact directory for role assignments (Signal). */
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
  { id: 'end_user', label: 'End User', color: '#146dff', bg: '#E8F1FF' },
  { id: 'billing', label: 'Billing', color: '#2E964B', bg: '#EFF8EF' },
] as const;

const EMPTY_CONTACT_ROLE_SELECTIONS: Record<string, string[]> = {
  decision_maker: [],
  end_user: [],
  billing: [],
};

const FORM_PROGRESS_SECTIONS = [
  { id: 'section-company-property', label: 'Company & Property Details' },
  { id: 'section-proposal', label: 'Proposal Details' },
  { id: 'section-contacts', label: 'Contact Details' },
  { id: 'section-services', label: 'Services' },
  { id: 'section-on-demand', label: 'On Demand' },
  { id: 'section-billing', label: 'Billing & Payment Details' },
  { id: 'section-signee', label: 'Signee' },
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

type ProfitMetricRow = {
  label: string;
  amount: string;
  percent: string;
  bold?: boolean;
};

const PROFITABILITY_METRIC_ROWS: ProfitMetricRow[] = [
  { label: 'Total Revenue', amount: '$ 22,094', percent: '67%', bold: true },
  { label: 'Payroll', amount: '$ 12,834', percent: '12.83%' },
  { label: 'Overtime', amount: '--', percent: '--' },
  { label: 'Payroll Taxes', amount: '$ 1,283', percent: '1.28%' },
  { label: 'Total Officer Payroll', amount: '$ 14,117', percent: '14.12%' },
  { label: 'Overhead Payroll', amount: '$ 3,535', percent: '3.54%' },
  { label: 'Total Payroll', amount: '$ 31,720', percent: '31.72%', bold: true },
  { label: 'Gross profit', amount: '$ 26,983', percent: '26.98%', bold: true },
  { label: 'FAS Charges', amount: '$ 5,083', percent: '5.08%' },
  { label: 'Remaining Balances for Expenses', amount: '$ 3,883', percent: '3.88%', bold: true },
  { label: 'Vehicle Expenses', amount: '--', percent: '--' },
  { label: 'Administration Expenses', amount: '$ 983', percent: '0.98%' },
  { label: 'Payment Terms Adjustment', amount: '$ 362.24', percent: '0.36%' },
  { label: 'Net Profit', amount: '$ 2,559', percent: '2.56%', bold: true },
];

function ProfitabilityOverviewDrawer(props: {
  open: boolean;
  onClose: () => void;
  hourlyRate: string;
  onHourlyRateChange: (v: string) => void;
}) {
  const [billingCycle, setBillingCycle] = useState('Bi-Weekly');

  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={props.onClose}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        },
        paper: {
          sx: {
            width: { xs: '100%', sm: 560 },
            maxWidth: '100%',
            boxSizing: 'border-box',
            bgcolor: '#FFFFFF',
            boxShadow: '-8px 0 24px rgba(15, 23, 42, 0.12)',
          },
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
        <Box
          sx={{
            px: 3,
            pt: 2.5,
            pb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            flexShrink: 0,
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 700, lineHeight: '24px', color: '#262527' }}>
            Profitability Overview
          </Typography>
          <IconButton aria-label="Close profitability overview" onClick={props.onClose} sx={{ color: '#5B5B5F' }}>
            <CloseOutlined sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        <Box sx={{ px: 3, pb: 2, flexShrink: 0 }}>
          <LabeledField
            name="profitabilityHourlyRate"
            label="Hourly Rate ($)"
            required
            placeholder="Enter hourly rate"
            value={props.hourlyRate}
            onChange={props.onHourlyRateChange}
            htmlInput={{ inputMode: 'decimal' }}
          />
        </Box>

        <Box sx={{ px: 3, pb: 3, flexShrink: 0 }}>
          <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-around' }}>
            <Stack spacing={1} sx={{ alignItems: 'center', flex: 1, minWidth: 0 }}>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  position: 'relative',
                  background: 'conic-gradient(#B32318 0 10%, #E6E6E7 10% 100%)',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 88,
                    height: 88,
                    borderRadius: '50%',
                    bgcolor: '#FFFFFF',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: 22, fontWeight: 700, lineHeight: '28px', color: '#262527' }}>
                    10%
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#262527' }}>
                Net Profit
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: '#86868B' }}>
                Required &gt; 12%
              </Typography>
            </Stack>

            <Stack spacing={1} sx={{ alignItems: 'center', flex: 1, minWidth: 0 }}>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  position: 'relative',
                  background: 'conic-gradient(#B32318 0 67%, #E6E6E7 67% 100%)',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 88,
                    height: 88,
                    borderRadius: '50%',
                    bgcolor: '#FFFFFF',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: 22, fontWeight: 700, lineHeight: '28px', color: '#262527' }}>
                    67%
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#262527' }}>
                Labor Efficiency
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: '#86868B' }}>
                Required =&lt; 64%
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ px: 3, pb: 1.5, flexShrink: 0 }}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#262527' }}>
              Financial Metrics
            </Typography>
            <TextField
              select
              size="small"
              value={billingCycle}
              onChange={(e) => setBillingCycle(e.target.value)}
              variant="standard"
              sx={{
                minWidth: 150,
                '& .MuiInputBase-root': { fontSize: 12, color: '#6A6A70' },
                '& .MuiInput-underline:before': { borderBottom: 'none' },
                '& .MuiInput-underline:after': { borderBottom: 'none' },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                '& .MuiSelect-select': { py: 0.5, pr: '24px !important' },
              }}
              slotProps={{
                select: {
                  IconComponent: FieldSelectChevronIcon,
                  renderValue: (selected) => `Billing cycle: ${String(selected)}`,
                },
              }}
            >
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Bi-Weekly">Bi-Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </TextField>
          </Stack>
        </Box>

        <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', px: 3, pb: 3 }}>
          <Box
            sx={{
              border: '1px solid #E6E6E7',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            {PROFITABILITY_METRIC_ROWS.map((row, idx) => (
              <Box
                key={row.label}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 0.9fr) minmax(0, 0.7fr)',
                  columnGap: 1,
                  alignItems: 'center',
                  px: 1.5,
                  py: 1.25,
                  bgcolor: idx % 2 === 0 ? '#F8F8F9' : '#FFFFFF',
                  borderTop: idx === 0 ? 'none' : '1px solid #EFEFF0',
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: row.bold ? 600 : 400,
                    lineHeight: '18px',
                    color: '#262527',
                    minWidth: 0,
                  }}
                >
                  {row.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: row.bold ? 600 : 400,
                    lineHeight: '18px',
                    color: '#262527',
                    textAlign: 'right',
                  }}
                >
                  {row.amount}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: row.bold ? 600 : 400,
                    lineHeight: '18px',
                    color: '#6A6A70',
                    textAlign: 'right',
                  }}
                >
                  {row.percent}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Drawer>
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

/** Existing companies for Company Name autocomplete (mock). */
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

/** Default Signal service cards (Dedicated / Patrol). */
type ServiceKind = 'dedicated' | 'patrol';
type JobDay = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

const JOB_DAYS: JobDay[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const SIGNEE_TABLE_COLUMNS = 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) 88px';
const signeeColSx = { minWidth: 0, width: '100%' } as const;
const signeeHeaderSx = { color: '#86868B', fontSize: 12, fontWeight: 400, lineHeight: '20px' } as const;

/** Plain text by default; click to edit in place (no outlined input). */
function InlineEditableText(props: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  name?: string;
  emphasize?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editing) return;
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    el.select();
  }, [editing]);

  const textSx = {
    fontSize: 14,
    fontWeight: props.emphasize ? 500 : 400,
    lineHeight: '20px',
    color: props.emphasize ? '#262527' : '#6A6A70',
    fontFamily: 'inherit',
  } as const;

  if (editing) {
    return (
      <Box
        component="input"
        ref={inputRef}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)}
        onBlur={() => setEditing(false)}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter' || e.key === 'Escape') {
            e.preventDefault();
            setEditing(false);
          }
        }}
        sx={{
          ...textSx,
          width: '100%',
          minWidth: 0,
          minHeight: 20,
          m: 0,
          p: 0,
          border: 'none',
          outline: 'none',
          bgcolor: 'transparent',
          boxShadow: 'none',
          borderRadius: 0,
          '&::placeholder': { color: '#CCCCCC', opacity: 1 },
        }}
      />
    );
  }

  const display = props.value.trim();
  return (
    <Box
      role="button"
      tabIndex={0}
      aria-label={`Edit ${props.placeholder ?? 'field'}`}
      onClick={() => setEditing(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setEditing(true);
        }
      }}
      sx={{
        width: '100%',
        minWidth: 0,
        minHeight: 20,
        display: 'block',
        m: 0,
        p: 0,
        border: 'none',
        borderRadius: '4px',
        bgcolor: 'transparent',
        cursor: 'pointer',
        transition: 'background-color 120ms ease, box-shadow 120ms ease',
        '&:hover': {
          bgcolor: '#F5F5F6',
          boxShadow: 'inset 0 -1px 0 #D0CFD2',
        },
        '&:hover .inline-editable-text': {
          color: '#262527',
        },
        '&:focus-visible': {
          outline: 'none',
          bgcolor: '#F5F5F6',
          boxShadow: 'inset 0 -1px 0 #146dff',
        },
      }}
    >
      <Typography
        className="inline-editable-text"
        component="span"
        sx={{
          ...textSx,
          color: display ? textSx.color : '#CCCCCC',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'block',
          minWidth: 0,
          transition: 'color 120ms ease',
        }}
      >
        {display || props.placeholder || '—'}
      </Typography>
    </Box>
  );
}

type SignalServiceCard = {
  id: string;
  name: string;
  kind: ServiceKind;
  resourceType: string;
  invoiceLineItem: string;
  officerCount: string;
  hoursPerWeek: string;
  hourlyRate: string;
  jobDays: JobDay[];
  startTime: string;
  endTime: string;
  visitsPerWeek: string;
  pricePerVisit: string;
  timeOnPropertyMins: string;
  patrolVisitSets: {
    id: string;
    startTime: string;
    endTime: string;
    visitDays: JobDay[];
    visitsPerDay: string;
  }[];
};

type OnDemandItem = {
  id: string;
  kind: 'dispatch' | 'extra_job' | 'invoice_line';
  title: string;
  description: string;
  billingType: string;
  pricePerHour: string;
  rate: string;
  peakHours: string;
  /** Custom invoice line fields */
  lineTitle: string;
  invoiceLineItem: string;
  price: string;
  quantity: string;
  /** true while creating/editing a custom invoice line */
  isEditing: boolean;
};

const PROPERTY_BILLING_ADDRESS = {
  address: '412 N Broadway St',
  country: 'USA',
  state: 'Nebraska',
  city: 'Bloomfield',
  zip: '68718',
} as const;

const ON_DEMAND_BILLING_OPTIONS: UiOption[] = [
  { label: 'Not Included', value: 'Not Included' },
  { label: 'Flat-Rate', value: 'Flat-Rate' },
  { label: 'Charge Per Alarm', value: 'Charge Per Alarm' },
  { label: 'Non Billable', value: 'Non Billable' },
];

const ON_DEMAND_INVOICE_LINE_OPTIONS: UiOption[] = [
  { label: 'Sub Contractor', value: 'Sub Contractor' },
  { label: 'Dedicated Security Officer', value: 'Dedicated Security Officer' },
  { label: 'Roving Patrol Tours', value: 'Roving Patrol Tours' },
  { label: 'Mobile Patrol', value: 'Mobile Patrol' },
];

function createEmptySignalService(index: number): SignalServiceCard {
  return {
    id: `svc_${Date.now()}_${index}`,
    name: '',
    kind: 'dedicated',
    resourceType: '',
    invoiceLineItem: '',
    officerCount: '',
    hoursPerWeek: '',
    hourlyRate: '',
    jobDays: [],
    startTime: '',
    endTime: '',
    visitsPerWeek: '',
    pricePerVisit: '',
    timeOnPropertyMins: '',
    patrolVisitSets: [],
  };
}

function createOnDemandItem(index: number): OnDemandItem {
  return {
    id: `ondemand_${Date.now()}_${index}`,
    kind: 'invoice_line',
    title: `${index}. Invoice Line Item`,
    description: '',
    billingType: '',
    pricePerHour: '',
    rate: '',
    peakHours: '',
    lineTitle: '',
    invoiceLineItem: '',
    price: '',
    quantity: '',
    isEditing: true,
  };
}

const DEFAULT_SIGNAL_SERVICES: SignalServiceCard[] = [
  {
    ...createEmptySignalService(1),
    id: 'svc1',
  },
];

const DEFAULT_ON_DEMAND_ITEMS: OnDemandItem[] = [
  {
    id: 'ondemand_dispatch',
    kind: 'dispatch',
    title: '1. Dispatch Request',
    description: 'Dispatch refers to a direct service request or call initiated by the customer to the home office.',
    billingType: '',
    pricePerHour: '',
    rate: '',
    peakHours: '',
    lineTitle: '',
    invoiceLineItem: '',
    price: '',
    quantity: '',
    isEditing: false,
  },
  {
    id: 'ondemand_extra_job',
    kind: 'extra_job',
    title: '2. Extra Job',
    description: 'An extra job refers to the job generated on-the-fly in response to an immediate client request, outside the contract.',
    billingType: '',
    pricePerHour: '',
    rate: '',
    peakHours: '',
    lineTitle: '',
    invoiceLineItem: '',
    price: '',
    quantity: '',
    isEditing: false,
  },
];

const RESOURCE_TYPE_OPTIONS: UiOption[] = [
  { label: 'Dedicated Officer', value: 'Dedicated Officer' },
  { label: 'Armed Officer', value: 'Armed Officer' },
  { label: 'Unarmed Officer', value: 'Unarmed Officer' },
];

type SigneeCard = {
  id: string;
  name: string;
  role: 'Sales Person' | 'Client';
  title?: string;
  email?: string;
};

function parseMoneyInput(s: string) {
  const n = parseFloat(s.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function calcSignalServiceWeeklyTotal(s: SignalServiceCard): number {
  if (s.kind === 'dedicated') {
    const officers = parseInt(s.officerCount, 10) || 0;
    return parseMoneyInput(s.hourlyRate) * parseMoneyInput(s.hoursPerWeek) * officers;
  }
  return parseMoneyInput(s.pricePerVisit) * parseMoneyInput(s.visitsPerWeek);
}

function calcPatrolTotalVisits(s: SignalServiceCard): number {
  return s.patrolVisitSets.reduce((sum, set) => {
    const perDay = parseInt(set.visitsPerDay, 10) || 0;
    return sum + perDay * set.visitDays.length;
  }, 0);
}

function calcPatrolDayTotals(s: SignalServiceCard): Record<JobDay, number> {
  return JOB_DAYS.reduce((acc, day) => {
    acc[day] = s.patrolVisitSets.reduce((sum, set) => {
      if (!set.visitDays.includes(day)) return sum;
      return sum + (parseInt(set.visitsPerDay, 10) || 0);
    }, 0);
    return acc;
  }, {} as Record<JobDay, number>);
}

function LabeledField(props: {
  label?: string;
  required?: boolean;
  width?: number | string;
  placeholder?: string;
  placeholderSx?: object;
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
  const { required = true } = props;
  const selectOptions = (props.options ?? []).filter((o) => o.value !== '');
  const selectPlaceholder =
    props.placeholder ?? (props.label ? `Select ${props.label.toLowerCase()}` : 'Select');
  const emptySelectSx = {
    fontSize: 12,
    lineHeight: '18px',
    fontWeight: 400,
    color: '#CCCCCC',
    ...props.placeholderSx,
  };
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
          {required && !props.disabled ? <RequiredAsterisk /> : null}
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
                    if (!v) {
                      return (
                        <Box component="span" sx={emptySelectSx}>
                          {selectPlaceholder}
                        </Box>
                      );
                    }
                    const opt = selectOptions.find((o) => o.value === v);
                    return (
                      <Typography
                        component="span"
                        sx={{
                          fontSize: 12,
                          lineHeight: '18px',
                          color: props.disabled ? '#86868B' : '#262527',
                        }}
                      >
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
          ? selectOptions.map((o) => (
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
  const { required = true } = props;
  return (
    <Stack spacing={0.75} sx={{ width: '100%' }}>
      <Typography sx={figmaLabelSx}>
        {props.label}
        {required && !props.disabled ? <RequiredAsterisk /> : null}
      </Typography>
      <DatePicker
        value={props.value}
        onChange={props.onChange}
        format="MM/DD/YYYY"
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
        <Box
          component="img"
          src="/signal-icon.png"
          alt="Signal"
          sx={{ width: 40, height: 'auto', display: 'block', objectFit: 'contain' }}
        />
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
              bgcolor: ic.alt === activeIconAlt ? '#146dff' : 'transparent',
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

export function CreateDispatchPage({
  variant = 'desktop',
}: {
  variant?: 'desktop' | 'mobile';
} = {}) {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobileVariant = variant === 'mobile';
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')) && !isMobileVariant;
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm')) && !isMobileVariant;
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
  const [addressMapModalOpen, setAddressMapModalOpen] = useState(false);
  const [franchiseAssociation, setFranchiseAssociation] = useState('');
  const [propertySource, setPropertySource] = useState('');
  const [companyAffiliations, setCompanyAffiliations] = useState<string[]>([]);
  const [createCompanyModalOpen, setCreateCompanyModalOpen] = useState(false);
  const [createCompanyDomain, setCreateCompanyDomain] = useState('');
  const [createCompanyName, setCreateCompanyName] = useState('');
  const [createCompanyMarketVertical, setCreateCompanyMarketVertical] = useState('');
  const [createCompanyPartnershipStatus, setCreateCompanyPartnershipStatus] = useState('');
  const [createCompanyEmployees, setCreateCompanyEmployees] = useState('');
  const [createCompanyRevenue, setCreateCompanyRevenue] = useState('');
  const [profitabilityServiceId, setProfitabilityServiceId] = useState<string | null>(null);

  const partnershipStatusOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Owner', value: 'Owner' },
      { label: 'Strategic Partner', value: 'Strategic Partner' },
      { label: 'Prospect', value: 'Prospect' },
      { label: 'Customer', value: 'Customer' },
    ],
    [],
  );

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

  const [contractStartDate, setContractStartDate] = useState<Dayjs | null>(null);
  const [cycleReferenceDate, setCycleReferenceDate] = useState<Dayjs | null>(null);
  const [serviceStartDate, setServiceStartDate] = useState<Dayjs | null>(null);
  const [sameAsContractDate, setSameAsContractDate] = useState(false);
  const [proposalName, setProposalName] = useState('');
  const [timeZone, setTimeZone] = useState(DEFAULT_TIME_ZONE);

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

  const [serviceProducts, setServiceProducts] = useState<SignalServiceCard[]>(() =>
    DEFAULT_SIGNAL_SERVICES.map((s) => ({ ...s, jobDays: [...s.jobDays] })),
  );
  const [serviceScope, setServiceScope] = useState<'all' | 'dispatch_only'>('all');
  const [onDemandItems, setOnDemandItems] = useState<OnDemandItem[]>(() =>
    DEFAULT_ON_DEMAND_ITEMS.map((item) => ({ ...item })),
  );

  const serviceProductsSubtotal = useMemo(
    () => serviceProducts.reduce((sum, s) => sum + calcSignalServiceWeeklyTotal(s), 0),
    [serviceProducts],
  );

  const [billingType, setBillingType] = useState('');
  const [cycleReferenceDateInput, setCycleReferenceDateInput] = useState<Dayjs | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [annualRateIncrease, setAnnualRateIncrease] = useState('');
  const [contractType, setContractType] = useState('');
  const [billingFrequency, setBillingFrequency] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [billingOccurrence, setBillingOccurrence] = useState<'monthly' | 'biweekly' | 'weekly' | 'event' | 'flat'>('weekly');
  const [billingTaxRate, setBillingTaxRate] = useState('0');
  const [flatBillingAmount, setFlatBillingAmount] = useState('');

  const billingOccurrenceTotals = useMemo(() => {
    const weekly = serviceProductsSubtotal;
    const tax = Math.max(0, parseMoneyInput(billingTaxRate)) / 100;
    const plans = {
      monthly: weekly * 4.35,
      biweekly: weekly * 2,
      weekly,
      flat: parseMoneyInput(flatBillingAmount),
    } as const;
    const withTax = (services: number) => {
      const dispatch = 0;
      const base = services + dispatch;
      const taxAmt = base * tax;
      return { services, dispatch, tax: taxAmt, total: base + taxAmt };
    };
    return {
      monthly: withTax(plans.monthly),
      biweekly: withTax(plans.biweekly),
      weekly: withTax(plans.weekly),
      flat: {
        services: plans.flat,
        dispatch: 0,
        tax: plans.flat * tax,
        total: plans.flat + plans.flat * tax,
      },
    };
  }, [serviceProductsSubtotal, billingTaxRate, flatBillingAmount]);

  const formatBillingMoney = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const billingTypeOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Post Bill', value: 'Post Bill' },
      { label: 'Pre Bill', value: 'Pre Bill' },
    ],
    [],
  );
  const paymentMethodOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Bank Transfer', value: 'Bank Transfer' },
      { label: 'Credit Card', value: 'Credit Card' },
      { label: 'ACH', value: 'ACH' },
    ],
    [],
  );
  const paymentTermsOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Due Upon Invoice', value: 'Due Upon Invoice' },
      { label: 'Net 30', value: 'Net 30' },
    ],
    [],
  );
  const contractTypeOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Ongoing', value: 'Ongoing' },
      { label: 'Fixed Term', value: 'Fixed Term' },
    ],
    [],
  );
  const billingFrequencyOptions = useMemo<UiOption[]>(
    () => [
      { label: 'Monthly', value: 'Monthly' },
      { label: 'Weekly', value: 'Weekly' },
      { label: 'Bi-Weekly', value: 'Bi-Weekly' },
    ],
    [],
  );
  const paymentModeOptions = useMemo<UiOption[]>(
    () =>
      [
        'Aramark',
        'Ariba',
        'Bill.com',
        'CiraNet',
        'Coupa',
        'Entrata (VendorAccess)',
        'IRT',
        'OpsTechnology (OpsMerchant)',
        'Paymode (Bottom Technologies)',
        'Payup',
        'Retail Link',
        'Tipalti',
        'VendorCafe',
        'VendorCafe (CBRE properties only)',
        'Workday',
        'Others',
      ].map((label) => ({ label, value: label })),
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
  const propertyOptionsForCompany = useMemo(() => {
    const selected = companyName.trim();
    if (!selected) return propertyDirectory;
    return propertyDirectory.filter((p) => p.companyName === selected);
  }, [propertyDirectory, companyName]);
  const timeZoneOptions = useMemo<UiOption[]>(() => {
    const common = Object.keys(TIME_ZONE_LABELS);
    const zones = new Set(common);
    if (timeZone) zones.add(timeZone);
    return Array.from(zones)
      .map((z) => ({ label: formatTimeZoneLabel(z), value: z }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [timeZone]);

  const [signeeCards, setSigneeCards] = useState<SigneeCard[]>([]);

  const [addSigneeRowOpen, setAddSigneeRowOpen] = useState(false);
  const [newSigneeName, setNewSigneeName] = useState('');
  const [newSigneeEmail, setNewSigneeEmail] = useState('');
  const [newSigneeTitle, setNewSigneeTitle] = useState('');

  const [contactDirectory, setContactDirectory] = useState<ContactDirectoryUser[]>(() => [...CONTACT_DIRECTORY_USERS]);
  const [createContactModalOpen, setCreateContactModalOpen] = useState(false);
  const [createContactEmail, setCreateContactEmail] = useState('');
  const [createContactFirstName, setCreateContactFirstName] = useState('');
  const [createContactLastName, setCreateContactLastName] = useState('');
  const [createContactJobTitle, setCreateContactJobTitle] = useState('');
  const [createContactCountryCode, setCreateContactCountryCode] = useState('+1');
  const [createContactPhoneNumber, setCreateContactPhoneNumber] = useState('');

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

  const sectionCompletion = useMemo(() => {
    const isServiceComplete = (s: SignalServiceCard) => {
      if (!s.resourceType.trim()) return false;
      if (s.kind === 'dedicated') {
        return (
          Boolean(s.officerCount.trim()) &&
          parseMoneyInput(s.hourlyRate) > 0 &&
          parseMoneyInput(s.hoursPerWeek) > 0 &&
          s.jobDays.length > 0 &&
          Boolean(s.startTime.trim()) &&
          Boolean(s.endTime.trim())
        );
      }
      return (
        parseMoneyInput(s.pricePerVisit) > 0 &&
        s.patrolVisitSets.length > 0 &&
        s.patrolVisitSets.every(
          (set) =>
            Boolean(set.startTime.trim()) &&
            Boolean(set.endTime.trim()) &&
            set.visitDays.length > 0 &&
            parseMoneyInput(set.visitsPerDay) > 0,
        )
      );
    };

    const isOnDemandComplete = (item: OnDemandItem) => {
      if (item.kind === 'invoice_line') {
        if (item.isEditing) return false;
        return (
          Boolean(item.lineTitle.trim()) &&
          Boolean(item.invoiceLineItem) &&
          Boolean(item.price.trim()) &&
          Boolean(item.quantity.trim())
        );
      }
      if (item.kind === 'extra_job') {
        return parseMoneyInput(item.pricePerHour) > 0;
      }
      if (!item.billingType) return false;
      if (item.billingType === 'Flat-Rate' || item.billingType === 'Charge Per Alarm') {
        return Boolean(item.rate.trim());
      }
      return true;
    };

    const billingAddressComplete = sameAsPropertyAddress
      ? true
      : Boolean(
          billAddress.trim() &&
            billCountry &&
            billState &&
            billCity.trim() &&
            billZip.trim(),
        );

    return {
      'section-company-property':
        Boolean(companyName.trim()) &&
        Boolean(industryVertical) &&
        Boolean(propertyAddress.trim()) &&
        Boolean(propertyName.trim()) &&
        Boolean(propertySource) &&
        companyAffiliations.length > 0,
      'section-proposal': Boolean(proposalName.trim()) && Boolean(timeZone),
      'section-contacts':
        (contactUserByRole.decision_maker ?? []).length > 0 &&
        (contactUserByRole.end_user ?? []).length > 0 &&
        (contactUserByRole.billing ?? []).length > 0,
      'section-services':
        serviceScope === 'dispatch_only' ||
        (serviceProducts.length > 0 && serviceProducts.every(isServiceComplete)),
      'section-on-demand': onDemandItems.length > 0 && onDemandItems.every(isOnDemandComplete),
      'section-billing':
        Boolean(billingOccurrence) &&
        cycleReferenceDateInput != null &&
        Boolean(paymentTerms) &&
        Boolean(paymentMethod) &&
        Boolean(annualRateIncrease.trim()) &&
        Boolean(billingType) &&
        Boolean(contractType) &&
        Boolean(billingFrequency) &&
        Boolean(paymentMode) &&
        Boolean(billingContactId) &&
        Boolean(billFirstName.trim()) &&
        Boolean(billLastName.trim()) &&
        Boolean(billEmail.trim()) &&
        Boolean(billPhoneNumber.trim()) &&
        billingAddressComplete,
      'section-signee':
        signeeCards.length > 0 &&
        signeeCards.every((s) => Boolean(s.name.trim()) && Boolean((s.email ?? '').trim())),
    } as Record<(typeof FORM_PROGRESS_SECTIONS)[number]['id'], boolean>;
  }, [
    companyName,
    industryVertical,
    propertyAddress,
    propertyName,
    propertySource,
    companyAffiliations,
    proposalName,
    timeZone,
    contactUserByRole,
    serviceScope,
    serviceProducts,
    onDemandItems,
    billingOccurrence,
    cycleReferenceDateInput,
    paymentTerms,
    paymentMethod,
    annualRateIncrease,
    billingType,
    contractType,
    billingFrequency,
    paymentMode,
    billingContactId,
    billFirstName,
    billLastName,
    billEmail,
    billPhoneNumber,
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
    if (!propertyAddress.trim()) e.propertyAddress = 'Address is required.';
    if (!propertyName.trim()) e.propertyName = 'Property name is required.';
    if ((contactUserByRole.decision_maker ?? []).length === 0) {
      e.decisionMakerContacts = 'Select at least one Decision Maker.';
    }
    if (!contactName.trim()) e.contactName = 'Name is required.';
    if (!contactEmail.trim()) e.contactEmail = 'Email is required.';
    if (!contactPhone.trim()) e.contactPhone = 'Phone is required.';
    if (serviceScope === 'all' && serviceProducts.length === 0) {
      e.serviceProducts = 'Add at least one service.';
    }
    for (let i = 0; i < serviceProducts.length; i++) {
      const s = serviceProducts[i];
      if (s.kind === 'dedicated') {
        if (!s.resourceType.trim()) e[`service_${i}_resource`] = 'Select a resource type.';
        if (!s.hourlyRate.trim() || parseMoneyInput(s.hourlyRate) <= 0) e[`service_${i}_rate`] = 'Enter a valid hourly rate.';
        if (!s.hoursPerWeek.trim() || parseMoneyInput(s.hoursPerWeek) <= 0) e[`service_${i}_hours`] = 'Enter hours per week.';
      } else {
        if (!s.resourceType.trim()) e[`service_${i}_resource`] = 'Select a resource type.';
        if (!s.pricePerVisit.trim() || parseMoneyInput(s.pricePerVisit) <= 0) e[`service_${i}_price`] = 'Enter a valid price per visit.';
      }
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
    serviceScope,
    serviceProducts,
    paymentMethod,
  ]);

  const resetForm = useCallback(() => {
    setCompanyName('');
    setCompanyAddress('');
    setIndustryVertical('');
    setPropertyAddress('');
    setPropertyName('');
    setFranchiseAssociation('');
    setPropertySource('');
    setCompanyAffiliations([]);
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactUserByRole({ ...EMPTY_CONTACT_ROLE_SELECTIONS });
    setContractStartDate(null);
    setCycleReferenceDate(null);
    setServiceStartDate(null);
    setSameAsContractDate(false);
    setProposalName('');
    setTimeZone(DEFAULT_TIME_ZONE);
    setOccurrenceEvery('01');
    setOccurrenceUnit('Month');
    setFieldErrors({});
    setServiceLabel('');
    setResourceType('');
    setInvoiceLineItem('');
    setPreferredStartTime(null);
    setPreferredEndTime(null);
    setServiceProducts(DEFAULT_SIGNAL_SERVICES.map((s) => ({ ...s, jobDays: [...s.jobDays] })));
    setServiceScope('all');
    setBillingType('');
    setCycleReferenceDateInput(null);
    setPaymentMethod('');
    setPaymentTerms('');
    setContractType('');
    setBillingFrequency('');
    setPaymentMode('');
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
    setSameAsPropertyAddress(true);
    setSigneeCards([]);
    setAddSigneeRowOpen(false);
    setNewSigneeName('');
    setNewSigneeEmail('');
    setNewSigneeTitle('');
    setCreateContactModalOpen(false);
    setCreateContactEmail('');
    setCreateContactFirstName('');
    setCreateContactLastName('');
    setCreateContactJobTitle('');
    setCreateContactCountryCode('+1');
    setCreateContactPhoneNumber('');
    setContactDirectory([...CONTACT_DIRECTORY_USERS]);
    setCompanyDirectory(MOCK_EXISTING_COMPANIES.map((c) => ({ ...c })));
    setPropertyDirectory(MOCK_EXISTING_PROPERTIES.map((p) => ({ ...p, affiliations: [...p.affiliations] })));
    setCreateCompanyModalOpen(false);
    resetCreateCompanyForm();
    setOnDemandItems(DEFAULT_ON_DEMAND_ITEMS.map((item) => ({ ...item })));
  }, [resetCreateCompanyForm]);

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
      proposalName: proposalName.trim(),
      timeZone,
      serviceOccurrence: { every: Number.parseInt(occurrenceEvery, 10), unit: occurrenceUnit, jobDays: [] },
      serviceScope,
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
        firstName: billFirstName,
        lastName: billLastName,
        email: billEmail,
        phone: billPhoneNumber.trim()
          ? `${billPhoneCountryCode} ${billPhoneNumber.trim()}`
          : '',
        addressOption: sameAsPropertyAddress ? 'property' : 'other',
        sameAsPropertyAddress,
        country: billCountry,
        city: billCity,
        state: billState,
        zip: billZip,
        address: billAddress,
      },
      payment: {
        billingOccurrence,
        billingTaxRate,
        flatBillingAmount,
        cycleReferenceDate: cycleReferenceDateInput?.format('YYYY-MM-DD') ?? '',
        paymentTerms,
        paymentMethod,
        annualRateIncrease,
        billingType,
        contractType,
        billingFrequency,
        paymentMode,
      },
      signees: signeeCards,
    };
    // Replace with API call
    console.log('Create contract', payload);
    setSnackbar({ open: true, message: 'Contract created successfully.', severity: 'success' });
  };

  const handleCancel = () => {
    resetForm();
    navigate(isMobileVariant ? '/signal/mobile' : '/signal/deals');
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
      if (roleId === 'billing') {
        setBillingContactId(userIds[0] ?? null);
      }
    },
    [applyContactUserToPrimaryFields, clearFieldError],
  );

  const addServiceProduct = useCallback(() => {
    setServiceProducts((prev) => [...prev, createEmptySignalService(prev.length + 1)]);
    clearFieldError('serviceProducts');
  }, [clearFieldError]);

  const changeServiceScope = useCallback(
    (next: 'all' | 'dispatch_only') => {
      setServiceScope(next);
      // Dispatch-only contracts carry no service lines, so drop them from the totals.
      setServiceProducts((prev) => {
        if (next === 'dispatch_only') return [];
        return prev.length > 0 ? prev : [createEmptySignalService(1)];
      });
      clearFieldError('serviceProducts');
    },
    [clearFieldError],
  );

  const removeServiceProduct = useCallback((id: string) => {
    setServiceProducts((prev) => (prev.length <= 1 ? prev : prev.filter((p) => p.id !== id)));
  }, []);

  const updateSignalService = useCallback((id: string, patch: Partial<SignalServiceCard>) => {
    setServiceProducts((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }, []);

  const toggleServiceJobDay = useCallback((id: string, day: JobDay) => {
    setServiceProducts((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const has = s.jobDays.includes(day);
        return {
          ...s,
          jobDays: has ? s.jobDays.filter((d) => d !== day) : [...s.jobDays, day],
        };
      }),
    );
  }, []);

  const addPatrolVisitSet = useCallback((serviceId: string) => {
    setServiceProducts((prev) =>
      prev.map((s) =>
        s.id !== serviceId
          ? s
          : {
              ...s,
              patrolVisitSets: [
                ...s.patrolVisitSets,
                {
                  id: `visit_${Date.now()}_${s.patrolVisitSets.length + 1}`,
                  startTime: '',
                  endTime: '',
                  visitDays: [],
                  visitsPerDay: '',
                },
              ],
            },
      ),
    );
  }, []);

  const removePatrolVisitSet = useCallback((serviceId: string, visitSetId: string) => {
    setServiceProducts((prev) =>
      prev.map((s) => {
        if (s.id !== serviceId) return s;
        return {
          ...s,
          patrolVisitSets: s.patrolVisitSets.filter((set) => set.id !== visitSetId),
        };
      }),
    );
  }, []);

  const updatePatrolVisitSet = useCallback(
    (
      serviceId: string,
      visitSetId: string,
      patch: Partial<SignalServiceCard['patrolVisitSets'][number]>,
    ) => {
      setServiceProducts((prev) =>
        prev.map((s) =>
          s.id !== serviceId
            ? s
            : {
                ...s,
                patrolVisitSets: s.patrolVisitSets.map((set) =>
                  set.id === visitSetId ? { ...set, ...patch } : set,
                ),
              },
        ),
      );
    },
    [],
  );

  const togglePatrolVisitDay = useCallback((serviceId: string, visitSetId: string, day: JobDay) => {
    setServiceProducts((prev) =>
      prev.map((s) => {
        if (s.id !== serviceId) return s;
        return {
          ...s,
          patrolVisitSets: s.patrolVisitSets.map((set) => {
            if (set.id !== visitSetId) return set;
            const has = set.visitDays.includes(day);
            return {
              ...set,
              visitDays: has ? set.visitDays.filter((d) => d !== day) : [...set.visitDays, day],
            };
          }),
        };
      }),
    );
  }, []);

  const updateOnDemandItem = useCallback((id: string, patch: Partial<OnDemandItem>) => {
    setOnDemandItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }, []);

  const addOnDemandItem = useCallback(() => {
    setOnDemandItems((prev) => {
      if (prev.some((item) => item.kind === 'invoice_line' && item.isEditing)) return prev;
      return [...prev, createOnDemandItem(prev.length + 1)];
    });
  }, []);

  const removeOnDemandItem = useCallback((id: string) => {
    setOnDemandItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      return next.map((item, index) => {
        if (item.kind !== 'invoice_line') return item;
        const displayTitle = item.lineTitle.trim() || 'Invoice Line Item';
        return { ...item, title: `${index + 1}. ${displayTitle}` };
      });
    });
  }, []);

  const saveOnDemandInvoiceLine = useCallback((id: string) => {
    setOnDemandItems((prev) =>
      prev.map((item, index) => {
        if (item.id !== id || item.kind !== 'invoice_line') return item;
        if (!item.lineTitle.trim() || !item.invoiceLineItem || !item.price.trim() || !item.quantity.trim()) {
          return item;
        }
        return {
          ...item,
          isEditing: false,
          title: `${index + 1}. ${item.lineTitle.trim()}`,
        };
      }),
    );
  }, []);

  const cancelOnDemandInvoiceLineEdit = useCallback((id: string) => {
    setOnDemandItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (!target || target.kind !== 'invoice_line') return prev;
      // New draft with no saved title content → remove
      if (!target.lineTitle.trim() && !target.invoiceLineItem && !target.price.trim() && !target.quantity.trim()) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) => (item.id === id ? { ...item, isEditing: false } : item));
    });
  }, []);

  return (
    <Box
      sx={{
        h: isMobileVariant ? '100%' : '100dvh',
        maxHeight: isMobileVariant ? '100%' : '100dvh',
        minHeight: 0,
        width: '100%',
        maxWidth: '100%',
        bgcolor: isMobileVariant ? '#FFFFFF' : '#F5F5F6',
        display: 'flex',
        flexDirection: { xs: 'column', md: isMobileVariant ? 'column' : 'row' },
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {!isMobileVariant && isDesktop ? (
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

      {!isMobileVariant ? (
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
      ) : null}

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
        {!isMobileVariant && isDesktop ? (
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
        ) : !isMobileVariant ? (
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
        ) : null}

        <Box
          component="main"
          sx={{
            flex: '1 1 0%',
            minHeight: 0,
            minWidth: 0,
            bgcolor: '#FFFFFF',
            height: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            px: isMobileVariant ? 1.5 : { xs: 1.5, sm: 3, md: 4 },
            py: isMobileVariant ? 1.5 : { xs: 1.5, sm: 2, md: 2.5 },
          }}
        >
          <Box
            sx={{
              flex: '1 1 0%',
              minHeight: 0,
              minWidth: 0,
              display: 'flex',
              flexDirection: { xs: 'column', md: isMobileVariant ? 'column' : 'row' },
              alignItems: 'stretch',
              gap: { xs: 1.5, md: isMobileVariant ? 1.5 : 3 },
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
                width: { xs: '100%', md: isMobileVariant ? '100%' : 220 },
                maxHeight: { xs: 'none', md: isMobileVariant ? 'none' : '100%' },
                overflowX: { xs: 'auto', md: isMobileVariant ? 'auto' : 'hidden' },
                overflowY: { xs: 'hidden', md: isMobileVariant ? 'hidden' : 'auto' },
                pr: { md: isMobileVariant ? 0 : 1 },
                pb: { xs: 0.5, md: isMobileVariant ? 0.5 : 0 },
                borderBottom: { xs: '1px solid #E6E6E7', md: isMobileVariant ? '1px solid #E6E6E7' : 'none' },
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#6A6A70',
                  mb: { xs: 1.25, md: 2 },
                  display: isMobileVariant ? 'none' : { xs: 'none', md: 'block' },
                }}
              >
                {FORM_PROGRESS_SECTIONS.filter((s) => sectionCompletion[s.id]).length}/{FORM_PROGRESS_SECTIONS.length} sections complete
              </Typography>
              <Stack
                spacing={0}
                sx={{
                  position: 'relative',
                  flexDirection: isMobileVariant ? 'row' : { xs: 'row', md: 'column' },
                  gap: isMobileVariant ? 1 : { xs: 1, md: 0 },
                  minWidth: isMobileVariant ? 'max-content' : { xs: 'max-content', md: 0 },
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
                        pb: isMobileVariant ? 0 : { xs: 0, md: isLast ? 0 : 2.25 },
                        pr: isMobileVariant ? (isLast ? 0 : 1.5) : { xs: isLast ? 0 : 1.5, md: 0 },
                        alignItems: 'center',
                      }}
                    >
                      {!isLast ? (
                        <Box
                          sx={{
                            display: isMobileVariant ? 'none' : { xs: 'none', md: 'block' },
                            position: 'absolute',
                            left: 9,
                            top: 20,
                            bottom: 0,
                            width: 2,
                            bgcolor: complete ? '#146dff' : '#E6E6E7',
                          }}
                        />
                      ) : null}
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
                          <CheckCircle sx={{ fontSize: 18, color: '#146dff' }} />
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
                          '&:hover .progress-section-label': { color: '#146dff' },
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
                flex: '1 1 0%',
                minHeight: 0,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                overflowX: 'hidden',
                WebkitOverflowScrolling: 'touch',
                '& .MuiOutlinedInput-notchedOutline, & .MuiPickersOutlinedInput-notchedOutline': {
                  borderColor: `${FIELD_STROKE} !important`,
                  borderWidth: '1px !important',
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, & .MuiPickersOutlinedInput-root:hover .MuiPickersOutlinedInput-notchedOutline': {
                  borderColor: `${FIELD_STROKE} !important`,
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, & .MuiPickersOutlinedInput-root.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
                  borderColor: `${FIELD_STROKE} !important`,
                  borderWidth: '1px !important',
                },
                '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline, & .MuiPickersOutlinedInput-root.Mui-disabled .MuiPickersOutlinedInput-notchedOutline': {
                  borderColor: `${FIELD_STROKE} !important`,
                },
              }}
            >
            <Stack
              spacing={{ xs: 3, md: isMobileVariant ? 3 : 4 }}
              sx={{
                pb: 0,
                px: isMobileVariant ? 0 : { xs: 0, md: '200px' },
                width: '100%',
                maxWidth: '100%',
                minWidth: 0,
                flex: '0 0 auto',
                boxSizing: 'border-box',
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
                        Associated Franchise
                      </Typography>
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
                        Property Source
                        <RequiredAsterisk />
                      </Typography>
                      <Autocomplete
                        options={propertySourceOptions}
                        value={propertySourceOptions.find((o) => o.value === propertySource) ?? null}
                        onChange={(_, next) => setPropertySource(next?.value ?? '')}
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
                              borderColor: selected ? '#146dff' : '#E6E6E7',
                            },
                            '&:hover': {
                              bgcolor: '#FFFFFF',
                              '&.MuiButton-outlined': {
                                borderColor: selected ? '#146dff' : '#D0CFD2',
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

              <FormSection id="section-proposal" title="Proposal Details">
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <LabeledField
                      name="proposalName"
                      label="Proposal Name"
                      placeholder="Enter proposal name"
                      value={proposalName}
                      onChange={setProposalName}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={0.75} sx={{ width: '100%' }}>
                      <Typography sx={figmaLabelSx}>
                        Time Zone
                        <RequiredAsterisk />
                      </Typography>
                      <Autocomplete
                        options={timeZoneOptions}
                        value={timeZoneOptions.find((o) => o.value === timeZone) ?? null}
                        onChange={(_, next) => setTimeZone(next?.value ?? '')}
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
                            name="timeZone"
                            size="small"
                            placeholder="Select time zone"
                            sx={figmaTextFieldSx}
                          />
                        )}
                      />
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

              <FormSection
                id="section-services"
                title="Services"
                titleEnd={
                  <FormControlLabel
                    sx={{ m: 0, gap: 0.75, flexShrink: 0 }}
                    control={
                      <Checkbox
                        name="serviceScope"
                        size="small"
                        checked={serviceScope === 'dispatch_only'}
                        onChange={(e) =>
                          changeServiceScope(e.target.checked ? 'dispatch_only' : 'all')
                        }
                        sx={{
                          p: 0,
                          color: '#86868B',
                          '&.Mui-checked': { color: '#146dff' },
                          '& .MuiSvgIcon-root': { fontSize: 17 },
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#262527' }}
                      >
                        Dispatch Only
                      </Typography>
                    }
                  />
                }
              >
                {serviceScope === 'dispatch_only' ? (
                  <Box
                    sx={{
                      width: '100%',
                      border: '1px dashed #E6E6E7',
                      borderRadius: '12px',
                      bgcolor: '#F8F8F9',
                      px: 2,
                      py: 3,
                      textAlign: 'center',
                      boxSizing: 'border-box',
                    }}
                  >
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#262527', mb: 0.5 }}>
                      Dispatch Only
                    </Typography>
                    <Typography sx={{ fontSize: 12, lineHeight: '18px', color: '#6A6A70' }}>
                      This contract covers dispatch only. Uncheck Dispatch Only to add service lines.
                    </Typography>
                  </Box>
                ) : (
                <Stack sx={{ width: '100%', minWidth: 0, gap: 2 }}>
                  {serviceProducts.map((svc) => {
                    const weeklyTotal = calcSignalServiceWeeklyTotal(svc);
                    return (
                      <Box
                        key={svc.id}
                        sx={{
                          width: '100%',
                          border: '1px solid #E6E6E7',
                          borderRadius: '12px',
                          bgcolor: '#FFFFFF',
                          p: 2,
                          boxSizing: 'border-box',
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          sx={{ alignItems: { xs: 'stretch', sm: 'flex-end' }, justifyContent: 'space-between', mb: 1.5, width: '100%' }}
                        >
                          <Stack sx={{ width: { xs: '100%', md: '50%' }, minWidth: { md: 360 } }}>
                            <TextField
                              size="small"
                              variant="standard"
                              placeholder="Service Name"
                              value={svc.name}
                              onChange={(e) => updateSignalService(svc.id, { name: e.target.value })}
                              sx={{
                                width: '100%',
                                '& .MuiInputBase-input': {
                                  fontSize: 14,
                                  fontWeight: 600,
                                  lineHeight: '20px',
                                  color: '#262527',
                                  py: 1,
                                },
                                '& .MuiInputBase-input::placeholder': {
                                  color: '#CCCCCC',
                                  opacity: 1,
                                  fontSize: 14,
                                  fontWeight: 600,
                                },
                                '& .MuiInput-underline:before': {
                                  borderBottomColor: FIELD_STROKE,
                                  borderBottomWidth: 1,
                                },
                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                  borderBottomColor: FIELD_STROKE,
                                  borderBottomWidth: 1,
                                },
                                '& .MuiInput-underline:after': {
                                  borderBottomColor: FIELD_STROKE,
                                  borderBottomWidth: 1,
                                },
                              }}
                            />
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: 'center', justifyContent: 'flex-end', ml: 'auto', flexShrink: 0 }}
                          >
                            <Typography
                              sx={{
                                flexShrink: 0,
                                fontSize: 14,
                                fontWeight: 700,
                                color: '#262527',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {weeklyTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / Weekly
                            </Typography>
                            {serviceProducts.length > 1 ? (
                              <IconButton
                                type="button"
                                size="small"
                                aria-label="Remove service"
                                onClick={() => removeServiceProduct(svc.id)}
                                sx={{ color: '#D9534F' }}
                              >
                                <DeleteOutlineOutlined sx={{ fontSize: 18 }} />
                              </IconButton>
                            ) : null}
                          </Stack>
                        </Stack>

                        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                          {([
                            { id: 'dedicated' as const, label: 'Dedicated', Icon: Security },
                            { id: 'patrol' as const, label: 'Patrol', Icon: DirectionsCarOutlined },
                          ]).map(({ id, label, Icon }) => {
                            const selected = svc.kind === id;
                            return (
                              <Button
                                key={id}
                                type="button"
                                variant="outlined"
                                disableRipple
                                onClick={() => updateSignalService(svc.id, { kind: id })}
                                startIcon={<Icon sx={{ fontSize: 18 }} />}
                                sx={{
                                  textTransform: 'none',
                                  borderRadius: '8px',
                                  px: 1.75,
                                  py: 0.75,
                                  minHeight: 36,
                                  width: 120,
                                  fontSize: 13,
                                  fontWeight: 600,
                                  color: selected ? '#146dff' : '#6A6A70',
                                  bgcolor: selected ? '#E8F1FF' : '#FFFFFF',
                                  borderColor: selected ? '#146dff' : '#D0CFD2',
                                  '& .MuiButton-startIcon': {
                                    color: selected ? '#146dff' : '#6A6A70',
                                    mr: 0.75,
                                  },
                                  '&:hover': {
                                    bgcolor: selected ? '#D6E8FF' : '#F8F8F9',
                                    borderColor: selected ? '#146dff' : '#D0CFD2',
                                    color: selected ? '#146dff' : '#6A6A70',
                                  },
                                }}
                              >
                                {label}
                              </Button>
                            );
                          })}
                        </Stack>

                        {svc.kind === 'dedicated' ? (
                          <Stack spacing={1.5}>
                            <Grid container spacing={2}>
                              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <LabeledField
                                  name={`resourceType_${svc.id}`}
                                  label="Resource Type"
                                  value={svc.resourceType}
                                  onChange={(v) => updateSignalService(svc.id, { resourceType: v })}
                                  select
                                  options={RESOURCE_TYPE_OPTIONS}
                                />
                              </Grid>
                              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <LabeledField
                                  name={`officers_${svc.id}`}
                                  label="Officer/Guard"
                                  placeholder="Enter officer/guard count"
                                  value={svc.officerCount}
                                  onChange={(v) => updateSignalService(svc.id, { officerCount: v })}
                                  htmlInput={{ inputMode: 'numeric' }}
                                />
                              </Grid>
                              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Stack spacing={0.5} sx={{ width: '100%' }}>
                                  <LabeledField
                                    name={`hours_${svc.id}`}
                                    label="Officer Service Hrs/Week"
                                    placeholder="Enter hours per week"
                                    value={svc.hoursPerWeek}
                                    onChange={(v) => updateSignalService(svc.id, { hoursPerWeek: v })}
                                    htmlInput={{ inputMode: 'decimal' }}
                                  />
                                  <Typography sx={{ fontSize: 11, fontWeight: 500, color: '#146dff', lineHeight: '16px' }}>
                                    Total {parseMoneyInput(svc.hoursPerWeek).toFixed(2)} hrs/week
                                  </Typography>
                                </Stack>
                              </Grid>
                              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Stack spacing={0.5} sx={{ width: '100%' }}>
                                  <LabeledField
                                    name={`hourlyRate_${svc.id}`}
                                    label="Hourly Rate ($)"
                                    placeholder="Enter hourly rate"
                                    value={svc.hourlyRate}
                                    onChange={(v) => updateSignalService(svc.id, { hourlyRate: v })}
                                    htmlInput={{ inputMode: 'decimal' }}
                                  />
                                  {svc.resourceType.trim() &&
                                  svc.officerCount.trim() &&
                                  svc.hoursPerWeek.trim() &&
                                  svc.hourlyRate.trim() ? (
                                    <Stack
                                      direction="row"
                                      spacing={0.5}
                                      onClick={() => setProfitabilityServiceId(svc.id)}
                                      sx={{
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        width: 'fit-content',
                                        '&:hover .suggested-rate-text': { textDecoration: 'underline' },
                                      }}
                                    >
                                      <InfoOutlined sx={{ fontSize: 14, color: '#B32318' }} />
                                      <Typography
                                        className="suggested-rate-text"
                                        sx={{ fontSize: 11, color: '#B32318', lineHeight: '16px' }}
                                      >
                                        Suggested Rate $ 16.84, NPM 12.00%
                                      </Typography>
                                    </Stack>
                                  ) : null}
                                </Stack>
                              </Grid>
                              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Stack spacing={0.75} sx={{ width: '100%' }}>
                                  <Typography sx={figmaLabelSx}>
                                    Start Time
                                  </Typography>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    type="time"
                                    name={`startTime_${svc.id}`}
                                    value={svc.startTime}
                                    onChange={(e) => updateSignalService(svc.id, { startTime: e.target.value })}
                                    sx={figmaTextFieldSx}
                                    slotProps={{ htmlInput: { step: 300 } }}
                                  />
                                </Stack>
                              </Grid>
                              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Stack spacing={0.75} sx={{ width: '100%' }}>
                                  <Typography sx={figmaLabelSx}>
                                    End Time
                                  </Typography>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    type="time"
                                    name={`endTime_${svc.id}`}
                                    value={svc.endTime}
                                    onChange={(e) => updateSignalService(svc.id, { endTime: e.target.value })}
                                    sx={figmaTextFieldSx}
                                    slotProps={{ htmlInput: { step: 300 } }}
                                  />
                                </Stack>
                              </Grid>
                              <Grid size={12}>
                                <Stack spacing={0.75}>
                                  <Typography sx={figmaLabelSx}>
                                    Job Days
                                  </Typography>
                                  <Stack direction="row" sx={{ flexWrap: 'nowrap', gap: 0.5 }}>
                                    {JOB_DAYS.map((day) => {
                                      const selected = svc.jobDays.includes(day);
                                      return (
                                        <Button
                                          key={day}
                                          type="button"
                                          variant="outlined"
                                          disableRipple
                                          onClick={() => toggleServiceJobDay(svc.id, day)}
                                          sx={{
                                            minWidth: 48,
                                            height: 32,
                                            px: 1.25,
                                            borderRadius: '16px',
                                            textTransform: 'none',
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color: selected ? '#146dff' : '#444446',
                                            bgcolor: selected ? '#E8F1FF' : '#FFFFFF',
                                            borderColor: selected ? '#146dff' : '#D0CFD2',
                                            '&:hover': {
                                              bgcolor: selected ? '#D6E8FF' : '#F8F8F9',
                                              borderColor: selected ? '#146dff' : '#D0CFD2',
                                            },
                                          }}
                                        >
                                          {day}
                                        </Button>
                                      );
                                    })}
                                  </Stack>
                                </Stack>
                              </Grid>
                            </Grid>
                          </Stack>
                        ) : (
                          <Stack spacing={1.5}>
                            <Grid container spacing={2}>
                              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <LabeledField
                                  name={`resourceType_${svc.id}`}
                                  label="Resource Type"
                                  value={svc.resourceType}
                                  onChange={(v) => updateSignalService(svc.id, { resourceType: v })}
                                  select
                                  options={RESOURCE_TYPE_OPTIONS}
                                />
                              </Grid>
                              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <LabeledField
                                  name={`visits_${svc.id}`}
                                  label="Visit(s) Per Week"
                                  placeholder="Enter visits per week"
                                  value={svc.visitsPerWeek}
                                  onChange={(v) => updateSignalService(svc.id, { visitsPerWeek: v })}
                                  htmlInput={{ inputMode: 'numeric' }}
                                />
                              </Grid>
                              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Stack spacing={0.5} sx={{ width: '100%' }}>
                                  <LabeledField
                                    name={`priceVisit_${svc.id}`}
                                    label="Price Per Visit ($)"
                                    value={svc.pricePerVisit}
                                    onChange={(v) => updateSignalService(svc.id, { pricePerVisit: v })}
                                    placeholder="Enter price per visit"
                                    htmlInput={{ inputMode: 'decimal' }}
                                  />
                                  <Stack
                                    direction="row"
                                    spacing={0.5}
                                    onClick={() => setProfitabilityServiceId(svc.id)}
                                    sx={{
                                      alignItems: 'center',
                                      cursor: 'pointer',
                                      width: 'fit-content',
                                      '&:hover .suggested-rate-text': { textDecoration: 'underline' },
                                    }}
                                  >
                                    <InfoOutlined sx={{ fontSize: 14, color: '#B32318' }} />
                                    <Typography
                                      className="suggested-rate-text"
                                      sx={{ fontSize: 11, color: '#B32318', lineHeight: '16px' }}
                                    >
                                      Suggested Rate $ 16.84, NPM 12.00%
                                    </Typography>
                                  </Stack>
                                </Stack>
                              </Grid>
                            </Grid>
                            {svc.patrolVisitSets.map((visitSet, visitSetIndex) => (
                              <Stack key={visitSet.id} spacing={1.5} sx={{ pt: 0.5 }}>
                                <Stack
                                  direction="row"
                                  sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 1 }}
                                >
                                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#262527' }}>
                                    Visits Set {visitSetIndex + 1}
                                  </Typography>
                                  <IconButton
                                    type="button"
                                    size="small"
                                    aria-label={`Remove visits set ${visitSetIndex + 1}`}
                                    onClick={() => removePatrolVisitSet(svc.id, visitSet.id)}
                                    sx={{ color: '#D9534F' }}
                                  >
                                    <DeleteOutlineOutlined sx={{ fontSize: 18 }} />
                                  </IconButton>
                                </Stack>
                                <Typography sx={{ ...figmaLabelSx, color: '#262527', fontWeight: 700 }}>
                                  Time Duration
                                </Typography>
                                <Grid container spacing={2}>
                                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Stack spacing={0.75} sx={{ width: '100%' }}>
                                      <Typography sx={figmaLabelSx}>
                                        Start Time
                                        <RequiredAsterisk />
                                      </Typography>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        type="time"
                                        name={`patrolStartTime_${visitSet.id}`}
                                        value={visitSet.startTime}
                                        onChange={(e) =>
                                          updatePatrolVisitSet(svc.id, visitSet.id, { startTime: e.target.value })
                                        }
                                        sx={figmaTextFieldSx}
                                        slotProps={{ htmlInput: { step: 300 } }}
                                      />
                                    </Stack>
                                  </Grid>
                                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Stack spacing={0.75} sx={{ width: '100%' }}>
                                      <Typography sx={figmaLabelSx}>
                                        End Time
                                        <RequiredAsterisk />
                                      </Typography>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        type="time"
                                        name={`patrolEndTime_${visitSet.id}`}
                                        value={visitSet.endTime}
                                        onChange={(e) =>
                                          updatePatrolVisitSet(svc.id, visitSet.id, { endTime: e.target.value })
                                        }
                                        sx={figmaTextFieldSx}
                                        slotProps={{ htmlInput: { step: 300 } }}
                                      />
                                    </Stack>
                                  </Grid>
                                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <LabeledField
                                      name={`visitsPerDay_${visitSet.id}`}
                                      label="Visits Per Day"
                                      placeholder="Enter visits per day"
                                      value={visitSet.visitsPerDay}
                                      onChange={(v) =>
                                        updatePatrolVisitSet(svc.id, visitSet.id, { visitsPerDay: v })
                                      }
                                      htmlInput={{ inputMode: 'numeric' }}
                                    />
                                  </Grid>
                                </Grid>
                                <Stack spacing={0.75}>
                                  <Typography sx={figmaLabelSx}>
                                    Visit Days
                                    <RequiredAsterisk />
                                  </Typography>
                                  <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                                    {JOB_DAYS.map((day) => {
                                      const selected = visitSet.visitDays.includes(day);
                                      return (
                                        <Button
                                          key={`${visitSet.id}-${day}`}
                                          type="button"
                                          variant="outlined"
                                          disableRipple
                                          onClick={() => togglePatrolVisitDay(svc.id, visitSet.id, day)}
                                          sx={{
                                            minWidth: 44,
                                            height: 32,
                                            px: 1.5,
                                            borderRadius: '16px',
                                            textTransform: 'none',
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color: selected ? '#146dff' : '#444446',
                                            bgcolor: selected ? '#E8F1FF' : '#FFFFFF',
                                            borderColor: selected ? '#146dff' : '#D0CFD2',
                                            '&:hover': {
                                              bgcolor: selected ? '#E8F1FF' : '#F8F8F9',
                                              borderColor: selected ? '#146dff' : '#D0CFD2',
                                            },
                                          }}
                                        >
                                          {day}
                                        </Button>
                                      );
                                    })}
                                  </Stack>
                                </Stack>
                              </Stack>
                            ))}
                            <Button
                              type="button"
                              variant="text"
                              startIcon={<AddOutlined sx={{ fontSize: 16 }} />}
                              onClick={() => addPatrolVisitSet(svc.id)}
                              sx={{
                                alignSelf: 'flex-start',
                                color: '#146dff',
                                textTransform: 'none',
                                fontSize: 14,
                                fontWeight: 600,
                                px: 0,
                                '&:hover': { bgcolor: 'transparent', color: '#0059FF' },
                              }}
                            >
                              Add Visit
                            </Button>
                            {svc.patrolVisitSets.length > 0 ? (
                              <Box
                                sx={{
                                  bgcolor: '#E8F4FF',
                                  borderRadius: '10px',
                                  px: 2,
                                  py: 1.5,
                                }}
                              >
                                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#262527', mb: 0.5 }}>
                                  Total {calcPatrolTotalVisits(svc)}:
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: '#444446' }}>
                                  {JOB_DAYS.map((day) => `${day} ${calcPatrolDayTotals(svc)[day]}`).join(', ')}
                                </Typography>
                              </Box>
                            ) : null}
                          </Stack>
                        )}
                      </Box>
                    );
                  })}

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
                        border: '1px solid #146dff',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      <AddOutlined sx={{ fontSize: 14, color: '#146dff' }} />
                    </Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#262527', textAlign: 'center' }}>
                      Add Another Service
                    </Typography>
                  </Button>

                  {fieldErrors.serviceProducts ? (
                    <Typography variant="caption" color="error">
                      {fieldErrors.serviceProducts}
                    </Typography>
                  ) : null}
                </Stack>
                )}
              </FormSection>

              <FormSection id="section-on-demand" title="On Demand">
                <Stack sx={{ width: '100%', minWidth: 0, gap: 0 }}>
                  <Typography sx={{ fontSize: 12, lineHeight: '18px', color: '#5B5B5F', mb: 1 }}>
                    These items will be added to your monthly invoice, if utilised
                  </Typography>
                  {onDemandItems.map((item, itemIndex) => {
                    const isExtraJob = item.kind === 'extra_job';
                    const isInvoiceLine = item.kind === 'invoice_line';
                    const showFlatRate = item.kind === 'dispatch' && item.billingType === 'Flat-Rate';
                    const showChargePerAlarm = item.kind === 'dispatch' && item.billingType === 'Charge Per Alarm';
                    const lineTotal = parseMoneyInput(item.price) * parseMoneyInput(item.quantity);

                    if (isInvoiceLine && item.isEditing) {
                      return (
                        <Box
                          key={item.id}
                          sx={{
                            py: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: {
                                xs: '1fr',
                                sm: '1.4fr 1fr 0.7fr 0.7fr 0.7fr',
                              },
                              columnGap: 2,
                              rowGap: 1.5,
                              alignItems: 'start',
                            }}
                          >
                            <LabeledField
                              name={`invoiceLineTitle_${item.id}`}
                              label="Title"
                              required
                              placeholder="Title"
                              value={item.lineTitle}
                              onChange={(v) => updateOnDemandItem(item.id, { lineTitle: v })}
                            />
                            <LabeledField
                              name={`invoiceLineItem_${item.id}`}
                              label="Invoice Line Item"
                              required
                              placeholder="Select line item"
                              value={item.invoiceLineItem}
                              onChange={(v) => updateOnDemandItem(item.id, { invoiceLineItem: v })}
                              select
                              options={ON_DEMAND_INVOICE_LINE_OPTIONS}
                            />
                            <LabeledField
                              name={`invoiceLinePrice_${item.id}`}
                              label="Price ($)"
                              required
                              placeholder="e.g, $50"
                              value={item.price}
                              onChange={(v) => updateOnDemandItem(item.id, { price: v })}
                              htmlInput={{ inputMode: 'decimal' }}
                            />
                            <LabeledField
                              name={`invoiceLineQty_${item.id}`}
                              label="Quantity"
                              required
                              placeholder="e.g, 2"
                              value={item.quantity}
                              onChange={(v) => updateOnDemandItem(item.id, { quantity: v })}
                              htmlInput={{ inputMode: 'numeric' }}
                            />
                            <LabeledField
                              name={`invoiceLineTotal_${item.id}`}
                              label="Total"
                              required={false}
                              value={String(lineTotal)}
                              onChange={() => {}}
                              disabled
                            />
                          </Box>
                          <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                              type="button"
                              variant="outlined"
                              onClick={() => cancelOnDemandInvoiceLineEdit(item.id)}
                              sx={{
                                textTransform: 'none',
                                color: '#444446',
                                borderColor: '#E6E6E7',
                                px: 2,
                                '&:hover': { borderColor: '#D0CFD2', bgcolor: '#F8F8F9' },
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              variant="contained"
                              color="primary"
                              onClick={() => saveOnDemandInvoiceLine(item.id)}
                              disabled={
                                !item.lineTitle.trim() ||
                                !item.invoiceLineItem ||
                                !item.price.trim() ||
                                !item.quantity.trim()
                              }
                              sx={{ textTransform: 'none', px: 2.5 }}
                            >
                              Save
                            </Button>
                          </Stack>
                        </Box>
                      );
                    }

                    if (isInvoiceLine) {
                      const displayIndex = itemIndex + 1;
                      const displayTitle = item.lineTitle.trim() || 'Invoice Line Item';
                      return (
                        <Box
                          key={item.id}
                          sx={{
                            py: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                          }}
                        >
                          <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
                            <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#262527' }}>
                              {displayIndex}. {displayTitle}
                            </Typography>
                            <Typography sx={{ fontSize: 12, lineHeight: '18px', color: '#5B5B5F' }}>
                              Count {parseMoneyInput(item.quantity)} • Price ${parseMoneyInput(item.price).toFixed(2)}
                            </Typography>
                            <Typography sx={{ fontSize: 12, lineHeight: '18px', color: '#5B5B5F' }}>
                              Invoice Line Item: {item.invoiceLineItem || '—'}
                            </Typography>
                          </Stack>
                          <Typography
                            sx={{
                              fontSize: 16,
                              fontWeight: 700,
                              color: '#262527',
                              flexShrink: 0,
                              minWidth: 96,
                              textAlign: 'right',
                            }}
                          >
                            ${lineTotal.toFixed(2)}
                          </Typography>
                          <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
                            <IconButton
                              type="button"
                              size="small"
                              aria-label="Edit invoice line item"
                              onClick={() => updateOnDemandItem(item.id, { isEditing: true })}
                              sx={{ color: '#6A6A70' }}
                            >
                              <EditOutlined sx={{ fontSize: 18 }} />
                            </IconButton>
                            <IconButton
                              type="button"
                              size="small"
                              aria-label="Delete invoice line item"
                              onClick={() => removeOnDemandItem(item.id)}
                              sx={{ color: '#D9534F' }}
                            >
                              <DeleteOutlineOutlined sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Stack>
                        </Box>
                      );
                    }

                    return (
                      <Box
                        key={item.id}
                        sx={{
                          py: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                              xs: '1fr',
                              md: 'minmax(0, 1fr) 168px 168px 168px',
                            },
                            columnGap: 2,
                            rowGap: 1.5,
                            alignItems: 'start',
                          }}
                        >
                          <Stack spacing={0.5} sx={{ minWidth: 0, pr: { md: 2 } }}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#262527' }}>
                              {item.title}
                            </Typography>
                            {item.description ? (
                              <Typography sx={{ fontSize: 12, lineHeight: '18px', color: '#5B5B5F', maxWidth: 420 }}>
                                {item.description}
                              </Typography>
                            ) : null}
                          </Stack>

                          {isExtraJob ? (
                            <LabeledField
                              name={`onDemandPrice_${item.id}`}
                              label="Price Per Hour ($)"
                              required
                              placeholder="Enter price per hour"
                              value={item.pricePerHour}
                              onChange={(v) => updateOnDemandItem(item.id, { pricePerHour: v })}
                              htmlInput={{ inputMode: 'decimal' }}
                            />
                          ) : (
                            <LabeledField
                              name={`onDemandBilling_${item.id}`}
                              label="Billing Type"
                              placeholder="Select billing type"
                              value={item.billingType}
                              onChange={(v) => updateOnDemandItem(item.id, { billingType: v })}
                              select
                              options={ON_DEMAND_BILLING_OPTIONS}
                            />
                          )}

                          {showFlatRate ? (
                            <Stack spacing={0.75} sx={{ width: '100%' }}>
                              <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                                <Typography sx={figmaLabelSx}>
                                  Rate
                                  <RequiredAsterisk />
                                </Typography>
                                <Tooltip
                                  title="Flat Rate Billed per Invoicing Settings in Payment Terms."
                                  arrow
                                  placement="top"
                                >
                                  <InfoOutlined sx={{ fontSize: 14, color: '#86868B', cursor: 'help' }} />
                                </Tooltip>
                              </Stack>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name={`onDemandRate_${item.id}`}
                                placeholder="Rate"
                                value={item.rate}
                                onChange={(e) => updateOnDemandItem(item.id, { rate: e.target.value })}
                                sx={figmaTextFieldSx}
                                slotProps={{ htmlInput: { inputMode: 'decimal' } }}
                              />
                            </Stack>
                          ) : null}

                          {showChargePerAlarm ? (
                            <LabeledField
                              name={`onDemandRate_${item.id}`}
                              label="Rate ($)"
                              required
                              placeholder="Rate ($)"
                              value={item.rate}
                              onChange={(v) => updateOnDemandItem(item.id, { rate: v })}
                              htmlInput={{ inputMode: 'decimal' }}
                            />
                          ) : null}

                          {showChargePerAlarm ? (
                            <LabeledField
                              name={`onDemandPeakHours_${item.id}`}
                              label="Peak Hours ($)"
                              placeholder="Peak Hours ($)"
                              value={item.peakHours}
                              onChange={(v) => updateOnDemandItem(item.id, { peakHours: v })}
                              htmlInput={{ inputMode: 'decimal' }}
                            />
                          ) : null}
                        </Box>
                      </Box>
                    );
                  })}
                  <Box sx={{ pt: 3 }}>
                    <Button
                      type="button"
                      variant="text"
                      startIcon={<AddOutlined sx={{ fontSize: 16 }} />}
                      onClick={addOnDemandItem}
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
                      Line Item
                    </Button>
                  </Box>
                </Stack>
              </FormSection>

              <FormSection id="section-billing" title="Billing & Payment Details">
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Stack spacing={1.5} sx={{ width: '100%', mb: 1 }}>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 1.5 }}
                      >
                        <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#262527' }}>
                          Billing Occurrence
                        </Typography>
                        {(() => {
                          const totalServices = Math.max(serviceProducts.length, 1);
                          const profitableServices = serviceProducts.length;
                          const profitablePct = Math.round((profitableServices / totalServices) * 100);
                          return (
                            <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
                              <Box
                                sx={{
                                  width: 36,
                                  height: 36,
                                  flexShrink: 0,
                                  borderRadius: '50%',
                                  background: `conic-gradient(#E8751A 0 ${profitablePct}%, #E6E6E7 ${profitablePct}% 100%)`,
                                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))',
                                  WebkitMask:
                                    'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))',
                                }}
                              />
                              <Stack spacing={0} sx={{ minWidth: 0 }}>
                                <Typography sx={{ fontSize: 18, fontWeight: 700, lineHeight: '22px', color: '#262527' }}>
                                  {profitableServices}/{totalServices}
                                </Typography>
                                <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                                  <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: '#B32318' }}>
                                    Services Profitable
                                  </Typography>
                                  <InfoOutlined sx={{ fontSize: 14, color: '#B32318' }} />
                                </Stack>
                              </Stack>
                            </Stack>
                          );
                        })()}
                      </Stack>

                      <Box sx={{ width: '100%', minWidth: 0, overflowX: 'auto' }}>
                        <Box
                          sx={{
                            width: '100%',
                            minWidth: { xs: 560, md: 0 },
                            border: '1px solid #E6E6E7',
                            borderRadius: '10px',
                            overflow: 'hidden',
                          }}
                        >
                          {(() => {
                            const isWeeklyGroup =
                              billingOccurrence === 'weekly' || billingOccurrence === 'event';
                            const colSx = (selected: boolean) => ({
                              px: 1.5,
                              py: 1.25,
                              borderLeft: '1px solid #E6E6E7',
                              bgcolor: selected ? '#E8F1FF' : '#FFFFFF',
                              textAlign: 'left' as const,
                            });
                            const headerRadio = (
                              id: typeof billingOccurrence,
                              label: string,
                              selectedStyle?: boolean,
                            ) => (
                              <FormControlLabel
                                sx={{
                                  m: 0,
                                  gap: 0.75,
                                  '& .MuiFormControlLabel-label': { fontSize: 13, fontWeight: 600 },
                                }}
                                control={
                                  <Radio
                                    size="small"
                                    checked={billingOccurrence === id}
                                    onChange={() => setBillingOccurrence(id)}
                                    sx={{
                                      p: 0,
                                      color: selectedStyle ? '#FFFFFF' : '#86868B',
                                      '&.Mui-checked': { color: selectedStyle ? '#FFFFFF' : '#146dff' },
                                    }}
                                  />
                                }
                                label={
                                  <Typography
                                    sx={{
                                      fontSize: 13,
                                      fontWeight: 600,
                                      color: selectedStyle ? '#FFFFFF' : '#262527',
                                    }}
                                  >
                                    {label}
                                  </Typography>
                                }
                              />
                            );
                            const rows: {
                              label: ReactNode;
                              monthly: ReactNode;
                              biweekly: ReactNode;
                              weekly: ReactNode;
                              flat: ReactNode;
                              total?: boolean;
                            }[] = [
                              {
                                label: 'Services Total ($)',
                                monthly: formatBillingMoney(billingOccurrenceTotals.monthly.services),
                                biweekly: formatBillingMoney(billingOccurrenceTotals.biweekly.services),
                                weekly: formatBillingMoney(billingOccurrenceTotals.weekly.services),
                                flat: 'Included in flat rate',
                              },
                              {
                                label: 'Dispatch Total ($)',
                                monthly: formatBillingMoney(billingOccurrenceTotals.monthly.dispatch),
                                biweekly: formatBillingMoney(billingOccurrenceTotals.biweekly.dispatch),
                                weekly: formatBillingMoney(billingOccurrenceTotals.weekly.dispatch),
                                flat: 'Included in flat rate',
                              },
                              {
                                label: (
                                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: 13, color: '#262527' }}>
                                      Tax Rate (%)
                                    </Typography>
                                    <TextField
                                      size="small"
                                      value={billingTaxRate}
                                      onChange={(e) => setBillingTaxRate(e.target.value)}
                                      sx={{
                                        width: 56,
                                        ...figmaTextFieldSx,
                                        '& .MuiOutlinedInput-root': {
                                          ...figmaTextFieldSx['& .MuiOutlinedInput-root'],
                                          minHeight: 28,
                                          height: 28,
                                        },
                                        '& .MuiInputBase-input': { fontSize: 12, py: 0.5, px: 1 },
                                      }}
                                      slotProps={{ htmlInput: { inputMode: 'decimal' } }}
                                    />
                                  </Stack>
                                ),
                                monthly: formatBillingMoney(billingOccurrenceTotals.monthly.tax),
                                biweekly: formatBillingMoney(billingOccurrenceTotals.biweekly.tax),
                                weekly: formatBillingMoney(billingOccurrenceTotals.weekly.tax),
                                flat: formatBillingMoney(billingOccurrenceTotals.flat.tax),
                              },
                              {
                                label: 'Total',
                                monthly: formatBillingMoney(billingOccurrenceTotals.monthly.total),
                                biweekly: formatBillingMoney(billingOccurrenceTotals.biweekly.total),
                                weekly: formatBillingMoney(billingOccurrenceTotals.weekly.total),
                                flat: formatBillingMoney(billingOccurrenceTotals.flat.total),
                                total: true,
                              },
                            ];
                            return (
                              <>
                                <Box
                                  sx={{
                                    display: 'grid',
                                    gridTemplateColumns: '180px 1fr 1fr 1.4fr 1fr',
                                    alignItems: 'stretch',
                                    bgcolor: '#FFFFFF',
                                  }}
                                >
                                  <Box sx={{ px: 1.5, py: 1.25 }}>
                                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#262527' }}>
                                      Payment Plans
                                    </Typography>
                                  </Box>
                                  <Box sx={colSx(billingOccurrence === 'monthly')}>{headerRadio('monthly', 'Monthly')}</Box>
                                  <Box sx={colSx(billingOccurrence === 'biweekly')}>
                                    {headerRadio('biweekly', 'Bi-Weekly')}
                                  </Box>
                                  <Box
                                    sx={{
                                      ...colSx(isWeeklyGroup),
                                      display: 'flex',
                                      alignItems: 'stretch',
                                      p: 0,
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        px: 1.5,
                                        py: 1.25,
                                        bgcolor: billingOccurrence === 'weekly' ? '#146dff' : 'transparent',
                                      }}
                                    >
                                      {headerRadio('weekly', 'Weekly', billingOccurrence === 'weekly')}
                                    </Box>
                                    <Box sx={{ width: '1px', bgcolor: '#E6E6E7', alignSelf: 'stretch' }} />
                                    <Box
                                      sx={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        px: 1.5,
                                        py: 1.25,
                                        bgcolor: billingOccurrence === 'event' ? '#146dff' : 'transparent',
                                      }}
                                    >
                                      {headerRadio('event', 'Event', billingOccurrence === 'event')}
                                    </Box>
                                  </Box>
                                  <Box
                                    sx={{
                                      ...colSx(billingOccurrence === 'flat'),
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 1,
                                    }}
                                  >
                                    {headerRadio('flat', 'Flat')}
                                    <TextField
                                      size="small"
                                      value={flatBillingAmount}
                                      onChange={(e) => setFlatBillingAmount(e.target.value)}
                                      placeholder=""
                                      sx={{
                                        width: 72,
                                        ...figmaTextFieldSx,
                                        '& .MuiOutlinedInput-root': {
                                          ...figmaTextFieldSx['& .MuiOutlinedInput-root'],
                                          minHeight: 28,
                                          height: 28,
                                        },
                                        '& .MuiInputBase-input': { fontSize: 12, py: 0.5, px: 1 },
                                      }}
                                      slotProps={{ htmlInput: { inputMode: 'decimal' } }}
                                    />
                                  </Box>
                                </Box>
                                {rows.map((row, idx) => (
                                  <Box
                                    key={idx}
                                    sx={{
                                      display: 'grid',
                                      gridTemplateColumns: '180px 1fr 1fr 1.4fr 1fr',
                                      borderTop: '1px solid #E6E6E7',
                                      bgcolor: row.total ? '#F5F5F6' : '#FFFFFF',
                                    }}
                                  >
                                    <Box sx={{ px: 1.5, py: 1.25 }}>
                                      {typeof row.label === 'string' ? (
                                        <Typography
                                          sx={{
                                            fontSize: 13,
                                            fontWeight: row.total ? 700 : 500,
                                            color: '#262527',
                                          }}
                                        >
                                          {row.label}
                                        </Typography>
                                      ) : (
                                        row.label
                                      )}
                                    </Box>
                                    {(
                                      [
                                        ['monthly', row.monthly],
                                        ['biweekly', row.biweekly],
                                        ['weekly', row.weekly],
                                        ['flat', row.flat],
                                      ] as const
                                    ).map(([key, value]) => {
                                      const selected =
                                        key === 'weekly'
                                          ? isWeeklyGroup
                                          : billingOccurrence === key;
                                      return (
                                        <Box
                                          key={key}
                                          sx={{
                                            px: 1.5,
                                            py: 1.25,
                                            borderLeft: '1px solid #E6E6E7',
                                            bgcolor: selected ? '#E8F1FF' : row.total ? '#F5F5F6' : '#FFFFFF',
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              fontSize: 13,
                                              fontWeight: selected || row.total ? 700 : 400,
                                              color: '#262527',
                                            }}
                                          >
                                            {value}
                                          </Typography>
                                        </Box>
                                      );
                                    })}
                                  </Box>
                                ))}
                              </>
                            );
                          })()}
                        </Box>
                      </Box>
                    </Stack>
                  </Grid>

                  <Grid size={12}>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#262527' }}>
                        Payment Details
                      </Typography>
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                          gap: 2,
                          alignItems: 'start',
                        }}
                      >
                        <LabeledDatePicker
                          name="cycleReferenceDate"
                          label="Cycle Reference Date"
                          required
                          placeholder="MM/DD/YYYY"
                          value={cycleReferenceDateInput}
                          onChange={setCycleReferenceDateInput}
                        />
                        <LabeledField
                          name="paymentTerms"
                          label="Payment Terms"
                          required
                          placeholder="Select payment terms"
                          placeholderSx={{
                            fontSize: 12,
                            lineHeight: '18px',
                            fontWeight: 400,
                            color: '#CCCCCC',
                          }}
                          value={paymentTerms}
                          onChange={setPaymentTerms}
                          select
                          options={paymentTermsOptions}
                        />
                        <LabeledField
                          name="paymentMethod"
                          label="Payment Method"
                          required
                          value={paymentMethod}
                          onChange={setPaymentMethod}
                          select
                          options={paymentMethodOptions}
                        />
                        <LabeledField
                          name="annualRateIncrease"
                          label="Annual Rate Increase"
                          required
                          placeholder="Enter annual rate increase"
                          value={annualRateIncrease}
                          onChange={setAnnualRateIncrease}
                          htmlInput={{ inputMode: 'decimal' }}
                        />
                        <LabeledField
                          name="billingType"
                          label="Billing Type"
                          required
                          value={billingType}
                          onChange={setBillingType}
                          select
                          options={billingTypeOptions}
                        />
                        <LabeledField
                          name="contractType"
                          label="Contract Type"
                          required
                          value={contractType}
                          onChange={setContractType}
                          select
                          options={contractTypeOptions}
                        />
                        <LabeledField
                          name="billingFrequency"
                          label="Billing Frequency"
                          required
                          value={billingFrequency}
                          onChange={setBillingFrequency}
                          select
                          options={billingFrequencyOptions}
                        />
                        <Stack spacing={0.75} sx={{ width: '100%' }}>
                          <Typography sx={figmaLabelSx}>
                            Payment Portal
                            <RequiredAsterisk />
                          </Typography>
                          <Autocomplete
                            options={paymentModeOptions}
                            value={paymentModeOptions.find((o) => o.value === paymentMode) ?? null}
                            onChange={(_, next) => setPaymentMode(next?.value ?? '')}
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
                                name="paymentMode"
                                size="small"
                                placeholder="Select payment portal"
                                sx={figmaTextFieldSx}
                              />
                            )}
                          />
                        </Stack>
                      </Box>
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
                            sx={{ width: { xs: '100%', sm: 220 }, flexShrink: 0 }}
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

              <FormSection id="section-signee" title="Signee">
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Stack sx={{ minWidth: { xs: 560, sm: 640 }, gap: 2, alignItems: 'stretch' }}>
                    {signeeCards.length === 0 && !addSigneeRowOpen ? (
                      <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#86868B' }}>
                        No signees yet. Use Add Signee to add one.
                      </Typography>
                    ) : (
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: SIGNEE_TABLE_COLUMNS,
                          columnGap: 2,
                          rowGap: 1.5,
                          alignItems: 'center',
                          width: '100%',
                        }}
                      >
                        <Box sx={signeeColSx}>
                          <Typography sx={signeeHeaderSx}>Name</Typography>
                        </Box>
                        <Box sx={signeeColSx}>
                          <Typography sx={signeeHeaderSx}>Title</Typography>
                        </Box>
                        <Box sx={signeeColSx}>
                          <Typography sx={signeeHeaderSx}>Email</Typography>
                        </Box>
                        <Box sx={signeeColSx} />

                        {signeeCards.map((s) => (
                          <Box
                            key={s.id}
                            sx={{
                              display: 'contents',
                            }}
                          >
                            <Box sx={signeeColSx}>
                              <InlineEditableText
                                name={`signeeName-${s.id}`}
                                value={s.name}
                                emphasize
                                placeholder="Name"
                                onChange={(v) => {
                                  setSigneeCards((prev) =>
                                    prev.map((c) => (c.id === s.id ? { ...c, name: v } : c)),
                                  );
                                }}
                              />
                            </Box>
                            <Box sx={signeeColSx}>
                              <InlineEditableText
                                name={`signeeTitle-${s.id}`}
                                value={s.title ?? ''}
                                placeholder="Title"
                                onChange={(v) => {
                                  setSigneeCards((prev) =>
                                    prev.map((c) => (c.id === s.id ? { ...c, title: v || undefined } : c)),
                                  );
                                }}
                              />
                            </Box>
                            <Box sx={signeeColSx}>
                              <InlineEditableText
                                name={`signeeEmail-${s.id}`}
                                value={s.email ?? ''}
                                placeholder="Email"
                                onChange={(v) => {
                                  setSigneeCards((prev) =>
                                    prev.map((c) => (c.id === s.id ? { ...c, email: v || undefined } : c)),
                                  );
                                }}
                              />
                            </Box>
                            <Box sx={signeeColSx}>
                              <Stack
                                direction="row"
                                sx={{
                                  alignItems: 'center',
                                  justifyContent: 'flex-end',
                                  minWidth: 0,
                                }}
                              >
                                <IconButton
                                  type="button"
                                  size="small"
                                  aria-label={`Remove ${s.name}`}
                                  onClick={() => {
                                    setSigneeCards((prev) => prev.filter((c) => c.id !== s.id));
                                  }}
                                  sx={{
                                    color: '#86868B',
                                    border: '1px solid #E6E6E7',
                                    borderRadius: '8px',
                                    width: 36,
                                    height: 36,
                                    '&:hover': { bgcolor: '#F5F5F6', color: '#6A6A70', borderColor: '#D0CFD2' },
                                  }}
                                >
                                  <CloseOutlined sx={{ fontSize: 18 }} />
                                </IconButton>
                              </Stack>
                            </Box>
                          </Box>
                        ))}

                        {addSigneeRowOpen ? (
                          <>
                            <Box sx={signeeColSx}>
                              <LabeledField
                                name="newSigneeName"
                                label={undefined}
                                value={newSigneeName}
                                onChange={setNewSigneeName}
                                placeholder="Name"
                              />
                            </Box>
                            <Box sx={signeeColSx}>
                              <LabeledField
                                name="newSigneeTitle"
                                label={undefined}
                                value={newSigneeTitle}
                                onChange={setNewSigneeTitle}
                                placeholder="Title"
                              />
                            </Box>
                            <Box sx={signeeColSx}>
                              <LabeledField
                                name="newSigneeEmail"
                                label={undefined}
                                value={newSigneeEmail}
                                onChange={setNewSigneeEmail}
                                placeholder="Email"
                              />
                            </Box>
                            <Box sx={signeeColSx}>
                              <Stack
                                direction="row"
                                spacing={0.75}
                                sx={{ alignItems: 'center', justifyContent: 'flex-end' }}
                              >
                                <IconButton
                                  type="button"
                                  size="small"
                                  aria-label="Cancel add signee"
                                  onClick={() => {
                                    setAddSigneeRowOpen(false);
                                    setNewSigneeName('');
                                    setNewSigneeEmail('');
                                    setNewSigneeTitle('');
                                  }}
                                  sx={{
                                    color: '#86868B',
                                    border: '1px solid #E6E6E7',
                                    borderRadius: '8px',
                                    width: 36,
                                    height: 36,
                                    '&:hover': { bgcolor: '#F5F5F6', color: '#6A6A70', borderColor: '#D0CFD2' },
                                  }}
                                >
                                  <CloseOutlined sx={{ fontSize: 18 }} />
                                </IconButton>
                                <IconButton
                                  type="button"
                                  size="small"
                                  aria-label="Add signee"
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
                                  sx={{
                                    color: '#146dff',
                                    bgcolor: '#E8F1FF',
                                    border: '1px solid #E6E6E7',
                                    borderRadius: '8px',
                                    width: 36,
                                    height: 36,
                                    '&:hover': { bgcolor: '#D6E8FF', borderColor: '#D0CFD2' },
                                  }}
                                >
                                  <EastOutlined sx={{ fontSize: 18 }} />
                                </IconButton>
                              </Stack>
                            </Box>
                          </>
                        ) : null}
                      </Box>
                    )}
                    <Button
                      type="button"
                      onClick={() => setAddSigneeRowOpen(true)}
                      variant="text"
                      disableRipple
                      startIcon={<AddOutlined sx={{ fontSize: 16, color: '#146dff' }} />}
                      sx={{
                        alignSelf: 'flex-start',
                        py: 0.75,
                        px: 0,
                        minWidth: 0,
                        textTransform: 'none',
                        fontSize: 14,
                        fontWeight: 500,
                        lineHeight: '20px',
                        color: '#146dff',
                        '&:hover': { bgcolor: 'transparent', color: '#0f5ad6' },
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
            px: isMobileVariant ? 1.5 : { xs: 1.5, sm: 3, md: 4 },
            py: 1.5,
            zIndex: (t) => t.zIndex.appBar,
            boxShadow: { xs: '0 -4px 12px rgba(0,0,0,0.06)', sm: isMobileVariant ? '0 -4px 12px rgba(0,0,0,0.06)' : 'none' },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '100%', mx: 'auto' }}>
            <Stack
              direction={isMobileVariant ? 'column-reverse' : { xs: 'column-reverse', sm: 'row' }}
              spacing={1.5}
              sx={{
                alignItems: isMobileVariant ? 'stretch' : { xs: 'stretch', sm: 'center' },
                justifyContent: { sm: 'flex-end' },
              }}
            >
              <Button
                type="button"
                fullWidth={!isSmUp || isMobileVariant}
                variant="outlined"
                size="medium"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                fullWidth={!isSmUp || isMobileVariant}
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
                        Create a New Contact
                      </Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#5B5B5F' }}>
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
                    <Grid size={{ xs: 12, md: 6 }}>
                      <LabeledField
                        name="newContactFirstName"
                        label="First Name"
                        required
                        placeholder="First name"
                        value={createContactFirstName}
                        onChange={setCreateContactFirstName}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <LabeledField
                        name="newContactLastName"
                        label="Last Name"
                        required
                        placeholder="Last name"
                        value={createContactLastName}
                        onChange={setCreateContactLastName}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <LabeledField
                        name="newContactEmail"
                        label="Email Address"
                        required
                        placeholder="Add email address"
                        value={createContactEmail}
                        onChange={setCreateContactEmail}
                        htmlInput={{ autoComplete: 'email' }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <LabeledField
                        name="newContactJobTitle"
                        label="Job Title"
                        required
                        placeholder="Job title"
                        value={createContactJobTitle}
                        onChange={setCreateContactJobTitle}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={0.75} sx={{ width: '100%' }}>
                        <Typography sx={figmaLabelSx}>
                          Phone No.
                          <RequiredAsterisk />
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          placeholder="Phone Number"
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
                      const id = `contact_${Date.now()}`;
                      setContactDirectory((prev) => [
                        ...prev,
                        {
                          id,
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
                        placeholder="e.g., www.teamsignal.com"
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

            <ProfitabilityOverviewDrawer
              open={Boolean(profitabilityServiceId)}
              onClose={() => setProfitabilityServiceId(null)}
              hourlyRate={
                serviceProducts.find((s) => s.id === profitabilityServiceId)?.kind === 'patrol'
                  ? (serviceProducts.find((s) => s.id === profitabilityServiceId)?.pricePerVisit ?? '')
                  : (serviceProducts.find((s) => s.id === profitabilityServiceId)?.hourlyRate ?? '')
              }
              onHourlyRateChange={(v) => {
                if (!profitabilityServiceId) return;
                const svc = serviceProducts.find((s) => s.id === profitabilityServiceId);
                if (!svc) return;
                if (svc.kind === 'patrol') {
                  updateSignalService(profitabilityServiceId, { pricePerVisit: v });
                } else {
                  updateSignalService(profitabilityServiceId, { hourlyRate: v });
                }
              }}
            />

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
                  if (prev.some((p) => p.address === mockAddress)) {
                    return prev.map((p) =>
                      p.address === mockAddress
                        ? {
                            address: mockAddress,
                            propertyName: '',
                            franchiseAssociation: '',
                            propertySource: '',
                            affiliations: [],
                            companyName: companyName.trim(),
                          }
                        : p,
                    );
                  }
                  return [
                    ...prev,
                    {
                      address: mockAddress,
                      propertyName: '',
                      franchiseAssociation: '',
                      propertySource: '',
                      affiliations: [],
                      companyName: companyName.trim(),
                    },
                  ];
                });
              }}
            />
      </Box>
    </Box>
  );
}


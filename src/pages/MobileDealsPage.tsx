import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const C = {
  bg: '#F6F6F8',
  white: '#FFFFFF',
  black: '#000000',
  blue: '#004FE3',
  grey700: '#4D4D51',
  grey400: '#86868B',
  grey100: '#E6E6E7',
  red: '#DB0000',
} as const;

type Deal = {
  id: string;
  amount: string;
  name: string;
  address: string;
  franchise: string;
  requiresSignature: boolean;
};

const DEALS: Deal[] = [
  { id: '#2301', amount: '$10,000', name: 'Costco Wholesale',  address: '456 Elm Avenue, Chandler, AZ, 10128', franchise: 'H&M',     requiresSignature: true },
  { id: '#2302', amount: '$24,500', name: 'Gavinci Bank',      address: '820 Oak Street, Phoenix, AZ, 85001',  franchise: 'Chase',   requiresSignature: false },
  { id: '#2303', amount: '$8,750',  name: 'H&M Store',         address: '101 Market Blvd, Tempe, AZ, 85281',  franchise: 'H&M',     requiresSignature: true },
  { id: '#2304', amount: '$53,200', name: 'Pacific Traders',   address: '77 Harbor Drive, Scottsdale, AZ, 85254', franchise: 'Nike', requiresSignature: false },
];

const FILTERS = ['Proposal Status', 'Stage', 'Deal Type', 'Market Vertical'];

function DealCard({ deal }: { deal: Deal }) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '8px',
        p: 2,
        boxShadow: '0px 4px 6px rgba(0,0,0,0.04)',
        cursor: 'pointer',
        '&:active': { opacity: 0.85 },
      }}
    >
      {/* Top row: ID + amount + chevron */}
      <Stack
        direction="row"
        sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}
      >
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: 12, color: C.grey700, lineHeight: 'normal' }}>
            ID {deal.id}
          </Typography>
          <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: C.grey700 }} />
          <Typography sx={{ fontSize: 12, color: C.grey700, lineHeight: 'normal' }}>
            Company Amount{' '}
            <Box component="span">{deal.amount}</Box>
          </Typography>
        </Stack>
        <ChevronRightIcon sx={{ fontSize: 20, color: C.grey700 }} />
      </Stack>

      {/* Deal name */}
      <Typography sx={{ fontSize: 16, fontWeight: 600, color: C.black, lineHeight: '20px', mb: 1.5 }}>
        {deal.name}
      </Typography>

      {/* Address */}
      <Stack direction="row" sx={{ alignItems: 'flex-start', gap: 0.5, mb: 1.5 }}>
        <LocationOnOutlinedIcon sx={{ fontSize: 16, color: C.grey700, mt: '1px', flexShrink: 0 }} />
        <Typography sx={{ fontSize: 14, color: C.grey700, lineHeight: 'normal' }}>
          {deal.address}
        </Typography>
      </Stack>

      {/* Franchise */}
      <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, mb: 1.5 }}>
        <StoreOutlinedIcon sx={{ fontSize: 16, color: C.grey700, flexShrink: 0 }} />
        <Typography sx={{ fontSize: 14, color: C.grey700, lineHeight: 'normal' }}>
          {deal.franchise}
        </Typography>
      </Stack>

      {/* Requires Signature */}
      {deal.requiresSignature && (
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
          <InfoOutlinedIcon sx={{ fontSize: 16, color: C.red, flexShrink: 0 }} />
          <Typography sx={{ fontSize: 14, color: C.red, lineHeight: 'normal' }}>
            Requires Signature
          </Typography>
        </Stack>
      )}
    </Paper>
  );
}

function BottomTab({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Stack
      sx={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.25,
        pt: 0.5,
      }}
    >
      <Box sx={{ color: active ? '#1A9E4A' : C.grey400, display: 'flex' }}>{icon}</Box>
      <Typography sx={{ fontSize: 12, fontWeight: 500, color: active ? '#1A9E4A' : C.grey400, lineHeight: 'normal' }}>
        {label}
      </Typography>
    </Stack>
  );
}

export function MobileDealsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = DEALS.filter(
    (d) =>
      search === '' ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.includes(search),
  );

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
        id="mobile-shell"
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
        {/* ── Status bar ── */}
        <Box
          sx={{
            height: 44,
            px: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(7px)',
            borderBottom: `0.5px solid ${C.grey100}`,
            flexShrink: 0,
          }}
        >
          <Typography sx={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.165 }}>9:41</Typography>
          <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center' }}>
            <Box sx={{ width: 17, height: 12, bgcolor: C.black, borderRadius: '2px', opacity: 0.8 }} />
          </Stack>
        </Box>

        {/* ── App header ── */}
        <Box
          sx={{
            bgcolor: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(7px)',
            borderBottom: `0.5px solid ${C.grey100}`,
            flexShrink: 0,
          }}
        >
          {/* Title row */}
          <Stack
            direction="row"
            sx={{ alignItems: 'center', justifyContent: 'space-between', px: 2, height: 60 }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: 700, color: C.black, lineHeight: '32px' }}>
              Deals
            </Typography>
            <IconButton
              size="small"
              onClick={() => setSheetOpen(true)}
              sx={{
                bgcolor: '#1A9E4A',
                color: C.white,
                width: 32,
                height: 32,
                borderRadius: '50%',
                '&:hover': { bgcolor: '#158040' },
              }}
            >
              <AddIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>

          {/* Search bar */}
          <Box sx={{ px: 2, pb: 1 }}>
            <Stack
              direction="row"
              sx={{ alignItems: 'center', gap: 1, bgcolor: C.bg, borderRadius: '10px', px: 2, height: 36 }}
            >
              <SearchIcon sx={{ fontSize: 16, color: C.grey400 }} />
              <InputBase
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ flex: 1, fontSize: 16, color: C.grey400, '& input': { p: 0 } }}
              />
            </Stack>
          </Box>

          {/* Filter pills */}
          <Box
            sx={{
              px: 2,
              pb: 1,
              display: 'flex',
              gap: 1,
              overflowX: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {FILTERS.map((f) => (
              <Button
                key={f}
                disableRipple
                endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
                sx={{
                  bgcolor: C.bg,
                  color: C.black,
                  borderRadius: '48px',
                  height: 38,
                  px: 2,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: -0.08,
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  '& .MuiButton-endIcon': { ml: 0.5 },
                  '&:hover': { bgcolor: C.grey100 },
                }}
              >
                {f}
              </Button>
            ))}
          </Box>
        </Box>

        {/* ── Deal list (scrollable) ── */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: 2,
            pt: 2,
            pb: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {filtered.map((deal, i) => (
            <DealCard key={i} deal={deal} />
          ))}
        </Box>

        {/* ── Bottom navigation ── */}
        <Box
          sx={{
            flexShrink: 0,
            bgcolor: C.white,
            borderTop: `0.5px solid ${C.grey100}`,
            boxShadow: '0px -24px 16px rgba(0,0,0,0.08)',
          }}
        >
          <Stack direction="row" sx={{ height: 46 }}>
            <BottomTab icon={<HomeOutlinedIcon sx={{ fontSize: 22 }} />} label="Home" />
            <BottomTab icon={<FmdGoodOutlinedIcon sx={{ fontSize: 22 }} />} label="Properties" />
            <BottomTab icon={<HandshakeOutlinedIcon sx={{ fontSize: 22 }} />} label="Deals" active />
            <BottomTab icon={<RouteOutlinedIcon sx={{ fontSize: 22 }} />} label="Routes" />
          </Stack>

          {/* iPhone home indicator */}
          <Box sx={{ height: 34, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', pb: 1 }}>
            <Box sx={{ width: 134, height: 5, bgcolor: C.black, borderRadius: '100px' }} />
          </Box>
        </Box>

        {/* ── Backdrop ── */}
        {sheetOpen && (
          <Box
            onClick={() => setSheetOpen(false)}
            sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(0,0,0,0.35)',
              zIndex: 10,
            }}
          />
        )}

        {/* ── Create action bottom sheet ── */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 11,
            bgcolor: C.white,
            borderRadius: '20px 20px 0 0',
            transform: sheetOpen ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
            boxShadow: '0px -4px 24px rgba(0,0,0,0.12)',
          }}
        >
          {/* Drag handle */}
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.5, pb: 1 }}>
            <Box sx={{ width: 40, height: 4, bgcolor: C.grey100, borderRadius: '100px' }} />
          </Box>

          {/* Create Deal */}
          <Stack
            direction="row"
            onClick={() => setSheetOpen(false)}
            sx={{
              alignItems: 'center',
              gap: 1.5,
              px: 2,
              py: 1.75,
              cursor: 'pointer',
            }}
          >
            <AddCircleOutlineOutlinedIcon sx={{ color: '#1A9E4A', fontSize: 22 }} />
            <Typography sx={{ fontSize: 16, fontWeight: 500, color: C.black }}>
              Create Deal
            </Typography>
          </Stack>

          {/* Create Smart Contract */}
          <Stack
            direction="row"
            onClick={() => { setSheetOpen(false); navigate('/mobile-contract'); }}
            sx={{
              alignItems: 'center',
              gap: 1.5,
              px: 2,
              py: 1.75,
              cursor: 'pointer',
            }}
          >
            <ArticleOutlinedIcon sx={{ color: '#1A9E4A', fontSize: 22 }} />
            <Typography sx={{ fontSize: 16, fontWeight: 500, color: C.black }}>
              Create Smart Contract
            </Typography>
          </Stack>

          {/* iOS safe-area spacing */}
          <Box sx={{ height: 28 }} />
        </Box>
      </Box>
    </Box>
  );
}

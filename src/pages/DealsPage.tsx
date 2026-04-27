import Add from '@mui/icons-material/Add';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Repeat from '@mui/icons-material/Repeat';
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const assets = {
  // Sidebar
  wordmark: 'https://www.figma.com/api/mcp/asset/b383f08a-2ee2-4182-8425-9d9c2c1775ca',
  lastPage: 'https://www.figma.com/api/mcp/asset/350aceba-ddd0-42ea-a4c6-9071ac4fc152',
  sidebar: {
    dashboard: 'https://www.figma.com/api/mcp/asset/8d98c452-eb87-413a-8088-8735ff92ff06',
    company: 'https://www.figma.com/api/mcp/asset/9fb49f27-8478-478b-9fad-3fbf8d61f34b',
    mapPin: 'https://www.figma.com/api/mcp/asset/fbb49c00-3a70-448a-84f7-a76d678f670f',
    deal: 'https://www.figma.com/api/mcp/asset/8e6dd3ea-f0b5-4d7a-91a4-e31d899e8858',
    contact: 'https://www.figma.com/api/mcp/asset/664ebf81-1d0a-48a0-a5b7-b0f8645a6fca',
    public: 'https://www.figma.com/api/mcp/asset/46a2a309-bba3-4168-939e-15389ebe6dea',
    users: 'https://www.figma.com/api/mcp/asset/9fd54eac-22ae-4f6a-b6e4-ab3a7b6478d9',
    checklist: 'https://www.figma.com/api/mcp/asset/1a43c57f-6efa-4c55-850f-7f1a88120021',
    trello: 'https://www.figma.com/api/mcp/asset/432ea8f0-71ef-44fc-80be-3fe8df0c8c2b',
    scouting1: 'https://www.figma.com/api/mcp/asset/4a3e4ce6-44dc-4439-8e69-294ae4d87804',
    scouting2: 'https://www.figma.com/api/mcp/asset/c15febca-3db7-48ab-9b9b-9f24bafe6826',
    settings: 'https://www.figma.com/api/mcp/asset/bcd1fc9a-003e-4681-8213-df0ce04179b6',
  },

  // Header
  dealIcon: 'https://www.figma.com/api/mcp/asset/7ecc1ca0-41d6-4bc0-bc8e-1269e79dd762',
  bell: 'https://www.figma.com/api/mcp/asset/be148be8-5361-4cc4-a600-94e6b0e68544',
  profileAvatar: 'https://www.figma.com/api/mcp/asset/d6e5c86d-3211-40f0-82dd-3d97f0f0bbc1',

  // Filters row
  search: 'https://www.figma.com/api/mcp/asset/2da28849-0614-4746-95bd-b6470fea58d0',
  filterList: 'https://www.figma.com/api/mcp/asset/797672e8-15b9-480a-ba54-3c4d3acccd74',

  // Graphs (Figma node 1068:14359 — Deal graphs)
  donutVerticles: 'https://www.figma.com/api/mcp/asset/09c7ea05-a399-46d0-8bad-9419f7edc6bc',
  donutAmount: 'https://www.figma.com/api/mcp/asset/bfd67dd2-fa90-4dfd-bed6-fc5e71675a08',
  dealsWonLostChart: 'https://www.figma.com/api/mcp/asset/e2556584-2145-4894-a2ae-d3be6bacb719',

};

function FigmaIcon({ src, size }: { src: string; size: [number, number] }) {
  return (
    <Box
      component="img"
      alt=""
      src={src}
      sx={{
        width: size[0],
        height: size[1],
        display: 'block',
        flexShrink: 0,
      }}
    />
  );
}

type DealRow = {
  id: string;
  name: string;
  amount: string;
  owner: { name: string; avatar: string };
  stage: { label: string; tone: 'blue' | 'orange' | 'red' | 'green' | 'purple' | 'mint' };
  vertical: { label: string; tone: 'purple' };
  dealType: { label: string; tone: 'orange' | 'purple' | 'blue' | 'red' };
  franchise: string;
  address: string;
  location: string;
  country: string;
  state: string;
  hasRepeat?: boolean;
  showAlert?: boolean;
};

function toneChipSx(tone: DealRow['stage']['tone']) {
  const map: Record<DealRow['stage']['tone'], { bg: string; fg: string }> = {
    blue: { bg: '#E5F6FF', fg: '#146DFF' },
    orange: { bg: '#FEF0C7', fg: '#DC6803' },
    red: { bg: '#FBEEED', fg: '#B32318' },
    green: { bg: '#EFF8EF', fg: '#2E964B' },
    purple: { bg: '#F2EAFE', fg: '#7B3FF2' },
    mint: { bg: '#EFF8EF', fg: '#2E964B' },
  };
  const t = map[tone];
  return {
    height: 24,
    borderRadius: 100,
    bgcolor: t.bg,
    color: t.fg,
    fontWeight: 500,
    fontSize: 12,
    '& .MuiChip-label': { px: 1.25 },
  } as const;
}

function DealsSidebar() {
  const icons = useMemo(
    () => [
      { src: assets.sidebar.dashboard, selected: false, alt: 'dashboard', size: 20, padding: 12 },
      { src: assets.sidebar.company, selected: false, alt: 'company', size: 20, padding: 12 },
      { src: assets.sidebar.mapPin, selected: false, alt: 'map-pin', size: 20, padding: 12 },
      { src: assets.sidebar.deal, selected: true, alt: 'deal', size: 20, padding: 12 },
      { src: assets.sidebar.contact, selected: false, alt: 'contact', size: 20, padding: 12 },
      { src: assets.sidebar.public, selected: false, alt: 'public', size: 20, padding: 12 },
      { src: assets.sidebar.users, selected: false, alt: 'users', size: 20, padding: 12 },
      { src: assets.sidebar.checklist, selected: false, alt: 'checklist', size: 20, padding: 12 },
      { src: assets.sidebar.trello, selected: false, alt: 'trello', size: 20, padding: 12 },
      { src: assets.sidebar.scouting1, selected: false, alt: 'scouting', size: 20, padding: 12, dual: assets.sidebar.scouting2 },
      { src: assets.sidebar.settings, selected: false, alt: 'settings', size: 20, padding: 12 },
    ],
    [],
  );

  return (
    <Box sx={{ width: 76, height: '100vh', bgcolor: '#262527', position: 'relative', flexShrink: 0 }}>
      <Box sx={{ px: 1, py: 2, display: 'flex', justifyContent: 'center' }}>
        <Box component="img" alt="Filtergo" src={assets.wordmark} sx={{ width: 58, height: 18 }} />
      </Box>

      <Stack spacing={0} sx={{ px: 1, pt: 2 }}>
        {icons.map((ic) => (
          <Box
            key={ic.alt}
            sx={{
              width: 44,
              height: 44,
              mx: 'auto',
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              bgcolor: ic.selected ? '#2DA551' : 'transparent',
            }}
          >
            {ic.dual ? (
              <Box sx={{ position: 'relative', width: 20, height: 20 }}>
                <Box component="img" alt="" src={ic.src} sx={{ position: 'absolute', inset: 0, width: 20, height: 20 }} />
                <Box component="img" alt="" src={ic.dual} sx={{ position: 'absolute', inset: 0, width: 20, height: 20 }} />
              </Box>
            ) : (
              <Box component="img" alt="" src={ic.src} sx={{ width: ic.size, height: ic.size }} />
            )}
          </Box>
        ))}
      </Stack>

      <Box
        sx={{
          position: 'absolute',
          // Half-overlap the main column like Figma (x≈90 on a 76px rail)
          right: -14,
          top: 436,
          width: 28,
          height: 28,
          zIndex: 1,
        }}
      >
        <Box sx={{ width: 28, height: 28, transform: 'rotate(180deg)' }}>
          <FigmaIcon src={assets.lastPage} size={[28, 28]} />
        </Box>
      </Box>
    </Box>
  );
}

function DealsHeader() {
  return (
    <Box
      sx={{
        height: 50,
        bgcolor: '#FFFFFF',
        borderBottom: '1px solid #E6E6E7',
        px: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ width: 24, height: 24, borderRadius: 1, display: 'grid', placeItems: 'center' }}>
          <FigmaIcon src={assets.dealIcon} size={[20, 20]} />
        </Box>
        <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#262527' }}>Deals</Typography>
      </Box>

      <Box
        sx={{
          minHeight: 36,
          border: '1px solid #E6E6E7',
          borderRadius: 2,
          px: 1.75,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: 'transparent',
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#444446' }}>United States</Typography>
        <KeyboardArrowDown sx={{ fontSize: 20, color: '#6A6A70' }} />
      </Box>

      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexShrink: 0 }}>
        <FigmaIcon src={assets.bell} size={[20, 20]} />
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Avatar src={assets.profileAvatar} sx={{ width: 32, height: 32 }} />
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <Box sx={{ display: 'grid', gap: 0, justifyContent: 'center' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#444446' }}>Jeff Zolos</Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#86868B' }}>BD Executive</Typography>
            </Box>
            <KeyboardArrowDown sx={{ fontSize: 14, color: '#6A6A70' }} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

function DealGraphs() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        minHeight: { xs: 0, lg: 267 },
        height: { xs: 'auto', lg: 267 },
        bgcolor: '#FFFFFF',
        border: '1px solid #E6E6E7',
        borderRadius: 0,
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr 2fr' },
        gridTemplateRows: 'minmax(0, 1fr)',
        // Exactly 3 cells — do not use Divider as grid children or the 3rd chart wraps to a new row
        boxSizing: 'border-box',
        alignSelf: 'stretch',
      }}
    >
        {/* Left card */}
        <Box sx={{ p: { xs: 2, sm: 3 }, pr: { xs: 2, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
          <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#262527' }}>
            Deals Breakdown by Verticles
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline', mt: 0.5 }}>
            <Typography sx={{ fontSize: 24, fontWeight: 700, lineHeight: '32px', color: '#262527' }}>1,200</Typography>
            <Typography sx={{ fontSize: 10, fontWeight: 500, lineHeight: '14px', color: '#6A6A70' }}>total deals</Typography>
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 4 }}
            sx={{ mt: 3, alignItems: { xs: 'flex-start', sm: 'center' } }}
          >
            <Stack spacing={1.5} sx={{ flex: 1, minWidth: 0 }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Box sx={{ width: 10, height: 10, bgcolor: '#146DFF', borderRadius: 0.5 }} />
                <Typography sx={{ fontSize: 10, lineHeight: '14px', color: '#5B5B5F' }}>
                  <Box component="span" sx={{ color: '#5B5B5F', fontWeight: 500 }}>
                    50%
                  </Box>{' '}
                  <Box component="span" sx={{ color: '#86868B' }}>
                    Hyperstores
                  </Box>
                </Typography>
              </Stack>
              <Stack spacing={1.5}>
                {[
                  { c: '#A9DEFF', pct: '10%', label: 'Education' },
                  { c: '#31A150', pct: '5%', label: 'Healthcare' },
                  { c: '#F4780B', pct: '15%', label: 'Residential', o: 0.8 },
                  { c: '#E43F32', pct: '20%', label: 'Others' },
                ].map((x) => (
                  <Stack key={x.label} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Box sx={{ width: 10, height: 10, bgcolor: x.c, borderRadius: 0.5, opacity: x.o ?? 1 }} />
                    <Typography sx={{ fontSize: 10, lineHeight: '14px', color: '#5B5B5F' }}>
                      <Box component="span" sx={{ color: '#5B5B5F', fontWeight: 500 }}>
                        {x.pct}
                      </Box>{' '}
                      <Box component="span" sx={{ color: '#86868B' }}>
                        {x.label}
                      </Box>
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
            <Box
              component="img"
              alt=""
              src={assets.donutVerticles}
              sx={{ width: 125, height: 125, flexShrink: 0, alignSelf: { xs: 'center', sm: 'auto' } }}
            />
          </Stack>
        </Box>

        {/* Middle card */}
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            pr: { xs: 2, sm: 2 },
            minWidth: 0,
            overflow: 'hidden',
            borderTop: { xs: '1px solid #E6E6E7', lg: 'none' },
            borderLeft: { xs: 'none', lg: '1px solid #E6E6E7' },
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#262527' }}>Total Deal Amount</Typography>
          <Typography sx={{ fontSize: 24, fontWeight: 700, lineHeight: '32px', color: '#262527', mt: 0.5 }}>$ 185.8M</Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 3.5 }}
            sx={{ mt: 3, alignItems: { xs: 'flex-start', sm: 'center' } }}
          >
            <Stack spacing={1.25} sx={{ flex: 1, minWidth: 0 }}>
              {[
                { c: '#31A150', label: 'Closed Won' },
                { c: '#146DFF', label: 'Contract Creation' },
                { c: '#F4780B', label: 'Contract Delivered', o: 0.8 },
              ].map((x) => (
                <Stack key={x.label} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Box sx={{ width: 10, height: 10, bgcolor: x.c, borderRadius: 0.5, opacity: x.o ?? 1 }} />
                  <Typography sx={{ fontSize: 10, fontWeight: 500, lineHeight: '14px', color: '#6A6A70' }}>{x.label}</Typography>
                </Stack>
              ))}
            </Stack>
            <Box
              component="img"
              alt=""
              src={assets.donutAmount}
              sx={{ width: 130, height: 130, flexShrink: 0, alignSelf: { xs: 'center', sm: 'auto' } }}
            />
          </Stack>
        </Box>

        {/* Right card — "Deals won vs lost" line chart (2fr column in Figma) */}
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            pl: { xs: 2, sm: 2 },
            minWidth: 0,
            position: 'relative',
            borderTop: { xs: '1px solid #E6E6E7', lg: 'none' },
            borderLeft: { xs: 'none', lg: '1px solid #E6E6E7' },
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, flexShrink: 0, gap: 1 }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#262527' }}>Deals won vs lost</Typography>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', rowGap: 0.5, columnGap: 2 }}>
              <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                <Box sx={{ width: 14.064, height: 7.928, bgcolor: '#E43F32', borderRadius: 1 }} />
                <Typography sx={{ fontSize: 10, fontWeight: 500, lineHeight: '14px', color: '#6A6A70' }}>Closed Lost</Typography>
              </Stack>
              <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                <Box sx={{ width: 14.064, height: 7.928, bgcolor: '#31A150', borderRadius: 1 }} />
                <Typography sx={{ fontSize: 10, fontWeight: 500, lineHeight: '14px', color: '#6A6A70' }}>Closed Won</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={0} sx={{ mt: 2, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
            <Stack
              sx={{
                flexShrink: 0,
                width: 32,
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                pr: 0.5,
                py: 0.25,
              }}
            >
              {['1,800', '1,200', '600', '0'].map((v) => (
                <Typography
                  key={v}
                  sx={{ fontSize: 10, fontWeight: 500, lineHeight: '14px', color: '#262527', opacity: 0.5 }}
                >
                  {v}
                </Typography>
              ))}
            </Stack>
            <Box
              component="img"
              alt="Deals won vs lost"
              src={assets.dealsWonLostChart}
              sx={{
                flex: 1,
                minWidth: 0,
                width: 0,
                height: { xs: 160, sm: 170 },
                objectFit: 'contain',
                objectPosition: 'left center',
                display: 'block',
              }}
            />
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: { xs: 'center', sm: 'space-between' },
              mt: 1,
              flexWrap: 'wrap',
              gap: { xs: 0.5, sm: 0.25 },
              rowGap: 0.5,
            }}
          >
            {["Jan’ 23", "Feb’ 23", "Mar’ 23", "Apr’ 23", "May’ 23", "Jun’ 23", "Jul’ 23", "Aug’ 23", "Sep’ 23", "Oct’ 23", "Nov’ 23", "Dec’ 23"].map(
              (m) => (
                <Typography
                  key={m}
                  sx={{ fontSize: 10, fontWeight: 500, lineHeight: '14px', color: '#86868B', textAlign: 'center', flex: '1 1 0', minWidth: 0 }}
                >
                  {m}
                </Typography>
              ),
            )}
          </Stack>
        </Box>
    </Box>
  );
}

function DealsFiltersRow() {
  const navigate = useNavigate();
  const [createMenuAnchor, setCreateMenuAnchor] = useState<null | HTMLElement>(null);
  const createMenuOpen = Boolean(createMenuAnchor);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
        alignSelf: 'stretch',
      }}
    >
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        sx={{
          alignItems: { xs: 'stretch', lg: 'center' },
          justifyContent: 'space-between',
          width: '100%',
          minWidth: 0,
          gap: 1.5,
          px: 3,
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flex: 1, minWidth: 0, flexWrap: 'wrap' }}>
          <Box
            sx={{
              height: 36,
              width: '230px',
              minWidth: '230px',
              maxWidth: '230px',
              flexShrink: 0,
              border: '1px solid #E6E6E7',
              borderRadius: '12px',
              bgcolor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              px: 1.75,
              gap: 1,
              boxSizing: 'border-box',
            }}
          >
            <FigmaIcon src={assets.search} size={[20, 20]} />
            <InputBase
              placeholder="Search by ID, location..."
              sx={{ fontSize: 12, lineHeight: '18px', color: '#86868B', width: '100%' }}
            />
          </Box>

          <Button
            variant="text"
            disableRipple
            endIcon={<KeyboardArrowDown sx={{ fontSize: 16, color: '#262527' }} />}
            sx={{
              height: 36,
              minHeight: 36,
              py: 0,
              px: 1.75,
              borderRadius: '8px',
              color: '#262527',
              bgcolor: 'transparent',
              fontSize: 12,
              lineHeight: '18px',
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
              '& .MuiButton-endIcon': { marginLeft: 0.5, marginRight: 0, display: 'inline-flex' },
            }}
          >
            All Deals
          </Button>

          <Button
            variant="text"
            disableRipple
            endIcon={<FigmaIcon src={assets.filterList} size={[16, 16]} />}
            sx={{
              height: 36,
              minHeight: 36,
              py: 0,
              px: 1.75,
              borderRadius: '12px',
              color: '#262527',
              bgcolor: 'transparent',
              fontSize: 12,
              lineHeight: '18px',
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
              '& .MuiButton-endIcon': { marginLeft: 0.5, marginRight: 0, display: 'inline-flex' },
            }}
          >
            More Filters
          </Button>
        </Stack>

        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flexShrink: 0 }}>
          <Button
            variant="outlined"
            sx={{
              height: 36,
              minHeight: 36,
              py: 0,
              px: 1.75,
              borderColor: '#D0CFD2',
              color: '#AEAEB2',
              textTransform: 'none',
              '&:hover': { borderColor: '#D0CFD2', bgcolor: 'transparent' },
            }}
          >
            Bulk Assignment
          </Button>

          <Button
            id="deals-create-button"
            variant="contained"
            color="primary"
            aria-controls={createMenuOpen ? 'deals-create-menu' : undefined}
            aria-expanded={createMenuOpen}
            aria-haspopup="true"
            startIcon={<Add sx={{ fontSize: 16 }} />}
            endIcon={
              <KeyboardArrowDown
                sx={{
                  fontSize: 16,
                  color: '#FFFFFF',
                  transform: createMenuOpen ? 'rotate(180deg)' : 'none',
                  transition: (theme) => theme.transitions.create('transform', { duration: 150 }),
                }}
              />
            }
            onClick={(e) => setCreateMenuAnchor(e.currentTarget)}
            sx={{
              height: 36,
              minHeight: 36,
              py: 0,
              px: 1.75,
              borderRadius: '8px',
              minWidth: 0,
              textTransform: 'none',
              fontWeight: 500,
              overflow: 'hidden',
              '&, &:hover, &:active': { borderRadius: '8px' },
              '& .MuiButton-startIcon': { marginLeft: 0, marginRight: 0.5, display: 'inline-flex' },
              '& .MuiButton-endIcon': { marginLeft: 0.5, marginRight: 0, display: 'inline-flex' },
            }}
          >
            Create
          </Button>
          <Menu
            id="deals-create-menu"
            anchorEl={createMenuAnchor}
            open={createMenuOpen}
            onClose={() => setCreateMenuAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
              list: { 'aria-labelledby': 'deals-create-button' },
              paper: {
                sx: {
                  mt: 0.5,
                  minWidth: 220,
                  borderRadius: '8px',
                  border: '1px solid #E6E6E7',
                  boxShadow: '0px 4px 16px rgba(0,0,0,0.08)',
                },
              },
            }}
          >
            <MenuItem
              onClick={() => setCreateMenuAnchor(null)}
              sx={{ fontSize: 14, py: 1.25, color: '#262527' }}
            >
              Create deal
            </MenuItem>
            <MenuItem
              onClick={() => {
                setCreateMenuAnchor(null);
                navigate('/contract');
              }}
              sx={{ fontSize: 14, py: 1.25, color: '#262527' }}
            >
              Create smart contract
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
}

type DealsTableCol = {
  key: 'select' | keyof DealRow;
  label: string;
  w: number;
};

const DEALS_TABLE_COLUMNS: DealsTableCol[] = [
  { key: 'select', label: '', w: 50 },
  { key: 'id', label: 'ID', w: 93 },
  { key: 'name', label: 'Deal Name', w: 280 },
  { key: 'amount', label: 'Amount', w: 112 },
  { key: 'owner', label: 'Deal Owner', w: 220 },
  { key: 'stage', label: 'Stage', w: 168 },
  { key: 'vertical', label: 'Market Vertical', w: 160 },
  { key: 'dealType', label: 'Deal Type', w: 128 },
  { key: 'franchise', label: 'Associated Franchise', w: 200 },
  { key: 'address', label: 'Address', w: 180 },
  { key: 'location', label: 'Location', w: 220 },
  { key: 'country', label: 'Country', w: 140 },
  { key: 'state', label: 'State', w: 140 },
];

const DEALS_TABLE_MIN_WIDTH = DEALS_TABLE_COLUMNS.reduce((sum, c) => sum + c.w, 0);

function DealsTable() {
  const rows: DealRow[] = useMemo(
    () => [
      {
        id: '#2300',
        name: 'KFC Routes',
        amount: '$414,786',
        owner: { name: 'Trachise Withrow', avatar: 'https://www.figma.com/api/mcp/asset/07f4b5c4-1dc8-49b9-8fc5-2a024cd336e9' },
        stage: { label: 'Contract Creation', tone: 'blue' },
        vertical: { label: 'Apartments', tone: 'purple' },
        dealType: { label: 'New', tone: 'orange' },
        franchise: 'Franchise name',
        address: '456 Elm Avenue',
        location: 'Costco Wholesale - Boys Town',
        country: 'United States',
        state: 'Arizona - AZ',
      },
      {
        id: '#4500',
        name: 'Mcdonalds Patrols',
        amount: '$236,745',
        owner: { name: 'Matt Quinn', avatar: 'https://www.figma.com/api/mcp/asset/0bef3b1e-19dc-4c42-8fae-76f8058bb0ce' },
        stage: { label: 'Terminated', tone: 'orange' },
        vertical: { label: 'Apartments', tone: 'purple' },
        dealType: { label: 'Existing', tone: 'purple' },
        franchise: 'Franchise name',
        hasRepeat: true,
        address: '789 Oak Drive',
        location: 'McDonalds - Y Block',
        country: 'United States',
        state: 'Arizona - AZ',
      },
      {
        id: '#0239',
        name: 'H&M Store - dedicated',
        amount: '$326,574',
        owner: { name: 'Jodi Wimer', avatar: 'https://www.figma.com/api/mcp/asset/0139ac94-a956-4149-84df-c0751acca97d' },
        stage: { label: 'Closed lost', tone: 'red' },
        vertical: { label: 'Apartments', tone: 'purple' },
        dealType: { label: 'Old', tone: 'blue' },
        franchise: 'Franchise name',
        address: '321 Pine Street',
        location: 'H&M Store = X Sector',
        country: 'United States',
        state: 'Florida - FL',
      },
      {
        id: '#1155',
        name: 'Charleston Rover Patrols',
        amount: '$348,756',
        owner: { name: 'Darin Smith', avatar: 'https://www.figma.com/api/mcp/asset/f2e29d6a-3ca4-46cd-a041-a46829bd08b4' },
        stage: { label: 'Closed won', tone: 'green' },
        vertical: { label: 'Apartments', tone: 'purple' },
        dealType: { label: 'Old', tone: 'blue' },
        franchise: 'Franchise name',
        address: '987 Maple Lane',
        location: "Charleston's Restaurant",
        country: 'United States',
        state: 'Arkansas - AR',
      },
      {
        id: '#3310',
        name: 'Milwaukee Tools Dedicated',
        amount: '$837,642',
        owner: { name: 'Don Crowell', avatar: 'https://www.figma.com/api/mcp/asset/9b865407-4730-4bbf-b832-b3b184922f4d' },
        stage: { label: 'Negotiation', tone: 'purple' },
        vertical: { label: 'Apartments', tone: 'purple' },
        dealType: { label: 'Existing', tone: 'purple' },
        franchise: 'Franchise name',
        address: '432 Aspen Lane',
        location: 'Milwaukee Tools - 432 Aspen',
        country: 'United States',
        state: 'Georgia - GA',
      },
      {
        id: '#1378',
        name: 'Walmart Dedicated x2',
        amount: '$465,786',
        owner: { name: 'Derrick Dancy', avatar: 'https://www.figma.com/api/mcp/asset/e44286c7-801e-4591-b759-428f2c4b259f' },
        stage: { label: 'Contract Creation', tone: 'blue' },
        vertical: { label: 'Apartments', tone: 'purple' },
        dealType: { label: 'New', tone: 'orange' },
        franchise: 'Franchise name',
        address: '456 Elm Avenue',
        location: 'Brian Mart - DHA',
        country: 'United States',
        state: 'Georgia - GA',
      },
      {
        id: '#4520',
        name: 'Park Lane Dedicated',
        amount: '$483,765',
        owner: { name: 'Zach Alsterberg', avatar: 'https://www.figma.com/api/mcp/asset/12b000ce-2ff2-4d63-9dce-9bbee8fb263f' },
        stage: { label: 'Negotiation', tone: 'purple' },
        vertical: { label: 'Apartments', tone: 'purple' },
        dealType: { label: 'Lost', tone: 'red' },
        franchise: 'Franchise name',
        address: '789 Oak Drive',
        location: 'Franchise name',
        country: 'United States',
        state: 'Kansas - KS',
      },
      {
        id: '#2941',
        name: 'Zorinski Lake Armed Officer',
        amount: '$987,643',
        owner: { name: 'Jeff Chovan', avatar: 'https://www.figma.com/api/mcp/asset/4d2dc735-3937-4d52-8187-3fd5de25e238' },
        stage: { label: 'Label', tone: 'mint' },
        vertical: { label: 'Apartments', tone: 'purple' },
        dealType: { label: 'Old', tone: 'blue' },
        franchise: 'Franchise name',
        address: '321 Pine Street',
        location: 'Franchise name',
        country: 'United States',
        state: 'Florida - FL',
      },
    ],
    [],
  );

  const colW = (w: number) => ({ width: w, minWidth: w, maxWidth: w, boxSizing: 'border-box' as const });

  /* Table layout: one `<table>` so header and body column widths line up (flex rows can drift). */
  const headCell = (c: (typeof DEALS_TABLE_COLUMNS)[number]) => ({
    ...colW(c.w),
    height: 44,
    py: 0,
    px: c.key === 'select' ? 0.5 : 3,
    borderBottom: '1px solid #E6E6E7',
    borderLeft: c.key === 'address' ? '1px solid #E6E6E7' : 'none',
    bgcolor: '#FFFFFF',
    color: '#5B5B5F',
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '18px',
    verticalAlign: 'middle' as const,
  });
  const bodyCell = (c: (typeof DEALS_TABLE_COLUMNS)[number]) => ({
    ...colW(c.w),
    height: 48,
    py: 0,
    px: c.key === 'select' ? 0.5 : 3,
    borderBottom: '1px solid #E6E6E7',
    borderLeft: c.key === 'address' ? '1px solid #E6E6E7' : 'none',
    bgcolor: '#FFFFFF',
    verticalAlign: 'middle' as const,
  });

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        mt: 2,
        px: 0,
        boxSizing: 'border-box',
      }}
    >
      <TableContainer
        component={Box}
        sx={{
          width: '100%',
          maxWidth: '100%',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          border: '1px solid #E6E6E7',
          bgcolor: '#FFFFFF',
        }}
      >
        <Table
          size="small"
          padding="none"
          sx={{
            minWidth: DEALS_TABLE_MIN_WIDTH,
            tableLayout: 'fixed',
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <TableHead>
            <TableRow>
              {DEALS_TABLE_COLUMNS.map((c) => (
                <TableCell key={c.key} align={c.key === 'select' ? 'center' : 'left'} sx={headCell(c)}>
                  {c.key === 'select' ? (
                    <Box sx={{ display: 'inline-flex', width: 16, height: 16, border: '1px solid #D0CFD2', borderRadius: 1 }} />
                  ) : (
                    <Stack direction="row" spacing={0.5} sx={{ lineHeight: 0, alignItems: 'center' }}>
                      <Typography component="span" sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#5B5B5F' }}>
                        {c.label}
                      </Typography>
                      {['id', 'vertical', 'dealType'].includes(c.key) ? (
                        <KeyboardArrowDown sx={{ fontSize: 16, color: '#5B5B5F' }} />
                      ) : null}
                    </Stack>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r, idx) => (
              <TableRow key={`${r.id}-${idx}`} hover>
                {DEALS_TABLE_COLUMNS.map((c) => {
                  if (c.key === 'select') {
                    return (
                      <TableCell key={c.key} align="center" sx={bodyCell(c)}>
                        <Box sx={{ display: 'inline-flex', width: 16, height: 16, border: '1px solid #D0CFD2', borderRadius: 1, bgcolor: '#FFFFFF' }} />
                      </TableCell>
                    );
                  }
                  if (c.key === 'name') {
                    return (
                      <TableCell key={c.key} sx={bodyCell(c)}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                          <Typography noWrap sx={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#444446', minWidth: 0, flex: 1 }}>
                            {r.name}
                          </Typography>
                          {r.hasRepeat ? (
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: 1,
                                bgcolor: '#146DFF',
                                display: 'grid',
                                placeItems: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <Repeat sx={{ fontSize: 10, color: '#FFFFFF' }} />
                            </Box>
                          ) : null}
                        </Box>
                      </TableCell>
                    );
                  }
                  if (c.key === 'owner') {
                    return (
                      <TableCell key={c.key} sx={bodyCell(c)}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                          <Avatar src={r.owner.avatar} sx={{ width: 24, height: 24, flexShrink: 0 }} />
                          <Typography noWrap sx={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#86868B' }}>
                            {r.owner.name}
                          </Typography>
                        </Box>
                      </TableCell>
                    );
                  }
                  if (c.key === 'stage') {
                    return (
                      <TableCell key={c.key} sx={bodyCell(c)}>
                        <Chip label={r.stage.label} size="small" sx={toneChipSx(r.stage.tone)} />
                      </TableCell>
                    );
                  }
                  if (c.key === 'vertical') {
                    return (
                      <TableCell key={c.key} sx={bodyCell(c)}>
                        <Chip label={r.vertical.label} size="small" sx={toneChipSx('purple')} />
                      </TableCell>
                    );
                  }
                  if (c.key === 'dealType') {
                    return (
                      <TableCell key={c.key} sx={bodyCell(c)}>
                        <Chip label={r.dealType.label} size="small" sx={toneChipSx(r.dealType.tone)} />
                      </TableCell>
                    );
                  }
                  const value =
                    c.key === 'id'
                      ? r.id
                      : c.key === 'amount'
                        ? r.amount
                        : c.key === 'franchise'
                          ? r.franchise
                          : c.key === 'address'
                            ? r.address
                            : c.key === 'location'
                              ? r.location
                              : c.key === 'country'
                                ? r.country
                                : r.state;
                  return (
                    <TableCell key={c.key} sx={bodyCell(c)}>
                      <Typography
                        noWrap
                        title={value}
                        component="div"
                        sx={{
                          fontSize: 14,
                          fontWeight: c.key === 'id' ? 500 : 400,
                          lineHeight: '20px',
                          color: c.key === 'id' ? '#444446' : '#86868B',
                        }}
                      >
                        {value}
                      </Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function DealsPagination() {
  const [rowsPerPage] = useState(15);
  return (
    <Box sx={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <Box sx={{ display: 'flex', bgcolor: '#FFFFFF', borderTop: '1px solid #E6E6E7', minHeight: 56, width: '100%' }}>
        <Stack
          direction="row"
          spacing={3}
          sx={{
            flex: 1,
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            boxSizing: 'border-box',
            ml: 4,
            px: 3,
            alignItems: 'center',
            justifyContent: 'flex-end',
            py: 1.25,
          }}
        >
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.25 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#444446' }}>
              Rows per page: {rowsPerPage}
            </Typography>
            <KeyboardArrowDown sx={{ fontSize: 14, color: '#444446' }} />
          </Stack>
          <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#444446' }}>1-15 of 12,345</Typography>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <IconButton
              aria-label="Previous page"
              sx={{
                width: 32,
                height: 32,
                p: 0,
                borderRadius: 999,
                border: '1px solid #D0CFD2',
                bgcolor: '#FFFFFF',
                color: '#262527',
              }}
            >
              <ChevronLeft sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton
              aria-label="Next page"
              sx={{
                width: 32,
                height: 32,
                p: 0,
                borderRadius: 999,
                border: '1px solid #D0CFD2',
                bgcolor: '#FFFFFF',
                color: '#262527',
              }}
            >
              <ChevronRight sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export function DealsPage() {
  return (
    <Box sx={{ minHeight: '100vh', width: '100%', display: 'flex', bgcolor: '#F5F5F6' }}>
      <DealsSidebar />
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <DealsHeader />
        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            overflow: 'auto',
            overflowX: 'hidden',
            pb: 0,
            maxWidth: '100%',
            mr: 0,
            pr: 0,
            bgcolor: '#FFFFFF',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 1.25,
              width: '100%',
              maxWidth: '100%',
              minWidth: 0,
              boxSizing: 'border-box',
            }}
          >
            <DealGraphs />
            <DealsFiltersRow />
          </Box>
          <DealsTable />
          <DealsPagination />
        </Box>
      </Box>
    </Box>
  );
}


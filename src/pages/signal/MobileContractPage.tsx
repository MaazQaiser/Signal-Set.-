import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { CreateDispatchPage } from './CreateDispatchPage';

const C = {
  bg: '#F6F6F8',
  white: '#FFFFFF',
  black: '#000000',
  grey100: '#E6E6E7',
} as const;

/**
 * Phone-shell demo of Signal Create Smart Contract.
 * Uses the same form fields and flow as CreateDispatchPage (variant="mobile").
 */
export function MobileContractPage() {
  const navigate = useNavigate();

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
            borderBottom: `0.5px solid ${C.grey100}`,
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
            borderBottom: `0.5px solid ${C.grey100}`,
            flexShrink: 0,
            gap: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={() => navigate('/signal/mobile')}
            sx={{ color: 'rgba(41, 41, 41, 1)' }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: C.black, flex: 1 }}>
            Smart Contract
          </Typography>
        </Box>

        {/* Same Signal create-contract form (all fields & flow) */}
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', bgcolor: C.white }}>
          <CreateDispatchPage variant="mobile" />
        </Box>

        {/* Home indicator */}
        <Box
          sx={{
            height: 34,
            flexShrink: 0,
            bgcolor: C.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: 134, height: 5, borderRadius: 100, bgcolor: C.black }} />
        </Box>
      </Box>
    </Box>
  );
}

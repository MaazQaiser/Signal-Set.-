import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { TENANT_HOME, TENANT_LABEL, type Tenant } from '../tenant/types';

function tenantFromPath(pathname: string): Tenant {
  return pathname === '/signal' || pathname.startsWith('/signal/') ? 'signal' : 'filtergo';
}

export function TenantSwitcher() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tenant = tenantFromPath(pathname);

  const handleChange = (_: React.MouseEvent<HTMLElement>, next: Tenant | null) => {
    if (!next || next === tenant) return;
    navigate(TENANT_HOME[next]);
  };

  return (
    <Box sx={{ ml: 'auto' }}>
      <ToggleButtonGroup
        exclusive
        size="small"
        value={tenant}
        onChange={handleChange}
        aria-label="Tenant switcher"
        sx={{
          bgcolor: '#F1F5F9',
          borderRadius: '8px',
          p: '2px',
          gap: 0,
          '& .MuiToggleButtonGroup-grouped': {
            border: 0,
            borderRadius: '6px !important',
            mx: 0,
            px: 1.5,
            py: 0.5,
            textTransform: 'none',
            fontSize: 13,
            fontWeight: 600,
            lineHeight: '18px',
            color: '#64748B',
            '&.Mui-selected': {
              bgcolor: '#FFFFFF',
              color: '#141414',
              boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08)',
              '&:hover': { bgcolor: '#FFFFFF' },
            },
            '&:hover': { bgcolor: 'transparent' },
          },
        }}
      >
        <ToggleButton value="filtergo">{TENANT_LABEL.filtergo}</ToggleButton>
        <ToggleButton value="signal">{TENANT_LABEL.signal}</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

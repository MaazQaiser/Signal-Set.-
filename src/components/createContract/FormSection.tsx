import { Box, Collapse, Divider, IconButton, Stack, Typography } from '@mui/material';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { useState, type ReactNode } from 'react';

export function FormSection({
  title,
  children,
  defaultOpen = true,
  titleEnd,
  showDivider = true,
  id,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  titleEnd?: ReactNode;
  showDivider?: boolean;
  id?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Box id={id} sx={{ width: '100%', minWidth: 0, scrollMarginTop: 16 }}>
      {showDivider ? <Divider sx={{ borderColor: '#E6E6E7', mb: 2 }} /> : null}
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          gap: 1,
          flexWrap: 'nowrap',
          mb: 2,
        }}
      >
        <Typography
          component="h2"
          sx={{ fontSize: 14, fontWeight: 700, lineHeight: '24px', color: '#262527', flex: '0 1 auto', minWidth: 0 }}
        >
          {title}
        </Typography>
        <IconButton
          type="button"
          size="small"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? `Collapse ${title}` : `Expand ${title}`}
          sx={{ p: 0.5, color: '#6A6A70', flexShrink: 0 }}
        >
          <KeyboardArrowDownOutlined
            sx={{ fontSize: 16, transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: (t) => t.transitions.create('transform') }}
          />
        </IconButton>
        {titleEnd ? (
          <Box
            sx={{
              flex: '1 1 auto',
              minWidth: 0,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {titleEnd}
          </Box>
        ) : null}
      </Stack>
      <Collapse in={open}>
        <Box sx={{ pt: 0, pb: 0.5 }}>{children}</Box>
      </Collapse>
    </Box>
  );
}

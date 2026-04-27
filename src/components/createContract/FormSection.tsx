import { Box, Collapse, Divider, IconButton, Stack, Typography } from '@mui/material';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { useState, type ReactNode } from 'react';

export function FormSection({
  title,
  children,
  defaultOpen = true,
  titleEnd,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  titleEnd?: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          gap: 1,
          flexWrap: 'wrap',
          rowGap: 1,
        }}
      >
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
        <Typography
          component="h2"
          sx={{ fontSize: 14, fontWeight: 700, lineHeight: '24px', color: '#262527', flex: '0 1 auto', minWidth: 0 }}
        >
          {title}
        </Typography>
        {titleEnd ? (
          <Box
            sx={{
              flex: '1 1 0%',
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
      <Divider sx={{ borderColor: '#E6E6E7', my: 2 }} />
      <Collapse in={open}>
        <Box sx={{ pt: 0, pb: 0.5 }}>{children}</Box>
      </Collapse>
    </Box>
  );
}

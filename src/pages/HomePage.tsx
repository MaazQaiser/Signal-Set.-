import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

declare const __BUILD_DATE__: string;

const lastUpdated = new Date(__BUILD_DATE__).toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const COLORS = {
  white: '#FFFFFF',
  primaryMint: '#2DA551',
  primarySoot: '#323631',
  primaryEucalyptus: '#8BEE68',
  primaryBlack: '#141414',
  textPrimary: '#262527',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate600: '#475569',
  blue500: '#3B82F6',
} as const;

function Section(props: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ fontSize: 20, fontWeight: 700, lineHeight: '24px', color: COLORS.textPrimary }}>
        {props.title}
      </Typography>
      <Box sx={{ mt: 0.5 }}>{props.children}</Box>
    </Box>
  );
}

function Badge(props: { label: string }) {
  return (
    <Chip
      label={props.label}
      size="small"
      sx={{
        height: 22,
        px: 0.25,
        borderRadius: 999,
        bgcolor: COLORS.blue500,
        color: COLORS.white,
        fontSize: 12,
        fontWeight: 600,
        '& .MuiChip-label': { px: 1 },
      }}
    />
  );
}

export function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: COLORS.white,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ── */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          bgcolor: COLORS.white,
          borderBottom: `1px solid ${COLORS.slate300}`,
          px: { xs: 3, md: 16.25 },
          height: 50,
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 800, lineHeight: 1, color: COLORS.primaryMint }}>
          Filtergo
        </Typography>
      </Box>

      {/* ── Main content (scrollable) ── */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          maxWidth: 1440,
          width: '100%',
          mx: 'auto',
          px: { xs: 3, md: 16.25 },
          pt: { xs: 4, md: 5.5 },
          boxSizing: 'border-box',
        }}
      >

        {/* Title */}
        <Box sx={{ mt: 4 }}>
          <Typography
            sx={{
              fontSize: { xs: 34, md: 50 },
              fontWeight: 500,
              lineHeight: { xs: '42px', md: '60px' },
              letterSpacing: { md: '-1px' },
              color: COLORS.primaryBlack,
            }}
          >
            <Box component="span" sx={{ fontWeight: 800 }}>Use Case</Box>
            <Box component="span" sx={{ fontWeight: 500 }}>{' '}- Smart Contract - SET</Box>
          </Typography>
        </Box>

        <Divider sx={{ mt: 2, borderColor: COLORS.slate300 }} />

        {/* Sections */}
        <Stack sx={{ mt: 2.5, gap: 3 }}>
          <Section title="Problem Statement">
            <Typography sx={{ fontSize: 14, lineHeight: '20px', color: COLORS.slate600, whiteSpace: 'pre-wrap' }}>
              The current deal creation process is lengthy and cumbersome — it relies on a multi-step form with many
              fields that demand significant time and effort from sales reps and clients alike. This friction slows down
              deal velocity, increases the chance of errors, and creates a poor experience for everyone involved.
              {'\n\n'}
              Teams need a faster, leaner way to create contracts without sacrificing the accuracy or completeness of
              the information captured.
            </Typography>
          </Section>

          <Section title="Solution">
            <Typography sx={{ fontSize: 14, lineHeight: '20px', color: COLORS.slate600 }}>
              We designed a <strong>Smart Contract</strong> flow that strips deal creation down to the bare minimum
              required fields. By eliminating unnecessary steps and surfacing only what truly matters, sales reps can
              create a complete, valid contract in a fraction of the time — improving efficiency, reducing drop-off, and
              delivering a significantly smoother experience across both desktop and mobile.
            </Typography>
          </Section>
        </Stack>

        {/* CTA buttons */}
        <Stack direction="row" sx={{ mt: 3, gap: 1.5, flexWrap: 'wrap' }}>
          {[
            { label: 'Experience SET Web', path: '/deals' },
            { label: 'Experience SET Mobile App', path: '/mobile' },
            { label: 'Agentic experience', path: '/agentic' },
          ].map(({ label, path }) => (
            <Button
              key={label}
              variant="contained"
              disableElevation
              onClick={() => navigate(path)}
              sx={{
                bgcolor: COLORS.primaryEucalyptus,
                color: COLORS.primarySoot,
                textTransform: 'none',
                borderRadius: '5px',
                px: 2.625,
                py: 1.625,
                fontSize: 15,
                lineHeight: '21px',
                '&:hover': { bgcolor: COLORS.primaryEucalyptus },
              }}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* ── Footer — pinned to bottom of viewport ── */}
      <Box
        component="footer"
        sx={{
          flexShrink: 0,
          width: '100%',
          px: { xs: 3, md: 16.25 },
          pb: { xs: 3, md: 4 },
          boxSizing: 'border-box',
          bgcolor: COLORS.white,
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{
            pt: 3,
            borderTop: `1px solid ${COLORS.slate300}`,
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
            width: '100%',
          }}
        >
          <Stack sx={{ gap: 1 }}>
            <Typography sx={{ fontSize: 14, lineHeight: '20px', color: COLORS.slate400 }}>Persona's</Typography>
            <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
              <Badge label="Sales Rep" />
            </Stack>
            <Typography sx={{ fontSize: 14, lineHeight: '20px', color: COLORS.slate400 }}>
              Last updated: {lastUpdated}
            </Typography>
          </Stack>

          <Stack sx={{ gap: 1 }}>
            <Typography sx={{ fontSize: 14, lineHeight: '20px', color: COLORS.slate400 }}>Platform(s)</Typography>
            <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
              <Badge label="Mobile App" />
              <Badge label="Web App" />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

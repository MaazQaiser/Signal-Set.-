import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
    <Box sx={{ minHeight: '100vh', bgcolor: COLORS.white }}>
      <Box
        sx={{
          maxWidth: 1440,
          mx: 'auto',
          px: { xs: 3, md: 16.25 },
          pt: { xs: 4, md: 5.5 },
          pb: { xs: 4, md: 4 },
          boxSizing: 'border-box',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: 28, fontWeight: 800, lineHeight: '42px', color: COLORS.primaryMint }}>
            Filtergo
          </Typography>
        </Box>

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
            <Box component="span" sx={{ fontWeight: 800 }}>
              Use Case
            </Box>
            <Box component="span" sx={{ fontWeight: 500 }}>
              {' '}
              - Contract Creation - Set
            </Box>
          </Typography>
        </Box>

        <Divider sx={{ mt: 2, borderColor: COLORS.slate300 }} />

        <Stack sx={{ mt: 2.5, gap: 3 }}>
          <Section title="Problem Statement">
            <Typography sx={{ fontSize: 14, lineHeight: '20px', color: COLORS.slate600, whiteSpace: 'pre-wrap' }}>
              Our current system follows a fixed business structure that does not accommodate variations in different
              business models and operational needs. As a result, certain businesses cannot configure workflows, billing
              logic, or service rules according to their specific requirements.
              {'\n\n'}
              Additionally, the existing payment term setup is not aligned with Stripe integration capabilities. To
              support flexible billing scenarios (e.g., prepaid, recurring, pay-after-service), we need to redesign the
              payment term structure and ensure seamless integration with Stripe for accurate billing execution and
              automation.
            </Typography>
          </Section>

          <Section title="Solution">
            <Typography sx={{ fontSize: 14, lineHeight: '20px', color: COLORS.slate600 }}>
              We introduced an Update Service configuration to support different business needs instead of fixed system
              rules. We also redesigned the payment terms (Prepaid, Recurring, Pay After Service Completion) with proper
              Stripe integration to ensure accurate billing triggers, automated invoicing, and real-time payment updates.
            </Typography>
          </Section>
        </Stack>

        <Stack direction="row" sx={{ mt: 3, gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            disableElevation
            onClick={() => navigate('/contract')}
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
            Experience for Set
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={() => navigate('/contract')}
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
            Experience for Set for mobile
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={() => navigate('/contract')}
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
            Experience for Edge Invoice
          </Button>
        </Stack>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{
            mt: 10,
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
            maxWidth: 673,
          }}
        >
          <Stack sx={{ gap: 1 }}>
            <Typography sx={{ fontSize: 14, lineHeight: '20px', color: COLORS.slate400 }}>Persona’s</Typography>
            <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
              <Badge label="Sales Rep" />
              <Badge label="Installer" />
              <Badge label="Client" />
            </Stack>
            <Typography sx={{ fontSize: 14, lineHeight: '20px', color: COLORS.slate400 }}>
              Last updated: July 13th, 2025
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


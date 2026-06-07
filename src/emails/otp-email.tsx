/**
 * OtpEmail - the verification-code email sent during signup, rendered from the
 * codebase (React Email) and delivered via Resend through Supabase's Send Email
 * Hook. Inline styles only - the rule for email clients.
 */
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

const CREAM = '#f4f1e8';
const INK = '#0e0e12';
const LIME = '#c5ff4a';
const MUTED = '#6a6a72';
const FAINT = '#9a9aa2';

export function OtpEmail({ code }: { code: string }) {
  return (
    <Html>
      <Head />
      <Preview>Your Sync verification code is {code}</Preview>
      <Body
        style={{
          backgroundColor: CREAM,
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          margin: 0,
          padding: '40px 16px',
        }}
      >
        <Container
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(14,14,18,0.08)',
            borderRadius: 16,
            margin: '0 auto',
            maxWidth: 440,
            padding: 32,
          }}
        >
          <Text
            style={{
              color: INK,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Sync
          </Text>

          <Heading style={{ color: INK, fontSize: 24, fontWeight: 700, margin: '24px 0 8px' }}>
            Your sign-in code
          </Heading>
          <Text style={{ color: MUTED, fontSize: 14, lineHeight: '22px', margin: 0 }}>
            Enter this code to continue to Sync. It expires in 10 minutes and can only be used once.
          </Text>

          <Section
            style={{
              backgroundColor: LIME,
              borderRadius: 12,
              margin: '24px 0',
              padding: '20px 0',
              textAlign: 'center' as const,
            }}
          >
            <Text
              style={{
                color: INK,
                fontSize: 36,
                fontWeight: 700,
                letterSpacing: '10px',
                margin: 0,
              }}
            >
              {code}
            </Text>
          </Section>

          <Text style={{ color: FAINT, fontSize: 12, lineHeight: '18px', margin: 0 }}>
            Didn&rsquo;t request this? You can safely ignore this email.
          </Text>
        </Container>

        <Text
          style={{ color: FAINT, fontSize: 12, margin: '16px 0 0', textAlign: 'center' as const }}
        >
          © Sync · Raavon Limited
        </Text>
      </Body>
    </Html>
  );
}

export default OtpEmail;

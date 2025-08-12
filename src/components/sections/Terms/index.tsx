import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';

export type Props = {
  type: 'Terms';
  title: string;
};

const SUPPORT_EMAIL = 'visadayscalculator@gmail.com';

export const Terms: React.FC<Props> = ({ title }) => {
  return (
    <Box component="main" sx={{ maxWidth: 800, mx: 'auto', px: 3, py: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Terms of Service
      </Typography>

      <Typography variant="body1" paragraph>
        These Terms of Service (&quot;Terms&quot;) govern your use of this
        website and its services (&quot;Service&quot;). By accessing or using
        the Service, you agree to be bound by these Terms. If you do not agree,
        please do not use the Service.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        1. Use of the Service
      </Typography>
      <Typography variant="body1" paragraph>
        This Service is provided for informational purposes only. It helps users
        track time spent in visa zones such as the Schengen Area, but does not
        guarantee accuracy and does not constitute legal advice.
      </Typography>
      <Typography variant="body1" paragraph>
        You are solely responsible for verifying your visa requirements, travel
        history, and legal obligations using official sources or legal counsel.
        The results provided by the calculator are estimations based on user
        input and public rules, which may change or be interpreted differently
        by immigration authorities.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        2. Accounts and Authentication
      </Typography>
      <Typography variant="body1" paragraph>
        You may choose to sign in using Google authentication. Your email
        address is stored for the purpose of saving your data and allowing you
        to access it later. Your Google display name may be shown in the UI but
        is not stored.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        3. Availability and Changes
      </Typography>
      <Typography variant="body1" paragraph>
        This Service is provided “as is” and “as available”. While we strive for
        accuracy and availability, we do not guarantee that the Service will
        always be available, error-free, or up to date. We reserve the right to
        modify, suspend, or discontinue any part of the Service at any time
        without notice.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        4. Your Responsibilities
      </Typography>
      <Typography variant="body1" paragraph>
        You agree to use this Service lawfully and not for any purpose that is
        prohibited by these Terms. You must not misuse the Service, attempt to
        gain unauthorized access, or interfere with its normal operation.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        5. Data and Privacy
      </Typography>
      <Typography variant="body1" paragraph>
        We take your privacy seriously. Please refer to our{' '}
        <NextLink
          href="/privacy"
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          Privacy Policy
        </NextLink>{' '}
        to understand how we collect, store, and use your personal data.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        6. Limitation of Liability
      </Typography>
      <Typography variant="body1" paragraph>
        The Service is provided &quot;as is&quot; and &quot;as available&quot;
        without warranties of any kind, express or implied. We do not guarantee
        that the information provided is accurate, complete, or current.
      </Typography>
      <Typography variant="body1" paragraph>
        To the maximum extent permitted by law, we disclaim all liability for
        any direct, indirect, incidental, or consequential damages arising from
        the use of or reliance on the Service, including but not limited to
        incorrect travel calculations, denied entries, overstays, or legal
        penalties.
      </Typography>
      <Typography variant="body1" paragraph>
        By using the Service, you agree that you are solely responsible for your
        actions and decisions based on the data shown by this tool.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        7. Contact
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions about these Terms, please contact us at:{' '}
        <strong>{SUPPORT_EMAIL}</strong>
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        8. Changes to These Terms
      </Typography>
      <Typography variant="body1" paragraph>
        We may update these Terms from time to time. Any changes will be posted
        on this page. By continuing to use the Service, you agree to the most
        recent version of these Terms.
      </Typography>
    </Box>
  );
};

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export type Props = {
  type: 'PrivacyPolicy';
  title: string;
};

const SUPPORT_EMAIL = 'visadayscalculator@gmail.com';

export const PrivacyPolicy: React.FC<Props> = ({ title }) => {
  return (
    <Box component="main" sx={{ maxWidth: 800, mx: 'auto', px: 3, py: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>

      <Typography variant="body1" paragraph>
        This Privacy Policy describes how your personal data is collected, used,
        and protected when you use this website (the “Service”).
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        1. Who We Are
      </Typography>
      <Typography variant="body1" paragraph>
        This website is operated by an independent developer. If you have
        questions about your data or this policy, please contact:
        <br />
        📧 <strong>{SUPPORT_EMAIL}</strong>
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        2. What Data We Collect and Why
      </Typography>
      <Typography variant="body1" paragraph>
        When you sign in with Google, we collect your email address to associate
        your saved calculator data with your account. Your Google display name
        may be shown in the UI, but is not stored. Any data you enter on the
        main homepage is not stored or collected unless you choose to sign in
        and save it.
      </Typography>
      <Typography variant="body1" paragraph>
        We do not collect or store your password, payment details, or any
        sensitive personal data.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        3. Legal Basis
      </Typography>
      <Typography variant="body1" paragraph>
        We rely on your consent and our legitimate interest in providing the
        Service to process your data.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        4. Data Storage
      </Typography>
      <Typography variant="body1" paragraph>
        Your data is stored securely using MongoDB Atlas in the AWS Stockholm
        region (eu-north-1). We use Mongoose to manage the database. MongoDB
        complies with GDPR regulations and provides secure hosting environments.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        5. Data Sharing
      </Typography>
      <Typography variant="body1" paragraph>
        Your data is never sold or shared with third parties. It is only used to
        provide this service. Third-party services involved in delivering this
        functionality include:
      </Typography>
      <ul>
        <li>
          <Typography variant="body1">Google (authentication)</Typography>
        </li>
        <li>
          <Typography variant="body1">MongoDB Atlas (data storage)</Typography>
        </li>
      </ul>

      <Typography variant="h6" component="h2" gutterBottom>
        6. Your Rights
      </Typography>
      <Typography variant="body1" paragraph>
        Under GDPR, you have the right to:
      </Typography>
      <ul>
        <li>
          <Typography variant="body1">
            Access the data we hold about you
          </Typography>
        </li>
        <li>
          <Typography variant="body1">Request deletion of your data</Typography>
        </li>
        <li>
          <Typography variant="body1">Correct your data</Typography>
        </li>
        <li>
          <Typography variant="body1">Withdraw consent at any time</Typography>
        </li>
      </ul>
      <Typography variant="body1" paragraph>
        To exercise any of these rights, please contact us at{' '}
        <strong>{SUPPORT_EMAIL}</strong>.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        7. Cookies
      </Typography>
      <Typography variant="body1" paragraph>
        This site uses essential cookies to remember your cookie consent along
        with tracking and analytics cookies.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        8. Retention
      </Typography>
      <Typography variant="body1" paragraph>
        We retain your data as long as your registered account exists. You may
        request data deletion at any time.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        9. Changes
      </Typography>
      <Typography variant="body1" paragraph>
        We may update this policy in the future. Any changes will be posted on
        this page.
      </Typography>
    </Box>
  );
};

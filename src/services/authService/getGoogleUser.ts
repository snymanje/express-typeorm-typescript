import { OAuth2Client } from 'google-auth-library';
import config from '../../config/config';

export default async (access_token: string): Promise<any> => {
  const CLIENT_ID = config.googleClientId;
  const client = new OAuth2Client(CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: access_token,
    audience: CLIENT_ID
  });

  const payload = ticket.getPayload();

  return payload;
};

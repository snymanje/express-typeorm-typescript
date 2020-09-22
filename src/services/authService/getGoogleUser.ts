import { OAuth2Client, TokenPayload } from 'google-auth-library';
import config from '../../config/config';

export default async (access_token: string): Promise<TokenPayload> => {
  const CLIENT_ID = config.googleClientId;

  const client = new OAuth2Client(CLIENT_ID);
  console.log(client);
  console.log(access_token);

  // Verify the token. OAuth2Client throws an Error if verification fails
  const ticket = await client.verifyIdToken({
    idToken: access_token,
    audience: CLIENT_ID
  });

  const payload = ticket.getPayload();

  return payload;
};

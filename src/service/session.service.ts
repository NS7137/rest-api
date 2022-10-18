import { LeanDocument, FlattenMaps, FilterQuery, UpdateQuery } from 'mongoose';
import { UserDocument } from '../model/user.model';
import Session, { SessionDocument } from '../model/session.model';
import { sign, decode } from '../utils/jwt.utils';
import config from 'config';
import { get } from 'lodash';
import { findUser } from './user.service';

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function createAccessToken({
  user,
  session
}: {
  user: Omit<UserDocument, 'password'> | FlattenMaps<LeanDocument<any>>;
  session: Omit<SessionDocument, 'password'> | FlattenMaps<LeanDocument<any>>;
}) {
  // build and return the new access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') } // 15min
  );

  return accessToken;
}

export async function reIssueAccessToken({
  refreshToken
}: {
  refreshToken: string;
}) {
  // Decode the refresh token
  const { decoded } = decode(refreshToken);

  const userId = get(decoded, '_id');

  if (!decoded || !userId) return false;

  // Get the session
  const session = await Session.findById(userId);

  // Make sure the session is still valid
  if (!session || !session?.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = createAccessToken({ user, session });

  return accessToken;
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return await Session.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return await Session.find(query).lean();
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore } from 'firebase-admin/firestore';
import { getUserFromCookie } from '@/lib/getUserServer';

const db = getFirestore();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const decoded = await getUserFromCookie();

  if (!decoded) return res.status(401).json({ error: 'Unauthorized' });

  const requesterUid = decoded.uid;

  const requesterDoc = await db.collection('users').doc(requesterUid).get();
  if (!requesterDoc.exists || !requesterDoc.data()?.is_admin) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (req.method === 'GET') {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json({ users });
  }

  if (req.method === 'PATCH') {
    const { uid, is_admin, is_verified } = req.body;

    if (!uid) return res.status(400).json({ error: 'Missing UID' });

    await db
      .collection('users')
      .doc(uid)
      .update({
        ...(is_admin !== undefined && { is_admin }),
        ...(is_verified !== undefined && { is_verified }),
      });

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

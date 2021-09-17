import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../utils/db';
import { doc, getDoc, writeBatch } from 'firebase/firestore';

type Data = {
  status: string;
};

const BATCH_NUMBER = 499;

const divmod = (num: number, div: number) => [Math.floor(num / div), num % div];

const encode62 = (num: number) => {
  // carryover digit is always 1 or higher so an extra '_' allows indexing chars at 1
  const chars = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const arr = [];
  while (num) {
    const [nextNum, rem] = divmod(num, 62);
    num = nextNum;
    arr.length !== 1 ? arr.push(chars.charAt(rem + 1)) : arr.push(chars.charAt(rem));
  }
  return arr.reverse().join('');
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { query } = req;
  const counterRef = doc(db, 'counters', `reseed_index_${query.id}`);
  const counterDoc = (await getDoc(counterRef)).data();
  const count = counterDoc!.count;
  const batch = writeBatch(db);
  batch.update(counterRef, { count: count + BATCH_NUMBER });

  for (let i = count; i < count + BATCH_NUMBER; i++) {
    const id = encode62(i);
    const url = {
      id,
      shortURL: `${query.origin}/${id}`,
    };
    const docRef = doc(db, `shortURLs_${query.id}`, id);
    batch.set(docRef, url);
  }

  await batch.commit();
  res.status(200).json({ status: 'Reseed Complete' });
}

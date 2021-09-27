import { runTransaction, doc, increment } from 'firebase/firestore';
import { db } from '..';

async function requisitionURL(longUrl: string) {
  const divmod = (num: number, div: number) => [Math.floor(num / div), num % div];

  const encode62 = (num: number) => {
    // carryover digit is always 1 or higher so an extra '_' allows indexing chars at 1
    const chars = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const arr = [];
    while (num) {
      const [nextNum, rem] = divmod(num, 62);
      num = nextNum;
      arr.length === 0 ? arr.push(chars.charAt(rem + 1)) : arr.push(chars.charAt(rem));
    }
    return arr.reverse().join('');
  };

  try {
    const urlMap = await runTransaction(db, async (transaction) => {
      const collectionId = window.location.hostname.split('.')[0];
      console.log(collectionId);

      const counterRef = doc(db, 'counters', `index_${collectionId}`);
      const counterDoc = (await transaction.get(counterRef)).data();

      const id = encode62(counterDoc!.count);
      console.log(id);
      const map = { id, shortUrl: `${window.location.origin}/${id}`, longUrl };
      const urlMapDocRef = doc(db, `urlMaps_${collectionId}`, id);
      await transaction.set(urlMapDocRef, map);
      await transaction.update(counterRef, { count: increment });
      return map;
    });
    console.log('Transaction successfully committed!');
    return urlMap;
  } catch (e) {
    console.log('Transaction failed: ', e);
  }
}

export default requisitionURL;

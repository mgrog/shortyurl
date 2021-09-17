import { getDoc, doc } from '@firebase/firestore';
import { db } from '..';

async function fetchRedirect(id: string) {
  const collectionId = window.location.hostname.split('.')[0];
  console.log(collectionId);
  const docRef = doc(db, `urlMaps_${collectionId}`, id);
  const urlDoc = await getDoc(docRef);
  return urlDoc.data();
}

export default fetchRedirect;

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { questions } from '../data/data';

export const addQuestionsToFirestore = async () => {
    const questionsCollectionRef = collection(db, 'questions');
    for (const question of questions) {
      await addDoc(questionsCollectionRef, question);
    }
  };
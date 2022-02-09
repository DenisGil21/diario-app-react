import { db } from "../firebase/firebase-config"

export const loadNotes = async (uid) => {
    const notesSnap = await db.collection(`journal/${uid}/notes`).get();
    const notes = [];
    
    notesSnap.forEach(snapChild => {
        notes.push({
            id: snapChild.id,
            ...snapChild.data()
        });
    });

    console.log(notes);

    return notes;
}
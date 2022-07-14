import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collection = 'todos';
const collection_id = 'tasks';
const docRef = doc(db, collection, collection_id);


async function getData() {
    try {
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            let data = await docSnap.data().tasks;
            return data;
        }else{
            return [];
        }
    } catch (error) {
        console.error(error);
    }
}

async function setData(tasks) {
    try {
        let data = await getData();
        await setDoc(doc(db, collection, collection_id), {
            tasks: [...data, tasks]
        });
    } catch (error) {
        console.error(error);
    }
}

async function deleteOne(arr) {
    try {
        await setDoc(doc(db, collection, collection_id), {
            tasks: arr
        });
    } catch (error) {
        console.error(error);
    }
}


export {
    getData,
    setData,
    deleteOne
}
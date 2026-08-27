import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  REAL_PROBLEMS,
  REAL_INDUSTRIES,
  REAL_COMPETITIONS,
  REAL_COMPANIES,
  REAL_RESEARCH,
  REAL_FORMS,
  REAL_USERS,
} from "../src/data/realProductionData";
import { INITIAL_SITE_CONTENT } from "../src/data/initialContent";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyB_u3gqJtkIogv7iZrJBTNLW3glo-PpgTs",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "prblms-881bb.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "prblms-881bb",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "prblms-881bb.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "313159629487",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:313159629487:web:8bea75fe7ca079f78f325a",
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || "G-0LVYDXFFTT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function pushAllData() {
  console.log("🚀 ========================================================");
  console.log("🚀  PROBLEM ATLAS: PUSHING ALL REAL PRODUCTION DATA TO DB  ");
  console.log("🚀 ========================================================");
  console.log(`Target Project: ${firebaseConfig.projectId}`);

  try {
    const cred = await signInAnonymously(auth);
    console.log(`✓ Authenticated session with UID: ${cred.user.uid}`);
  } catch (err: any) {
    console.log(`Notice: Anonymous auth (${err?.message || err})`);
  }

  let totalCount = 0;

  try {
    // 1. Problems Collection
    console.log("\n📦 1/8 Pushing Problems Collection (problems)...");
    for (const prob of REAL_PROBLEMS) {
      const ref = doc(db, "problems", prob.id);
      await setDoc(ref, {
        ...prob,
        createdAtServer: serverTimestamp(),
        updatedAtServer: serverTimestamp(),
      });
      totalCount++;
      console.log(`  ✓ [Problem] ${prob.id}: ${prob.title.slice(0, 50)}...`);
    }

    // 2. Industries Collection
    console.log("\n🏭 2/8 Pushing Industries Collection (industries)...");
    for (const ind of REAL_INDUSTRIES) {
      const ref = doc(db, "industries", ind.id);
      await setDoc(ref, ind, { merge: true });
      totalCount++;
      console.log(`  ✓ [Industry] ${ind.id}: ${ind.name}`);
    }

    // 3. Competitions Collection
    console.log("\n🏆 3/8 Pushing Competitions Collection (competitions)...");
    for (const comp of REAL_COMPETITIONS) {
      const ref = doc(db, "competitions", comp.id);
      await setDoc(ref, comp, { merge: true });
      totalCount++;
      console.log(`  ✓ [Competition] ${comp.id}: ${comp.title.slice(0, 50)}...`);
    }

    // 4. Companies Collection
    console.log("\n🏢 4/8 Pushing Companies Collection (companies)...");
    for (const company of REAL_COMPANIES) {
      const ref = doc(db, "companies", company.id);
      await setDoc(ref, company, { merge: true });
      totalCount++;
      console.log(`  ✓ [Company] ${company.id}: ${company.name}`);
    }

    // 5. Research Collection
    console.log("\n🔬 5/8 Pushing Research Collection (research)...");
    for (const res of REAL_RESEARCH) {
      const ref = doc(db, "research", res.id);
      await setDoc(ref, res, { merge: true });
      totalCount++;
      console.log(`  ✓ [Research] ${res.id}: ${res.title.slice(0, 50)}...`);
    }

    // 6. Users Collection
    console.log("\n👤 6/8 Pushing Users Collection (users)...");
    for (const user of REAL_USERS) {
      const ref = doc(db, "users", user.uid);
      await setDoc(ref, user, { merge: true });
      totalCount++;
      console.log(`  ✓ [User] ${user.uid}: ${user.name} (${user.role})`);
    }

    // 7. Forms Collection
    console.log("\n📋 7/8 Pushing Dynamic Forms Collection (forms)...");
    for (const form of REAL_FORMS) {
      const ref = doc(db, "forms", form.id);
      await setDoc(ref, form, { merge: true });
      totalCount++;
      console.log(`  ✓ [Form] ${form.id}: ${form.title}`);
    }

    // 8. Site Content Collection (CMS)
    console.log("\n📄 8/8 Pushing Site Content CMS (site_content)...");
    for (const page of INITIAL_SITE_CONTENT) {
      const ref = doc(db, "site_content", page.pageId);
      await setDoc(ref, {
        ...page,
        updatedAtServer: serverTimestamp(),
      }, { merge: true });
      totalCount++;
      console.log(`  ✓ [CMS Page] ${page.pageId}: ${page.pageName}`);
    }

    console.log("\n========================================================");
    console.log(`🎉 SUCCESS: All ${totalCount} production records successfully pushed to Firestore!`);
    console.log("========================================================\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
}

pushAllData();

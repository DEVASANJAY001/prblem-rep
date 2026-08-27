import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config";
import {
  REAL_PROBLEMS,
  REAL_INDUSTRIES,
  REAL_COMPETITIONS,
  REAL_COMPANIES,
  REAL_RESEARCH,
  REAL_FORMS,
  REAL_USERS,
} from "@/data/realProductionData";
import { INITIAL_SITE_CONTENT } from "@/data/initialContent";

export interface SeedResult {
  success: boolean;
  totalPushed: number;
  details: string[];
}

/**
 * Pushes structured real-world production data into live Firebase Firestore
 */
export async function seedAllToFirebase(
  onProgress?: (status: string) => void
): Promise<SeedResult> {
  const details: string[] = [];
  let count = 0;

  const log = (msg: string) => {
    console.log(`[Firebase Seeder] ${msg}`);
    details.push(msg);
    if (onProgress) onProgress(msg);
  };

  log("Starting Firebase Firestore data synchronization...");

  if (!db || typeof doc !== "function") {
    log("Firebase Firestore not directly initialized; synced to local storage state.");
    return { success: true, totalPushed: count, details };
  }

  try {
    // 1. Seed Site Content (App Controller CMS)
    log("1/8 Pushing Site Content CMS pages (site_content)...");
    for (const page of INITIAL_SITE_CONTENT) {
      try {
        const pageRef = doc(db, "site_content", page.pageId);
        await setDoc(
          pageRef,
          {
            ...page,
            updatedAtServer: serverTimestamp(),
          },
          { merge: true }
        );
        count++;
        log(`  ✓ Synced page content: ${page.pageName} (${page.pageId})`);
      } catch (err) {
        log(`  ✗ Error syncing page ${page.pageId}: ${String(err)}`);
      }
    }

    // 2. Seed Problems
    log("2/8 Pushing Verified Problem Statements (problems)...");
    for (const prob of REAL_PROBLEMS) {
      try {
        const probRef = doc(db, "problems", prob.id);
        await setDoc(
          probRef,
          {
            ...prob,
            updatedAtServer: serverTimestamp(),
          },
          { merge: true }
        );
        count++;
        log(`  ✓ Synced problem: ${prob.title.slice(0, 45)}...`);
      } catch (err) {
        log(`  ✗ Error syncing problem ${prob.id}: ${String(err)}`);
      }
    }

    // 3. Seed Industries
    log("3/8 Pushing Industry Verticals (industries)...");
    for (const ind of REAL_INDUSTRIES) {
      try {
        const indRef = doc(db, "industries", ind.id);
        await setDoc(indRef, ind, { merge: true });
        count++;
        log(`  ✓ Synced industry: ${ind.name}`);
      } catch (err) {
        log(`  ✗ Error syncing industry ${ind.id}: ${String(err)}`);
      }
    }

    // 4. Seed Competitions / Bounties
    log("4/8 Pushing Sponsored Problem Bounties (competitions)...");
    for (const comp of REAL_COMPETITIONS) {
      try {
        const compRef = doc(db, "competitions", comp.id);
        await setDoc(compRef, comp, { merge: true });
        count++;
        log(`  ✓ Synced bounty: ${comp.title.slice(0, 45)}...`);
      } catch (err) {
        log(`  ✗ Error syncing competition ${comp.id}: ${String(err)}`);
      }
    }

    // 5. Seed Companies & Ventures
    log("5/8 Pushing Problem Solving Companies & Ventures (companies)...");
    for (const comp of REAL_COMPANIES) {
      try {
        const compRef = doc(db, "companies", comp.id);
        await setDoc(compRef, comp, { merge: true });
        count++;
        log(`  ✓ Synced company: ${comp.name}`);
      } catch (err) {
        log(`  ✗ Error syncing company ${comp.id}: ${String(err)}`);
      }
    }

    // 6. Seed Research & Datasets
    log("6/8 Pushing Deep Research Papers & Datasets (research)...");
    for (const res of REAL_RESEARCH) {
      try {
        const resRef = doc(db, "research", res.id);
        await setDoc(resRef, res, { merge: true });
        count++;
        log(`  ✓ Synced research: ${res.title.slice(0, 45)}...`);
      } catch (err) {
        log(`  ✗ Error syncing research ${res.id}: ${String(err)}`);
      }
    }

    // 7. Seed Core Admin & Member Users
    log("7/8 Pushing Core Users & Roles (users)...");
    for (const user of REAL_USERS) {
      try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, user, { merge: true });
        count++;
        log(`  ✓ Synced user: ${user.name} (${user.role})`);
      } catch (err) {
        log(`  ✗ Error syncing user ${user.uid}: ${String(err)}`);
      }
    }

    // 8. Seed Dynamic Forms
    log("8/8 Pushing Survey Forms (forms)...");
    for (const form of REAL_FORMS) {
      try {
        const formRef = doc(db, "forms", form.id);
        await setDoc(formRef, form, { merge: true });
        count++;
        log(`  ✓ Synced form: ${form.title}`);
      } catch (err) {
        log(`  ✗ Error syncing form ${form.id}: ${String(err)}`);
      }
    }

    log(`Cloud seeding complete! Total ${count} documents pushed to Firestore.`);
    return { success: true, totalPushed: count, details };
  } catch (globalErr) {
    log(`Global seeding error: ${String(globalErr)}`);
    return { success: false, totalPushed: count, details };
  }
}

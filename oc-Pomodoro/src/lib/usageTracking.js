import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getDeviceId } from "./deviceId";

export async function trackAppOpen() {
  try {
    await addDoc(collection(db, "appOpens"), {
      deviceId: getDeviceId(),
      openedAt: serverTimestamp(),
    });
  } catch (err) {
    console.log("Analytics (app open) failed silently:", err);
  }
}

export async function trackSessionCompleted(sessionType, durationMinutes) {
  try {
    await addDoc(collection(db, "sessionCompletions"), {
      deviceId: getDeviceId(),
      sessionType,
      durationMinutes,
      completedAt: serverTimestamp(),
    });
  } catch (err) {
    console.log("Analytics (session complete) failed silently:", err);
  }
}
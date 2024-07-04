import firebaseApp from "@/config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
export const UploadFilesToFirebaseAndReturnUrls = async (files: []) => {
  try {
    const storage = getStorage(firebaseApp);
    const uploadedFilesResponses = await Promise.all(
      files.map((file: any) => {
        const storageRef = ref(storage, `images/${file.name}`);
        return uploadBytes(storageRef, file);
      })
    );
    const uploadFilesDownloadUrls = await Promise.all(
      uploadedFilesResponses.map((response) => getDownloadURL(response.ref))
    );
    return uploadFilesDownloadUrls;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
  if (!file) return;

  const fileUploaded = await storage.createFile(
    "6481807d1c09ad1f7944",
    ID.unique(),
    file
  );
  return fileUploaded;
};

export default uploadImage;
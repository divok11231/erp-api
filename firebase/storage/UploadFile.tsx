import { useRef, useState } from "react";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { IncomingForm } from 'formidable'
// you might want to use regular 'fs' and not a promise one
import { promises as fs } from 'fs'

export const config = {
  api: {
    bodyParser: false,
  }
};



const storage = getStorage();

const UploadFile = () => {
  // get file
  
  var file = inputEl?.current?.files?.[0];

  // create a storage ref
  const storageRef = ref(storage, "user_uploads" + file?.name);

  // upload file
  const task = uploadBytesResumable(storageRef, file as File);
};
export default UploadFile;

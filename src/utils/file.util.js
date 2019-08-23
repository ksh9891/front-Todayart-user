import { setting } from './set';

const downloadUri = setting.baseURL + "/storage/files/";

const filePath = (filename) => {
    return downloadUri + filename;
};

export const Files = {
    filePath
};
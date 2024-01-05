export const formatFilename = (filename) => {
    if (filename.length > 30) {
        return filename.substring(0, 20) + " ... " + filename.substring(filename.length - 15, filename.length - 1);
    }

    return filename;
}
const utilService = {
  extractYoutubeId: (url) => {
    if (!url) return null;
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  },
  getFileExtension: (url) => {
    // Split the URL by the '.' character and get the last part
    const parts = url?.split(".");
    if (parts?.length === 1 || (parts?.[0] === "" && parts?.length === 2)) {
      return ""; // No extension found
    }
    return parts?.pop().split(/\#|\?/)[0];
  },
};

export default utilService;

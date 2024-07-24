const utilService = {
  extractYoutubeId: (url) => {
    if (!url) return null;
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  },
};

export default utilService;

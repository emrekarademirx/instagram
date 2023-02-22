// Instagram Private API modülünü yükle
const { IgApiClient } = require('instagram-private-api');

// Instagram hesabına giriş yapmak için kullanılan fonksiyon
async function loginToInstagram(username, password) {
  const ig = new IgApiClient();
  ig.state.generateDevice(username);
  await ig.simulate.preLoginFlow();
  const loggedInUser = await ig.account.login(username, password);
  return ig;
}

// Anasayfadaki son 10 gönderiyi beğenme işlemi
exports.likeHomepagePosts = async (req, res) => {
  // Kullanıcının oturum açmış olup olmadığını kontrol etme
  if (!req.session.ig) {
    return res.json({ error: 'You need to be logged in to like posts.' });
  }

  // Anasayfadaki gönderileri al
  const ig = req.session.ig;
  const timelineFeed = ig.feed.timeline();
  const timeline = await timelineFeed.items();

  // Son 10 gönderiyi beğen
  const numPosts = Math.min(timeline.length, 10);
  for (let i = 0; i < numPosts; i++) {
    const media = timeline[i];
    await ig.media.like({ mediaId: media.id });
  }

  // Yanıt mesajını döndür
  res.json({ message: `Liked ${numPosts} posts on your homepage.` });
};

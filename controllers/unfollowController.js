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

// Takip etmeyen kullanıcıları takipten çıkarma işlevi
exports.unfollowNonFollowers = async (req, res) => {
  // Kullanıcının oturum açmış olup olmadığını kontrol etme
  if (!req.session.ig) {
    return res.json({ error: 'You need to be logged in to unfollow users.' });
  }

  // Takip ettikleri hesapları al
  const ig = req.session.ig;
  const accountFollowingsFeed = ig.feed.accountFollowing(ig.state.cookieUserId);
  const followings = await accountFollowingsFeed.items();

  // Takip edilmeyen hesapları takipten çıkar
  const numUnfollowed = await unfollowNonFollowers(ig, followings);

  // Yanıt mesajını döndür
  res.json({ message: `Unfollowed ${numUnfollowed} users.` });
};

// Takip edilmeyen hesapları takipten çıkarmak için kullanılan yardımcı fonksiyon
async function unfollowNonFollowers(ig, followings) {
  const numToUnfollow = followings.length;
  let numUnfollowed = 0;

  // Takip edilen hesapları tek tek kontrol et ve takip etmeyenleri takipten çıkar
  for (let i = 0; i < numToUnfollow; i++) {
    const following = followings[i];

    // Takip edilen hesabın takipçi sayısını al
    const { follower_count: followerCount } = await ig.user.info(following.pk);

    // Takip edilen hesap, takipçi sayısı 0 ise takipten çıkart
    if (followerCount === 0) {
      await ig.friendship.destroy(following.pk);
      numUnfollowed++;
    }
  }

  return numUnfollowed;
}

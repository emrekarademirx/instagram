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

// Giriş sayfası
exports.getLoginPage = (req, res) => {
  res.render('login', { error: null });
};

// Kullanıcı girişi
exports.loginToInstagram = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Instagram hesabına giriş yap
    const ig = await loginToInstagram(username, password);
    req.session.ig = ig;
    res.redirect('/followings');
  } catch (err) {
    // Giriş başarısız oldu, hata mesajını göster
    res.render('login', { error: 'Invalid username or password.' });
  }
};

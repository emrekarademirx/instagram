/* Takip etmeyenleri takipten çıkarma işlemi */
async function unfollowNonFollowers() {
  const response = await fetch('/unfollow', { method: 'POST' });
  const result = await response.json();
  alert(result.message);
}

/* Beğeni işlemi */
async function likePosts() {
  const response = await fetch('/like', { method: 'POST' });
  const result = await response.json();
  alert(result.message);
}

/* Ana kod bloğu */
document.addEventListener('DOMContentLoaded', () => {
  // Takip etmeyenleri takipten çıkarma butonu
  const unfollowButton = document.querySelector('#unfollow-button');
  if (unfollowButton) {
    unfollowButton.addEventListener('click', () => {
      unfollowNonFollowers();
    });
  }

  // Beğeni butonu
  const likeButton = document.querySelector('#like-button');
  if (likeButton) {
    likeButton.addEventListener('click', () => {
      likePosts();
    });
  }
});

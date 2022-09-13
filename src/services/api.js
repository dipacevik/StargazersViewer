export const API_all_user = () => {
  return `https://api.github.com/users`;
};
export const API_user = (user) => {
  return `https://api.github.com/users/${user.toLowerCase()}`;
};
export const API_repos = (user) => {
  return `https://api.github.com/users/${user.toLowerCase()}/repos`;
};
export const API_stargazers = (user, repos) => {
  return `https://api.github.com/repos/${user.toLowerCase()}/${repos}/stargazers`;
};

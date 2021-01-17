const LOCAL_STORAGE_KEY = 'JWT';

const auth = {
  login: (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
    window.location.reload();
  },
  logout: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.location.reload();
  },
  isAuth: () => !!localStorage.getItem(LOCAL_STORAGE_KEY),
  token: () => localStorage.getItem(LOCAL_STORAGE_KEY),
};

export default auth;

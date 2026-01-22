interface Token {
  accessToken: string | null;
  refreshToken: string | null;
}
class TokenManager {
  #accessToken: string | null;
  refreshToken: string | null;
  constructor(token: Token) {
    this.#accessToken = token.accessToken;
    this.refreshToken = token.refreshToken;
    if (token.refreshToken) {
      localStorage.setItem("refreshToken", token.refreshToken);
    }
  }
  getAccessToken() {
    return this.#accessToken;
  }
  setToken(token: Token) {
    this.#accessToken = token.accessToken;
    this.refreshToken = token.refreshToken;
    if (token.refreshToken) {
      localStorage.setItem("refreshToken", token.refreshToken);
    }
  }
  clearToken() {
    this.#accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem("refreshToken");
  }
}
export const tokenManager = new TokenManager({
  accessToken: null,
  refreshToken: localStorage.getItem("refreshToken"),
});

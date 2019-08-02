import auth0 from "auth0-js";

const REDIRECT_ON_LOGIN = "redirect_on_login";
//eslint-disable-next-line
// let _idToken = null;
// let _accessToken = null;
// let _scopes = null;
// let _expiresAt = null;

export default class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;
    this.userName = null;
    this.requestedScopes = "openid profile email read:courses";
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      responseType: "token id_token",
      scope: this.requestedScopes
    });
  }

  login = () => {
    localStorage.setItem(
      REDIRECT_ON_LOGIN,
      JSON.stringify(this.history.location)
    );
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.setUserName();
        this.gottoRedirectLocation();
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}. Check the console for further details`);
        console.log(err);
      }
      localStorage.removeItem(REDIRECT_ON_LOGIN);
    });
  };

  setSession = authResult => {
    //console.log(authResult);
    // set the time that the access token will expire
    // _expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    // // If there is a value on the `scope` param from the authResult,
    // // use it to set scopes in the session for the user. Otherwise
    // // use the scopes as requested. If no scopes were requested,
    // // set it to nothing
    // _scopes = authResult.scope || this.requestedScopes || "";
    const scopes = authResult.scope || this.requestedScopes || "";

    // _accessToken = authResult.accessToken;
    // _idToken = authResult.idToken;

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("scopes", JSON.stringify(scopes));

    this.scheduleTokenRenewal();
  };

  gottoRedirectLocation() {
    const redirectLocation =
      localStorage.getItem(REDIRECT_ON_LOGIN) === "undefined"
        ? "/"
        : JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN));
    this.history.push(redirectLocation);
  }

  setUserName() {
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) {
        let userName = profile.family_name || profile.name;
        this.userName = "Hi " + userName;
      }
    });
  }

  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
    // return new Date().getTime() < _expiresAt;
  };

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("scopes");
    this.userProfile = null;

    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "https://localhost:5050/"
    });
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    return accessToken;

    // if (!_accessToken) throw new Error("No access token found.");
    // return _accessToken;
  };

  getProfile = cb => {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(profile, err);
    });
  };

  userHasScopes(scopes) {
    // const grantedScopes = (_scopes || "").split(" ");
    // return scopes.every(scope => grantedScopes.includes(scope));
    const grantedScopes = (
      JSON.parse(localStorage.getItem("scopes")) || ""
    ).split(" ");
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  renewToken(cb) {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(`Error: ${err.error} - ${err.error_description}.`);
      } else {
        this.setSession(result);
      }
      if (cb) cb(err, result);
    });
  }

  scheduleTokenRenewal() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    const delay = expiresAt - Date.now();
    //    const delay = _expiresAt - Date.now();
    if (delay > 0) setTimeout(() => this.renewToken(), delay);
  }
}

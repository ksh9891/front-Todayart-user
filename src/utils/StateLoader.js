class StateLoader {

  loadState() {
    try {
      let state = localStorage.getItem("http://localhost:8080/state");
      if (state !== undefined && state !== null) {
        return JSON.parse(state);
      }
    } catch (error) {
      console.log('error', error)
    }
    return this.initialState();
  }

  saveState(state) {
    try {
      let json = JSON.stringify(state);
      localStorage.setItem("http://localhost:8080/state", json);
    } catch (error) {
      console.log('error', error)
    }
  }

  initialState() {
    return {
      auth: {
        retryCount: 0,
        token: null,
        userDetails: null,
        isLogin:false
      }
    };
  }
}

export default StateLoader;

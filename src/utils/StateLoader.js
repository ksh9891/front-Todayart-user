class StateLoader {

  loadState() {
    try {
      let state = localStorage.getItem("http://localhost:1111/state");
      if (state !== undefined && state !== null) {
        return JSON.parse(state);
      }
    } catch (error) {
      console.log('error', error)
    }
    console.log("loadState pass");
    return this.initialState();
  }

  saveState(state) {
    try {
      let json = JSON.stringify(state);
      localStorage.setItem("http://localhost:1111/state", json);
    } catch (error) {
      console.log('error', error)
    }
  }

  initialState() {
    return {
      auth: {
        retryCount: 0,
        token: `60f671d0-e88e-42a7-8c70-96805893aa32`,
        userDetails: null
      },
      cart:{
        items:[]
      }
    };
  }
}

export default StateLoader;

const axios = require("axios");

const GraphController = {
  /**
   * @name GetCPUData
   * @description Gets all cpu graph data from the specified endpoints.
   * @param {user} - The user field: logic-dev-01/logic-dev-02.
   * @returns {object} - object containing all endpoint values.
   */
  async getCpuData(user) {
    try {
      // Cpu endpoints
      const idleUrl = `https://prosyslogic.com/devdata/render?target=icinga2.${user}.services.Linux_CPU.check_nrpe.perfdata.idle.value&from=-1h&format=json`;
      const userUrl = `https://prosyslogic.com/devdata/render?target=icinga2.${user}.services.Linux_CPU.check_nrpe.perfdata.user.value&from=-1h&format=json`;
      const systemUrl = `https://prosyslogic.com/devdata/render?target=icinga2.${user}.services.Linux_CPU.check_nrpe.perfdata.system.value&from=-1h&format=json`;
      const iowaitUrl = `https://prosyslogic.com/devdata/render?target=icinga2.${user}.services.Linux_CPU.check_nrpe.perfdata.iowait.value&from=-1h&format=json`;
      const stealUrl = `https://prosyslogic.com/devdata/render?target=icinga2.${user}.services.Linux_CPU.check_nrpe.perfdata.steal.value&from=-1h&format=json`;

      // Array of endpoints
      const allEndPoints = [idleUrl, userUrl, systemUrl, iowaitUrl, stealUrl];

      // TODO: add an object of fields for each url ex: { iowait: response.data, steal: response.data, ..etc }.

      // Fetch data recursively
      const cpuGraphs = await Promise.all(
        allEndPoints.map(async endpoint => {
          let response = await axios.get(endpoint);
          response = response.data;

          return response;
        })
      );

      return cpuGraphs;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  /**
   * @name GetNetworkData
   * @description Gets all network graph data from the specified endpoints.
   * @param {user} - The user field: logic-dev-01/logic-dev-02.
   * @returns {object} - object containing all endpoint values.
   */
  async getNetworkData(user) {
    try {
      // Network endpoints
      const eth0_txbyt = `https://prosyslogic.com/devdata/render?target=icinga2.${user}.services.Linux_Network.check_nrpe.perfdata.eth0_txbyt.value&from=-1h&format=json`;
      const eth0_txerrs = `https://prosyslogic.com/devdata/render?target=icinga2.${user}.services.Linux_Network.check_nrpe.perfdata.eth0_txerrs.value&from=-1h&format=json`;
      const eth0_rxbyt = `https://prosyslogic.com/devdata/render?target=icinga2.${user}.services.Linux_Network.check_nrpe.perfdata.eth0_rxbyt.value&from=-1h&format=json`;
      const eth0_rxerrs = `https://prosyslogic.com/devdata/render?target=icinga2.${user}.services.Linux_Network.check_nrpe.perfdata.eth0_rxerrs.value&from=-1h&format=json`;

      // Array of endpoints
      const allEndPoints = [eth0_txbyt, eth0_txerrs, eth0_rxbyt, eth0_rxerrs];

      // Fetch data recursively
      const networkGraphs = await Promise.all(
        allEndPoints.map(async endpoint => {
          let response = await axios.get(endpoint);
          response = response.data;
          return response;
        })
      );

      return networkGraphs;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  /**
   * @name GetMemoryData
   * @description Gets all memory graph data from the specified endpoints.
   * @param {user} - The user field: logic-dev-01/logic-dev-02.
   * @returns {object} - object containing all endpoint values.
   */
  async getMemoryData(user) {
    try {
      // Memory endpoints
      const active = `https://prosyslogic.com/devdata/render?target=icinga2.${user}.services.Linux_Memory.check_nrpe.perfdata.Active.value&from=-1h&format=json`;
      const memUsed = `https://prosyslogic.com/devdata/render?target=icinga2.${user}.services.Linux_Memory.check_nrpe.perfdata.MemUsed.value&from=-1h&format=json`;
      const memCached = `https://prosyslogic.com/devdata/render?target=icinga2.${user}.services.Linux_Memory.check_nrpe.perfdata.MemCached.value&from=-1h&format=json`;
      const swapUsed = `https://prosyslogic.com/devdata/render?target=icinga2.${user}.services.Linux_Memory.check_nrpe.perfdata.SwapUsed.value&from=-1h&format=json`;
      const swapCached = `https://prosyslogic.com/devdata/render?target=icinga2.${user}.services.Linux_Memory.check_nrpe.perfdata.SwapCached.value&from=-1h&format=json`;

      // Array of endpoints
      const allEndPoints = [active, memUsed, memCached, swapUsed, swapCached];

      // Fetch data recursively
      const memoryGraphs = await Promise.all(
        allEndPoints.map(async endpoint => {
          let response = await axios.get(endpoint);
          response = response.data;
          return response;
        })
      );

      return memoryGraphs;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};

module.exports = GraphController;

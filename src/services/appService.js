/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import conf from "../configurations/app.conf";

export default class appService {
  constructor() {}
  async getOrganisationUnits() {
    try {
      const url = conf.SERVERS.API_SERVER + conf.RESOURCES.ORGANISATION_UNITS;
      await axios.get(url).then((response) => {
        //console.log(JSON.stringify(response.data));
        return response.data;
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

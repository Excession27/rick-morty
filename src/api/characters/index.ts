import axios from "../../httpClient/axiosInstance";
import { APICall, CharacterStatus } from "../types";
import { CharacterType } from "../types";

export const getAllCharacters = (): APICall<any> => axios.get(`/character`);

export const getSingleCharacterByID = (id: string): APICall<any> =>
  axios.get(`/character/${id}`);

export const getCharactersByStatus = (status: string): APICall<any> =>
  axios.get(`/character/?status=${status}`);

export const getCharactersByName = (name: string): APICall<any> =>
  axios.get(`/character/?name=${name}`);

export const getCharactersByQuery = (
  name: string,
  status: string
): APICall<any> => axios.get(`/character/?name=${name}&status=${status}`);

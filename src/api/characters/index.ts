import axios from "../../httpClient/axiosInstance";
import { APICall, CharacterStatus } from "../utils";
import { CharacterType } from "../types";

export const getAllCharacters = (page: number): APICall<any> =>
  axios.get(`/character?page=${page}`);

export const getCharacters = (page: string): APICall<any> =>
  axios.get(`/character?page=${page}`);

export const getSingleCharacterByID = (id: string): APICall<any> =>
  axios.get(`/character/${id}`);

export const getCharactersByStatus = (
  status: string,
  page: number
): APICall<any> => axios.get(`/character/?status=${status}&page=${page}`);

export const getCharactersByName = (name: string, page: number): APICall<any> =>
  axios.get(`/character/?status=${name}&page=${page}`);

export const getCharacterByQuery = (
  name: string,
  status: string,
  page: number
): APICall<any> =>
  axios.get(`/character/?name=${name}&status=${status}&page=${page}`);

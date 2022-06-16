import Card from "../component/Card";
import { CharacterStatus, PageDataType } from "../api/types";
import { CharacterType } from "../api/types";
import { useInfiniteQuery } from "react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import axiosInstance from "../httpClient/axiosInstance";
import useDebounce from "../hooks/useDebounce";
import AsyncComponent from "../component/hoc/AsyncComponent";
import placeholderImg from "../assets/img/placeholder.jpeg";

//  for alternative API implementation
// import {
//   getCharactersByQuery,
//   getCharactersByStatus,
//   getCharactersByName,
// } from "../api/characters";

const CharacterList = () => {
  const [filter, setFilter] = useState<{
    name: string;
    status: string;
    page: number;
  }>({
    name: "",
    status: "",
    page: 0,
  });

  const setFilterStatus = (value: string) => {
    setFilter((prev) => ({ ...prev, status: value }));
  };
  const setFilterName = (value: string) => {
    setFilter((prev) => ({ ...prev, name: value }));
  };

  const [search, setSearch] = useState<string>("");

  const { ref, inView } = useInView({ threshold: 0.2 });

  // Depending on the parameters supplied a different query will be returned,
  // however after after the first run useInfiniteQuery provides a special query for the next pages thus the last IF statement
  const getQuery = (name: string, status: string, param: string) => {
    let query: string = "character";
    let firstRun: boolean = param.length < 10;

    if (name.length > 1 && firstRun) query = `character/?name=${name}`;
    if (status.length > 1 && firstRun) query = `character/?status=${status}`;
    if (name.length > 1 && status.length > 1 && firstRun)
      query = `character/?name=${name}&status=${status}`;
    if (!firstRun) query = param;

    return query;
  };

  const {
    data: characterPages,
    status: charactersStatus,
    fetchNextPage,
  } = useInfiniteQuery<PageDataType>(
    ["filter-query", filter],
    async ({ pageParam = "character" }) => {
      let datum: any;

      //    # Alternative implementation
      // if (
      //   filter.name.length > 1 &&
      //   filter.status.length > 1 &&
      //   pageParam.length < 10
      // ) {
      //   return getCharactersByQuery(filter.name, filter.status);
      // } else if (filter.name.length > 1 && pageParam.length < 10) {
      //   return getCharactersByName(filter.name);
      // } else if (filter.status.length > 1 && pageParam.length < 10) {
      //   return getCharactersByStatus(filter.status);
      // }

      datum = axiosInstance.get(
        getQuery(filter.name, filter.status, pageParam)
      );

      return datum;
    },
    {
      getPreviousPageParam: (firstPage) => {
        if (firstPage.data.info.prev) {
          const prev = firstPage.data.info.prev?.split(
            "https://rickandmortyapi.com/api/"
          );
          return prev[1];
        }
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.data.info.next) {
          const next = lastPage.data.info.next?.split(
            "https://rickandmortyapi.com/api/"
          );

          return next[1];
        }
      },
    }
  );

  // Check to see viewport position in order to fetch next page
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setFilterName(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="w-full bg-slate-300 py-2">
      <div
        id="serach-and-filter"
        className="flex flex-wrap justify-center py-2 sm:justify-between"
      >
        <div
          className="flex flex-wrap gap-2 py-4 px-2"
          onChange={(event: any) => {
            setFilterStatus(event.target.value);
          }}
        >
          <p>Character status: </p>
          <div>
            <input
              id="status_any"
              type="radio"
              value={CharacterStatus.any}
              name="status"
            />
            <label htmlFor="status_any">Any</label>
          </div>
          <div>
            <input
              id="status_alive"
              type="radio"
              value={CharacterStatus.alive}
              name="status"
            />
            <label htmlFor="status_alive">Alive</label>
          </div>
          <div>
            <input
              id="status_dead"
              type="radio"
              value={CharacterStatus.dead}
              name="status"
            />
            <label htmlFor="status_dead">Dead</label>
          </div>
          <div>
            <input
              id="status_unknown"
              type="radio"
              value={CharacterStatus.unknown}
              name="status"
            />
            <label htmlFor="status_unknown">Unknown</label>
          </div>
        </div>
        <input
          className="mr-3 rounded-lg p-3"
          type="text"
          name=""
          id=""
          placeholder="Search"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="card-container justify-content-center flex  flex-wrap justify-evenly gap-x-1 gap-y-4">
        <AsyncComponent
          component={
            <>
              {characterPages?.pages.map((page) =>
                page.data.results.map(
                  (character: CharacterType, index: number) => {
                    return (
                      <div ref={ref} key={index}>
                        <Card
                          image={character.image}
                          name={character.name}
                          key={character.id}
                        />
                      </div>
                    );
                  }
                )
              )}
            </>
          }
          status={charactersStatus}
          skeleton={<Card image={placeholderImg} name={"No data available"} />}
        />
      </div>
      <div></div>
    </div>
  );
};

export default CharacterList;

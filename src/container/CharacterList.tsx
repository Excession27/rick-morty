import Card from "../component/Card";
import { CharacterStatus } from "../api/utils";
import { CharacterType } from "../api/types";
import { useInfiniteQuery } from "react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import axiosInstance from "../httpClient/axiosInstance";
import useDebounce from "../hooks/useDebounce";

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
  const [search, setSearch] = useState<string>("");

  const { ref, inView } = useInView({ threshold: 0.2 });

  const { data: characters, fetchNextPage } = useInfiniteQuery(
    ["filter-query", filter],
    async ({ pageParam = "character" }) => {
      let datum: any;
      if (
        filter.name.length > 1 &&
        filter.status.length > 1 &&
        pageParam.length < 10
      ) {
        pageParam = `character/?name=${filter.name}&status=${filter.status}`;
      } else if (filter.name.length > 1 && pageParam.length < 10) {
        pageParam = `character?name=${filter.name}`;
      } else if (filter.status.length > 1 && pageParam.length < 10) {
        pageParam = `character?status=${filter.status}`;
      }

      datum = axiosInstance.get(pageParam);

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

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const setFilterStatus = (value: string) => {
    setFilter((prev) => ({ ...prev, status: value }));
  };
  const setFilterName = (value: string) => {
    setFilter((prev) => ({ ...prev, name: value }));
  };

  useDebounce(() => {
    setFilterName(search);
  }, 400);

  return (
    <div className="w-full bg-slate-300 pb-5">
      <div>
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
          type="text"
          name=""
          id=""
          placeholder="Search"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="card-container justify-content-center flex  flex-wrap justify-evenly gap-x-1 gap-y-4">
        {characters?.pages.map((page) =>
          page.data.results.map((character: CharacterType, index: number) => {
            return (
              <div ref={ref} key={index}>
                <Card
                  image={character.image}
                  name={character.name}
                  key={character.id}
                />
              </div>
            );
          })
        )}
      </div>
      <div></div>
    </div>
  );
};

export default CharacterList;

import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import location from "./location.json";

const Component: any = ({
  value,
  name,
  size,
  placeholder,
  onSelect,
}: {
  value: string;
  name?: string;
  size?: string;
  placeholder?: string;
  onSelect?: (
    event: React.MouseEvent<HTMLElement>,
    returnData: { province: string; city: string }
  ) => void;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearchList, setShowSearchList] = useState(false);
  const [cities, setCities]: any = useState([]);
  const [provinces, setProvinces]: any = useState([]);
  const [searchList, setSearchList]: any = useState();
  const [province, setProvince] = useState("");
  const [city, setCity] = useState(value);
  const [searchText, setSearchText] = useState("");
  const [displayedValue, setDisplayedValue] = useState("");
  const ref = useRef<any>(null);

  const initData = (value: string) => {
    setCities(location.find((p: any) => p.value === value)?.children);
    setProvinces(location);
  };

  useEffect(() => {
    location.map((province: any) => {
      province.children.filter((c: any) => {
        if (c.value === value) {
          setProvince(province.value);
          setDisplayedValue(province.value + "/" + c.value);
          setCities(
            location.find((p: any) => p.value === province.value)?.children
          );
        }
      });
    });
    setProvinces(location);
  }, []);

  const handleClickOutside = () => {
    setShowDropdown(false);
    setShowSearchList(false);
    setSearchText("");
  };

  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handleClickOutside();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handleClickOutside]);

  const handleSelect = (e: any) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    showDropdown && scrollToView();
  }, [showDropdown]);

  const onChange = (value: string) => {
    setCity("");
    setProvince(value);
    setCities(location.find((p: any) => p.value === value)?.children);
  };

  const onCitySelect = (e: React.MouseEvent<HTMLElement>, value: string) => {
    setShowDropdown(false);
    setCity(value);
    setDisplayedValue(province + "/" + value);
    onSelect && onSelect(e, { province, city: value });
  };

  const scrollToView = () => {
    const c = document.getElementsByClassName("selected");
    for (let i = 0; i < c.length; i++) {
      c[i].scrollIntoView();
    }
  };

  const scrollToTop = () => {
    const c = document.getElementsByClassName("city-selector-province");
    for (let i = 0; i < c.length; i++) {
      c[i].scrollTop = 0;
    }
  };

  const onSearchSelect = (
    e: React.MouseEvent<HTMLElement>,
    pValue: string,
    cValue: string
  ) => {
    setDisplayedValue(pValue + "/" + cValue);
    setShowSearchList(false);
    setShowDropdown(false);
    setCity(cValue);
    setProvince(pValue);
    setSearchText("");
    initData(pValue);
    onSelect && onSelect(e, { province: pValue, city: cValue });
  };

  const createMarkup = (pc: string, tValue: string) => {
    return {
      __html: pc.replace(tValue, `<span class="text-blue">${tValue}</span>`),
    };
  };

  const onSearch = (e: any) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    setShowSearchList(true);

    if (searchText) {
      setSearchList(
        location.map((p: any) =>
          p.children.map((c: any) => {
            if (p.value.match(searchText) || c.value.match(searchText))
              return (
                <div
                  key={c.value}
                  className="city-selector-search-item"
                  onClick={(e: React.MouseEvent<HTMLElement>) =>
                    onSearchSelect(e, p.value, c.value)
                  }
                  dangerouslySetInnerHTML={createMarkup(
                    `${p.value} / ${c.value}`,
                    searchText
                  )}
                ></div>
              );
          })
        )
      );
    } else {
      setSearchList([]);
      setShowSearchList(false);
    }
  };

  return (
    <div
      className={`city-selector-wrapper ${
        size ? "city-selector-" + size : "city-selector-large"
      }`}
      ref={ref}
    >
      <div className="city-selector-toggle-textbox-wrapper">
        <input
          className="city-selector-toggle-textbox"
          name={name ? name : "city"}
          onClick={(e: any) => handleSelect(e)}
          placeholder={placeholder ? placeholder : "请选择城市"}
          value={displayedValue}
          readOnly
        />
        <div
          className="city-selector-delete-icon"
          onClick={(e: any) => {
            setProvinces(location);
            onSelect && onSelect(e, { province: "", city: "" });
            setCity("");
            setProvince("");
            setDisplayedValue("");
            setCities([]);
            scrollToTop();
          }}
        >
          &times;
        </div>
      </div>
      <div
        className="city-selector-dropdown-wrapper"
        style={{ display: `${showDropdown ? "inline-block" : "none"}` }}
      >
        <div className="city-selector-search-wrapper">
          <div className="city-selector-search-input-wrapper">
            <input
              onChange={onSearch}
              value={searchText}
              className="city-selector-search-input"
              placeholder="搜索"
            />
            <svg
              className="city-selector-search-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1203"
              width="16"
              height="16"
            >
              <defs>
                <style type="text/css"></style>
              </defs>
              <path
                d="M760.090355 263.551488c-17.47807-41.321104-42.487673-78.426187-74.343195-110.281709s-68.960605-56.865125-110.281709-74.343195c-42.784432-18.092054-88.219227-27.27111-135.055952-27.27111-46.826492 0-92.261287 9.179057-135.055952 27.27111-41.310871 17.47807-78.415954 42.487673-110.271476 74.343195s-56.865125 68.960605-74.343195 110.281709c-18.092054 42.784432-27.27111 88.219227-27.27111 135.055952 0 46.826492 9.179057 92.261287 27.27111 135.055952 17.47807 41.310871 42.487673 78.415954 74.343195 110.271476s68.960605 56.865125 110.271476 74.343195c42.794665 18.092054 88.22946 27.27111 135.055952 27.27111 46.836725 0 92.27152-9.179057 135.055952-27.27111 41.321104-17.47807 78.426187-42.487673 110.281709-74.343195s56.865125-68.960605 74.343195-110.271476c18.092054-42.794665 27.27111-88.22946 27.27111-135.055952C787.361465 351.770715 778.182408 306.33592 760.090355 263.551488zM656.797827 614.985536c-57.796334 57.796334-134.64663 89.63139-216.388329 89.63139s-158.581762-31.835056-216.378096-89.63139c-57.796334-57.786101-89.63139-134.636397-89.63139-216.378096s31.835056-158.591995 89.63139-216.388329 134.636397-89.63139 216.378096-89.63139 158.591995 31.835056 216.388329 89.63139c57.796334 57.796334 89.63139 134.64663 89.63139 216.388329S714.594161 557.199435 656.797827 614.985536z"
                p-id="1204"
                fill="#bfbfbf"
              ></path>
              <path
                d="M954.805058 933.397493c-3.990894 4.001127-9.230222 5.996574-14.46955 5.996574s-10.478655-1.995447-14.46955-5.996574l-193.855126-193.844893c-7.981788-7.992021-7.981788-20.947078 0-28.939099 8.002254-7.992021 20.957311-7.992021 28.949332 0l193.844893 193.844893C962.79708 912.450415 962.79708 925.405471 954.805058 933.397493z"
                p-id="1205"
                fill="#bfbfbf"
              ></path>
            </svg>
          </div>
        </div>
        <div className="city-selector-options-wrapper">
          {showSearchList ? (
            <div className="city-selector-searched-list">{searchList}</div>
          ) : (
            <>
              <div className="city-selector-province">
                {provinces.map((p: any) => (
                  <div
                    key={p.value}
                    className={`city-selector-item ${
                      province === p.value ? "selected" : ""
                    }`}
                    onClick={() => {
                      onChange(p.value);
                    }}
                  >
                    {p.value}
                  </div>
                ))}
              </div>
              <div className="city-selector-city">
                {cities.map((c: any) => (
                  <div
                    key={c.value}
                    className={`city-selector-item ${
                      city === c.value ? "selected" : ""
                    }`}
                    onClick={(e: React.MouseEvent<HTMLElement>) =>
                      onCitySelect(e, c.value)
                    }
                  >
                    {c.value}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Component;

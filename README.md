# react-chinese-city-selector

A React chinese city selector component

# Install

```
npm install react-chinese-city-selector
```

# Usage

```
import CitySelector from "react-chinese-city-selector";
import "react-chinese-city-selector/dist/index.css";
```

```
<CitySelector value={text} onSelect={onSelect}></CitySelector>
```

### Example

```
function App() {
  const onSelect = (
    e: React.MouseEvent<HTMLElement>,
    data: { province: string; city: string }
  ) => {
    console.log("Do something");
  };
  return (
    <div className="App">
      <div
        style={{
          width: "250px",
          height: "45px",
          margin: "0 auto",
          marginTop: "10px",
        }}
      >
        <CitySelector value={"沈阳市"} onSelect={onSelect}></CitySelector>
      </div>
    </div>
  );
}
```

![ezgif com-gif-maker](https://user-images.githubusercontent.com/9278601/140610008-1f779ef1-42f7-4c29-90dd-5a76714e4b10.gif)


# Properties

| name        |   type   |
| ----------- | :------: |
| value       | {string} |
| placeholder | {string} |
| onSelect    |  {func}  |

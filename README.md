# react-chinese-city-selector

A React chinese city selector component

# Install

```npm
npm install react-chinese-city-selector
```

# Usage

```javascript
import CitySelector from "react-chinese-city-selector";
import "react-chinese-city-selector/dist/index.css";
```

```html
<CitySelector value={text} onSelect={onSelect}></CitySelector>
```

### Example

```javascript
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
          width: "220px",
          height: "40px",
          margin: "0 auto",
          marginTop: "10px",
        }}
      >
        <CitySelector
          size="medium"
          value={"沈阳市"}
          onSelect={onSelect}
        ></CitySelector>
      </div>
    </div>
  );
}
```
![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/9278601/140865444-62540dd0-5b93-44e3-adb4-fd18675d2f7e.gif)

# Properties

| name        |   type   |                             description                              |
| ----------- | :------: | :------------------------------------------------------------------: |
| value       | {string} |                         初始值，例如“沈阳市“                         |
| placeholder | {string} |                          自定义 placeholder                          |
| onSelect    |  {func}  |                     回调方法，返回省份及城市信息                     |
| size        | {string} | 字体大小，例如”mini，tiny，small，medium，large，big，huge，massive“ |

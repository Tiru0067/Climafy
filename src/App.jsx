import WeatherDashboard from "./components/WeatherDashboard";
import { DataProvider } from "./context/DataContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <WeatherDashboard />
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;

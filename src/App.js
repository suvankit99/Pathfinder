import logo from './logo.svg';
import './App.css';
import PathFindingVisualizer from './components/pathFindingVisualizer/pathFindingVisualizer';
import { Button } from '@chakra-ui/react';
function App() {
  return (
    
    <div className="App">
      <PathFindingVisualizer></PathFindingVisualizer>
    </div>
  );
}

export default App;

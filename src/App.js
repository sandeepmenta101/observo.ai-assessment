import { useState, useEffect } from "react";
import './App.css';

import ContainerFileExplorer from './FileExplorer';
import data from "./data.json";
function App() {
  const [fileExplorerData, setFileExplorerData] = useState([]);

  useEffect(() =>{
    const fileData = data.map((file) => {
      if(!file.parent){
        return { ...file, parent: 0 }
      }
      return file;
    })

    function buildTree(fileExplorer, parentId = null) {
      const tree = [];
    
      fileExplorer.forEach(item => {
        if (item.parent === parentId) {
          const children = buildTree(fileExplorer, item.id);
          if (children.length > 0) {
            item.children = children;
          }
          tree.push(item);
        }
      });
    
      return tree;
    }

    const fileDirectory = buildTree([...fileData], 0);
    setFileExplorerData(fileDirectory);
  }, []);

  return (
    <div className="App">
      <ContainerFileExplorer fileExplorer={fileExplorerData} />
    </div>
  );
}

export default App;
